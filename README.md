# Express URL Shortener API

A simple URL shortener API built with Express.js and TypeScript. This project allows users to shorten URLs and redirect to the original URLs using the shortened versions.

## Features

- Shorten URLs
- Redirect to original URLs
- Rate limiting
- Redis caching
- Docker support

## Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (version 18 or higher)
- pnpm (package manager)
- Docker and Docker Compose (for containerized setup)
- Redis (if running locally without Docker)

## Package Manager

This project uses **pnpm** as the package manager. pnpm is a fast, disk-efficient package manager that saves disk space and improves installation speed compared to npm.

## Project Structure

```
express-url-shortener-api/
├── docker-compose.yml          # Docker Compose configuration for running the app with Redis
├── Dockerfile                  # Docker configuration for building the app image
├── package.json                # Project dependencies and scripts
├── pnpm-lock.yaml              # Lock file for pnpm dependencies
├── tsconfig.json               # TypeScript configuration
└── src/                        # Source code directory
    ├── server.ts               # Main server entry point
    ├── controller/             # Route handlers
    │   └── url.controller.ts   # URL-related controllers
    ├── models/                 # Data models
    │   └── url.models.ts       # URL data models
    ├── routes/                 # API routes
    │   └── url.routes.ts       # URL routing definitions
    ├── services/               # Business logic services
    │   └── url.service.ts      # URL shortening and retrieval services
    └── utils/                  # Utility functions
        ├── limitter.util.ts    # Rate limiting utilities
        ├── redis.util.ts       # Redis connection utilities
        └── validations.util.ts # Input validation utilities
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd express-url-shortener-api
```

### 2. Install Dependencies

Using pnpm:

```bash
pnpm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
REDIS_HOST=<your redis host>
MONGO_URI=<your mongodb connection url>
```

Adjust the values as needed for your environment.

### 4. Running the Application

#### Option 1: Using Docker Compose (Recommended)

This will start the app and Redis in containers:

```bash
docker-compose up --build
```

The API will be available at `http://localhost:3000`.

#### Option 2: Running Locally

Ensure Redis is running locally, then:

```bash
pnpm run dev
```

For production build:

```bash
pnpm run build
pnpm start
```

### 5. API Endpoints

- `POST /api/shorten` - Shorten a URL
- `GET /:shortCode` - Redirect to original URL

### 6. Testing

Run tests with:

```bash
pnpm test
```

## Development

- Use `pnpm run dev` for development with hot reload
- Code is written in TypeScript and compiled to JavaScript
- ESLint and Prettier are configured for code quality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
