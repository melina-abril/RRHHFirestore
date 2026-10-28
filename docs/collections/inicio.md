# Módulo: Pantalla principal

La pantalla principal no almacena información transaccional propia ni requiere colecciones nuevas en la base: su contenido (indicadores y textos orientativos) se obtiene de las colecciones compartidas para los módulos panel principal y accesos, cuyas definiciones ya están en core.

## Uso

Los indicadores del dashboard y los textos orientativos (bienvenida y descripciones de módulos) que se muestran al abrir el inicio se obtienen a partir de:

- employees (colaboradores activos: status = "ACTIVE" y deletedAt = null)
- solicitudes pendientes, eventos y datos orientativos: se calculan consultando otras colecciones según la implementación de indicadores y notificaciones (ninguna colección específica propia de este módulo).

## Colecciones utilizadas

- **employees**: colaboradores activos, inactivos y sus datos. Id: legajo ("E-0001", etc.)

Este módulo no requiere colecciones nuevas ni campos adicionales; utiliza los datos ya presentes en core.
