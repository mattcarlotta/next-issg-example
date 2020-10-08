import Head from "next/head";
import { ToastContainer } from "react-toastify";
import GlobalStylesheet from "~styles/globalStylesheet";
import "react-toastify/dist/ReactToastify.css";
import { AppProps, FC } from "~types";

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
    </Head>
    <main id="app">
      <Component {...pageProps} />
    </main>
    <GlobalStylesheet />
    <ToastContainer
      position="top-right"
      autoClose={7500}
      hideProgressBar={false}
      newestOnTop={false}
      draggable
      pauseOnHover
    />
  </>
);

export default App;
