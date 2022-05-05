import { LoginForm } from "../../src/containers"
import { BareIcon, Separator } from "../../src/components"
import { BsLinkedin, BsGoogle, BsGithub } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";
import { useRouter } from 'next/router'


const Login = () => {
  const router = useRouter()
  const { signInWithGoogle } = useAuth()
  const handleSigninWithGoogle = () => {
    signInWithGoogle().then(() => {
      router.push("/")
    })

  }
  return (
    <div className="flex flex-row">
      <div className="md:w-2/3 flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl">Login to Your Account</h1>
        <LoginForm />
        <Separator />
        <div className="font-bold text-xs">Login with</div>
        <div className="flex flex-row">
          <div onClick={handleSigninWithGoogle}>
            <BareIcon IconComponent={<BsGoogle />} classes={["cursor-pointer"]} />
          </div>
          <BareIcon IconComponent={<BsGithub />} />
          <BareIcon IconComponent={<BsLinkedin />} />
        </div>
      </div>
      <div className="md:w-1/3 md:bg-bgColor hidden md:flex md:flex-col md:justify-center md:items-center">
        <div className="font-bold text-2xl">New Here?</div>
        <div className="mt-6 font-bold">
          <div>
            Sign up and discover a great
          </div>
          <div>
            amount of new opportunities!
          </div>
        </div>
        <button className="mt-6 shadow bg-white hover:bg-gray-100 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded-full mb-6" type="button">
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default Login
