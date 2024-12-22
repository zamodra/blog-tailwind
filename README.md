## Description:
This project is a frontend challenge from synapsis.id, built using Next.js v13, TypeScript, and Tailwind CSS. This project involves consuming public data APIs from GoRest (or MSW as a fallback), with Axios handling API calls and TanStack Query v5 used for data fetching and caching. The user interface is styled using Ant Design (v5) and Tailwind CSS.

## Personal Note:
Usually, the interview process is not as fast as this one at synapsis.id, and I was both surprised and happy at the same time. However, I was unable to start the project as planned due to an urgent matter. Regardless, I gave my best over the last 18 hours to complete this task, I did what possible to do, from Saturday afternoon to Monday morning. It was quite a challange.

## Online Demo:
- Visits here: https://zmdr-syn.netlify.app/

## How to login?:
- Get the 'name' value from here: https://gorest.co.in/public/v2/users
- Get the 'token' value from here: https://gorest.co.in/my-account/access-tokens (Must register first in order to get the access token)

# Challenge Completion

## 1. Credential Access to Blog Post ✅
- Display a welcome dialog upon first access to the app.
- The dialog should include input fields for name and Go Rest Token.
- Show appropriate error or success messages based on input validity.

## 2. Post List ✅
- Fetch and display a list of blog posts from the GoRest API.
- Ensure posts are optimized with pagination for performance.
- Provide a search and filter feature to refine the post list.

## 3. Detail Post ✅
- Implement the detail post feature as a dedicated page rather than a modal or dialog.
- Allow users to view detailed information about a specific post.
- Include fields like post title, body, and author information.

## 4. Create Post ✅
- Implement a form to allow users to create a new post.
- Validate input fields (e.g., title and body are required).
- Show success or error messages based on the API response.
 
## 5. Update Post✅
- Enable users to edit an existing post.
- Display current values pre-filled in the form for easy modification.
- Handle success and error states for the update operation.

## 6. Delete Post ✅
- Allow users to delete a post.
- Confirm the action through a modal dialog before proceeding.
- Show feedback (success/error) after the operation.

## 7. Create Documentation and Deploy ✅
- Create comprehensive documentation in the `README.md` file.
- Deploy the application to Vercel/Netlify/etc.
- Provide the live URL in the `README.md` file.

## 8. Implement Cypress or Playwright for Testing ❌
- Implement Cypress or Playwright to validate key workflows like login and CRUD operations.

## 9. Set Up CI/CD Pipeline ⚠️(50%)
- Set up a CI/CD pipeline for (automated testing ❌) and code linting with Prettier or ESLint.✅

## 10. Ensure Responsiveness and Dark Theme Toggle ⚠️(50%)
- Ensure the app is responsive across devices.✅
- Include a dark theme toggle using the Ant Design theme. ❌

## Requirements:
- Node.js v16.20.2 or higher
- npm v8.19.4 or higher

## Installation
```bash
npm install
# or
yarn install
# or
pnpm install
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

