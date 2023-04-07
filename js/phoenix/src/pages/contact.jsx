import { Input, Button, Label } from "../components";

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
          <textarea className="bg-gray-200 appearance-none border-2 border-gray-300 rounded-full w-full py-2 px-4 bg-inherit text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-bgColor mb-6" placeholder="write your queries here..."/>
          <input className="m-2" type="file"/>
        </div>
      </form>
      <div className="flex justify-center">
        <Button text="submit" classes="text-center"/>
      </div>
    </div>
  );
};

export default Contact;
