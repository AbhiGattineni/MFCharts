import { useState } from "react";
import { Input, Button, Label } from "../components";
import { Textarea } from "../components/TextArea/Textarea";
import { BareIcon } from "../components";
import {BsFillCloudUploadFill} from "react-icons/bs"

export default function Contact() {
  const [values, setValues] = useState({
    username: "",
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
    if (values.username2 === "") {
      errors.username2 = "Name is required"
    }
    else if(values.username2.length<4){
      errors.username2 = "Name should contain minimum 4 characters"
    }
    else if(p_name.test(values.username)){
      errors.username2 = "Name should not contain special characters"
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
        <div className="text-slate-800 font-bold mb-2 text-xl">CONTACT US</div>
          <div className="text-slate-600">
        <Label text="Any questions or remarks? Just write a message" />
      </div>
      </div>
      <p></p>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-10">
          <Input name="username" placeholder="First name" error={errors.username} value={values.username} onChange={handleChange} />
          <Input name="username2" placeholder="Last name" error={errors.username2} value={values.username2} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2 gap-10">
          <Input name="email" placeholder="Email" error={errors.email} value={values.email} onChange={handleChange} />
          <Input name="phone" placeholder="Phone" type="number" error={errors.phone} value={values.phone} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-1">
          <Textarea name="message" placeholder="Message" error={errors.message} value={values.message} onChange={handleChange} />
          <Input name="file" type="file" error={errors.file} value={values.file} onChange={handleChange} classes="file:bg-bgColor file:p-2 file:rounded-full file:text-black file:cursor-pointer file:pl-8 file:pr-8 file:mr-5 file:-ml-4 file:-my-2 file:border-0 border-white focus:border-white file:border-radius:0px" />
          {/* <BareIcon
             IconComponent={<BsFillCloudUploadFill />}
             classes={["h-5 my-0 mx-0"]}
          /> */}
        </div>
        <div className="flex justify-center">
          <Button text="submit" classes="text-center" />
        </div>
      </form>
    </div>
  );
};

// export default Contact;
