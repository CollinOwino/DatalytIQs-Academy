/* seedFirestore.js  – quick demo seed */
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
(async () => {
  const db = admin.firestore();
  await db.collection("users").doc("demoUser").set({
    name:  "John Doe",
    role:  "student",
    ts:    admin.firestore.FieldValue.serverTimestamp()
  });
  console.log("✅  Firestore seeded!");
  process.exit(0);
})();
