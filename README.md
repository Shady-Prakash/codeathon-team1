# The Big Alliance Donation Website

## Project Description
The Big Alliance Donation Website helps users donate to various charity campaigns. It supports both individual and company donations, and administrators can manage campaigns and view reports. The site is designed for mobile and desktop, ensuring accessibility and security with multi-factor authentication and PayPal payments.

<img width="1440" alt="BigAllianceHomePage_1" src="https://github.com/user-attachments/assets/8bca44db-4b6d-4e5a-8143-a77cb4cf8424">
<img width="1440" alt="BigAllianceHomePage_2" src="https://github.com/user-attachments/assets/ac70a3e9-3955-40c5-9934-daee2652d20a">
<img width="1440" alt="BigAllianceHomePage_3" src="https://github.com/user-attachments/assets/80428230-6929-4c30-9a77-816ea316d577">
<img width="1440" alt="CampaignCard" src="https://github.com/user-attachments/assets/86f1609a-0b32-46a2-a091-cb0e7ddf20cb">
<img width="1440" alt="DonateIndividual" src="https://github.com/user-attachments/assets/64186989-a280-4edd-b3d6-c80d89c01778">


Reports and Dashboards Page
<img width="1440" alt="AnalyticsFilter" src="https://github.com/user-attachments/assets/299afd26-97b7-4121-94fd-fc45c372cb52">
<img width="1438" alt="AnalyticsCarts" src="https://github.com/user-attachments/assets/8f643f7f-0626-422d-b008-d05574ad98cb">
<img width="1440" alt="CampaignCreation" src="https://github.com/user-attachments/assets/82d027b0-da89-4f1d-9abe-e35387b6a9e4">


## Technologies Used
- **Next.js**: For fast, responsive frontend.
- **TypeScript**: Ensures type safety and code reliability
- **Prisma**: For database management.
- **NextAuth**: For secure authentication.
- **PayPal**: To handle secure payments.
- **shadcn/ui**: Designed component library for frontend.
- **AG Grid Integrated Charts**: For Reports and Dashboards Page. 

## Challenges and Future Plans
We worked to ensure user input validation and security (OWASP best practices). Future plans include adding more detailed reports and extending campaign features.

## How to Install and Run the Project
1. Clone the repository.
2. Run `yarn install` to install dependencies.
3. Create `.env` file with your environment variables (e.g., PayPal API keys, database connection).
4. Run `yarn run dev` to start the development server.

## How to Use the Project
- For admins: Log in to manage campaigns, view donations, and generate reports. Requires authentication (admin login with multi-factor authentication).
- For donors: Browse campaigns, donate via PayPal.
