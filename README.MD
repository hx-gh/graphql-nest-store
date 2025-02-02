<div align="center">
    <h1>GraphQL + Nest.Js API</h1>
</div>
<div align="center">    
    <img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
    <img src="https://img.shields.io/badge/Apollo%20GraphQL-E0234E?&style=for-the-badge&logo=Apollo%20GraphQL&logoColor=white">
    <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white">
    <img src="https://img.shields.io/badge/typeorm-E0234E?style=for-the-badge&logo=typeorm&logoColor=white">
    <img src="https://img.shields.io/badge/Jest-E0234E?style=for-the-badge&logo=jest&logoColor=white">
</div>
<div align="center">
  <sub>Built with ❤︎</br>
  </sub>
</div>
<br/>

# 🚀 Technologies

This project was developed using the following technologies:

- [NestJS](https://nestjs.com/): A progressive Node.js framework for building efficient and scalable server-side applications.
- [GraphQL](https://graphql.org/): A query language for APIs and a runtime for executing those queries by using a type system you define for your data.
- [Apollo Server](https://www.apollographql.com/): A robust GraphQL server for handling queries and mutations efficiently.
- [TypeORM](https://typeorm.io/): A powerful ORM (Object-Relational Mapper) for TypeScript and JavaScript.
- [Docker](https://www.docker.com/): A platform to develop, ship, and run applications inside containers.
- [Jest](https://jestjs.io/): A JavaScript testing framework with a focus on simplicity and performance.

# 📖 Description

This project is a GraphQL API built with NestJS and TypeORM. It provides authentication, user management, product management, and order processing functionalities. The application follows a modular architecture and enforces security with JWT authentication and role-based access control.

# 🌟 Features

## ✅ User Module

Handles user accounts and addresses.

- `me`: Retrieves the authenticated user information.
- `findByEmail`: Fetches a user by email.
- `createAddress`: Creates a new user address.
- `updateUserAddress`: Updates an existing user address.
- `listUserAddress`: Lists all addresses of a user.

## 🔐 Authentication & Security Module

Implements security features with JWT authentication.

- `signUp`: Creates a new user account.
- `signIn`: Authenticates a user and issues a JWT token.
- **Role-Based Security**: The application implements security based on roles (`ADMIN` and `USER`). The first user created will be automatically elevated to `ADMIN`.
- **Password Hashing**: User passwords are securely stored using `argon2`, ensuring better protection against brute-force attacks.
- **JWT-Based Authentication**: The entire authentication system relies on JSON Web Tokens (JWT) to manage sessions securely.

## 🛒 Product Module

Handles product management.

- `listProductBySKU`: Retrieves a product by its SKU.
- `listAllProducts`: Lists all available products.
- `createProduct`: Creates a new product entry.
- `updateProduct`: Updates product details.

## 📦 Order Module

Manages orders and transactions.

- `listUserOrders`: Lists all orders placed by a user.
- `createOrder`: Creates a new order.
  - Receives an address and a list of products.
  - Automatically calculates the total value of the purchase.
  - Verifies if the requested products are in stock before completing the order.

## 🏗️ Database Entities

Defines the database schema and relationships.

- **Order**: Represents a customer order.
- **Product**: Stores product details.
- **OrderProduct**: Represents a many-to-many relationship between orders and products.
- **User**: Stores user information.
- **UserAddress**: Stores addresses related to a user.

## 🧪 Testing

This project includes **10 end-to-end (E2E) tests** to ensure functionality and reliability.

- `signUp`
- `signIn`
- `me`
- `createUserAddress`
- `listUserAddress`
- `createProduct`
- `listAllProducts`
- `updateProduct`
- `createOrder`
- `listUserOrders`

# 🏗️ How to Run

```bash
# Clone the repository
$ git clone https://github.com/hx-gh/graphql-nest-store.git
```

### 💻 Running the Application in Development Mode

```bash
# Navigate to the project directory
$ cd graphql-nest-store

# Build and start the Docker container in development mode
$ npm run docker:build:dev
```

### 🧪 Running the Application in Test Mode

```bash
# Navigate to the project directory
$ cd graphql-nest-store

# Build and start the Docker container in test mode
$ npm run docker:build:test
```

# 🎮 Accessing Apollo GraphQL Playground

Once the application is running, you can access the **Apollo GraphQL Playground** at:

[http://localhost:3000/graphql](http://localhost:3000/graphql)

This interface allows you to interact with the GraphQL API, run queries, and test mutations easily.

# 📜 License

Released in 2024.

If you found this project useful, consider giving it a ⭐️!


