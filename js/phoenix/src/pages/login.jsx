import Link from "next/link";

import { LoginForm } from "../../src/containers";
import { BareIcon, Separator } from "../../src/components";
import { BsLinkedin, BsGoogle, BsFacebook } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const { signInWithGoogle, signInWithFacebook } = useAuth();
  const handleSigninWithGoogle = () => {
    signInWithGoogle().then(() => {
      router.push("/");
    });
  };
  const handleSigninWithFacebook = () => {
    signInWithFacebook().then(() => {
      router.push("/");
    });
  };
  return (
    <div className="flex flex-row justify-center h-screen">
      <div className="w-full md:basis-2/3 flex flex-col justify-between items-center mx-2 md:mx-0">
        <div className="flex flex-col flex-auto justify-center items-center">
          <h1 className="font-bold text-3xl">Login to Your Account</h1>
          <LoginForm />
          <div className="w-1/3">
            <Separator />
          </div>
          <div className="font-bold text-xs">Login with</div>
          <div className="flex flex-row">
            <div onClick={handleSigninWithGoogle}>
              <BareIcon
                IconComponent={<BsGoogle />}
                classes={["cursor-pointer"]}
              />
            </div>
            <div onClick={handleSigninWithFacebook}>
              <BareIcon
                IconComponent={<BsFacebook />}
                classes={["cursor-pointer"]}
              />
            </div>
            <BareIcon IconComponent={<BsLinkedin />} />
          </div>
        </div>
        <div className="w-full bg-bgColor md:hidden flex items-center justify-evenly p-2 rounded-md">
          <div className="font-bold">New Here?</div>
          <button
            className="shadow bg-white hover:bg-gray-100 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded-lg"
            type="button"
          >
            <Link href="/signup">
              <a>Sign Up</a>
            </Link>
          </button>
        </div>
      </div>
      <div className="md:basis-1/3 md:bg-bgColor hidden md:flex md:flex-col md:justify-center md:items-center">
        <div className="font-bold text-2xl">New Here?</div>
        <div className="mt-6 font-bold">
          <div>Sign up and discover a great</div>
          <div>amount of new opportunities!</div>
        </div>
        <button
          className="mt-6 shadow bg-white hover:bg-gray-100 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded-full mb-6"
          type="button"
        >
          <Link href="/signup">
            <a>Sign Up</a>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Login;
