# SocTree

A full-stack "linktree" or "bio link" web application that allows users to create profiles with links to their social media networks.

## Architecture

### Backend
- **Framework**: Express + TypeScript
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Image Storage**: Cloudinary
- **Validation**: express-validator

### Frontend
- **Framework**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router
- **State Management**: TanStack Query
- **Drag & Drop**: dnd-kit
- **UI Components**: HeadlessUI, Heroicons
- **Forms**: react-hook-form
- **HTTP Client**: axios

## Features

- **User Authentication**: Registration and login with email and password
- **User Profiles**: 
  - Unique handle identifier
  - Name and description
  - Profile image upload
  - Manageable links (stored as JSON)
- **Search**: Find users by handle
- **Image Management**: Upload and store profile images via Cloudinary

## User Model

```typescript
{
  handle: string,
  name: string,
  email: string,
  password: string,
  description: string,
  image: string,
  links: string
}
```

## API Endpoints

- `POST /auth/register` - Create new user account
- `POST /auth/login` - User login
- `GET /user` - Get authenticated user data
- `PATCH /user` - Update user profile
- `POST /user/image` - Upload user profile image
- `GET /:handle` - Get user by handle
- `POST /search` - Search users by handle

## Getting Started

### Backend
```bash
cd Backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Author

Andres Felipe Florez Paternina
