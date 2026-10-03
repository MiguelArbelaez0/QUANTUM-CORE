# Quantum Core

> Full-Stack transaction management system built with React, Flask, Prisma and MySQL.

Quantum Core is a web application developed as an academic project for managing and analyzing financial transactions through a client-server architecture.

The application provides CRUD operations for transactions, financial statistics, net balance calculation, data validation, and a responsive web interface.

## 📱 Overview

The project demonstrates the integration of a React frontend with a Python Flask REST API, Prisma ORM, and a MySQL database running through Docker.

The main application flow is:

```text
User
  ↓
React + Vite
  ↓
Fetch API
  ↓
Flask REST API
  ↓
Prisma ORM
  ↓
MySQL
```

## 🏗️ Architecture

The project follows a client-server architecture that separates the presentation layer, backend API, and data persistence.

```text
Frontend
React + Vite
     │
     │ HTTP / JSON
     ▼
Backend
Python + Flask
     │
     ▼
Prisma ORM
     │
     ▼
Database
MySQL 8
     │
     ▼
Docker
```

This separation keeps the user interface, API logic, and database access independent and easier to maintain.

## 🚀 Features

- Create financial transactions
- View transaction records
- Update transactions
- Delete transactions
- Calculate total credits
- Calculate total debits
- Calculate net balance
- Display financial statistics
- Input validation
- Success and error feedback
- Responsive web interface
- REST API communication
- Persistent data storage with MySQL

## 💰 Transaction Management

The application provides CRUD operations for managing financial transactions.

The main operations are:

- **Create:** register a new transaction.
- **Read:** retrieve existing transactions.
- **Update:** modify transaction information.
- **Delete:** remove transactions.

The system separates frontend interaction from backend processing through the REST API.

## 📊 Financial Statistics

The application calculates and displays financial information based on the stored transactions.

The main indicators include:

- Total transactions
- Total credits
- Total debits
- Net balance

The net balance is calculated as:

```text
NET BALANCE = CREDITS - DEBITS
```

## 🧩 Technologies

| Technology | Usage |
|---|---|
| React | Frontend framework |
| Vite | Frontend tooling |
| JavaScript | Programming language |
| CSS | Interface styling |
| Fetch API | HTTP communication |
| Python | Backend programming language |
| Flask | REST API framework |
| Flask-CORS | Cross-origin communication |
| Prisma ORM | Database access |
| MySQL 8 | Relational database |
| Docker | Database containerization |

## 🌐 REST API

The Flask backend exposes a REST API used by the React frontend to manage transaction data.

The frontend communicates with the backend using HTTP requests and JSON data.

The API acts as the intermediary between the user interface and the database layer:

```text
React
  │
  │ HTTP / JSON
  ▼
Flask REST API
  │
  ▼
Prisma ORM
  │
  ▼
MySQL
```

## 🗄️ Persistence

Prisma ORM is used as the data access layer between the Flask application and MySQL.

MySQL runs through Docker to provide a reproducible local development environment.

## 🖥️ Interface

The frontend is built with React and Vite and provides:

- Transaction management views
- Financial statistics
- Forms for transaction data
- Edit and delete interactions
- Validation feedback
- Success and error messages
- Responsive layout

## 📂 Project Structure

The repository contains the main project inside the `Proyecto_Completo` directory:

```text
QUANTUM-CORE-FULLSTACK/
│
├── Proyecto_Completo/
│   ├── BACKEND/
│   └── FRONTEND/
│
└── README.md
```

The backend contains the Flask API, Prisma configuration, and database integration, while the frontend contains the React application and user interface.

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/MiguelArbelaez0/QUANTUM-CORE-FULLSTACK.git
cd QUANTUM-CORE-FULLSTACK
```

### 2. Backend

From the backend directory:

```powershell
cd Proyecto_Completo\BACKEND
.\.venv\Scripts\Activate.ps1
python app.py
```

### 3. Frontend

From the frontend directory:

```bash
cd Proyecto_Completo/FRONTEND
npm install
npm run dev
```

### 4. Database

Start the MySQL Docker container used by the project:

```bash
docker start empresa
```

## ▶️ Local Access

### Frontend

```text
http://localhost:5173
```

### Backend

```text
http://127.0.0.1:5000
```

## 🔄 Application Flow

```text
User
  ↓
React Interface
  ↓
Fetch API
  ↓
Flask REST API
  ↓
Prisma ORM
  ↓
MySQL
```

The frontend handles user interaction, the Flask API processes requests, Prisma manages database access, and MySQL provides persistent storage.

## 🎯 What This Project Demonstrates

This project demonstrates practical experience with:

- Full-Stack web development
- React and Vite
- Python and Flask
- REST API development
- Prisma ORM
- MySQL
- Docker
- CRUD operations
- Client-server architecture
- Data validation
- Financial data aggregation
- Responsive web interfaces

## 📌 Project Status

The project is a completed academic development project created to practice Full-Stack web development, REST API design, database integration, and client-server architecture.

## 👨‍💻 Author

**Miguel Arbeláez Vallejo**

Software Developer | Flutter / Dart | Full-Stack Development

- GitHub: https://github.com/MiguelArbelaez0
- LinkedIn: https://www.linkedin.com/in/miguel-arbelaez-v-57719542b/
