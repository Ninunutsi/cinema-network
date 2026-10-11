# Movie Ticket Booking

## Features

- **Movie discovery** — Browse now-playing and coming-soon movies, view movie details, and explore available sessions.
- **Authentication** — Sign in, create an account, upload an avatar, and complete your profile.
- **Interactive seat selection** — Render cinema seating layouts dynamically from the API, with zoom controls, ticket types, and seat selection limits.
- **Ticket booking** — Reserve seats with temporary holds, view a countdown timer, and complete checkout.
- **Checkout validation** — Validate customer and payment details, display server-side errors, and handle expired or unavailable seat holds.
- **Booking confirmation** — View completed orders and access tickets through your profile.
- **Profile management** — Manage account details and access your tickets.
- **Movie notifications** — Access notification functionality for upcoming movies.
- **Refund flow** — Handle booking refund confirmation.
- **URL-aware modals** — Support browser navigation and restore the active ticket-booking modal after a page refresh.
- **Responsive UI** — Reusable components and consistent styling across the application.

## Tech Stack

- **React** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- **shadcn/ui**
- **React Router**
- **TanStack Query** — Server-state management and API caching
- **Zustand** — Client-side state management
- **Axios** — HTTP requests
- **React Hook Form** + **Zod** — Form handling and validation
- **Sonner** — Toast notifications
- **Lucide React** — Icons
- **Embla Carousel** — Movie carousels and autoplay

## Getting Started

### Prerequisites

- Node.js (a recent LTS version recommended)
- npm
- Access to the Kino XII API

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd <project-directory>
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=https://api.kinoxii.redberryinternship.ge/api
```

The application uses this API URL as its default if the environment variable is not configured.

### Run the Development Server

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

## Project Structure

The application is organized by features, with shared components and utilities separated for maintainability.

```text
src/
├── api/                 # HTTP client and API configuration
├── components/
│   ├── atoms/           # Small reusable UI components
│   ├── molecules/       # Composed UI components
│   ├── organisms/       # Composed UI components
│   ├── template/       # Composed UI components
│   └── ui/              # Shared UI primitives
├── features/
│   ├── auth/            # Authentication and user management
│   ├── booking/         # Seat holds, checkout, and orders
│   ├── movies/          # Movie data and queries
│   ├── sessions/        # Cinema sessions and seat maps
│   └── tickets/         # Ticket-related functionality
├── hooks/               # Reusable React hooks
├── views/               # Application pages
├── store/               # Zustand stores
├── utils/               # Shared utilities and modal management
├── App.tsx
└── main.tsx
```

## Booking Flow

1. Browse a movie and select a cinema session.
2. Choose available seats from the API-provided seat map.
3. Select ticket types and create a temporary seat hold.
4. Complete the checkout form while the hold is active.
5. Submit payment details to complete the order.
6. View the booking confirmation and access tickets from your profile.

Seat holds are time-limited. The application handles hold expiration and unavailable seats, and can restore an active checkout after a refresh when the hold is still valid.

## API Integration

The frontend communicates with the Kino XII API for:

- Authentication and user profiles
- Movie listings and movie details
- Cinema sessions and seat maps
- Seat holds and hold release
- Order creation and booking confirmation
- Tickets, notifications, and refunds

The API is the source of truth for seat availability, hold validity, and completed orders.

## Development Principles

- Use TypeScript for typed API responses and component contracts.
- Keep API logic and React Query hooks organized by feature.
- Reuse shared UI components and consistent design tokens.
- Separate server state from client-side UI state.
- Validate forms on the client and handle API validation errors.
- Handle loading, empty, error, and success states explicitly.
