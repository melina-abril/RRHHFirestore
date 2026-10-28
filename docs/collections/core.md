# Módulo core

## departments

Áreas. Id del documento: código (`HR`, `ENG`, `SALES`).

| Campo    | Tipo    | Obligatorio | Descripción                 |
|----------|---------|-------------|-----------------------------|
| name     | string  | sí          | Nombre del área             |
| createdAt| timestamp | sí        | Alta del documento          |

## positions

Puestos. Id del documento: código (`HR-LEAD`, `ENG-DEV`...).

| Campo        | Tipo    | Obligatorio | Descripción                       |
|--------------|---------|-------------|-----------------------------------|
| name         | string  | sí          | Nombre del puesto                 |
| departmentId | string → departments | sí | Área a la que pertenece         |
| createdAt    | timestamp | sí        | Alta del documento                |

## employees

Colaboradores (legajos). Id del documento: legajo (`E-0001`).

| Campo           | Tipo    | Obligatorio | Descripción                                  |
|-----------------|---------|-------------|----------------------------------------------|
| employeeNumber  | string  | sí          | N° de legajo (igual a id)                    |
| firstName       | string  | sí          | Nombre                                       |
| lastName        | string  | sí          | Apellido                                     |
| documentType    | string  | sí          | Tipo de documento                            |
| documentNumber  | string  | sí          | Número de documento                          |
| birthDate       | timestamp | sí        | Fecha de nacimiento                          |
| email           | string  | sí          | Correo electrónico                           |
| phone           | string  | sí          | Teléfono                                     |
| hireDate        | timestamp | sí        | Fecha de ingreso                             |
| terminationDate | timestamp \| null | no | Fecha de egreso (null si activo)           |
| departmentId    | string → departments | sí | Área actual                                |
| positionId      | string → positions | sí | Puesto actual                               |
| managerId       | string → employees \| null | no | Legajo del responsable (referencia interna) |
| status          | string  | sí          | `ACTIVE`, `ON_LEAVE` o `TERMINATED`         |
| deletedAt       | timestamp \| null | no          | Borrado lógico (null si vigente)         |
| createdAt       | timestamp | sí        | Alta del documento                           |

Subcolección: employees/{id}/movements (historial de movimientos).
