# 💻 Ticket-Taka | Sports event ticketing Web Application

# 📁 Project Overview

This is a Next.js-based sports event ticketing web application that helps users discover upcoming matches, compare events, save favorites, and purchase tickets. The project focuses on a responsive, interactive user experience and includes dynamic content based on user login.

The work was completed across multiple assignment stages, including ideation, personas, prototypes, and a fully coded responsive experience.

# 📂 Assignment Overview

This project was completed through a series of structured assignments, progressing from concept development to a fully deployed, production-ready web application.

## 1. Idea Pitch
- 🔗Link to Assignment 1: [Idea Pitch](/assignments/idea-pitch/)

### Objectives
- Clearly articulate the problem sports fans face when trying to find and compare live events
- Identify and describe the core target user groups
- Propose a focused solution concept for a centralized ticketing platform
- Define the initial scope and goals of the project based on real-world motivation

## 2. User personas and information architecture
- 🔗Link to Assignment 2: [User personas and information architecutre](/assignments/user-personas-and-information-architecture/)

### Outcomes
- Three detailed user personas that capture different audience segments
- Clear documentation of each persona's goals, motivations, and pain points
- Information architecture aligned with persona needs, including main sections and content groupings
- A sitemap that visualizes the hierarchy and navigation structure of the platform
- A validated content structure that supports event discovery, ticket purchase, and account-related flows

## 3. Next.js – Application Deployment
- 🔗Link to Assignment 3: [Next.js - Deploying Application](https://hci-2025-26.vercel.app/)

### Outcomes
- Initialized a Next.js project and configured the App Router
- Created template pages and routes that mirror the sitemap structure
- Implemented primary navigation between pages using the Next.js Link component
- Deployed the early version of the application to Vercel for public access
- Verified that routing and navigation work correctly in the deployed environment

## 4. Low/High-fidelity prototype
- 🔗Link to Assignment 4: [Low/High-fidelity prototype](/assignments/high-fidelity-prototype/)

### Outcomes
- High-fidelity desktop homepage prototype demonstrating the visual style, layout, and content hierarchy
- High-fidelity mobile homepage prototype adapted for smaller screens and touch interaction
- Visual foundation for implementing the Next.js interface, ensuring consistency between design and the built application

## 5. Next.js - Dynamic routes, data fetching
- 🔗Link to Assignment 5: [Next.js - Dynamic routes, data fetching](https://hci-2025-26.vercel.app/events)

### Outcomes
- Dynamic routing implementation
- Data fetching and state management
- Event listing with filtering and sorting
- Real-time, data-driven content rendering

# 💡 Features

- **Hero experience**
	- Rotating hero slides that highlight key value propositions for different user types
	- Desktop arrow controls and mobile swipe gestures for manually navigating between slides
	- Clear primary calls to action that deep-link directly into the events listing

- **Event discovery**
	- Rich events page with sport, city, and month filters
	- Text search that matches team names by starting letters for faster lookup
	- Multiple sort options (date, price, name) to quickly reorder the event list
	- Pagination for long lists, keeping the page performant and scannable

- **Favorites and personalization**
	- Logged-in users can mark events as favorites, stored in Supabase
	- Optional "Show favorites only" view for quickly revisiting saved events

- **Ticket selection and cart**
	- Inline ticket selection for each event with quantity controls and ticket type
	- Add-to-cart feedback that adapts to desktop and mobile layouts
	- Persistent cart with quantity adjustment and item removal
	- Order summary with subtotal, service fee calculation, and total
	- Checkout flow that stores purchased tickets in Supabase and confirms success

- **User accounts and authentication**
	- Supabase-powered authentication for sign up, login, and logout
	- Guarded login page that redirects already signed-in users to the homepage
	- My Tickets page entry point from navigation after successful purchases

- **Navigation and layout**
	- Sticky top navigation bar with active state highlighting for the current page
	- Desktop navigation with account dropdown and cart entry
	- Mobile navigation with collapsible menu, account section, and cart access
	- Click-outside behavior to close open menus and dropdowns for a cleaner experience

- **Content and reviews**
	- Testimonial section on the homepage featuring different persona types
	- Reviews content sourced from Contentful CMS (for the dedicated reviews page)

- **Responsive design**
	- Layouts optimized for both mobile and desktop with Tailwind CSS
	- Adjusted hero and content sections so key information stays above the fold on smaller screens
	- Consistent visual style across pages using a shared color palette and typography

# 🛠️ Technologies used

- **Frontend**:
    - ***Next.js App Router*** – routing, layouts, and server/client components for the core application pages
    - ***React*** – component-based UI and interactive behavior
    - ***TypeScript*** – static typing for components, hooks, and shared domain types (e.g., events, cart items)
    - ***Tailwind CSS*** – utility-first styling and responsive layouts
    - ***React Icons*** – iconography for navigation, cart, filters, and visual feedback

- **Backend and Services**:
    - ***Supabase*** – authentication, user state management, favorites, and purchased tickets storage
    - ***Contentful CMS*** – external content source for editorial reviews
    - ***Resend*** (planned) – email infrastructure for future notifications and ticket delivery

- **Tooling and Developer Experience**:
    - ***ESLint*** with ***eslint-config-next*** – linting and best-practice checks
    - ***TypeScript*** compiler – type checking and build-time safety
    - ***Tailwind CSS + PostCSS*** – processing and optimizing styles
    - ***Vercel*** – hosting and continuous deployment of the Next.js application

# 🔍 Basic Design Principles

The interface follows a small set of visual and layout rules that keep the experience consistent, readable, and easy to scan across all pages.

1. Consistent typography and color usage across pages.
2. Clear emphasis for primary calls to action.
3. Strong text-background contrast for readability.
4. Aligned grids and consistent spacing for structure.
5. Grouped labels and inputs for quick scanning.

# 🔍 Norman's 7 Strategies

Project applies Norman's strategies to make key actions discoverable, understandable, and predictable for both new and returning users.

1. ***Discoverability*** - Main navigation, event filters, and CTAs are always visible and clearly named.
2. ***Feedback*** - Buttons, filters, and cart actions respond with hover states and short status messages.
3. ***Conceptual Model*** - Events are shown as a familiar list with filters and details similar to other ticket sites.
4. ***Affordances*** - Interactive elements look clickable through consistent shapes, borders, and hover effects.
5. ***Signifiers*** - Labels, icons, and placeholders explain what each input or control is for.
6. ***Mappings*** - Changing filters or sort options immediately updates the event list in an expected way.
7. ***Constraints*** - Forms and checkout only proceed when required information is provided.

# 🔍 Heuristic Evaluation

The design was reviewed against Nielsen's heuristics to ensure it supports clarity, control, and efficient problem solving during typical user journeys.

1. ***Visibility of System Status*** - Active page highlighting, cart state, and loading states keep users informed.
2. ***Match Between System and Real World*** - Sports categories, venues, dates, and ticket wording mirror real event information.
3. ***User Control and Freedom*** - Users can change filters, edit the cart, or sign out without getting stuck.
4. ***Consistency and Standards*** - The same navigation, card layouts, and button styles appear across pages.
5. ***Error Prevention*** - Forms validate input and prevent actions like empty-cart checkout.
6. ***Recognition Rather Than Recall*** - Key actions (filters, search, navigation, cart) stay visible instead of hidden in menus.
7. ***Flexibility and Efficiency of Use*** - Search, filters, and sorting let users quickly focus on the most relevant events.
8. ***Aesthetic and Minimalist Design*** - A limited color palette and clean layout keep attention on events and tickets.
9. ***Help Users Recognize, Diagnose, and Recover from Errors*** - Short error messages explain issues with login, registration, or payment.
10. ***Help and Documentation*** - Clear labels on actions like "Browse events", "Pay now", and "My Account" reduce the need for extra help.

# 🔍 C.R.A.P. Principles

Core visual design decisions also follow the C.R.A.P. principles to keep content legible, structured, and visually coherent.

- **Contrast**: High-contrast headings and CTA buttons.
- **Repetition**: Consistent button styling and card layouts.
- **Alignment**: Grids and text alignments are uniform.
- **Proximity**: Related information is grouped together.

# ⚡ Analyze the application's performance

The live deployment was evaluated using [PageSpeed Insights](https://pagespeed.web.dev) to check core performance, accessibility, best practices, and SEO scores for both mobile and desktop.

The full performance report can be viewed [here](https://pagespeed.web.dev/analysis/https-hci-2025-26-vercel-app/izqjxzxofo?form_factor=desktop).

# 🔮 Future improvements

These ideas outline potential next steps to expand Ticket-taka beyond its current state and deepen the overall experience.

- Seat selection with interactive venue maps
- Payment integration for live ticket checkout
- Multi-language support for international users
- Personalized recommendations based on favorites and past purchases
- Email notifications for purchases, reminders, and updates
- Push notifications for favorite teams and saved events
- Group bookings and shared carts for friends attending together
- Organizer dashboard with basic analytics (attendance, revenue, popular events)

# ✅ Conclusion

Ticket-taka was developed as a step-by-step journey from idea to implementation. The early assignments focused on defining the concept and users: the idea pitch captured the core problem and solution, while the personas and information architecture work translated those insights into clear user types, goals, and a sitemap that shaped the overall structure of the app. The high-fidelity prototypes then turned that structure into concrete desktop and mobile designs, giving a visual blueprint for layout, hierarchy, and interaction.

Building on that foundation, the Next.js implementation brings the concept to life as a working sports ticketing application. The source code delivers a responsive experience with a guided hero entry point, rich event discovery (filters, search, sorting, favorites), and a full cart and checkout flow backed by Supabase for authentication, favorites, and ticket storage. Navigation, layouts, and components are implemented with the App Router, React, TypeScript, and Tailwind CSS, while Contentful provides an external source for reviews.

Together, the assignments and the final codebase demonstrate a complete UX and engineering process: from understanding user needs and defining information architecture, through visual design, to a deployed, data-driven web application that is ready to be extended with additional features such as seat selection, payments, notifications, and organizer tools.