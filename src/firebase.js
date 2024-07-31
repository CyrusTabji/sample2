import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCl9ONxZpPU7Y8GmSLs6rcYgcblOAQdIUg",
  authDomain: "netflix-clone-ecb0c.firebaseapp.com",
  projectId: "netflix-clone-ecb0c",
  storageBucket: "netflix-clone-ecb0c.appspot.com",
  messagingSenderId: "526712592022",
  appId: "1:526712592022:web:5324f766e4bcc6067c54b7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
  try{
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, user), {
      uid: user.uid, name, authProvider: "local", email,
    });
  }
  catch(error){
    console.log(error);
    toast.error(error.code);
  }
}

const login = async (email, password)=>{
  try{
    await signInWithEmailAndPassword(auth, email, password);
  }
  catch(error){
    console.log(error);
    toast.error(error.code);
  }
}

const logout =()=>{
  signOut(auth);
}

export{auth, db, login, logout, signup};