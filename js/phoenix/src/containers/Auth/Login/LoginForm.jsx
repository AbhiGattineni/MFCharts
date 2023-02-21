import react from "react";
import { Input, Button } from "../../../components";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/router";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();
  const handleLogin = (e) => {
    e.preventDefault();

    login(email, password)
      .then((authUser) => {
        router.push("/");
      })
      .catch((error) => {
        console.log(error.message);
        alert("Invalid Credentials");
      });
  };
  return (
    <form className="mt-6 flex flex-col justify-center" onSubmit={handleLogin}>
      <Input placeholder="Email" setValue={setEmail} type="email" />
      <Input placeholder="Password" setValue={setPassword} type="password" />
      <div className="flex justify-center">
        <Button text="Sign in" handleClick={handleLogin} />
      </div>
    </form>
  );
};
