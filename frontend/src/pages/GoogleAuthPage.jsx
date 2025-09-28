
import {useGoogleLogin} from '@react-oauth/google';
import {googleAuth} from '../api/authApi.js'

const GoogleAuthPage = () => {

    const googleResponse = async (authResult) => {
        try {
            if(authResult['code']){
                const user = googleAuth(authResult['code']);
                console.log(user);
            }
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