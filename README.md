# Gestor de Reservas Académicas

## Descripción

Gestor de Reservas Académicas es una aplicación web desarrollada como proyecto formativo del SENA, cuyo propósito es administrar salas académicas y gestionar reservas mediante una arquitectura cliente-servidor.

El sistema permite gestionar usuarios, salas y reservas académicas mediante un Front-End desarrollado con React y un Back-End desarrollado con Spring Boot, comunicándose mediante servicios REST y utilizando una base de datos MySQL.

Además, el sistema incorpora autenticación mediante JWT (JSON Web Token) y protección de los endpoints que requieren autenticación.

---

## Tecnologías utilizadas

### Front-End

- React
- Vite
- JavaScript (ES6)
- CSS3
- React Router DOM
- React Icons
- SweetAlert2

### Back-End

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- Spring Security
- JWT (JSON Web Token)
- Maven

### Base de datos

- MySQL

### Control de versiones

- Git
- GitHub

### Herramientas de pruebas

- PowerShell
- Git Bash
- Terminal integrada de Visual Studio Code

---

## Funcionalidades

### Gestión de Usuarios

- Registrar usuarios.
- Consultar usuarios.
- Consultar usuarios por ID.
- Actualizar usuarios.
- Eliminar usuarios.
- Validar correo electrónico.
- Validar campos obligatorios.
- Gestionar roles de usuario.

### Autenticación y Seguridad

- Inicio de sesión mediante correo y contraseña.
- Generación de token JWT.
- Validación del token JWT.
- Protección de endpoints.
- Manejo de solicitudes autenticadas mediante Bearer Token.
- Configuración CORS para la comunicación entre Front-End y Back-End.
- Rechazo de solicitudes no autenticadas.

### Gestión de Salas

- Registrar salas.
- Consultar salas.
- Actualizar salas.
- Eliminar salas.
- Buscar salas.

### Gestión de Reservas

- Registrar reservas.
- Consultar reservas.
- Actualizar reservas.
- Eliminar reservas.
- Buscar reservas.

---

## Arquitectura del proyecto

El sistema utiliza una arquitectura cliente-servidor:

```text
                 GESTOR DE RESERVAS ACADÉMICAS

                         ┌─────────────┐
                         │   React     │
                         │  Front-End  │
                         │  :5173      │
                         └──────┬──────┘
                                │
                         HTTP / JSON
                                │
                                ▼
                         ┌─────────────┐
                         │ Spring Boot │
                         │  Back-End   │
                         │    :8080    │
                         └──────┬──────┘
                                │
                         Spring Data JPA
                                │
                                ▼
                         ┌─────────────┐
                         │    MySQL    │
                         │  Base datos │
                         └─────────────┘

## Estructura del proyecto

```
GestorReservasAcademicas
│
├── gestor-reservas-academicas-back
│   │
│   ├── src
│   │   └── main
│   │       └── java
│   │           └── com
│   │               └── servigestor360
│   │                   ├── controller
│   │                   ├── entity
│   │                   ├── repository
│   │                   ├── service
│   │                   └── security
│   │
│   ├── pom.xml
│   ├── pruebas-api.ps1
│   └── ...
│
└── gestor-reservas-academicas-front
    │
    ├── src
    │   ├── components
    │   ├── pages
    │   └── services
    │
    ├── package.json
    └── ...

---

Back-End

El Back-End fue desarrollado utilizando Spring Boot y proporciona servicios REST para la comunicación con el Front-End.

El servidor se ejecuta en:

http://localhost:8080
Principales componentes
Controller

Contiene los controladores REST encargados de recibir las solicitudes HTTP.

Entre ellos se encuentra:

UsuarioController.java
Entity

Contiene las entidades que representan los datos almacenados en la base de datos.

Entre ellas:

Usuario.java
Repository

Contiene las interfaces utilizadas para acceder a la información almacenada en MySQL mediante Spring Data JPA.

Ejemplo:

UsuarioRepository.java
Service

Contiene la lógica relacionada con las operaciones de los usuarios.

Ejemplo:

UsuarioService.java
Security

Contiene los componentes relacionados con la autenticación y protección de los servicios.

SecurityConfig.java
JwtService.java
JwtAuthenticationFilter.java
Autenticación mediante JWT

El sistema utiliza JSON Web Token (JWT) para autenticar a los usuarios y proteger los servicios que requieren autorización.

Login

Endpoint:

POST /api/auth/login

Ejemplo de solicitud:

{
    "correo": "duvan@gmail.com",
    "password": "123456"
}

Cuando las credenciales son correctas, el servidor genera un token JWT.

El token posteriormente se utiliza para acceder a los endpoints protegidos.

El encabezado utilizado es:

Authorization: Bearer <token>
Protección de endpoints

El endpoint de autenticación es público:

/api/auth/login

Los demás endpoints requieren un token JWT válido.

Cuando se realiza una solicitud sin autenticación, el servidor rechaza el acceso.

Durante las pruebas se verificó el comportamiento:

Sin JWT
   ↓
401 Unauthorized

Mientras que:

JWT válido
   ↓
Acceso permitido
API de Usuarios
Obtener todos los usuarios
GET /api/usuarios

Permite consultar todos los usuarios registrados.

Requiere autenticación mediante JWT.

Obtener usuario por ID
GET /api/usuarios/{id}

Permite consultar un usuario específico mediante su identificador.

Requiere autenticación mediante JWT.

Crear usuario
POST /api/usuarios

Ejemplo:

{
    "nombre": "Usuario Ejemplo",
    "correo": "usuario@gmail.com",
    "password": "123456",
    "rol": "USUARIO"
}

Requiere autenticación mediante JWT.

Actualizar usuario
PUT /api/usuarios/{id}

Permite actualizar los datos de un usuario existente.

Requiere autenticación mediante JWT.

Eliminar usuario
DELETE /api/usuarios/{id}

Permite eliminar un usuario existente.

Requiere autenticación mediante JWT.

Front-End

El Front-End fue desarrollado utilizando React y Vite.

El servidor de desarrollo utiliza:

http://localhost:5173
Principales páginas
/
 
/login

/usuarios

/salas

/reservas
Gestión de usuarios

---

El módulo de usuarios incluye:

Página de usuarios.
Formulario de registro.
Tabla de usuarios.
Consumo de servicios REST.
Inicio de sesión.
Almacenamiento del token JWT.
Envío del token en las solicitudes protegidas.
Servicios del Front-End
Servicio de usuarios

Archivo:

src/services/usuarioService.js

Este servicio permite:

Obtener todos los usuarios.
Obtener usuarios por ID.
Registrar usuarios.
Actualizar usuarios.
Eliminar usuarios.

Las solicitudes protegidas incluyen el token JWT almacenado en el navegador.

---

Servicio de autenticación

Archivo:

src/services/loginService.js

Este servicio realiza la solicitud de inicio de sesión al endpoint:

POST /api/auth/login

Cuando el inicio de sesión es exitoso, el token JWT recibido se almacena en localStorage.

Comunicación entre Front-End y Back-End

La comunicación entre React y Spring Boot se realiza mediante solicitudes HTTP utilizando JSON.

---

React
  │
  │ HTTP / JSON
  ▼
Spring Boot
  │
  │ JPA
  ▼
MySQL

---

Se configuró CORS para permitir la comunicación entre:

http://localhost:5173

y:

http://localhost:8080
Base de datos

---

El proyecto utiliza MySQL como sistema de gestión de base de datos.

Entre las tablas utilizadas por el sistema se encuentra:

usuario

Los registros pueden verificarse mediante una consulta SQL:

SELECT * FROM usuario;
Pruebas de la API

Las pruebas de los servicios REST fueron realizadas mediante PowerShell desde la terminal integrada de Visual Studio Code.

No fue necesario utilizar Postman.

---

Se verificaron las siguientes operaciones:

Prueba	Resultado
Login correcto	APROBADA
Login incorrecto	APROBADA
Generación de JWT	APROBADA
Protección mediante JWT	APROBADA
GET usuarios	APROBADA
GET usuario por ID	APROBADA
POST usuario	APROBADA
PUT usuario	APROBADA
DELETE usuario	APROBADA
Verificación en MySQL	APROBADA
Integración React + Spring Boot	APROBADA
Archivo de pruebas

---

El proyecto contiene el archivo:

pruebas-api.ps1

Este archivo contiene las principales pruebas de la API realizadas mediante PowerShell.

---

Entre las pruebas incluidas se encuentran:

Login correcto.
Obtención del token JWT.
Consulta de usuarios.
Consulta de usuario por ID.
Creación de usuario.
Actualización de usuario.
Eliminación de usuario.
Login incorrecto.

---

## Ejecución del proyecto

### Back-End

1. Abrir la carpeta:

```
gestor-reservas-academicas-back
```

2. Ejecutar la aplicación Spring Boot.

El servidor iniciará en:

```
http://localhost:8080
```

---

### Front-End

1. Abrir la carpeta:

```
gestor-reservas-academicas-front
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar el proyecto:

```bash
npm run dev
```

El Front-End iniciará en:

```
http://localhost:5173
```

---

Pruebas mediante PowerShell

Ejemplo de inicio de sesión:

$login = '{"correo":"duvan@gmail.com","password":"123456"}'

$respuestaLogin = Invoke-RestMethod `
    -Uri "http://localhost:8080/api/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body $login

$token = $respuestaLogin.token

$headers = @{
    Authorization = "Bearer $token"
}

---

Ejemplo de consulta de usuarios:

Invoke-RestMethod `
    -Uri "http://localhost:8080/api/usuarios" `
    -Method GET `
    -Headers $headers

---

Evidencias

Se realizaron evidencias de las principales pruebas del sistema.

Las evidencias incluyen:

Login correcto.
Login incorrecto.
Consulta de usuarios.
Consulta de usuario por ID.
Registro de usuario.
Actualización de usuario.
Eliminación de usuario.
Verificación de registros en MySQL.

---

También se realizó un video demostrativo del funcionamiento del sistema.

---

Resultados

Las pruebas realizadas permitieron comprobar el correcto funcionamiento de la autenticación, los servicios REST y las operaciones CRUD de usuarios.

---

También se comprobó:

Generación de JWT.
Validación de JWT.
Protección de endpoints.
Configuración CORS.
Comunicación entre React y Spring Boot.
Persistencia de información en MySQL.
Registro de usuarios.
Consulta de usuarios.
Actualización de usuarios.
Eliminación de usuarios.
Integración del Front-End con el Back-End.
Estado del proyecto

---

Actualmente el proyecto cuenta con:

Gestión de usuarios.
Gestión de salas.
Gestión de reservas.
API REST.
Autenticación mediante JWT.
Protección de endpoints.
Configuración CORS.
Front-End desarrollado con React.
Back-End desarrollado con Spring Boot.
Persistencia mediante MySQL.
Pruebas de API mediante PowerShell.
Evidencias de funcionamiento.
Video demostrativo.
Documentación del proyecto.

---

## Repositorio

GitHub:

https://github.com/DuvanFJ/Gestor-Reservas-Acad-micas

---

## Autor

**Duvan FJ**

Análisis y Desarrollo de Software

Servicio Nacional de Aprendizaje – SENA