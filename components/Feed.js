import Stories from "./Stories";
import Posts from "./Posts";
import { useSession } from "next-auth/react";
function Feed() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-1 md:max-w-3xl xl:grid-cols-2 xl:max-w-6xl mx-auto">
      <section className="col-span-2">
        {/*stories*/}
        {/*<Stories />*/}
        {/*posts*/}
        <Posts />
      </section>
      <section>
        {/*mini profile*/}
        {/*segustions*/}
      </section>
    </main>
  );
}

export default Feed;
