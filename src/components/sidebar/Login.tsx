import { auth, provider } from "../../firebase_setup/firebase"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { db } from "../../firebase_setup/firebase"
import { doc, getDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { initializeNewUser } from "../../firestore_functions/firestore_calls"


export const Login = () => {

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        initializeNewUser(user.uid)
      }
    })


    navigate('/profile');
  }
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  )
}