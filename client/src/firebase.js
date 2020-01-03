import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import config from "./config";

firebase.initializeApp(config);
firebase.firestore();

export default firebase;