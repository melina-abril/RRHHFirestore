# Módulo: core (colecciones compartidas)

## users

Usuarios del sistema. CREAR SOLO con createDemoUsers (no manual): un documento por usuario de acceso (uid = id de Firebase Auth).

| Campo        | Tipo                            | Obligatorio | Descripción                                                                                                                                  |
|--------------|---------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| email        | string                          | sí          | Correo de acceso                                                                                                                              |
| name         | string                          | sí          | Nombre visible                                                                                                                               |
| role         | string                          | sí          | Rol del usuario (`ADMIN` en MVP)                                                                                                             |
| employeeId   | string \\| null → employees  | no          | Legajo asociado (si corresponde)                                                                                                             |
| active       | boolean                         | sí          | Usuario activo                                                                                                                               |
| createdAt    | timestamp                       | sí          | Alta en la base                                                                                                                              |

## departments

Áreas/departamentos de la empresa. Id del documento: código legible (`HR`, `IT`).

| Campo     | Tipo      | Obligatorio | Descripción              |
|-----------|-----------|-------------|--------------------------|
| name      | string    | sí          | Nombre visible           |
| createdAt | timestamp | sí          | Alta del documento       |

## positions

Puestos de trabajo ofrecidos en la empresa. Id del documento: código legible (`HR_MANAGER`, `DEV_JR`).

| Campo        | Tipo    | Obligatorio | Descripción                        |
|--------------|---------|-------------|------------------------------------|
| name         | string  | sí          | Nombre visible                     |
| departmentId | string → departments | sí          | Área/departamento al que pertenece |
| createdAt    | timestamp | sí        | Alta del documento                 |

## employees

Legajos personales de los empleados y ex empleados. Id del documento: legajo tipo `E-0001`.

| Campo           | Tipo     | Obligatorio | Descripción                                     |
|-----------------|----------|-------------|-------------------------------------------------|
| employeeNumber  | string   | sí          | Id/legajo único del colaborador                 |
| firstName       | string   | sí          | Nombre                                          |
| lastName        | string   | sí          | Apellido                                        |
| documentType    | string   | sí          | Tipo de documento (`DNI`, `PASSPORT`...)        |
| documentNumber  | string   | sí          | Número de documento                             |
| birthDate       | timestamp| sí          | Fecha de nacimiento                             |
| email           | string   | sí          | Correo personal/laboral                         |
| phone           | string   | sí          | Teléfono de contacto                            |
| hireDate        | timestamp| sí          | Fecha de alta                                   |
| terminationDate | timestamp \\| null | no          | Fecha de egreso (si existe)                     |
| departmentId    | string → departments | sí      | Área/departamento al que pertenece              |
| positionId      | string → positions | sí        | Puesto de trabajo                              |
| managerId       | string → employees \\| null    | no          | Legajo de responsable directo                   |
| status          | string   | sí          | `ACTIVE`, `ON_LEAVE`, `TERMINATED`             |
| deletedAt       | timestamp \\| null   | no          | Baja lógica (si corresponde)                   |
| createdAt       | timestamp| sí          | Alta en la base                                 |
| updatedAt       | timestamp| sí          | Última modificación                             |

Índices: `departmentId` + `positionId`, `status` + `lastName`.