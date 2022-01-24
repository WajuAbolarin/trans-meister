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

### `npm start:api`

Start the Graphql API

### `npm run start:app`

Run the view app

### `npm run start`

Start both

### `npm run deps`

Install all dependencies

### `npm run migrate`

Run migrations and seed

## Running the App

To run the app, with dependencies (NodeJS, Postgres) installed and running

### In development

- Configure your environment in the `.env` file
- Install npm dependencies `npm install`
- Run migrations `npm run migrate`
- Run the app API
- Run the App
