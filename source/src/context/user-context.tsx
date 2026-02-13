'use client';

import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

interface UserContextType {
  user: User | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
});

let globalUser: User | null = null;
let globalInitialized = false;

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(globalUser);
  const [loading, setLoading] = useState(!globalInitialized);
  const supabaseRef = useRef(createClient());

  useEffect(() => {
    const supabase = supabaseRef.current;

    if (globalInitialized) {
      setUser(globalUser);
      setLoading(false);
    }

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      
      globalUser = user;
      globalInitialized = true;
      setUser(user);
      setLoading(false);
    };

    if (!globalInitialized) {
      getUser();
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      globalUser = session?.user ?? null;
      globalInitialized = true;
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
