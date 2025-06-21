# Task Flow: Management System

"Task Flow" is a SaaS platform designed to support students, schools, institutes, and universities in managing academic activities. The system allows institutions to manage courses, schedules, assignments, and student performance in one place. Students can access their materials, submit assignments, view grades, and communicate with instructors. Schools and universities can track academic progress, automate administrative tasks, and enhance collaboration between students and staff. The goal is to streamline educational management and improve the overall learning experience.

## Project Structure

- **Client**: React/TypeScript frontend with Redux for state management and Tailwind for styling
- **Server**: Express.js backend with MongoDB database
- **Data**: Python scripts and prompts for database generation

## Setup

### Clone repo

```bash
  git clone https://github.com/AhmedIssawy/Repo.git
  cd model
```

### Install dependencies

```bash
  npm i
  cd server
  npm i
  cd ../client
  npm i
  cd ..
  npm run dev
```

### Configure environment variables

Create an `.env` file in the `/server` directory:

```
JWT_SECRET = your_jwt_secret
NODE_ENV = development
MONGO_URI = your_mongodb_URI
JWT_EXPIRES_IN = your_expiration_days
PORT = your_port
CLIENT_URL = your_client_URL
```

Create an `.env` file in the `/client` directory: 

```
VITE_API_URL = your_api_URL
```

## Features

- Course and schedule management
- Assignment submission and grading
- Student performance tracking
- User authentication and authorization
- University and course data management
- Communication between students and instructors
- Administrative task automation
- Responsive UI with modern design components

## Technologies Used

### Frontend

- React
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express
- MongoDB
- JWT Authentication
- Concurrently



