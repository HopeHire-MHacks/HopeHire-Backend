# HopeHire Backend

HopeHire is a job portal that's specifically designed with the health and physical conditions of kidney patients in mind. Our recommendation AI serves potential job opportunities that match their skillset, experience, and their health needs.

This repository contains the backend code for HopeHire. We built this backend using Express, PostgreSQL for the database, and Sequelize as the ORM. The code is organized into modules, making it easy to maintain and add new features.

## Getting Started

**Prerequisites NodeJS LTS v18.14.0**

1. Install nvm on your machine
2. run `nvm install v18.14.0`
3. run `nvm use`
4. Run `npm install` in the working directory to install required packages
5. Reference `.env.example` and create your own `.env` file
6. Run `npm run db:create` to create the database.
7. Run `npm run db:migrate` to migrate models.
8. Run `npm run db:seed` to seed database.
9. Run `npm run dev` to start the development server

## Documentation

- [**Production Link**](https://hopehire-backend.herokuapp.com/)
- [**Entity Relation Diagram**](https://drawsql.app/teams/santosh-2/diagrams/hopehire)

## Contributing

### File Structure and Naming Convention

```
src/
├─ consts/
│  ├─ enviroment.ts
│  ├─ userFriendlyMessages.ts
├─ controllers/
│  ├─ ExampleController.ts
├─ db/
│  ├─ migrations/
│  ├─ seeders/
│  ├─ index.ts
├─ middlewares/
├─ models/
│  ├─ Example.ts
│  ├─ index.ts
├─ repositories/
│  ├─ BaseRepository.ts
├─ routes/
│  ├─ ExampleRoutes.ts
├─ services/
│  ├─ ExampleService.ts
├─ types/
│  ├─ index.ts
├─ utils/
│  ├─ container.ts
│  ├─ dbUtils.ts
├─ app.ts
├─ server.ts
```

### Commit Message Convention

- Use [Gitmoji](https://gitmoji.dev/) to add emojis to your commit messages
- Use the following format for your commit messages
  - :sparkles: `feat: add new feature`
  - :bug: `fix: fix a bug`
  - :recycle: `refactor: refactor code`
  - :art: `style: change styling`
  - :fire: `chore: remove unused code`
  - :memo: `docs: update documentation`
  - :package: `package: update package`
  - :rocket: `deploy: deploy to production`
  - :wastebasket: `waste: remove unused code`
