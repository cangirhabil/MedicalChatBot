# Frontend — Technologies & Installation

This file contains a minimal frontend overview focused on the technology stack and quick setup instructions.

Technologies

- Next.js (App router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui, Radix UI
- Lucide React

Requirements

- Node.js 18+

Installation

1. Install dependencies

```bash
cd frontend
npm install
```

2. Create `.env.local` (example)

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_API_ENDPOINT=/get
NEXT_PUBLIC_APP_NAME="Medical AI Assistant"
```

3. Start development server

```bash
npm run dev
```

Notes

- Ensure the backend API is running at the URL set in `NEXT_PUBLIC_API_BASE_URL` before using the frontend.
- For production builds, run `npm run build` and `npm start`.

