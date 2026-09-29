from pathlib import Path

readme = r'''# QUANTUM CORE

Sistema web para la gestión de transacciones empresariales, desarrollado con una arquitectura **Frontend + API Backend + Base de Datos MySQL**.

El proyecto permite registrar, consultar, actualizar y eliminar transacciones mediante una interfaz web, utilizando comunicación HTTP/JSON entre React y Flask.

---

## 📌 Descripción

**Quantum Core** es una aplicación orientada a la gestión centralizada de transacciones empresariales.

La solución separa las responsabilidades en tres capas principales:

```text
┌──────────────────────────────┐
│          FRONTEND            │
│       React + Vite           │
│       Tailwind CSS           │
└──────────────┬───────────────┘
               │ HTTP / JSON
               ▼
┌──────────────────────────────┐
│           BACKEND            │
│        Python + Flask        │
│       API REST / JSON        │
└──────────────┬───────────────┘
               │ Prisma
               ▼
┌──────────────────────────────┐
│          DATABASE            │
│       MySQL 8 + Docker       │
└──────────────────────────────┘
```

Esta separación facilita el mantenimiento, las pruebas, la evolución del sistema y una futura integración con otros clientes o servicios.

---

# 🎯 Funcionalidades principales

## Gestión de transacciones

El sistema permite:

- Crear nuevas transacciones.
- Consultar todas las transacciones.
- Consultar una transacción específica.
- Editar transacciones existentes.
- Eliminar transacciones.
- Visualizar las transacciones desde una interfaz web.
- Consumir la información mediante una API HTTP/JSON.
- Persistir la información en MySQL.

### Datos gestionados

Cada transacción maneja información como:

| Campo | Descripción |
|---|---|
| Código | Identificador/código de la transacción |
| Tipo | Tipo de operación, por ejemplo `CREDITO` o `DEBITO` |
| Monto | Valor monetario asociado a la transacción |
| Impacto | Valor numérico asociado al impacto definido por el sistema |

---

# 🧩 Arquitectura del proyecto

Quantum Core utiliza una arquitectura desacoplada:

### Frontend

Responsable de:

- Interfaz de usuario.
- Formularios.
- Visualización de transacciones.
- Acciones de crear, editar y eliminar.
- Consumo de la API mediante `fetch`.
- Comunicación HTTP/JSON con el Backend.

Tecnologías:

- React
- Vite
- Tailwind CSS
- JavaScript

### Backend

Responsable de:

- Exponer la API.
- Recibir solicitudes HTTP.
- Validar y procesar operaciones.
- Ejecutar las operaciones CRUD.
- Comunicarse con la base de datos.
- Devolver respuestas JSON.

Tecnologías:

- Python
- Flask
- Flask-CORS
- Prisma ORM
- Gunicorn para despliegues tipo producción

### Base de datos

Responsable de:

- Persistencia de las transacciones.
- Almacenamiento estructurado.
- Consultas realizadas por el Backend.

Tecnologías:

- MySQL 8
- Docker
- Prisma

---

# 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| Python | Lenguaje principal del Backend |
| Flask | Framework para la API |
| Flask-CORS | Comunicación entre Frontend y Backend |
| Prisma | ORM y acceso a datos |
| MySQL 8 | Base de datos relacional |
| Docker | Ejecución de MySQL |
| React | Construcción de la interfaz |
| Vite | Herramienta de desarrollo y compilación Frontend |
| Tailwind CSS | Estilos de la interfaz |
| JavaScript | Lógica del Frontend |
| Git | Control de versiones |
| GitHub | Repositorio del proyecto |
| Gunicorn | Servidor WSGI para despliegue |

---

# 📁 Estructura del proyecto

```text
QUANTUM-CORE-
└── Proyecto_Completo
    ├── BACKEND
    │   ├── controllers
    │   ├── models
    │   ├── routes
    │   │   └── transaccion_routes.py
    │   ├── .env
    │   ├── .gitignore
    │   ├── app.py
    │   ├── db.py
    │   ├── README.md
    │   ├── requirements.txt
    │   └── schema.prisma
    │
    └── FRONTEND
        ├── node_modules
        ├── public
        ├── src
        │   ├── api
        │   │   └── transacciones.js
        │   ├── pages
        │   ├── App.jsx
        │   ├── index.css
        │   └── main.jsx
        ├── .gitignore
        ├── index.html
        ├── package.json
        ├── package-lock.json
        ├── README.md
        └── vite.config.js
```

> `node_modules`, `.venv`, `.env` y archivos generados localmente no deben versionarse en Git.

---

# 🔄 Flujo de funcionamiento

Cuando un usuario crea una transacción:

```text
1. Usuario diligencia el formulario
              ↓
2. React captura los datos
              ↓
3. Frontend realiza una petición HTTP
              ↓
4. Flask recibe la solicitud
              ↓
5. Controller procesa la operación
              ↓
6. Prisma ejecuta la operación en MySQL
              ↓
7. MySQL almacena la información
              ↓
8. Backend devuelve JSON
              ↓
9. React actualiza la interfaz
```

El mismo principio se utiliza para consultar, editar y eliminar información.

---

# 🔌 API REST

La API principal se encuentra bajo:

```text
/api/transacciones/
```

En desarrollo local:

```text
http://127.0.0.1:5000/api/transacciones/
```

## Obtener todas las transacciones

```http
GET /api/transacciones/
```

## Obtener una transacción

```http
GET /api/transacciones/{id}
```

## Crear una transacción

```http
POST /api/transacciones/
```

Ejemplo conceptual:

```json
{
  "codigo": "T006",
  "tipo": "CREDITO",
  "monto": 75000,
  "impacto": 8
}
```

## Actualizar una transacción

```http
PUT /api/transacciones/{id}
```

## Eliminar una transacción

```http
DELETE /api/transacciones/{id}
```

---

# 🗄️ Base de datos

La aplicación utiliza MySQL 8 ejecutándose mediante Docker.

Configuración local utilizada por el proyecto:

```text
Host: localhost
Puerto: 3307
Base de datos: empresa_db
Usuario: root
```

La conexión se administra mediante la variable:

```env
DATABASE_URL="mysql://root:TU_PASSWORD@localhost:3307/empresa_db"
```

### Importante

El archivo `.env` contiene información sensible y **no debe subirse a GitHub**.

El proyecto utiliza `.gitignore` para excluir:

```text
.env
.venv/
__pycache__/
*.pyc
```

---

# 🐳 Ejecución de MySQL con Docker

Si el contenedor `empresa` ya existe:

```powershell
docker start empresa
```

Comprobar que está ejecutándose:

```powershell
docker ps
```

El contenedor utiliza el puerto:

```text
3307 → 3306
```

Es decir:

```text
Windows:3307
      ↓
Docker MySQL:3306
```

---

# 🚀 Instalación y ejecución local

## Requisitos

Antes de ejecutar el proyecto se recomienda tener instalado:

- Python 3.12 o compatible.
- Node.js y npm.
- Docker Desktop.
- Git.
- MySQL 8 mediante Docker.

---

## 1. Clonar el repositorio

```bash
git clone https://github.com/MiguelArbelaez0/QUANTUM-CORE-.git
```

Entrar al proyecto:

```bash
cd QUANTUM-CORE-
```

---

# 🐍 2. Configurar Backend

Entrar al Backend:

```powershell
cd Proyecto_Completo\BACKEND
```

Crear el entorno virtual si todavía no existe:

```powershell
python -m venv .venv
```

Activarlo:

```powershell
.\.venv\Scripts\Activate.ps1
```

Instalar dependencias:

```powershell
pip install -r requirements.txt
```

---

# 🔐 3. Configurar variables de entorno

Crear un archivo:

```text
.env
```

Dentro:

```env
DATABASE_URL="mysql://root:TU_PASSWORD@localhost:3307/empresa_db"
```

No subir este archivo al repositorio.

---

# 🧬 4. Configurar Prisma

Generar el cliente:

```powershell
prisma generate
```

Sincronizar el esquema con MySQL:

```powershell
prisma db push
```

---

# ▶️ 5. Ejecutar Backend

Con el entorno virtual activo:

```powershell
python app.py
```

La API quedará disponible en:

```text
http://127.0.0.1:5000
```

La ruta principal de transacciones:

```text
http://127.0.0.1:5000/api/transacciones/
```

> La ruta `/` del Backend no tiene una vista definida, por lo que puede devolver `404 Not Found`. Esto no significa que la API esté dañada.

---

# ⚛️ 6. Ejecutar Frontend

Abrir otra terminal.

Entrar al Frontend:

```powershell
cd Proyecto_Completo\FRONTEND
```

Instalar dependencias si es la primera ejecución:

```powershell
npm install
```

Ejecutar Vite:

```powershell
npm run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:5173/
```

---

# 🔗 Configuración de la API en Frontend

El Frontend utiliza una variable de entorno para permitir diferentes ambientes:

```javascript
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/transacciones";
```

Esto permite:

- Desarrollo local → utiliza Flask local.
- Producción → se puede configurar una URL pública de la API.

Ejemplo para desarrollo:

```env
VITE_API_URL=http://localhost:5000/api/transacciones
```

---

# 🧪 Pruebas funcionales

El sistema debe comprobar como mínimo:

### Crear

Registrar una nueva transacción y verificar que aparezca en la tabla.

### Consultar

Com
