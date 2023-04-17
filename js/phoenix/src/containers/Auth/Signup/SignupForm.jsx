import { useState } from "react";
import { useRouter } from "next/router";

import { Button, Input } from "../../../components";
import { useAuth } from "../../../context/AuthContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { error } from "highcharts";

export const SignupForm = () => {
  const router = useRouter();
  const { signup } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    if (!errors.email && !errors.password) {
      signup(values.email, values.password).then(() => {
        router.push("/");
        alert("success")
      })
        .catch((error) => {
          // console.log(error.code)
          if (error.code === "auth/email-already-in-use") {
            const errors = {}
            errors.email = "Email is already exits";
            setErrors(errors);
          }
        })
    }
  }


  const validate = (values) => {
    const errors = {};
    const p_name = /[^A-Za-z]/g
    const p_email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/
    const p_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/
    if (values.fname === "") {
      errors.fname = "FirstName is required"
    }
    else if (values.fname.length < 4) {
      errors.fname = "First name should contain minimum 4 characters"
    }
    else if (p_name.test(values.fname)) {
      errors.fname = "First name should not contain special characters"
    }
    if (values.lname === "") {
      errors.lname = "LastName is required"
    }
    else if (values.lname.length < 4) {
      errors.lname = "Last name should contain minimum 4 characters"
    }
    else if (p_name.test(values.lname)) {
      errors.lname = "Last name should not contain special characters"
    }
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
      errors.password = "Password should be strong"
    }

    return errors;
  }
  const handleChange = (e) => {
    const newObj = { ...values, [e.target.name]: e.target.value }
    setValues(newObj);
  }

  return (
    <form className="mt-6 flex flex-col justify-center" onSubmit={handleSubmit}>
      <div className="flex flex-row">
        <Input
          placeholder="First Name"
          value={values.fname}
          name="fname"
          error={errors.fname}
          onChange={handleChange}
        />
        <Input
          placeholder="Last Name"
          value={values.lname}
          name="lname"
          error={errors.lname}
          onChange={handleChange}
        />
      </div>
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
        <Button text="Sign Up" />
      </div>
    </form>
  );
};

export default SignupForm;
