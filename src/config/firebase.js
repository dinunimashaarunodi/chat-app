import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDiy2HynnJUBVY0WINCblLOebjVgJsBN64",
  authDomain: "chat-app-gs-b23dd.firebaseapp.com",
  projectId: "chat-app-gs-b23dd",
  storageBucket: "chat-app-gs-b23dd.firebasestorage.app",
  messagingSenderId: "259774120662",
  appId: "1:259774120662:web:9ab1449d16000c237cbf77",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, There I am using chat app",
      lastSeen: Date.now(),
    });

    await setDoc(doc(db, "chats", user.uid), {
      chatData: [],
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

const login  =async(email,password)=>{
  try {
    await signInWithEmailAndPassword(auth,email,password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
    
  }
}

const logout = async()=>{
  try{
    await signOut(auth)
  }catch(error){
  console.error(error);
  toast.error(error.code.split('/')[1].split('-').join(""));
  }
   
}

export { auth,signup ,login,logout,db};
