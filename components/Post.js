import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  setDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import { async } from "@firebase/util";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import Moment from "react-moment";
import InputEmoji from "react-input-emoji";

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [comment, setcomment] = useState("");
  const [comments, setcomments] = useState([]);
  const [like, setlike] = useState([]);
  const [liked, setliked] = useState(false);
  {
    /*likes*/
  }
  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts", id, "likes"), orderBy("timestemp", "desc")),
      (snapshot) => setlike(snapshot.docs)
    );
  }, [db, id]);

  const likedPost = async () => {
    //console.log("COMMENT");
    //e.preventDefault();
    if (liked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.name,
        useemail: session.user.email,
        timestemp: serverTimestamp(),
      });
    }
  };
  {
    /*if user liked a post*/
  }
  useEffect(() => {
    setliked(like.findIndex((like) => like.id === session?.user?.uid) !== -1);
  }, [like]);
  //console.log(setliked);
  {
    /*comments*/
  }
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestemp", "desc")
      ),
      (snapshot) => setcomments(snapshot.docs)
    );
  }, [db, id]);

  const sendComment = async (e) => {
    //console.log("COMMENT");
    //e.preventDefault();
    const commentToSend = comment;

    setcomment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.name,
      useemail: session.user.email,
      userImage: session.user.image,
      timestemp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
      <div className="flex items-center p-5">
        <img
          src={userImg}
          className="rounded-full h-16 w-16 border p1 mr-3"
          layout="fill"
        />
        <p className="flex-1 font-medium">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      <div>
        <img src={img} className="m-auto object-cover w-full" />
      </div>

      <div className="flex  p-4 justify-between">
        <div className="flex space-x-4">
          <div className="flex items-center flex-col">
            {liked ? (
              <HeartIconFilled
                onClick={likedPost}
                className="btn text-red-700"
              />
            ) : (
              <HeartIcon onClick={likedPost} className="btn" />
            )}
            {like.length > 0 && (
              <p className="font-bold mb-1 text-xs">{like.length} likes</p>
            )}
          </div>
          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn" />
        </div>
        <BookmarkIcon className="btn" />
      </div>

      <p className="p-4 truncate">
        <span className="font-medium mr-1">{username} </span>
        {caption}
      </p>

      {/*comment */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <p className="font-normal flex-1">
                <span className="font-medium">{comment.data().username} </span>
                {comment.data().comment}
              </p>
              <Moment className="text-xs pr-5" fromNow>
                {comment.data().timestemp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      <form className="flex items-center p-4">
        <InputEmoji
          type="text"
          value={comment}
          onChange={setcomment}
          cleanOnEnter
          onEnter={sendComment}
          className="border-none flex-1 focus:ring-0"
          placeholder="Add a comment..."
        />
        <button
          id="SubBtn"
          type="submit"
          className="font-semibold text-blue-700 rounded-lg cursor-pointer disabled:cursor-default disabled:text-gray-400"
          disabled={!comment.trim()}
          onClick={sendComment}
        >
          Comment
        </button>
      </form>
    </div>
  );
}

export default Post;
