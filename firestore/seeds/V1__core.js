/**
 * Módulo core. Colecciones compartidas: departments, positions y employees.
 * No requiere dependencias de otros seeds.
 */
const { FieldValue, Timestamp } = require("firebase-admin/firestore");

const date = (value) => Timestamp.fromDate(new Date(`${value}T00:00:00Z`));

const departments = [
  { id: "HR", name: "Recursos Humanos" },
  { id: "ENG", name: "Ingeniería" },
  { id: "SALES", name: "Ventas" }
];

const positions = [
  { id: "HR-LEAD", name: "Jefe de RRHH", departmentId: "HR" },
  { id: "HR-ASSIST", name: "Asistente de RRHH", departmentId: "HR" },
  { id: "ENG-LEAD", name: "Líder Técnico", departmentId: "ENG" },
  { id: "ENG-DEV", name: "Desarrollador/a", departmentId: "ENG" },
  { id: "SALES-MAN", name: "Gerente de Ventas", departmentId: "SALES" }
];

// Empleados de ejemplo: 3 activos y 1 inactivo (egreso)
const employees = [
  {
    id: "E-0001",
    employeeNumber: "E-0001",
    firstName: "Ana",
    lastName: "Pérez",
    documentType: "DNI",
    documentNumber: "30123456",
    birthDate: "1990-04-02",
    email: "ana.perez@example.com",
    phone: "+54 11 2211 3344",
    hireDate: "2021-03-15",
    terminationDate: null,
    departmentId: "HR",
    positionId: "HR-LEAD",
    managerId: null,
    status: "ACTIVE",
    deletedAt: null
  },
  {
    id: "E-0002",
    employeeNumber: "E-0002",
    firstName: "Juan",
    lastName: "García",
    documentType: "DNI",
    documentNumber: "29333444",
    birthDate: "1986-07-18",
    email: "juan.garcia@example.com",
    phone: "+54 11 5556 7890",
    hireDate: "2022-09-01",
    terminationDate: null,
    departmentId: "ENG",
    positionId: "ENG-DEV",
    managerId: "E-0003",
    status: "ACTIVE",
    deletedAt: null
  },
  {
    id: "E-0003",
    employeeNumber: "E-0003",
    firstName: "Lucía",
    lastName: "Méndez",
    documentType: "DNI",
    documentNumber: "27777888",
    birthDate: "1994-12-03",
    email: "lucia.mendez@example.com",
    phone: "+54 11 5789 1234",
    hireDate: "2019-10-10",
    terminationDate: null,
    departmentId: "ENG",
    positionId: "ENG-LEAD",
    managerId: "E-0001",
    status: "ON_LEAVE",
    deletedAt: null
  },
  {
    id: "E-0004",
    employeeNumber: "E-0004",
    firstName: "Mario",
    lastName: "Vega",
    documentType: "DNI",
    documentNumber: "31224455",
    birthDate: "1982-02-20",
    email: "mario.vega@example.com",
    phone: "+54 11 4567 8890",
    hireDate: "2020-05-05",
    terminationDate: "2023-01-31",
    departmentId: "SALES",
    positionId: "SALES-MAN",
    managerId: null,
    status: "TERMINATED",
    deletedAt: null
  }
];

exports.seed = async (db) => {
  const batch = db.batch();
  // Departments
  for (const { id, ...data } of departments) {
    batch.set(db.collection("departments").doc(id), {
      ...data,
      createdAt: FieldValue.serverTimestamp()
    });
  }
  // Positions
  for (const { id, ...data } of positions) {
    batch.set(db.collection("positions").doc(id), {
      ...data,
      createdAt: FieldValue.serverTimestamp()
    });
  }
  // Employees
  for (const { id, employeeNumber, firstName, lastName, documentType, documentNumber, birthDate, email, phone, hireDate, terminationDate, departmentId, positionId, managerId, status, deletedAt } of employees) {
    batch.set(db.collection("employees").doc(id), {
      employeeNumber,
      firstName,
      lastName,
      documentType,
      documentNumber,
      birthDate: date(birthDate),
      email,
      phone,
      hireDate: date(hireDate),
      terminationDate: terminationDate ? date(terminationDate) : null,
      departmentId,
      positionId,
      managerId,
      status,
      deletedAt,
      createdAt: FieldValue.serverTimestamp()
    });
  }
  await batch.commit();
};
