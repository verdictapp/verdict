import admin from "firebase-admin";

const serviceAccount = require("../../serviceKeys/verdict-3f3de-firebase-adminsdk-o1e6t-56faac4bb6.json");

let adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const adminAuth = adminApp.auth();
