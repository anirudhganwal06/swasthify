import { combineReducers } from "redux";
import flashReducer from "./flashReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  flash: flashReducer
});
