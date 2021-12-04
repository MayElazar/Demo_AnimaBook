import faker from "faker";
import { useEffect, useState } from "react";
import Story from "./story";
import { useSession } from "next-auth/react";

function Stories() {
  const [suggestions, setsuggestions] = useState([]);
  const { data: session } = useSession();
  // const [userImg, setuserImg] = useState([]);
  /*use effect */

  useEffect(() => {
    const userImg = [...Array(20)].map(() => ({
      ...faker.image.animals(),
    }));
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
      Userimg: `${faker.image.animals()}?random=${Math.random() * 10000}`,
    }));
    setsuggestions(suggestions);

    //  console.log(suggestions);
    //console.log(userImg);
    // setuserImg(userImg);
  }, []);

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-300">
      {session && (
        <Story Userimg={session.user.image} username={session.user.name} />
      )}
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          Userimg={profile.Userimg}
          username={profile.username}
        />
      ))}
    </div>
  );
}

export default Stories;
