import { Button, Input } from "../../../components";

export const SignupForm = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
}) => {
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
        <Button text="Sign Up" />
      </div>
    </form>
  );
};

export default SignupForm;
