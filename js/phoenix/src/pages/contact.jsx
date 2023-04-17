import { useState } from "react";
import { Input, Button, Label } from "../components";
import { Textarea } from "../components/TextArea/Textarea";

export default function Contact() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    phone: "",
    message: "",
    file: "",
  })
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));

  }
  const validate = (values) => {
    const errors = {};

    const p_name=/[^A-Za-z]/g
    const p_email=/^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/
    const p_phone=/^[0-9]{10}$/
    if (values.username === "") {
      errors.username = "Name is required"
    }
    else if(values.username.length<4){
      errors.username = "Name should contain minimum 4 characters"
    }
    else if(p_name.test(values.username)){
      errors.username = "Name should not contain special characters"
    }
    if(values.email===""){
      errors.email="Email is requried"
    }
    else if(!p_email.test(values.email)){
      errors.email="Enter valid email"
    }
    if(values.phone===""){
      errors.phone="Phone number is requried"
    }
    else if(!p_phone.test(values.phone)){
      errors.phone="Phone number must be 10 digits"
    }
    if(values.message===""){
      errors.message="Enter something..."
    }
    if(values.file===""){
      errors.file="This field not be an empty"
    }
    
    return errors;
  }
  const handleChange = (e) => {
    const newObj = { ...values, [e.target.name]: e.target.value }
    setValues(newObj);
  }

  return (
    <div className="max-w-screen-md mx-auto p-5">
      <div className="text-center mb-6">
        <div className="text-slate-500 font-bold mb-10 text-2xl">CONTACT US</div>
        <Label text="Submit your queries" />
      </div>
      <p></p>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <Input name="username" placeholder="Name*" error={errors.username} value={values.username} onChange={handleChange} />
          <Input name="email" placeholder="Email*" error={errors.email} value={values.email} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-4">
          <div className="">
            <Input placeholder="+91" disabled={true}/>
          </div>
          <div className="col-span-3">
            <Input name="phone" placeholder="Phone*" type="number" error={errors.phone} value={values.phone} onChange={handleChange} />
          </div>
        </div>
        <div className="grid grid-cols-1">
          <Textarea name="message" placeholder="write your queries here ..." error={errors.message} value={values.message} onChange={handleChange} />
          <Input name="file" type="file" error={errors.file} value={values.file} onChange={handleChange} classes="file:bg-bgColor file:p-2 file:rounded-l-full file:text-white file:font-bold file:cursor-pointer file:-ml-4 file:-my-2 file:border-0" />
        </div>
        <div className="flex justify-center">
          <Button text="submit" classes="text-center" />
        </div>
      </form>
    </div>
  );
};

// export default Contact;
