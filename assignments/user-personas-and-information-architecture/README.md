# User personas and information architecture

## Contents
- [User Personas](#user-personas)
     - [Persona 1: Global sports explorer](#user-persona-1-global-sports-explorer)
     - [Persona 2: Dedicated local fan](#user-persona-2-dedicated-local-fan)
     - [Persona 3: Budget-conscious student](#user-persona-3-budget-conscious-student)
- [Information Architecture](#information-architecture)
- [Sitemap](#sitemap)
- [Used LLM prompts](#used-LLM-prompts)

---

## User Personas

### User Persona 1: Global sports explorer
<table>
    <tr>
        <td><img src="./images/raphael.png" alt="Global sports explorer image" width="300"/></td>
        <td>
            • Name: Raphael Goncalves da Silva Santos<br>
            • Age: 27<br>
            • Gender: Male<br>
            • Location: Rio de Janeiro, Brazil (currently traveling abroad)<br>
            • Occupation: Freelance photographer & travel blogger<br>
            • Education: Bachelor’s in Journalism
        </td>
    </tr>
</table>

**Personality traits**
- An adventurous and outgoing individual who thrives on exploring new cultures and experiences. Highly social and enjoys connecting with locals and fellow travelers through shared passions, especially live sports. Naturally curious and open-minded, always seeking authentic moments that capture the spirit of each destination. Confident with technology but prefers simple, intuitive platforms that make travel planning easier. Spontaneous by nature and quick to make decisions, often booking last-minute tickets when an exciting event appears. Values authenticity, convenience, and meaningful experiences over luxury or complexity.

**Goals and motivations**
- Driven by a love for travel and live sports, the primary goal is to discover local sporting events in every destination visited. There is a strong desire for a convenient and reliable platform that makes it easy to see what events are happening soon without needing to browse multiple sources. Access to short, clear descriptions of events and participants is essential for making quick decisions while on the move. Being able to purchase verified tickets easily, in a preferred language and currency, is equally important. Ultimately, the motivation comes from wanting seamless access to genuine, in-person sports experiences that add excitement and cultural depth to each journey.

**Pain points**
- Finding accurate and trustworthy information about upcoming sports events can often be challenging, especially when traveling to new places. Event details are frequently scattered across multiple websites, making it time-consuming to compare options or confirm authenticity. Language barriers and inconsistent ticketing systems can add further frustration, particularly when trying to book events abroad. Complicated registration steps, unclear pricing, and hidden fees create additional obstacles, reducing trust and convenience. Overall, the main difficulties stem from a lack of centralized, transparent, and user-friendly access to sports events and tickets while on the go.

---

### User Persona 2: Dedicated local fan
<table>
    <tr>
        <td><img src="./images/mate.png" alt="Dedicated local fan" width="300"/></td>
        <td>
            • Name: Mate<br>
            • Age: 44<br>
            • Gender: Male<br>
            • Location: Kaštela, Croatia<br>
            • Occupation: Financial Advisor<br>
            • Education: Bachelor’s Degree in Economics
        </td>
    </tr>
</table>

**Personality traits**
- A loyal and community-oriented person who values consistency and belonging. Deeply passionate about local sports culture and proud to support hometown teams, attending matches whenever possible. Responsible and organized, often planning weekends around upcoming games. Prefers reliable, easy-to-use digital platforms and values transparency when making online purchases. Social by nature and enjoys sharing live sports experiences with friends, family, and colleagues, using events as a way to stay connected with his community.

**Goals and motivations**
- The main goal is to attend as many local sporting events as possible and show continuous support for favorite teams throughout the season. Seeks a simple, centralized platform to browse upcoming matches quickly and buy tickets without unnecessary details or complex navigation. Appreciates being able to see essential event information such as date, time, venue, and participating teams in one place. Motivation comes from the excitement and emotional connection of live sports, the sense of belonging within the fan community, and the joy of supporting his city’s athletic spirit.

**Pain points**
- Finding details about smaller local sports events is often a struggle, as information is scattered across different sources and poorly organized. Most ticketing websites are cluttered, focusing mainly on major leagues or including irrelevant data that complicates the process. Hidden fees, confusing seat maps, and slow checkout experiences reduce trust and satisfaction. There is also concern about the reliability of ticket sellers and whether tickets are verified. Overall, the lack of a straightforward, transparent, and unified platform makes attending local events more difficult than it should be.

---

### User Persona 3: Budget-conscious student
<table>
    <tr>
        <td><img src="./images/iva.png" alt="Budget-conscious student" width="300"/></td>
        <td>
            • Name: Iva<br>
            • Age: 19<br>
            • Gender: Female<br>
            • Location: Split, Croatia<br>
            • Occupation: University Student<br>
            • Education: Currently pursuing Bachelor’s Degree
        </td>
    </tr>
</table>

**Personality traits**
- Practical, sociable, and energetic, she enjoys staying connected with local sports culture despite a limited budget. Curious and outgoing, she seeks fun and affordable experiences with friends while balancing academic and work responsibilities. Comfortable with technology, she prefers simple, intuitive apps that allow her to quickly browse and book events without unnecessary steps. She enjoys planning social activities around campus life, using live sports events as a way to bond with friends and feel part of the local community.

**Goals and motivations**
- Her primary goal is to attend live sports events without overspending. She looks for a platform that provides clear and concise information about upcoming matches, including date, venue, sport, and participating teams. Motivated by the social and cultural experience of live events, she wants to enjoy the excitement of the atmosphere, connect with friends, and participate in local sports culture. Quick, hassle-free ticket purchases and affordable options are essential for her.

**Pain points**
- It can be difficult to find events that fit both schedule and budget. Many ticketing platforms are complicated or focused on premium offerings, making it hard to locate inexpensive options. Hidden fees, unclear pricing, and slow checkout processes create frustration and risk missing out on events. She needs trustworthy, centralized information about available matches to make fast, informed decisions without wasting time or money.

---

## Information Architecture
The information architecture was created to make it easier for users to navigate through the website and to enable them to easily find upcoming sports events and purchase tickets. This structure is based on user needs, identified through the personas.

- **Home page** 
     - Introduction and description of Ticket-taka
     - Featured upcoming events or popular matches
     - Quick navigation bar for events
     - User recommendations and reviews of recent events
- **Events**
     - Filter options
     - Short description of the event and participants
     - Date, time, venue and location
     - Image gallery
- **Tickets** 
    - Price list by category
    - Ticket purchase process
    - Cancellation and refund policies
- **Experiences** 
    - User reviews and comments about attended events
    - Event ratings
    - User-uploaded photos
- **About us**
    - A brief history
    - Mission and service philosophy
    - Why us over other platforms
- **Contact and help**
    - Frequently Asked Questions (FAQ)
    - Emergency and customer service numbers
    - Links to social networks
- **Login / Account** 
    - User login to access personalized features
    - Option to create a new account or reset password
- **My tickets / events** (Private) 
    - Personalized overview of purchased tickets and upcoming events
    - Option to view, modify, or cancel ticket orders
    - Access to limited-time promotions and early-bird bookings
    
---

## Sitemap
The sitemap clearly displays the structure and hierarchy of information on the website through a visual representation of its main categories and subcategories.<br>
<img src="./images/sitemap.png" alt="Sitemap image" width="1000"/>

---

## Used LLM prompts
- Generate three user personas for a web application called Ticket-taka, a platform for discovering and buying tickets to upcoming sports events. The personas should represent different types of users, such as a world-traveling sports fan, a loyal local supporter, and a budget-conscious student. Include demographic details, personality traits and context-specific information.
- Design an information architecture based on card sorting method and  detailed sitemap. The site allows users to browse upcoming events, read short descriptions, and purchase tickets. Organize the structure into clear main categories and subcategories that reflect user needs identified through personas.