import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
// import * as service_account from "permi"

admin.initializeApp();

const app = express();
app.use(cors({origin: true}));

app.post("/user", async (req, res) => {
  const user = req.body;
  await admin.firestore().collection("users").add(user);
  res.status(201).send(JSON.stringify(user));
});

app.get("/user", async (req, res) => {
  // eslint-disable-next-line max-len
  const snapshot = await admin.firestore().collection("users").get(); const users: { id:string ; }[] = [];
  snapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();
    users.push({id, ...data});
  }); res.status(200).send(JSON.stringify(users));
});

app.get("/user/:id", async (req, res) => {
  const snapshot = await
  // eslint-disable-next-line max-len
  admin.firestore().collection("users").doc(req.params.id).get(); const userId = snapshot.id;
  const userData = snapshot.data();
  res.status(200).send(JSON.stringify({id: userId, ...userData}));
});

app.put("/user/:id", async (req, res) => {
  const body = req.body;
  await
  admin.firestore().collection("users").doc(req.params.id).update(body);
  res.status(200).send();
});

app.delete("/user/:id", async (req, res) => {
  const userData = await
  admin.firestore().collection("users").doc(req.params.id);
  if (userData) {
    userData.delete();
    res.status(200).send();
  } else {
    res.status(404).send("The user not found");
  }
});


// export const api = functions.https.onRequest(app);
exports.api= functions.https.onRequest(app);

