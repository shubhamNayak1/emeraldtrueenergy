// One-time script to grant a Firebase Auth user the `admin: true` custom claim.
// Run after creating the owner's account in the Firebase console.
//
//   node scripts/grant-admin.mjs owner@example.com
//
// Requires GOOGLE_APPLICATION_CREDENTIALS pointing at a service-account key
// for the project (download from: Firebase console → Project settings → Service accounts).

import admin from "firebase-admin";

const email = process.argv[2];
if (!email) {
  console.error("Usage: node scripts/grant-admin.mjs <email>");
  process.exit(1);
}

if (!admin.apps.length) admin.initializeApp();

try {
  const user = await admin.auth().getUserByEmail(email);
  await admin.auth().setCustomUserClaims(user.uid, { admin: true });
  console.log(`Granted admin claim to ${email} (uid: ${user.uid}).`);
  console.log("Ask the user to sign out and back in for the claim to take effect.");
} catch (e) {
  console.error("Failed:", e.message);
  process.exit(1);
}
