# Base de datos de RRHH · Firestore

Esta base implementa el modelo de datos para el sistema de Gestión de Recursos Humanos en Firestore, cargada y documentada módulo por módulo. 

## Colecciones y módulos

- **departments** *(mod. core)*: áreas internas de la organización.
- **positions** *(mod. core)*: puestos disponibles, referenciados por empleados.
- **employees** *(mod. core)*: legajos de colaboradores, con datos personales y laborales.
- **auth**: autenticación y manejo de sesiones. *(ver docs/collections/auth.md)*
- **inicio**: datos de la pantalla principal. *(ver docs/collections/inicio.md)*
- **employee-onboarding**: incorporaciones de nuevos colaboradores. *(ver docs/collections/employee-onboarding.md)*
- **employee-edition**: edición y actualización de fichas de colaboradores. *(sin colecciones propias)


## Cómo probar la base

1. **Instalar dependencias**

   ```bash
   npm install
   ```

2. **Levantar el emulador de Firestore** (en una terminal)

   ```bash
   npm run emulator
   ```
   - Emulador Firestore: http://localhost:8085
   - Panel de UI: http://localhost:4005

3. **Cargar los datos de ejemplo** (en otra terminal)

   Contra el emulador:
   ```bash
   FIRESTORE_EMULATOR_HOST=localhost:8085 npm run seed
   ```
   Contra un proyecto real (requiere credencial adecuada y setear FIREBASE_PROJECT_ID):
   ```bash
   GOOGLE_APPLICATION_CREDENTIALS=./service-account.json FIREBASE_PROJECT_ID=mi-proyecto npm run seed
   ```

   Los scripts de seeds (firestore/seeds) se aplican en orden de versión (Vn__), una sola vez cada uno; los ya aplicados se registran en la colección `_seedHistory`.

4. **Desplegar reglas e índices**

   ```bash
   npm run deploy:firestore
   ```

## Estructura

- **firestore.rules**: reglas cerradas (solo operación vía backend, no permite acceso directo desde web o móviles).
- **firestore.indexes.json**: índices compuestos definidos por los módulos (de momento vacío: se agregarán en próximas iteraciones).
- **firestore/seeds**: scripts de carga versionados para cada módulo.
- **docs/collections/
{modulo}.md**: documentación del esquema de cada colección.

## Colecciones actuales por módulo

### Módulo core
- departments
- positions
- employees

### Módulo auth
- (ver docs/collections/auth.md)

### Módulo inicio
- (ver docs/collections/inicio.md)

### Módulo employee-onboarding
- (ver docs/collections/employee-onboarding.md)

### Módulo employee-edition
- (ninguna colección definida: actualiza employees)


---

**Stack:** Cloud Firestore (SDK admin, scripts NodeJS, sin acceso directo desde clientes web)

**Comandos principales:**
- Levantar emulador: `npm run emulator`
- Cargar datos ejemplo: `npm run seed`
- Deploy reglas/index: `npm run deploy:firestore`
