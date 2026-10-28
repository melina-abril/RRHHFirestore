# Módulo: inicio de sesión

Este módulo no crea colecciones propias en Firestore.

La autenticación se realiza únicamente contra una cuenta administradora de RH definida en la plataforma. El backend valida las credenciales y utiliza solo los datos ya existentes en la colección `employees` (core), sin crear documentos ni guardar sesiones ni tokens en Firestore.

No se crean colecciones adicionales ni se almacena información nueva en la base de datos para esta funcionalidad.
