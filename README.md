# QUANTUM CORE

## Sistema de Gestión de Transacciones

Quantum Core es una aplicación web Full Stack desarrollada para gestionar transacciones empresariales mediante una arquitectura separada en Frontend, Backend y Base de Datos.

## 🚀 Tecnologías

- React + Vite
- JavaScript
- Tailwind CSS
- Python
- Flask
- Prisma ORM
- MySQL 8
- Docker
- Git y GitHub

## 🏗️ Arquitectura

```text
Frontend
React + Vite
     │
     │ HTTP / JSON
     ▼
Backend
Python + Flask
     │
     │ Prisma
     ▼
Base de Datos
MySQL + Docker
```

## ⚙️ Funcionalidades

El sistema permite realizar operaciones CRUD sobre las transacciones:

- Crear transacciones
- Consultar transacciones
- Editar transacciones
- Eliminar transacciones

Cada transacción maneja información como:

- Código
- Tipo
- Monto
- Impacto

## 📁 Estructura

```text
QUANTUM-CORE-
│
├── README.md
│
└── Proyecto_Completo
    ├── BACKEND
    └── FRONTEND
```

## ▶️ Ejecución

### 1. Iniciar MySQL

```bash
docker start empresa
```

### 2. Ejecutar Backend

```bash
cd Proyecto_Completo/BACKEND
.\.venv\Scripts\Activate.ps1
python app.py
```

Backend:

```text
http://127.0.0.1:5000
```

### 3. Ejecutar Frontend

En otra terminal:

```bash
cd Proyecto_Completo/FRONTEND
npm run dev
```

Frontend:

```text
http://localhost:5173/
```

## 🔌 API

Ruta principal:

```text
/api/transacciones/
```

Operaciones disponibles:

```text
GET     Consultar
POST    Crear
PUT     Actualizar
DELETE  Eliminar
```

## 🔐 Seguridad

Las credenciales de la base de datos se manejan mediante variables de entorno y el archivo `.env` no debe subirse al repositorio.

## 👨‍💻 Autor

**Miguel Arbeláez Vallejo**

Ingeniería de Sistemas

Proyecto académico — **Quantum Core**
