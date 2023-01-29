import "../styles/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { ProtectedRoute } from "../components";
import Layout from "./Layout";

const noAuthRequired = ["/login", "/signup"];

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
