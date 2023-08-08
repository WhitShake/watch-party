import { auth, provider } from "../../firebase_setup/firebase"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"


export const Login = () => {

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate('/profile');
  }
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  )
}