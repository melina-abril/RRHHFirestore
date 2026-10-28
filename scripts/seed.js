/**
 * Carga los scripts de firestore/seeds en orden de versión (V1__core.js, V2__leaves.js, V2_1__…), como Flyway:
 * cada script aplicado queda registrado en la colección _seedHistory y no se vuelve a correr.
 *
 * Contra el emulador:  FIRESTORE_EMULATOR_HOST=localhost:8085 npm run seed
 * Contra un proyecto:  GOOGLE_APPLICATION_CREDENTIALS=./service-account.json FIREBASE_PROJECT_ID=mi-proyecto npm run seed
 */
const fs = require("fs");
const path = require("path");
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

const SEEDS_DIR = path.join(__dirname, "..", "firestore", "seeds");
const HISTORY = "_seedHistory";

const projectId = process.env.FIREBASE_PROJECT_ID || (process.env.FIRESTORE_EMULATOR_HOST ? "demo-rrhh" : undefined);
if (!projectId) {
  console.error("Falta FIREBASE_PROJECT_ID (o FIRESTORE_EMULATOR_HOST para el emulador).");
  process.exit(1);
}
initializeApp(process.env.FIRESTORE_EMULATOR_HOST ? { projectId } : { projectId, credential: applicationDefault() });
const db = getFirestore();

/** "V2_1__seed_leaves.js" → [2, 1]: orden numérico de versión, igual que Flyway. */
const versionOf = (file) => {
  const match = file.match(/^V(\d+(?:_\d+)*)__/);
  return match ? match[1].split("_").map(Number) : null;
};
const compareVersions = (a, b) => {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const diff = (a[i] ?? 0) - (b[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
};

const run = async () => {
  const files = fs
    .readdirSync(SEEDS_DIR)
    .filter((file) => file.endsWith(".js") && versionOf(file))
    .sort((a, b) => compareVersions(versionOf(a), versionOf(b)));

  let applied = 0;
  for (const file of files) {
    const historyRef = db.collection(HISTORY).doc(file);
    if ((await historyRef.get()).exists) {
      console.log(`= ${file} (ya aplicado)`);
      continue;
    }
    const { seed } = require(path.join(SEEDS_DIR, file));
    if (typeof seed !== "function") throw new Error(`${file} no exporta seed(db)`);
    await seed(db);
    await historyRef.set({ appliedAt: FieldValue.serverTimestamp() });
    console.log(`+ ${file}`);
    applied++;
  }
  console.log(`Listo: ${applied} script(s) aplicados, ${files.length - applied} ya estaban.`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
