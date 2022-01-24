# Tasks-API

This is basic Graphql + Vue App

## Dependencies

To run this project, you need

- An LTS version of NodeJS (16)
- Postgres Database server (>=12)

## Tech Stack

This project uses some libraries to achieve it's objective
| Domain | Tool/Library |
| ----------- | ----------- |
| Framework (API) | Apollo Server |
| Framework (Frontend) | Vue 3 |
| Styling | Tailwind |
| ORM | Prisma |

## Available Scripts

In the top level directory you can run the following

### `npm dev`

Runs the app in the development mode.\
Open [http://localhost:<PORT=9000>](http://localhost:9000) to view it in the browser.

### `npm run test:unit`

Run units tests

### `npm run migrate`

Run migrations

### `npm run migrate:rollback`

Rollback migrations

### `npm run seed`

Seed the database with test data

### `npm run serve`

Builds the app for production to the `dist` folder.\
Your app is ready to be deployed!

## Running the App

To run the app, with dependencies (NodeJS, Postgres) installed and running

### In development

- Configure your environment in the `.env` file
- Install npm dependencies `npm install`
- Run migrations `npm run migrate`
- Run seeders `npm run migrate` (OPTIONAL)
- Run the app in dev mode with `npm run dev`

### In Production

- Configure your environment in the `.env` file
- Install npm dependencies `npm install`
- Run migrations `npm run migrate`
- Run migrations `npm run migrate`
- Run the app in production mode with `npm run serve`
