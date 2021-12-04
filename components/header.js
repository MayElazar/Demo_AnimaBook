import Image from "next/image";
import {
  SearchIcon,
  HomeIcon,
  HeartIcon,
  UploadIcon,
  MenuIcon,
  UserGroupIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import { signIn, useSession, signOut } from "next-auth/react";
import router, { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { Link } from "next/link";

function Header() {
  const { data: session, status } = useSession();
  const [Modalopen, setModalopen] = useRecoilState(modalState);
  const router = useRouter();

  console.log(session);
  return (
    <div className="shadow-sm sticky bg-white top-0 z-50">
      <div className="flex justify-between  border-gray-100 border-b-2  max-w-full px-5">
        <div className=" cursor-pointer" onClick={() => router.push("/")}>
          <div className="relative hidden lg:inline-grid  w-36 h-24">
            <h1>
              <Image
                src="/img/logo-01.png"
                layout="fill"
                className="object-contain"
              />
              <img />
            </h1>
          </div>
          <div className="relative lg:hidden w-10 h-20 flex-shrink-0">
            <h1>
              <Image
                src="/img/logo2.png"
                layout="fill"
                className="object-contain"
              />
              <img />
            </h1>
          </div>
        </div>
        {/*search field */}
        <div className="max-w-xs flex items-center">
          <div className="relative mt-1 p-3 rounded-md ">
            <div className="flex items-center absolute inset-y-0  pl-3  pointer-events-none ">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <input
                type="text"
                // data
                placeholder="Search"
                className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:border-gray-600 ring-gray-600 rounded-md"
              />
            </div>
          </div>
        </div>

        {/*Icons */}

        <div className="flex items-center justify-end space-x-4  ">
          {!!session ? (
            <>
              <div className=" hidden md:flex items-center justify-end space-x-4  ">
                <div className="flex">
                  <HomeIcon
                    className="navBtn"
                    onClick={() => router.push("/")}
                  />
                  <UploadIcon
                    className="navBtn"
                    onClick={() => setModalopen(true)}
                  />
                  <HeartIcon className="navBtn" />
                </div>
                <MenuIcon className="h-10 w-10 md:hidden cursor-pointer" />
              </div>

              <button onClick={signOut} className="pl-4">
                Logout
              </button>
              <img
                alt="user profile pic"
                src={session.user?.image}
                className="h-10 w-10 rounded-3xl cursor-pointer profile object-contain"
                onClick={() => session && router.push("/auth/profile")}
              />
            </>
          ) : (
            <>
              <button onClick={signIn}>Signin</button>
              <UserCircleIcon className="h-8 w-8" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Header;
