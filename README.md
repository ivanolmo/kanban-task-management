# Kanban Task Manager featuring the T3-Stack (under active development)

This is a full stack web app where a user can sign in and create Kanban boards to assist with project management, team communication, or just a beefed up todos list.

This is built with the [T3-Stack](https://init.tips/). The base is React with Next.js, and T3 refers to TypeScript, tRPC, and Tailwind. The stack was popularized by [Theo](https://twitter.com/t3dotgg). Watch [his intro video](https://www.youtube.com/watch?v=PbjHxIuHduU) to get a little starter info, or check out the [GitHub repo](https://github.com/t3-oss/create-t3-app)!

The live site is hosted with Vercel: https://nextjs-kanban.vercel.app (disclaimer, this is under development and that may not always work as expected 🤓)

## How it's made

**Tech used:**

- React with Next.js
- [NextAuth](https://next-auth.js.org/getting-started/introduction)
- [TypeScript](https://www.typescriptlang.org/docs/handbook/react.html)
- [tRPC](https://trpc.io)
- [Prisma](https://prisma.io)
- PostgreSQL via [Supabase](https://supabase.com)
- [Zustand](https://github.com/pmndrs/zustand) for state management
- Tailwind CSS

### React with Next.js

React and Next.js make a great combo for full-stack apps. Building this app has been a great experience so far. This is planned to be a single page app with a view that updates as it's used. It's currently using 2 API endpoints. One endpoint handles NextAuth, and the other handles the tRPC type-safe routes. Data is fetched using [React Query](https://react-query-v3.tanstack.com/), and will update in real-time as data changes are made by the user.

### NextAuth

I used Firebase Auth as my authentication handler in my last app. It's still an easy to use solution, but I like the ease of NextAuth a bit better, especially because it's built for Next.js. It has a ton of auth provider options to pick from, and you can implement as few or as many as you'd like. You can also keep it simple with just [email/passwordless auth](https://next-auth.js.org/providers/email). I'm using database sessions, but JWTs are also an option. I found out that if you're going to use database sessions, your Prisma models have to be **EXACT**. I spent a bit of time troubleshooting auth issues.

### TypeScript and tRPC

My TypeScript experience has been fun so far. I absolutely see the benefits, and I've already realized thems while developing this app. It's pretty cool to define a type in your API and get highlighting in your front end code if your data fetch isn't using the right params, for example. There's plenty more to it, and I don't see myself using just JavaScript for my own personal projects.

tRPC (TypeScript remote procedure call) makes it easy to share types across your app, and gives you type-safety and auto-completion in your client side code. It works great with Next.js because your server and client code is all part of the same code base.

### Prisma and PostgreSQL

Prisma is a fully type-safe API used to query a database. It can be used with both SQL and NoSQL databases, and in this project I'm using it with a PostgreSQL database on [Supabase](https://supabase.com). I decided what I wanted my data model to look like and created a `prisma.schema` file, and Prisma took care of creating all the tables and relations. It's an ORM, so it also takes care of the SQL queries (you don't have to write them out manually!). Setting up the database on Supabase was a breeze, and I had no issues getting my app connected.

### Zustand

Zustand is a lightweight state manager. I could've used `React Context` here, but I wanted to try using Zustand in a project, and it was very easy to implement. The boilerplate code to get context set up is gone, and it's as easy as defining a store with default values and functions to manipulate those values, and then accessing those in your components with the `useStore()` hook. In addition, the app doesn't have to be wrapped in a context provider.

### Tailwind

Yet another project using Tailwind, yet another check in the **LOVE** column. I get it, the class names can get to be a bit much, but the beauty about it is that after using Tailwind a few times, you just _get_ it. If you want to clean up your code visually, there are packages and extensions to help with that. I like not having to flip back and forth between CSS and component files, and there's almost nothing you can do in CSS that can't also be done with Tailwind.

## Optimizations

I'm still building the app, so I'm optimizing as I go. I'd throw Zustand into the optimization category, though. Previously, a bunch of components had state that was then prop-drilled 3-4 children deep. I'm the only dev working on this, so while technically fine, there were times where I just sat and gave my screen a blank stare. Now I just initialize `useStore()` in a component that needs state, and... done!

Soon I'll take a look at data fetching and cache invalidation, although `React Query` makes it pretty easy out of the box.

## Things I'm Learning

TypeScript, definitely. I pick up new things pretty quickly, and TypeScript is no exception, but I'm still learning the nuances of using it with React, and I'm absolutely going to keep using it in future projects 😎

## Shoutouts

I'm a fan of [Theo](https://twitter.com/t3dotgg) and watch [his content](https://www.youtube.com/c/theobrowne1017) regularly. He's got some great videos building full-stack apps using the T3-Stack, and I decided to start using TypeScript and build this app with T3 because of those videos!
