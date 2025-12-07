# 🚗 Vehicle Rental System

Express server for a vehicle rental service- built using a modular architecture.

- **Vercel Project Name**: modular-vehicle-rental

## 💻 Project Overview

A backend API for a vehicle rental management system role-based functionalities for the following entities:

- **Vehicles** - Management of vehicles in the system.
- **Customers** - Customer account management
- **Bookings** - Handle bookings of vehicles with auto vehicle availability updating feature.
- **Authentication** - Secure role-based authentication and authorization for Customer and Admin.

## 🛠️ Technology Stack

[![Tech](https://skillicons.dev/icons?i=nodejs,ts,express,postgres)](https://skillicons.dev)

- **Node.js** + **TypeScript**
- **Express.js** (web framework)
- **PostgreSQL** (database)
- **bcrypt** (password hashing)
- **jsonwebtoken** (JWT authentication)

## ✅ Getting Started

Follow these steps to set up and run the backend server on your local machine.

Clone the repository and navigate to the cloned repo.

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a .env file in the root of your project and add the necessary environment variables.

```env
PORT=5000
CONNECTION_STR=postgresql://neondb_owner:npg_Ljt6n3fGYCpa@ep-dawn-resonance-a406nn64-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
JWT_SECRET='KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30'
```

#### Run the Server

After configuring the environment variables, run this command to start the project.

```bash
npm run dev
```

### [Vercel Live Server (BaseURL)](https://modular-vehicle-rental.vercel.app/)
