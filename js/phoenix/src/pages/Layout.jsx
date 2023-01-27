import { useEffect } from "react";
import { auth } from "../config/firebase";
import { Navbar } from "../containers";

export default function Layout({ children }) {
  useEffect(() => {
    console.log("Layout");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        userId: auth.currentUser.uid,
      }),
    };
    fetch("http://127.0.0.1:5000/api/adduser", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
