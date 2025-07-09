const admin = require("firebase-admin");

// ✅ Replace this path with your actual path to serviceAccountKey.json
const serviceAccount = require("C:/Users/PC/Projects/DatalytIQs-Academy/firebase-setup/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function setupFirestore() {
  // 🔹 Create a sample course
  const courseRef = db.collection("courses").doc("course-math101");
  await courseRef.set({
    title: "Pure Mathematics 1",
    description: "Foundation in algebra, functions, and calculus",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // 🔹 Create a sample user
  const userRef = db.collection("users").doc("demo-user");
  await userRef.set({
    name: "Collins Owino",
    email: "collins@example.com",
    photoURL: null,
  });

  // 🔹 Enroll user in the course
  await userRef.collection("courses").doc("course-math101").set({
    courseId: "course-math101",
    enrolledAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // 🔹 Add a sample quiz response
  await db.collection("quizResponses").add({
    userId: "demo-user",
    quizId: "quiz-algebra-01",
    score: 85,
    submittedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  console.log("📦 Firestore setup completed ✅");
}

setupFirestore().catch(console.error);

