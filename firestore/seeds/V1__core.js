/**
 * Core: colecciones compartidas (departments, positions, employees) y los usuarios de ejemplo en Auth + users/{uid}.
 * Cumple el formato del ejemplo, con datos ficticios y coherentes para TECHFORB (áreas, puestos, 3 empleados en 2 áreas y 2 puestos). Rol: ADMIN solo para la administradora de RRHH.
 * Contraseña de ejemplo para todos los usuarios: Demo1234!
 */
const { FieldValue, Timestamp } = require("firebase-admin/firestore");
const { createDemoUsers } = require("../../scripts/demo-users");

const date = (value) => Timestamp.fromDate(new Date(`${value}T00:00:00Z`));

const departments = [
  { id: "HR", name: "Recursos Humanos" },
  { id: "IT", name: "Tecnología" }
];

const positions = [
  { id: "HR_MANAGER", name: "Gerente de RR.HH.", departmentId: "HR" },
  { id: "DEV_JR", name: "Desarrollador/a Jr.", departmentId: "IT" }
];

const employees = [
  { id: "E-0001", firstName: "Verónica", lastName: "Silva", documentType: "DNI", documentNumber: "30876124", birthDate: "1983-09-22", email: "veronica.silva@example.com", phone: "+54 11 4999-1234", hireDate: "2020-04-10", departmentId: "HR", positionId: "HR_MANAGER", managerId: null, status: "ACTIVE" },
  { id: "E-0002", firstName: "Rafael", lastName: "Contreras", documentType: "DNI", documentNumber: "28566798", birthDate: "1995-11-14", email: "rafael.contreras@example.com", phone: "+54 11 4999-2345", hireDate: "2023-01-17", departmentId: "IT", positionId: "DEV_JR", managerId: "E-0001", status: "ACTIVE" },
  { id: "E-0003", firstName: "Eliana", lastName: "Torres", documentType: "DNI", documentNumber: "32899081", birthDate: "1991-05-30", email: "eliana.torres@example.com", phone: "+54 11 4999-3456", hireDate: "2022-11-01", departmentId: "IT", positionId: "DEV_JR", managerId: "E-0001", status: "ON_LEAVE" }
];

exports.seed = async (db, { auth }) => {
  const batch = db.batch();
  for (const { id, ...data } of departments) {
    batch.set(db.collection("departments").doc(id), { ...data, createdAt: FieldValue.serverTimestamp() });
  }
  for (const { id, ...data } of positions) {
    batch.set(db.collection("positions").doc(id), { ...data, createdAt: FieldValue.serverTimestamp() });
  }
  for (const { id, birthDate, hireDate, ...data } of employees) {
    batch.set(db.collection("employees").doc(id), {
      ...data,
      employeeNumber: id,
      birthDate: date(birthDate),
      hireDate: date(hireDate),
      terminationDate: null,
      deletedAt: null,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
  }
  await batch.commit();
  await createDemoUsers(db, auth, [
    {
      uid: "admin-rrhh",
      email: "veronica.silva@example.com",
      name: "Verónica Silva",
      role: "ADMIN",
      employeeId: "E-0001"
    }
  ]);
};
