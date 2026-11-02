# Sistema de Gestión de Recursos Humanos · Base de datos (Cloud Firestore)

Este proyecto implementa la base de datos y los usuarios del sistema de gestión de RR.HH. de TECHFORB sobre **Cloud Firestore** y **Firebase Auth**. Incluye colecciones y datos de ejemplo para levantar el sistema en local (con los emuladores) y preparar el despliegue a un proyecto real de Firebase.

## Arranque rápido (entorno local)

1. Instala dependencias:

   ```bash
   npm install
   npm run functions:install
   ```

2. Levanta los emuladores en una terminal:

   ```bash
   npm start
   # Panel de emuladores: http://localhost:4005
   # Firestore (8085), Auth (9099), Functions (5002)
   ```

3. En otra terminal, carga los datos y usuarios de ejemplo:

   ```bash
   npm run seed:emulator
   ```

   > Cada script de `firestore/seeds/` solo se aplica una vez (queda registrado en `_seedHistory`).

4. El backend/API levanta desde `functions/` (ver documentación de la capa backend).

## Usuarios de ejemplo

- **admin-rrhh**:  veronica.silva@example.com   (rol: ADMIN)

Contraseña para todos los usuarios de ejemplo: `Demo1234!`

> Cada usuario está creado en Firebase Auth y como documento en `users/{uid}`.

## Colecciones y módulos

Las siguientes colecciones ya existen con datos de ejemplo:

- **users**: usuarios del sistema (uno por cada cuenta administrativa)
- **departments**: áreas/departamentos (ej. RRHH, Tecnología)
- **positions**: puestos en la empresa (ej. Gerente RR.HH., Desarrollador/a Jr.)
- **employees**: legajos y fichas personales de colaboradores

Consulta la documentación de cada colección en `docs/collections/*.md`.

## Documentación del modelo

- [docs/collections/core.md](docs/collections/core.md): users, departments, positions, employees (campos y relaciones)

## Reglas & índices

- Firestore está 100% cerrado por reglas (`firestore.rules`): todo acceso pasa por el backend (`functions/`), nunca por el frontend.
- Los índices compuestos están en `firestore.indexes.json` (solo para consultas que combinan filtros y orden por campos distintos).

## Scripts y seeds

- Cada script en `firestore/seeds/V{n}__{modulo}.js` crea las colecciones y documentos necesarios como migración (solo una vez, como Flyway).
- El script core crea también los usuarios administrativos con la contraseña de ejemplo (`Demo1234!`).  **Nunca modifiques la colección `users` a mano; usa siempre el script correspondiente.**

## Despliegue a un proyecto real (Firebase)

1. Prepara un archivo de credenciales de servicio (service-account.json) y asigna el proyecto de Firebase deseado:

   ```bash
   firebase use --add
   export GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
   export FIREBASE_PROJECT_ID=mi-proyecto
   npm run seed
   npm run deploy
   ```

- `npm run seed` carga los datos iniciales al proyecto real
- `npm run deploy` sube funciones, reglas e índices

## Dónde está la API

La API y la lógica de negocio van en `functions/` (ver capa backend). Este módulo solo incluye la base (colecciones, seeds y documentación).
