# Trabajo Práctico Obligatorio - Frontend
Este repositorio corresponde al **Frontend/Interfaz de Usuario** del TPO de Sistema de Gestión de Turnos.

> **🔗 Arquitectura**: Este proyecto implementa el frontend de un sistema con backend separado. La comunicación se realiza mediante API REST con autenticación basada en sesiones y cookies.
> 
> **🔧 Backend**: El backend/API se encuentra en un repositorio separado: [tp_uade_back_appi](https://github.com/GeorgessDavid/tp_uade_back_appi)

---

## Características Principales

### 🏥 Landing Page Pública
- Presentación del médico, especialidad y formación
- Servicios ofrecidos y datos de contacto
- Sistema de reserva de turnos para pacientes
- Diseño responsivo y profesional

### 📅 Sistema de Reserva de Turnos
- Formulario completo con datos del paciente
- Calendario dinámico de disponibilidad (2 semanas)
- Selección de obra social
- Validación en tiempo real
- Notificaciones por email automáticas

### 🔐 Panel Administrativo
- Login seguro para médicos y secretarias
- Gestión completa de turnos (visualizar, confirmar, cancelar)
- CRUD de obras sociales
- CRUD de pacientes
- Gestión de horarios de atención
- Dashboard con estadísticas

---

## Para Empezar

### Requisitos Previos
* [Node.js](https://nodejs.org/es/download) >= Versión 18 (Recomendado LTS)
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) o [pnpm](https://pnpm.io/installation)
* **Backend funcionando** - Ver [tp_uade_back_appi](https://github.com/GeorgessDavid/tp_uade_back_appi)

### 1. Clonar el Repositorio
```bash
git clone https://github.com/GeorgessDavid/tp_uade_front_appi.git
cd tp_uade_front_appi
```

### 2. Instalar Dependencias
Con **pnpm** (recomendado):
```bash
pnpm install
```
o con **npm**:
```bash
npm install
```

### 3. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:

```bash
# URL de la API Backend
VITE_API_URL="http://localhost:3001"
```

**⚠️ IMPORTANTE**: 
- Asegúrate de que esta URL coincida con la del backend
- El backend debe estar ejecutándose para que el frontend funcione correctamente
- Por defecto, el backend se ejecuta en el puerto 3001

### 4. Inicializar el Proyecto
```bash
pnpm dev 
```
o
```bash
npm run dev
```

### 5. Verificar Instalación
Si todo funciona correctamente, deberías ver un mensaje similar a:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Abre tu navegador en `http://localhost:5173/`

---

## Configuración del Sistema Completo

Para que el sistema funcione completamente, necesitas tener **ambos proyectos** ejecutándose:

### 1️⃣ Configurar y Ejecutar el Backend
```bash
# En un terminal separado
git clone https://github.com/GeorgessDavid/tp_uade_back_appi.git
cd tp_uade_back_appi
pnpm install

# Configurar .env según documentación del backend
# Incluye: Base de datos, CORS, Email, etc.

pnpm dev
```

**📚 Documentación del Backend**: Ver [README del Backend](https://github.com/GeorgessDavid/tp_uade_back_appi/blob/main/README.md)

### 2️⃣ Configurar y Ejecutar el Frontend
```bash
# En otro terminal
cd tp_uade_front_appi
pnpm install

# Crear .env con VITE_API_URL="http://localhost:3001"

pnpm dev
```

### 3️⃣ Verificar Integración
- ✅ Backend ejecutándose en: `http://localhost:3001`
- ✅ Frontend ejecutándose en: `http://localhost:5173`
- ✅ Base de datos MySQL configurada y con datos iniciales
- ✅ Variables de entorno configuradas en ambos proyectos

---

## Tecnologías Utilizadas

### Frontend Stack
- **⚛️ React 18** - Librería de interfaz de usuario
- **⚡ Vite** - Build tool y dev server
- **🎨 Material-UI (MUI)** - Biblioteca de componentes
- **🔄 React Router** - Navegación
- **📡 Axios** - Cliente HTTP para comunicación con API
- **📅 Date-fns** - Manejo de fechas
- **🎯 React Hook Form** - Gestión de formularios
- **🔔 React-Toastify** - Notificaciones

### Características Técnicas
- **TypeScript/JavaScript** para tipado estático
- **Hooks personalizados** para lógica reutilizable
- **Context API** para manejo de estado global
- **Lazy loading** para optimización de rendimiento
- **Rutas protegidas** con autenticación
- **Responsive design** con breakpoints de MUI

---

## Estructura del Proyecto

```
tp_uade_front_appi/
├── public/                 # Archivos estáticos
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── DataBox/       # Cajas de información
│   │   ├── Table/         # Tablas de datos
│   │   ├── Modal/         # Modales y diálogos
│   │   ├── Navbar/        # Barra de navegación
│   │   ├── Sidebar/       # Menú lateral
│   │   └── ...
│   ├── context/           # Contextos de React
│   │   └── AuthContext.jsx
│   ├── hooks/             # Hooks personalizados
│   │   ├── useLogin.js
│   │   ├── useLogout.js
│   │   ├── useTurnos.js
│   │   └── ...
│   ├── lib/               # Utilidades y helpers
│   ├── pages/             # Páginas/Vistas
│   │   ├── Home/          # Landing page
│   │   ├── Login/         # Autenticación
│   │   ├── Dashboard/     # Panel administrativo
│   │   ├── Turnos/        # Gestión de turnos
│   │   └── ...
│   ├── App.jsx            # Componente principal
│   └── main.jsx           # Punto de entrada
├── .env                   # Variables de entorno (crear)
├── vite.config.js         # Configuración de Vite
└── package.json           # Dependencias
```

---

## Uso del Sistema

### 👤 Para Pacientes (Sin Autenticación)

1. **Acceder a la landing page**: `http://localhost:5173/`
2. **Solicitar un turno**:
   - Completar formulario con datos personales
   - Seleccionar fecha y horario disponible
   - Elegir obra social (si aplica)
   - Recibir confirmación por email

### 🔐 Para Médicos/Secretarias (Con Autenticación)

1. **Iniciar sesión**: Click en "Login" o acceder a `/login`
   - Usuario: `masuarez`
   - Contraseña: `masuarez`

2. **Panel Administrativo**: Acceso a:
   - **Dashboard**: Resumen de turnos y estadísticas
   - **Gestión de Turnos**: Visualizar, confirmar, cancelar
   - **Gestión de Pacientes**: CRUD completo
   - **Obras Sociales**: Crear, editar, eliminar
   - **Horarios de Atención**: Configurar disponibilidad

---

## Integración con el Backend

### Comunicación API
El frontend se comunica con el backend mediante:

- **Axios** configurado con baseURL de la API
- **Credentials incluidas** para manejo de cookies de sesión
- **Interceptores** para manejo de errores y tokens
- **CORS** habilitado en el backend para este frontend

### Endpoints Utilizados

**Públicos:**
- `GET /api/obras-sociales` - Listar obras sociales
- `GET /api/horarios-atencion` - Horarios disponibles
- `GET /api/horarios-atencion/:id/slots-disponibles` - Slots libres
- `POST /api/turnos/create` - Crear turno

**Privados (requieren autenticación):**
- `POST /api/users/login` - Iniciar sesión
- `POST /api/users/logout` - Cerrar sesión
- `GET /api/turnos` - Listar turnos
- `PUT /api/turnos/:id` - Actualizar turno
- `GET /api/pacientes` - Listar pacientes
- Y más... Ver [Documentación del Backend](https://github.com/GeorgessDavid/tp_uade_back_appi/blob/main/DOCUMENTATION.md)

### Autenticación
- **Sistema**: Basado en sesiones con cookies
- **Flujo**: Login → Cookie de sesión → Requests autenticados
- **Protección**: Rutas privadas verifican autenticación
- **Persistencia**: Context API mantiene estado del usuario

---

## Troubleshooting

### Problemas Comunes

**❌ Error "Network Error" o "Failed to fetch"**
```
AxiosError: Network Error
```
**Solución:**
- Verifica que el backend esté ejecutándose en `http://localhost:3001`
- Confirma que la variable `VITE_API_URL` en `.env` sea correcta
- Revisa la consola del backend para errores de CORS

**❌ Error CORS**
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solución:**
- En el backend, verifica que `FRONT_END_URL` en `.env` incluya `http://localhost:5173`
- Reinicia el servidor backend después de cambiar `.env`

**❌ Login no funciona / Cookies no se guardan**
**Solución:**
- Verifica que ambos proyectos usen el mismo dominio (localhost)
- Confirma que `credentials: true` esté configurado en Axios
- Verifica la configuración de `DOMAIN` en el backend

**❌ Puerto ocupado**
```
Port 5173 is in use
```
**Solución:**
- Cambia el puerto en `vite.config.js`:
```javascript
export default {
  server: {
    port: 3000 // o cualquier otro puerto libre
  }
}
```

**❌ Dependencias faltantes**
```
Module not found
```
**Solución:**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Inicia servidor de desarrollo

# Producción
pnpm build        # Construye para producción
pnpm preview      # Preview de build de producción

# Linting
pnpm lint         # Ejecuta ESLint
```

---

## Credenciales de Acceso

### Usuario de Prueba (Médico)
- **Usuario**: `masuarez`
- **Contraseña**: `masuarez`
- **Email**: `maralesuarez56@gmail.com`
- **Rol**: Médico

**Nota**: Estas credenciales se crean automáticamente al ejecutar el script de inicialización de la base de datos del backend.

---

## Repositorios del Proyecto

- **📁 Frontend (este repositorio)**: [tp_uade_front_appi](https://github.com/GeorgessDavid/tp_uade_front_appi)
- **📁 Backend/API**: [tp_uade_back_appi](https://github.com/GeorgessDavid/tp_uade_back_appi)

---

## Documentación Adicional

- **📖 Documentación completa del Backend**: [DOCUMENTATION.md](https://github.com/GeorgessDavid/tp_uade_back_appi/blob/main/DOCUMENTATION.md)
- **🗄️ Base de Datos**: Ver diagrama y estructura en la documentación del backend
- **🔌 API Endpoints**: Lista completa en la documentación del backend

---


<details><summary><strong> Enunciado </strong></summary>
### Landing Page
* La página principal debe presentar al médico, su especialidad, formación, servicios ofrecidos y datos de contacto.
* Debe incluir un formulario o enlace que permita reservar una cita.
* Debe incluir un diseño responsivo y profesional acorde a la temática médica.


---
### Reserva de Citas
* El formulario de reserva debe solicitar.
    * Nombre y Apellido
    * Nombre y Apellido del Paciente
    * Teléfono
    * Correo electrónico.
    * Obra Social.
* Debe incluir un calendario que muestre las citas disponibles durante las **dos próximas semanas**.
* Las fechas y horarios disponibles deben actualizarse dinámicamente según la ocupación.
* La obra social debe ser una lista de aquellas con las cuales el médico tiene convenio.

---
### Login para médico o secretaria
* La landing page debe incluir un acceso para el médico o su secretaria mediante usuario y contraseña.
* **No** se implementará registro de usuarios. Las credenciales del administrador.

---
### Gestión de Citas -- Área Administrativa
* Una vez logueados, el médico o su secretaria podrán:
    * Visualizar todas las citas solicitadas.
    * Confirmar una cita cambiando su estado de *"Solicitada"* a *"Confirmada"*.

---
### Administración de Obras Sociales
* El sistema debe permitir al usuario crear, modificar o eliminar obras sociales.
* Estas serán las qeu se muestren en la funcionalidad de concretar cita.

---
### Notificaciones
* Enviar notificación por correo electrónico al paciente cuando crea una nueva cita.
* Enviar notificación por correo electrónico al paciente cuando la cita pase de *"Solicitada"* a *"Confirmada"*.

---
### Seguridad y Privacidad
* Asegurar la protección de los datos de los pacientes y la privacidad de la información.
* Implementar buenas prácticas de seguridad, como el cifrado de contraseñas del administrador.
</details>

#### Integrantes
---

* Ramiro Carranza.
* Luciano Conde.
* Georges David.

---
