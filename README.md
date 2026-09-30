# QUANTUM CORE

Sistema web Full-Stack para la gestión de transacciones empresariales, desarrollado como proyecto académico de Fundamentos de Software.

## Descripción

QUANTUM CORE es una aplicación web que permite registrar, consultar, actualizar y eliminar transacciones empresariales mediante una arquitectura cliente-servidor.

El proyecto integra un frontend desarrollado con React y Vite, un backend desarrollado con Python y Flask, una API REST para la comunicación entre ambos componentes y una base de datos MySQL administrada mediante Prisma y ejecutada localmente con Docker.

## Tecnologías utilizadas

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
- API REST

### Base de datos

- MySQL 8
- Docker

## Arquitectura

```text
QUANTUM CORE
│
├── FRONTEND
│   ├── React
│   ├── Vite
│   └── CSS
│
└── BACKEND
    ├── Python
    ├── Flask
    ├── Prisma
    └── MySQL
         │
         └── Docker