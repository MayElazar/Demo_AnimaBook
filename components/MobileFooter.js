import { HomeIcon, HeartIcon, UploadIcon } from "@heroicons/react/solid";
import router, { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { signIn, useSession, signOut } from "next-auth/react";
function MobileFooter() {
  const [Modalopen, setModalopen] = useRecoilState(modalState);
  const { data: session, status } = useSession();
  return (
    <div className="bg-white  max-w-full justify-around   bottom-0  left-0 sticky right-0 z-30 border-gray-100 border-t-2   md:hidden">
      <div className="flex justify-evenly space-x-4  m-auto mb-5 pt-2 pb-4">
        <div
          className="flex items-center col-auto flex-col"
          onClick={() => router.push("/")}
        >
          <HomeIcon className="MobileMenuBtn" />
          <span className="text-sm">בית</span>
        </div>
        <div className="flex items-center col-auto flex-col">
          <UploadIcon
            className="MobileMenuBtn"
            onClick={() => (session ? setModalopen(true) : setModalopen(false))}
          />
          <span className="text-sm">שיתוף</span>
        </div>
        <div className="flex items-center col-auto flex-col">
          <HeartIcon className="MobileMenuBtn" />
          <span className="text-sm">לייק</span>
        </div>
      </div>
    </div>
  );
}

export default MobileFooter;
