import "../styles/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import { ProtectedRoute } from "../components";
import Layout from "./Layout";

const noAuthRequired = ["/login", "/signup"];

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    // <AuthContextProvider>
    //   {noAuthRequired.includes(router.pathname) ? (
    //     <Component {...pageProps} />
    //   ) : (
    //     <ProtectedRoute>
    //       <Component {...pageProps} />
    //     </ProtectedRoute>
    //   )}
    // </AuthContextProvider>

    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
