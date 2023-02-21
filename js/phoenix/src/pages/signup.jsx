import Link from "next/link";

import { SignupForm } from "../containers";
import { BareIcon, Separator } from "../../src/components";
import { BsLinkedin, BsGoogle, BsGithub } from "react-icons/bs";

const Signup = () => {
  return (
    <div className="flex flex-row h-screen">
      <div className="basis-1 md:basis-2/3  flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl">Add Details to Signup</h1>
        <SignupForm />
        <Separator />
        <div className="font-bold text-xs">Signup with</div>
        <div className="flex flex-row">
          <BareIcon IconComponent={<BsGoogle />} classes={["text-red-500"]} />
          <BareIcon IconComponent={<BsGithub />} />
          <BareIcon IconComponent={<BsLinkedin />} />
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
