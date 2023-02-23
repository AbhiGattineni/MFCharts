import { useState } from "react";
import { useRouter } from "next/router";

import { Button, Input } from "../../../components";
import { useAuth } from "../../../context/AuthContext";

export const SignupForm = () => {
  const router = useRouter();
  const { signup } = useAuth();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const userSignUp = (e) => {
    e.preventDefault();
    signup(email, password).then(() => {
      router.push("/");
    });
  };

  return (
    <form className="mt-6 flex flex-col justify-center">
      <div className="flex flex-row">
        <Input
          placeholder="First Name"
          setValue={setFirstName}
          value={firstName}
        />
        <Input
          placeholder="Last Name"
          setValue={setLastName}
          value={lastName}
        />
      </div>
      <Input placeholder="Email" setValue={setEmail} value={email} />
      <Input
        placeholder="Password"
        type="password"
        setValue={setPassword}
        value={password}
      />
      <div className="flex justify-center">
        <Button text="Sign Up" handleClick={userSignUp} />
      </div>
    </form>
  );
};

export default SignupForm;
