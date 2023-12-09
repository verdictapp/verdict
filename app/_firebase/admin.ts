import admin from "firebase-admin";

const serviceAccount = require("../../serviceKeys/verdict-3f3de-firebase-adminsdk-o1e6t-56faac4bb6.json");

const adminApp =
  admin.apps.length === 0
    ? admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      })
    : admin.apps[0];

export const adminAuth = adminApp.auth();
