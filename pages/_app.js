//import 'tailwindcss/tailwind.css'
import "../styles/global.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

//import { signup } from "firebase";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;