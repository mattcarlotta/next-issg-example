# Incremental Static Site Generation Example

An example of how to intregate iSSG with an API.

This project was bootstrapped from
<a href="https://github.com/mattcarlotta/nextjs-ssr-kit"><img src="https://i.imgur.com/xd1mL6K.png"></img></a>

| `yarn <command>` | Description                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| `analyze`        | Compiles `src` app and spawns webpack chunk distribution charts for production.                  |
| `build`          | Compiles `src` app to `.next/static` and `api` to `dist` for production.                         |
| `build:staging`  | Compiles `src` app to `.next/static` and `api` to `dist` for staging.                            |
| `dev`            | Starts development servers (`localhost:3000` for app and `localhost:5000` for api).              |
| `lint`           | Lints all `.ts`/`.tsx` files in `src`.                                                           |
| `lint:api`       | Lints all `.ts` files in `api`.                                                                  |
| `start`          | Starts production servers (must run `build` first).                                              |
| `start:staging`  | Starts staging servers (must run `build:staging` first).                                         |
| `test`           | Runs `.test.tsx` files in `src` once.                                                            |
| `test:cov`       | Runs `.test.tsx` files in `src` with code coverage.                                              |
| `test:e2e`       | Runs cypress `.spec.js` files in `e2e` in a browser (run `build:staging`/`start:staging` first). |
| `test:e2erun`    | Runs cypress `.spec.js` files in `e2e` headlessly.                                               |
| `test:watch`     | Runs and watches `.tsx` files in `src` that have changed since last commit.                      |
| `test:watchall`  | Runs and watches all `.test.jsx` files in `src`.                                                 |
