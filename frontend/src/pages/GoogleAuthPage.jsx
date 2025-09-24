
import {useGoogleLogin} from '@react-oauth/google'

const GoogleAuthPage = () => {

    const googleResponse = async (authResult) => {
        try {
            console.log("Google login success", authResult);
            console.log(authResult)
        } catch (error) {
            console.log("error in google login", error);
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: googleResponse,
        onError: googleResponse,
        flow: 'auth-code'
    })

  return (
    <div className='text-red-500'>
        <button onClick={googleLogin}>Signin with Google</button>
    </div>
  )
}

export default GoogleAuthPage