import Post from "./Post";
import { useState, useEffect } from "react";
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { db } from "../firebase";

function Posts() {
  const [postsData, setpostsData] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestemp", "desc")),
      (snapshot) => {
        setpostsData(snapshot.docs);
      }
    );

    return () => {
      unsubscribe;
    };
  }, [db]);

  return (
    <div>
      {postsData.map((data) => (
        <Post
          key={data.id}
          id={data.id}
          username={data.data().username}
          userImg={data.data().profileImg}
          img={data.data().image}
          caption={data.data().caption}
        />
      ))}
    </div>
  );
}

export default Posts;
