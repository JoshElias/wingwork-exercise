## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


How I'm using Zod
Create schemas for User Input and External APIs
For External API, create initial schemas using incoming snake case then create a second using camel case for internal consumption
Use the initial schemas for External API to codegen Client HTTP API for resource management

