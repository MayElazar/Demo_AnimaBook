import { async } from "@firebase/util";
import { getProviders, signIn as logIn } from "next-auth/react";

import { getSession } from "next-auth/react";
import Header from "../../components/header";

function SignIn({ providers }) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center mt-7">
        <h2>Wellcome to AnimaBook!</h2>

        {/* <form className="flex flex-col ">
          Email: <input type="text" />
          Password: <input type="text" />
          <button className="p-3 bg-red-600 rounded-md text-white  my-7">
            Signin
          </button>
        </form>
        <p>Or</p>*/}
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="p-3 bg-red-600 rounded-md text-white  mt-7 mb-7"
              onClick={() => logIn(provider.id, { callbackUrl: "/" })}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
        <p className="p-4">
          **This is not a real app it's build for educational purposes (although
          it works like one) ;)
        </p>
      </div>
    </>
  );
}
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

export default SignIn;
