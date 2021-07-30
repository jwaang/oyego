import { AnimatePresence } from "framer-motion";
import { Provider } from "next-auth/client";
import "react-responsive-modal/styles.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </Provider>
  );
}

export default MyApp;
