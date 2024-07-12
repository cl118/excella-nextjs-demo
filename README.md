# Next.js Demo Project

Welcome to the Next.js Demo Project! This repository showcases the powerful features of Next.js, including seamless integration with Supabase, usage of Tailwind CSS and Shadcn for UI components, React Hook Form and Yup for form validation, and SWR for data fetching and management. This project aims to demonstrate the versatility of Next.js in building modern, efficient web applications.

## Table of Contents

-   [Getting Started](#getting-started)
-   [Project Structure](#project-structure)
-   [Key Integrations](#key-integrations)
    -   [Supabase Authentication and PostgreSQL](#supabase-authentication-and-postgresql)
    -   [Styling with Tailwind CSS and Shadcn](#styling-with-tailwind-css-and-shadcn)
    -   [Form Validation with React Hook Form and Yup](#form-validation-with-react-hook-form-and-yup)
    -   [Data Fetching with SWR](#data-fetching-with-swr)
-   [Setting Up Supabase](#setting-up-supabase)
    -   [Creating a Supabase Account and Project](#creating-a-supabase-account-and-project)
    -   [Setting Up Authentication](#setting-up-authentication)
    -   [Creating the Invoices Table](#creating-the-invoices-table)
    -   [Enabling Row-Level Security](#enabling-row-level-security)
    -   [Getting API Keys](#getting-api-keys)
-   [Usage](#usage)
    -   [Generating Sample Data](#generating-sample-data)

## Getting Started

To get started with this project, clone the repository and install the dependencies:

```zsh
git clone https://github.com/cl118/excella-nextjs-demo.git
cd excella-nextjs-demo
npm install
```

## Project Structure

```plaintext
public/                                # Holds static assets such as images, fonts, and other public resources
src/                                   # Contains the main application code
├── app/                               # Contains all page and api routes
│   ├── (auth)/                        # Contains auth related routes
│   │   ├── login/                     # Contains the login page and related actions
│   │   │   ├── actions.ts             # Defines actions for the login process
│   │   │   └── page.tsx               # The login page component
│   │   └── logout/                    # Defines the route for logging out
│   │       └── route.ts               # The logout route component
│   ├── (logged-in)/                   # Contains pages and components for authenticated users
│   │   ├── dashboard/                 # Components and pages related to the user dashboard
│   │   │   ├── AddInvoiceButton.tsx   # CSR component for add invoice button
│   │   │   ├── AddInvoiceModal.tsx    # CSR component for add invoice modal
│   │   │   ├── InvoiceTableBody.tsx   # CSR component for the table body displaying invoices
│   │   │   └── page.tsx               # SSR dashboard page component
│   │   ├── invoice/[id]/              # Dynamic page route for viewing a specific invoice by ID
│   │   │   └── page.tsx               # SSR invoice detail page component
│   │   └── layout.tsx                 # Layout component for logged-in user pages
│   ├── api/db/invoice/                # API route for handling invoice database operations
│   │   └── route.ts                   # The API route file for invoice operations
│   ├── error/                         # Custom error page path
│   │   └── page.tsx                   # The error page component
│   ├── favicon.ico                    # Favicon for the application
│   ├── globals.css                    # Global CSS styles for the application
│   ├── layout.tsx                     # Layout component for the application
│   └── page.tsx                       # The main index page component
├── components/ui/                     # Contains various UI components installed from Shadcn
├── hooks/                             # Contains custom hooks
│   └── useInvoices.ts                 # Custom hook for fetching and managing invoices data
├── lib/                               # Contains utility functions and helpers
│   └── utils.ts                       # Contains cn and fetcher functions for Tailwind CSS and SWR
├── utils/supabase/                    # Utility functions and configurations for Supabase
│   ├── client.ts                      # Initializes and configures the Supabase cliend-side client
│   ├── middleware.ts                  # Middleware for handling Supabase-related operations
│   └── server.ts                      # Initializes and configures the Supabase server-side client
└── middleware.ts                      # Middleware configuration for the application
.eslintrc.json                         # ESLint configuration file for code linting
.gitignore                             # Specifies files and directories to be ignored by Git
components.json                        # Configuration file for UI components
next.config.mjs                        # Next.js configuration file
package-lock.json                      # Automatically generated file that describes the exact tree that was generated by npm
package.json                           # Lists the project dependencies and scripts
postcss.config.mjs                     # Configuration file for PostCSS
README.md                              # The readme file you're reading
tailwind.config.ts                     # Tailwind CSS configuration file
tsconfig.json                          # TypeScript configuration file
```

## Key Integrations

### [Supabase](https://supabase.io/) Authentication and PostgreSQL

-   **Authentication**: Leverage Supabase for user authentication.
-   **PostgreSQL**: Use Supabase's PostgreSQL database with row-level security for secure data handling.

### Styling with Tailwind CSS and Shadcn

-   **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development.
-   **[Shadcn](https://ui.shadcn.com/)**: Collection of accessible and customizable components built on Tailwind CSS.

### Form Validation with React Hook Form and Yup

-   **[React Hook Form](https://react-hook-form.com/)**: Performant, flexible form handling.
-   **[Yup](https://github.com/jquense/yup)**: Schema-based validation for ensuring data integrity.

### Data Fetching with SWR

-   **[SWR](https://swr.vercel.app/)**: A React Hooks library for data fetching with built-in caching, revalidation, focus tracking, and more.

## Setting Up Supabase

### Creating a Supabase Account and Project

If you are an existing Supabase user, you can go to [database.new](https://database.new/) to create a new database. If not, proceed with the instructions below.

1. **Create a Supabase Account**: Go to [Supabase](https://supabase.io/) and sign up for an account.

2. **Create a New Project**:
    - Click on "New Project".
    - Enter your project details (name, organization, region).
    - Click "Create new project".

### Setting Up Authentication

1. **Disable Email Confirmation**: Navigate to the "Authentication" section, go to Providers, then Email and disable the email confirmation requirement. This demo does not implement email confirmation, so this step simplifies the setup process.

2. **Third-Party Providers**: The demo only utilizes a simple email/password authentication. If you'd like to utilize third-party providers, refer to the Supabase documentation to add integrations.

### Creating the Invoices Table

1. **Go to Table Editor**: Navigate to the "Table Editor" in the database section.
2. **Create a New Table**:
    - Click "New Table".
    - Name the table `invoices`.
3. **Add Columns**:
    - **id**: leave default settings.
    - **user_id**: Type `uuid`, default value of `auth.uid()`, not null.
    - **invoice_date**: Type `date`, not null.
    - **customer_name**: Type `varchar`, not null.
    - **status**: Type `varchar`, not null.
    - **total_amount**: Type `numeric`, not null.

### Enabling Row-Level Security

There are two methods to enable row-level security through the GUI:

#### Method 1

1. Click on the table name in the table editor.
2. Click on the three dots to expand the menu.
3. Click "View Policies".

#### Method 2

1. Go to the "Authentication" menu.
2. Click on "Policies" in the configuration menu.
3. Click "Create Policy" for the `invoices` table.

**Create a policy :**

1. Assign an appropriate name.
2. Ensure it's the correct table selected: `public.invoices`.
3. Set policy behavior to `Permissive`.
4. Set policy command to `ALL`.
5. Set target roles to `authenticated`.
6. Add the expression `(auth.uid() = user_id)` in both the policy expression and check expression fields.
7. Save the policy.

Alternatively, you can use the following SQL queries to create the table and enable row-level security:

```sql
create table invoices (
  id int8 generated by default as identity primary key,
  user_id uuid references auth.users (id) not null,
  invoice_date date not null,
  customer_name varchar not null,
  status varchar not null,
  total_amount numeric not null
);

alter table invoices enable row level security;

-- Example policy: Allow users to access only their own invoices
create policy "Allow all actions for authenticated users to their own data"
  on invoices
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

### Getting API Keys

1. **Get API Keys**:
    - Go to the "Settings" section of your Supabase project.
    - Under "API", find your Project URL and Anon Key.
    - Copy these values and add them to your `.env.local` file:
        ```zsh
        NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
        NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
        ```

## Usage

1. **Environment Variables**: Ensure a `.env.local` file was created with your Supabase keys.
    ```zsh
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```
2. **Run the Development Server**:
    ```zsh
    npm run dev
    ```
3. Open your browser and navigate to `http://localhost:3000` to view the project.

4. Click 'Log In' to proceed to the authentication screen

5. Enter email and password then click 'Sign Up' to create user account

6. If sign-up was successful you will be redirected to `/dashboard`

7. Click '+ Invoice' to add your own data or run [this SQL query](#generating-sample-data) to add sample data.

# Project Summary: Invoice Management Dashboard

At this stage, the project has achieved a functional invoice management dashboard. The dashboard integrates both server-side rendering (SSR) and client-side rendering (CSR) for an optimal user experience. Here are the key components and functionalities:

1. **Dashboard Structure**:

    - **Server-Side Rendered Dashboard Page**: Provides the base layout and initial content rendering for performance and SEO benefits.
    - **Client-Side Rendered Components**: Includes the "Add Invoice" button, "Add Invoice" modal, and the table body where invoices are listed.

2. **Invoice List and Fetching Data**:

    - **Custom `useInvoices` Hook**: Utilizes the `SWR` (stale-while-revalidate) strategy to fetch and manage invoice data.
    - **Caching**: SWR caches the invoice data to improve performance and reduce unnecessary network requests. Once data is fetched, it is stored and reused until it needs to be revalidated.
    - **Focus Revalidation**: SWR automatically revalidates data when the window gains focus, ensuring that the user always sees the most up-to-date information without manually refreshing the page.
    - **Loading State Management**: SWR's native loading state is leveraged, with additional UI elements indicating the loading process through the `isLoading` variable.

3. **Adding Invoices**:

    - **Optimistic Updates**: When an invoice is added, the user receives instant feedback as the new invoice appears immediately in the list.
    - **Backend Communication**: A POST request is sent to the server, followed by a revalidation process to update the list with the correct database ID.
    - **Error Handling**: If the request or revalidation fails, the system rolls back to the previous state, removing the newly added invoice.

4. **Dynamic Routes**:

    - **Accessing Single Invoice Data**: Each invoice can be accessed individually by navigating to `/invoice/<invoice id>` or by clicking on the invoice ID on the dashboard.
    - **Note**: The single invoice page is currently unformatted and serves purely as a demonstration of accessing data through a dynamic route. This provides a proof of concept for retrieving and displaying individual invoice data.
    - **Dynamic Routes in Next.js**: In Next.js, dynamic routes allow you to create pages with variable paths. This is achieved by using square brackets in the path name, such as `/invoice/[id]/page.tsx` in the `app/` directory. When a request is made to `/invoice/<invoice id>`, Next.js will render the corresponding component and fetch the data for that specific invoice.
    - **Forcing Dynamic Rendering**: To ensure that the dynamic route always fetches the latest data, you can use the `export const dynamic = 'force-dynamic'` directive at the top of your dynamic route file. This forces Next.js to treat the page as a dynamic page, bypassing any potential caching mechanisms and ensuring that the data is always up-to-date.

5. **Row-Level Security**:
    - **Testing Row-Level Security**: To ensure that data access is properly secured at the row level, perform the following steps:
        1. **Sign Out**: Log out of the current user account.
        2. **Create a New User**: Register a new user account.
        3. **Add New Data**: Using the new user account, add a new set of invoice data.
        4. **Verify Data Access**: Confirm that the new user can only access the data they created and not the data associated with the previous user account.
        5. **Revalidation**: Check that data revalidation and security measures are consistently applied to maintain data integrity and access control.

This hybrid rendering approach ensures a responsive and user-friendly interface while maintaining data integrity and providing immediate feedback for a seamless user experience. The use of SWR's caching and focus revalidation further enhances the reliability and efficiency of data handling within the application. Additionally, thorough testing of row-level security ensures that user data is appropriately protected and accessible only to authorized users.

### Generating Sample Data

To generate sample data for the `invoices` table, follow these steps:

1. **Find User UUID**: First, you need the `user_id` of the authenticated user. You can find it by querying the `auth.users` table, going to the "Authentication" dashboard and viewing the users, or using Supabase's authentication API.

2. **Insert Sample Data**: Navigate to the SQL Editor and use the following SQL script to insert sample data into the `invoices` table. Replace `your-user-id` with the actual `user_id`.

```sql
INSERT INTO invoices (user_id, customer_name, invoice_date, status, total_amount) VALUES
('your-user-id', 'Tony Stark', '2024-07-01', 'Paid', 1500.00),
('your-user-id', 'Steve Rogers', '2024-07-05', 'Pending', 250.75),
('your-user-id', 'Natasha Romanoff', '2024-07-02', 'Overdue', 540.60),
('your-user-id', 'Bruce Banner', '2024-07-03', 'Paid', 1200.00),
('your-user-id', 'Peter Parker', '2024-07-01', 'Pending', 330.50),
('your-user-id', 'Wanda Maximoff', '2024-07-04', 'Overdue', 450.00),
('your-user-id', 'Thor Odinson', '2024-07-06', 'Paid', 670.25),
('your-user-id', 'Clint Barton', '2024-07-02', 'Pending', 980.40),
('your-user-id', 'Stephen Strange', '2024-07-07', 'Paid', 150.00)
RETURNING *;
```

---

If you've made it this far, thank you for checking out this Next.js demo project! I hope it serves as a helpful reference for exploring the capabilities of Next.js! If you have any questions, feel free to reach out to me on [LinkedIn](https://linkedin.com/in/cl118) or [email](mailto:christopher.vinh.le@gmail.com).

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any enhancements or bug fixes.
