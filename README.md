## bookclub

This is a private, invite-only book club to keep track of the books we've read together with features including recommending a book, creating & proposing meetings with agendas.

### Features

- Authentication
  - [x] Login with Google
- Users
  - [x] Change name and email of an account
  - [ ] Access read books, attended sessions
  - [ ] Invite other users to the book club
- [x] Books
  - [x] List books according to recommendation count
  - [x] List books according to recommendation time
  - [x] List books according to page count
- [ ] Book recommendation
  - [x] Recommend a book
  - [x] Comment on a book
  - [ ] List people who recommended
- [ ] Start reading a book together
  - [x] Admins can create a new session
  - [x] Members can attend a session
  - [x] Members can comment on the active session
  - [x] Members can add their page numbers
  - [ ] Members can see other users progress
- [ ] Meetings
  - [ ] Integrate Zoom
  - [ ] Send email notifications to active members
  - [ ] Keep track of attendance (Yes, Maybe, No)
  - [ ] Propose meetings

### Technologies

- Next.js
- Prisma
- TailwindCSS
- Eslint
- pnpm

### Installation

`bookclub` uses pnpm for package dependencies.

```
pnpm install
```

#### Database

`bookclub` uses prisma with planetscale. In order to setup the project initially, follow the [quickstart documentation](https://docs.planetscale.com/tutorials/prisma-quickstart).

- Start PlanetScale connection

```bash
npm run db:dev
```

- If needed, push database changes

```bash
npm run db:push
```

#### Graphql Schemas

`bookclub` uses graphql to communicate.

```bash
npm run generate
```
