import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/header";
import MobileFooter from "../components/MobileFooter";
import Modal from "../components/Modal";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>AnimaBook - social media for your pets</title>
        <link rel="icon" href="./img/logo.png" />
      </Head>

      <Header />

      <Feed />
      <Modal />
      <MobileFooter />
    </div>
  );
}
