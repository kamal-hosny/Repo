# Task Flow: Student Management System

"Task Flow" is a SaaS platform designed to support students, schools, and universities in managing academic activities. The system allows institutions to manage courses, schedules, assignments, and student performance in one place. Students can access their materials, submit assignments, view grades, and communicate with instructors. Schools and universities can track academic progress, automate administrative tasks, and enhance collaboration between students and staff. The goal is to streamline educational management and improve the overall learning experience.

## Project Structure

- **Client**: React/TypeScript frontend with Redux for state management and Tailwind CSS for styling
- **Server**: Express.js backend with MongoDB database
- **Data**: Python scripts and prompts for database generation

## Setup
<<<<<<< HEAD

### Clone repo

=======
### Clone
>>>>>>> 0fcf01fc6495593bc42e68cf5be3e1cc52eb8acc
```bash
  git clone https://github.com/AhmedIssawy/Repo.git
  cd model
```

### install dependencies

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

Create a .env file in the /server directory:
.env:
JWT_SECRET = your_jwt_secret
NODE_ENV = development
MONGO_URI = your_mongodb_URL
PORT = your_port
CLIENT_URL = your_client_URL

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

### Tools

- Concurrently for running multiple services
