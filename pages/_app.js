import "../styles/globals.css";
import { Provider } from "next-auth/client";
// import { AuthProvider } from "@/lib/auth.js";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
    // <AuthProvider>
    //   <Component {...pageProps} />
    // </AuthProvider>
  );
}

export default MyApp;
