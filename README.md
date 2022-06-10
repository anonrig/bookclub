## bookclub

This is a private, invite-only book club to keep track of the books we've read together with features including recommending a book, creating & proposing meetings with agendas.

### Features

- [ ] Login with Google
- [ ] Start reading a book together
  - [ ] Members can add their page numbers
- [ ] Recommend new books
  - [ ] Rate the recommended books
- [ ] Create meetings
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
