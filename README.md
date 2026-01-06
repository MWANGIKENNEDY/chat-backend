# Express TypeScript Backend Template

A modern Express.js backend template with TypeScript, Prisma ORM, and PostgreSQL.

## Features

- **Express.js** with TypeScript
- **Prisma ORM** with PostgreSQL
- **CORS** enabled
- **Error handling** middleware
- **Environment configuration**
- **Health check** endpoint

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## Setup

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd express-ts-be-template
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
PORT=4000
NODE_ENV=development
```

### 3. Database Setup

Generate Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

Seed the database with sample data:

```bash
npx prisma db seed
```

### 4. Development

Start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:4000` (or your configured PORT).

## Project Structure

```
src/
├── app.ts              # Express app configuration
├── server.ts           # Server entry point
├── config/
│   └── env.ts          # Environment variables
├── controllers/
│   └── health.controller.ts
├── middleware/
│   └── error.middleware.ts
├── routes/
│   └── index.ts        # Route definitions
├── lib/
│   └── prisma.ts       # Prisma client setup
└── types/
    └── express.d.ts    # Type definitions

prisma/
├── schema.prisma       # Database schema
└── generated/          # Generated Prisma client
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run seed` - Seed database with sample users
- `npx prisma db seed` - Run database seeding (Prisma v7 method)
- `npx prisma studio` - Open Prisma Studio (database GUI)

## API Endpoints

### Health Check
- `GET /api/health` - Health check endpoint

### Messages API

#### Create Message
`POST /api/messages`

Creates a message in a chat. If chat doesn't exist, creates a new one with provided members.

**Required Fields:**
- `senderId` - ID of the user sending the message
- `content` - Message text (cannot be empty or whitespace)

**Conditionally Required:**
- `memberIds` - Array of user IDs (required only when creating a new chat, i.e., when no `chatId` is provided)

**Optional Fields:**
- `chatId` - ID of existing chat (if not provided, creates new chat)

**Example Payloads:**

Send to existing chat:
```json
{
  "senderId": "user-123",
  "content": "Hello everyone!",
  "chatId": "existing-chat-id"
}
```

Create new chat:
```json
{
  "senderId": "user-123",
  "content": "Starting a new conversation!",
  "memberIds": ["user-456", "user-789"]
}
```

#### Get Messages
`GET /api/messages/:chatId` - Get all messages in a chat

## Database Schema

The project includes a basic chat application schema with:
- Users
- Chats
- Chat members
- Messages

Modify `prisma/schema.prisma` to customize the database schema for your needs.

## Troubleshooting

### TypeScript Module Issues

If you encounter module resolution errors, ensure:
1. All dependencies have proper type definitions installed
2. The `tsconfig.json` is configured for CommonJS modules
3. Import paths don't include `.js` extensions when using ts-node-dev

### Prisma Issues

- Run `npx prisma generate` after schema changes
- Use `npx prisma migrate reset` to reset the database
- Check that `DATABASE_URL` is correctly configured

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and ensure code quality
5. Submit a pull request