# QUANTUM CORE

Sistema web Full-Stack para la gestión de transacciones empresariales, desarrollado como proyecto académico de Fundamentos de Software.

## Descripción

QUANTUM CORE permite registrar, consultar, editar y eliminar transacciones mediante una arquitectura cliente-servidor.

Incluye un panel de estadísticas con:

- Total de transacciones.
- Total de créditos.
- Total de débitos.
- Saldo neto.

El saldo neto se calcula como:

```text
SALDO NETO = CRÉDITOS - DÉBITOS

Tecnologías
Frontend
- React
- Vite
- JavaScript
- CSS
- Fetch API
Backend
- Python
- Flask
- Flask-CORS
- Prisma ORM
- API REST
Base de datos
- MySQL 8
- Docker
Arquitectura
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
MySQL
     │
     ▼
Docker

Funcionalidades
- CRUD completo de transacciones.
- API REST.
- Persistencia con MySQL.
- Estadísticas financieras.
- Cálculo de saldo neto.
- Modales para edición y eliminación.
- Validaciones.
- Mensajes de éxito y error.
- Interfaz responsive.
Ejecución
Backend
cd Proyecto_Completo\BACKEND
.\.venv\Scripts\Activate.ps1
python app.py

Frontend
cd Proyecto_Completo\FRONTEND
npm install
npm run dev

Base de datos
Iniciar MySQL mediante Docker:
docker start empresa

Frontend:
http://localhost:5173

Backend:
http://127.0.0.1:5000

Estado
Proyecto terminado y funcional en entorno local.
Autor
Miguel Arbeláez Vallejo
Ingeniería de Sistemas – CEIPA

Este formato es más apropiado para **GitHub/portafolio**: muestra qué hace, tecnologías, arquitectura, funcionalidades