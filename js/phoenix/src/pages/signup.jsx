import Link from "next/link";

import { SignupForm } from "../containers";
import { BareIcon, Separator } from "../../src/components";
import { BsLinkedin, BsGoogle, BsGithub, BsFacebook } from "react-icons/bs";

const Signup = () => {
  return (
    <div className="flex flex-row h-screen">
      <div className="w-full md:basis-2/3 flex flex-col justify-between items-center mx-2 md:mx-0">
        <div className="flex flex-col flex-auto justify-center items-center">
          <h1 className="font-bold text-3xl">Add Details to Signup</h1>
          <SignupForm />
          <div className="w-2/3">
            <Separator />
          </div>
          <div className="font-bold text-xs">Signup with</div>
          <div className="flex flex-row">
            <BareIcon IconComponent={<BsGoogle />} />
            <BareIcon IconComponent={<BsFacebook />} />

            <BareIcon IconComponent={<BsLinkedin />} />
            <BareIcon IconComponent={<BsGithub />} />
          </div>
        </div>
        <div className="w-full bg-bgColor md:hidden flex items-center justify-evenly p-2 rounded-md">
          <div className="font-bold">Already A Member?</div>
          <button
            className="shadow bg-white hover:bg-gray-100 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded-lg"
            type="button"
          >
            <Link href="/login">
              <a>Sign In</a>
            </Link>
          </button>
        </div>
      </div>

      <div className="md:basis-1/3 md:bg-bgColor hidden md:flex md:flex-col md:justify-center md:items-center">
        <div className="font-bold text-2xl">Already A Member?</div>
        <div className="mt-6 font-bold">
          <div>Sign in and discover a great</div>
          <div>amount of new opportunities!</div>
        </div>
        <button
          className="mt-6 shadow bg-white hover:bg-gray-100 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded-full mb-6"
          type="button"
        >
          <Link href="/login">
            <a>Sign In</a>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Signup;
