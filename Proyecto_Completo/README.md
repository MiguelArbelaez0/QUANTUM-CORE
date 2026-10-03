# QUANTUM CORE

Sistema web Full-Stack para la gestión y análisis de transacciones empresariales, desarrollado como proyecto académico de Fundamentos de Software.

## Descripción

QUANTUM CORE es una aplicación web cliente-servidor que permite gestionar transacciones mediante operaciones CRUD y visualizar estadísticas financieras.

El sistema permite:

- Registrar transacciones.
- Consultar transacciones.
- Editar transacciones.
- Eliminar transacciones.
- Consultar estadísticas financieras.
- Calcular el saldo neto.

El saldo neto se calcula mediante:

```text
SALDO NETO = CRÉDITOS - DÉBITOS
```

## Tecnologías

### Frontend

- React
- Vite
- JavaScript
- CSS
- Fetch API

### Backend

- Python
- Flask
- Flask-CORS
- Prisma ORM
- REST API

### Base de datos

- MySQL 8
- Docker

## Arquitectura

El proyecto utiliza una arquitectura cliente-servidor en la que el frontend se comunica con una API REST desarrollada en Flask.

```text
React + Vite
      │
      │ HTTP / JSON
      ▼
Python + Flask
      │
      ▼
Prisma ORM
      │
      ▼
MySQL 8
      │
      ▼
Docker
```

## Funcionalidades

### Gestión de transacciones

El sistema implementa operaciones CRUD para administrar las transacciones:

- Crear transacciones.
- Consultar transacciones.
- Actualizar transacciones.
- Eliminar transacciones.

### Estadísticas financieras

El panel de estadísticas permite visualizar:

- Total de transacciones.
- Total de créditos.
- Total de débitos.
- Saldo neto.

### Interfaz

La aplicación incluye:

- Interfaz responsive.
- Modales para edición y eliminación.
- Validaciones de datos.
- Mensajes de éxito.
- Mensajes de error.

## API REST

El frontend consume el backend mediante solicitudes HTTP utilizando JSON.

La API desarrollada con Flask actúa como capa de comunicación entre la interfaz React y la base de datos MySQL.

```text
Frontend
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

## Persistencia

Prisma ORM se utiliza como capa de acceso a datos entre la API Flask y MySQL.

La base de datos se ejecuta mediante Docker, permitiendo disponer de un entorno de desarrollo reproducible.

## Ejecución

### Backend

Desde la carpeta del backend:

```powershell
cd Proyecto_Completo\BACKEND
.\.venv\Scripts\Activate.ps1
python app.py
```

### Frontend

Desde la carpeta del frontend:

```bash
cd Proyecto_Completo\FRONTEND
npm install
npm run dev
```

### Base de datos

Iniciar el contenedor MySQL mediante Docker:

```bash
docker start empresa
```

## Acceso local

### Frontend

```text
http://localhost:5173
```

### Backend

```text
http://127.0.0.1:5000
```

## Flujo de la aplicación

```text
Usuario
   │
   ▼
Interfaz React
   │
   ▼
Fetch API
   │
   ▼
Flask REST API
   │
   ▼
Prisma ORM
   │
   ▼
MySQL
```

## Estado del proyecto

Proyecto académico terminado y funcional en entorno local.

## Autor

**Miguel Arbeláez Vallejo**

Ingeniería de Sistemas — Fundación Universitaria CEIPA
