import { useState, useEffect } from "react";
import Header from "../../components/header";
import MobileFooter from "../../components/MobileFooter";
import { signIn, useSession, signOut } from "next-auth/react";
import Post from "../../components/Post";
import { getProviders, signIn as logIn } from "next-auth/react";
import { db } from "../../firebase";
import Modal from "../../components/Modal";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  where,
} from "@firebase/firestore";
function Profile() {
  const { data: session, status } = useSession();
  console.log(session);

  const [Data, setData] = useState([]);
  //console.log(session.user.id);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        where("useremail", "==", session.user.email),
        orderBy("timestemp", "desc")
      ),
      (snapshot) => {
        setData(snapshot.docs);
      }
    );

    return () => {
      unsubscribe;
    };
  }, [db]);

  console.log(Data);
  return (
    <div>
      {session ? (
        <>
          <Header />
          <Modal />
          <div className="grid grid-cols-1 mx-7  xl:max-w-6xl ">
            <div className="flex items-center space-x-4 mt-7 mb-7">
              <img
                alt="user profile pic"
                src={session.user.image}
                className="h-10 w-10 rounded-3xl cursor-pointer profile"
                objectFit="fit"
              />
              <p>{session.user.name}</p>
            </div>
            <div
              className={
                Data.length > 0 ? `grid justify-center grid-cols-3` : ""
              }
            >
              {console.log(Data.length + " lng")}
              {Data.length > 0 ? (
                Data.map((data) => (
                  <div id={data.id} className="p-1">
                    <img src={data.data().image} />
                  </div>
                ))
              ) : (
                <div>
                  <p>Oops, you didnt' share any posts yet..</p>
                </div>
              )}
            </div>
            <MobileFooter />
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Profile;
