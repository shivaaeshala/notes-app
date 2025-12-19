# Notes App

A modern, full-stack notes application built with Next.js 16, featuring user authentication, note management, and a clean, responsive UI.

## Features

- 🔐 **Authentication**
  - Email/password authentication
  - Google OAuth sign-in
  - Secure session management

- 📝 **Note Management**
  - Create, read, update, and delete notes
  - Optional titles and rich content
  - Archive notes
  - Mark notes as public or private
  - Search functionality to filter notes by title or content

- 🎨 **User Interface**
  - Modern, dark-themed design
  - Responsive layout (mobile, tablet, desktop)
  - Intuitive note cards with dialog-based editing
  - User profile display
  - Real-time search

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Authentication**: Better Auth
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Heroicons, Lucide React

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18+ and npm/pnpm/yarn
- PostgreSQL database (local or cloud-hosted)
- Google OAuth credentials (optional, for Google sign-in)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd notes-app
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:

```env
POSTGRES_URL=your_postgresql_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**Note**: The `POSTGRES_URL` should include SSL parameters if using a cloud database (e.g., `?sslmode=require`).

4. Initialize the database:
```bash
npm run initDb
```

This will create all necessary tables (users, sessions, accounts, verification, notes) in your PostgreSQL database.

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run initDb` - Initialize database schema

## Project Structure

```
notes-app/
├── app/
│   ├── actions/          # Server actions
│   │   └── note.ts      # Note CRUD operations
│   ├── api/             # API routes
│   │   └── auth/        # Authentication endpoints
│   ├── components/      # React components
│   │   ├── navbar/      # Navigation components
│   │   ├── notes.tsx    # Notes display component
│   │   └── signin/      # Authentication components
│   ├── context/         # React context providers
│   ├── lib/             # Utility libraries
│   │   ├── auth.ts      # Better Auth configuration
│   │   ├── database.ts  # Database connection
│   │   ├── schema.ts    # Database schema definitions
│   │   └── initDB.ts    # Database initialization script
│   └── page.tsx         # Home page
├── components/
│   └── ui/              # Reusable UI components
└── public/              # Static assets
```

## Database Schema

The application uses the following main tables:

- **user**: User accounts and profiles
- **session**: User sessions
- **account**: OAuth account links
- **verification**: Email verification tokens
- **notes**: User notes with title, content, archive, and public flags

## Features in Detail

### Note Creation
- Click the create button in the navbar
- Add an optional title and required content
- Notes are automatically associated with the logged-in user

### Note Editing
- Click on any note card to open the edit dialog
- Modify title and content
- Save changes or cancel

### Note Deletion
- Open a note's edit dialog
- Click the delete button
- Confirm deletion

### Search
- Use the search bar in the navbar
- Filter notes by title or content in real-time

### User Profile
- View your profile information in the navbar
- Sign out option available

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and not licensed for public use.
