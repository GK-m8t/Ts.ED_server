## WAGMI GAMES 3D NFT SERVER API

This application allows you to create and view new orders and associated payment sessions and store them in the connected mongoDB.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Code structure](#Code-Structure)
  - [Controllers](#controllers)
  - [Constants](#Constants)
  - [Utils](#Utils)
  - [Packages](#Packages)
  - [Middleware](#Middleware)
  - [Services](#Services)

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (Version X.X.X)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager

### Installation

#### Define .env
- STRIPE_API_KEY: Visit the [Stripe Documentation](https://stripe.com/docs/keys#create-api-secret-key) and refer to the "Create secret Api key" portion to generate your Stripe API key.
- STRIPE_WEBHOOK_SECRET: Visit the [Stripe Dashboard](https://dashboard.stripe.com/test/webhooks) and go to the "webhook" portion to reveal the particular webhooks signing secret.
- COINBASE_API_KEY: Visit the [Coinbase Documentation](https://docs.cloud.coinbase.com/commerce/docs/creating-api-key) and refer to the "Create a commerce Api key" portion to generate your coinbase API key.
- COINBASE_WEBHOOK_SECRET: Visit the [Coinbase Documentation](https://docs.cloud.coinbase.com/commerce/docs/webhooks-security) and refer to the "Obtain your shared webhook secret" portion to reveal your shared coinbase webhook secret.
- EASYPOST_API_KEY: Visit the [EasyPost Documentation](https://www.easypost.com/getting-started) and refer to the "Manage Api key" portion to generate your EasyPost API key.
- ALCHEMY_API_KEY: Visit the [Alchemy Documentation](https://docs.alchemy.com/reference/api-overview) and refer to the "Dont have an API key?" portion to generate your Alchemy API key.
- DATABASE_URI_DEV: Visit the [MongoDb Documentation](https://www.mongodb.com/docs/manual/reference/connection-string/?utm_source=compass&utm_medium=product#find-your-mongodb-atlas-connection-string) and refer to the "Find your connection string?" portion to reveal the 3DH mongodb URI connection string.

#### Running the application
First, run the development server:

```bash
npm install
npm run start
# or
yarn install
yarn start
```

## Code Structure

### controllers

#### rest
##### OrderController:
- getOrders: Defines a 'get' endpoint at route "/rest/orders" that fetches the details of all the token ids stored in the database
- createOrder: Defines a 'post' endpoint at route "/rest/orders/:tokenId" that stores the given shipping details parameter into the database for that particular token ID
- getOrder: Defines a 'get' endpoint at route "/rest/orders/:tokenId" that fetches the details of a particular token ID stored in the database
- updateOrder: Defines a 'put' endpoint at route "/rest/orders/:tokenId" that updates shipping details for a specific token ID in the database, contingent upon the existence of the token ID in the database.
##### CheckouController:
- createSession: Defines a 'post' endpoint at route "/rest/checkout/:tokenId" that generate the unique payment link for a particular token ID and stores the payment details in the database
- getSession: Defines a 'get' endpoint "/rest/checkout/:tokenId" that fetches the unique payment link for a particular token ID.

#### webhook
##### CardPaymentController:
- handleEvent: Defines a 'post' endpoint at route "/webhook/card" that would update the payment details and status stored in the database based on the event received
##### CryptoPaymentController:
- handleEvent: Defines a 'post' endpoint at route "/webhook/crypto" that would update the payment details and status stored in the database based on the event received

### Constants
- Governance.json defines the printing cost and payment link validity along with the admin paths and associated accounts. Update the admin account with your wallet address to access the admin routes.
- System.json defines the NFT contract address and chain along with its contract ABI.

### Utils


### Packages
- tsed: used for building server-side applications using TypeScript and Express.js
- Easypost: used to verify the authenticity and validity of the inputted shipping address
- Axios: Used to make HTTP requests. 
- Mongoose: Used to connect to 3DH mongodb
- Stripe: Used to provide card checkout for the users
- Coinbase commerce: Used to provide crypto checkout for the users

### Middleware
- AuthenticationMiddleware: used to verify the credential signature passed as a query to the endpoints and manage access rights to admin only functions when applicable
- OwnershipVerificatonMiddleware: used to verify if the requested user is the owner of the particular token ID

### Services
