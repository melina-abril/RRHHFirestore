/**
 * Módulo: inicio de sesión. Sin colecciones propias.
 * Este módulo solo habilita el acceso y autenticación de la cuenta administradora de RH.
 * No se crean usuarios ni tokens adicionales: la autenticación se hace contra el backend, que valida un solo usuario fijo.
 * El backend no guarda cuentas adicionales ni estados de sesión en Firestore (solo la colección employees del core).
 * Este seed no crea ninguna colección ni documento adicional.
 */

exports.seed = async (_db) => {
  // No hay colecciones ni datos que migrar para el módulo de auth.
};
