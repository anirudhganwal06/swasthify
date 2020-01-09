import { createStore, combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools()
);

export default store;
