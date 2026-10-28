# Base de Datos · Gestión de Recursos Humanos (RRHH)

## Colecciones del sistema

### Compartidas (core, V1)
- **departments**: Áreas de la organización
- **positions**: Puestos laborales
- **employees**: Legajos de colaboradores

### Módulos
- **auth** (V2): No requiere colecciones propias (la autenticación solo valida contra las credenciales administradoras; no hay documentos de usuarios colaborador en esta etapa)
- **inicio** (V3): No requiere colecciones propias (la pantalla principal construye indicadores sobre las colecciones compartidas)

## Herramientas y comandos

### Requisitos
- Node.js >= 20
- Firebase CLI (`firebase-tools`) y `firebase-admin`

### Comandos principales

- Instalar dependencias:

      npm install

- Levantar el emulador de Firestore (puerto 8085 — panel UI: http://localhost:4005):

      npm run emulator

- Cargar los datos de ejemplo en Firestore (ejecuta los scripts en firestore/seeds en orden):

      FIRESTORE_EMULATOR_HOST=localhost:8085 npm run seed

- Desplegar las reglas e índices a un proyecto real (requiere autenticación y variables):

      GOOGLE_APPLICATION_CREDENTIALS=./service-account.json FIREBASE_PROJECT_ID=mi-proyecto npm run deploy:firestore

- Cargar los datos en un proyecto real:

      GOOGLE_APPLICATION_CREDENTIALS=./service-account.json FIREBASE_PROJECT_ID=mi-proyecto npm run seed

## Archivos generados

- `firestore/seeds/V1__core.js`: Seed de colecciones compartidas `departments`, `positions`, `employees` y sus documentos de ejemplo.
- [No genera colecciones nuevas para auth ni inicio por ahora]
- `docs/collections/core.md`: Esquema de las colecciones compartidas (modelo de referencia para el resto del sistema).
- `firestore.rules`: Reglas cerradas — solo el backend puede acceder mediante SDK admin; ningún acceso directo de aplicaciones cliente.
- `firestore.indexes.json`: Índices compuestos requeridos por el modelo (vacío en esta versión, ya que las colecciones actuales no consumen índices adicionales).

---

> Para ampliar la base, cada nuevo módulo define su esquema en `docs/collections/{modulo}.md` y sus documentos de ejemplo en `firestore/seeds/V{n}__{modulo}.js`. El script `scripts/seed.js` los aplica en orden y los registra en la colección `_seedHistory` (no re-aplica los mismos).