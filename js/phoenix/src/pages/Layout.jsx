import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { Navbar } from "../containers";

export default function Layout({ children }) {
  // const [user, setUser] = useState(false);
  let user = false;
  useEffect(() => {
    if (!user) {
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
      // setUser(true);
      user = true;
    }
  }, []);
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
