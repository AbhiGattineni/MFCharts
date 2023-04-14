import react from "react";
import { Input, Button } from "../../../components";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/router";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  const [values, setValues] = useState({
    email: "",
    password: ""
  })
  const router = useRouter();
  const { login } = useAuth();
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    if (!errors.email && !errors.password) {
      login(values.email, values.password)
        .then((authUser) => {
          router.push("/");
        })
        .catch((error) => {
          console.log(error.code)
          const errors = {}
          if(error.code==="auth/user-not-found"){
            errors.email = "Email is invalid";
          }
          else if(error.code==="auth/wrong-password"){
            errors.password = "Password is invalid"
          }
          else{
            error.email = "User not found"
          }
          setErrors(errors);
        });
    }
  }

  const validate = (values) => {
    const errors = {};
    const p_email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/
    const p_password = /^.{7,}$/
    if (values.email === "") {
      errors.email = "Email is requried"
    }
    else if (!p_email.test(values.email)) {
      errors.email = "Enter valid email"
    }
    if (values.password === "") {
      errors.password = "password is requried"
    }
    else if (!p_password.test(values.password)) {
      errors.password = "Password should more than 7 charecters"
    }

    return errors;
  }
  const handleChange = (e) => {
    const newObj = { ...values, [e.target.name]: e.target.value }
    setValues(newObj);
  }
  return (
    <form className="mt-6 flex flex-col justify-center" onSubmit={handleSubmit}>
      <Input placeholder="Email"
        value={values.email}
        name="email"
        error={errors.email}
        onChange={handleChange} />
      <div className="relative">
        <Input
          placeholder="Password"
          type={isPasswordVisible ? "text" : "password"}
          value={values.password}
          name="password"
          error={errors.password}
          onChange={handleChange}
        />
        <div
          className="absolute top-0 right-0 flex items-center px-4 text-gray-600 mt-9"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <AiFillEye />
          ) : (
            <AiFillEyeInvisible />
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Button text="Sign in" />
      </div>
    </form>
  );
};
