import { Input, Button, Label } from "../components";
import { Textarea } from "../components/TextArea/Textarea";

const Contact = () => {
  return (
    <div className="max-w-screen-md mx-auto p-5">
      <div className="text-center mb-6">
        <div className="text-slate-500 font-bold mb-10 text-2xl">CONTACT US</div>
        <Label text="Submit your queries"/>
      </div>
      <form className="w-full">
        <div className="grid grid-cols-2 gap-5">
          <Input placeholder="Name*"/>
          <Input placeholder="Email*" type="email"/>
        </div>
        <div className="grid grid-cols-4">
          <div className="">
            <Input placeholder="+91"/>
          </div>
          <div className="col-span-3">
            <Input placeholder="Phone*"/>
          </div>
        </div>
        <div className="grid grid-cols-1">
          <Textarea placeholder="write your queries here ..."/>
          <Input type="file" classes="file:bg-bgColor file:p-2 file:rounded-full file:text-white file:font-bold file:cursor-pointer"/>
        </div>
      </form>
      <div className="flex justify-center">
        <Button text="submit" classes="text-center"/>
      </div>
    </div>
  );
};

export default Contact;
