import { Snapshot, useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import { CameraIcon } from "@heroicons/react/outline";
import { db, storage } from "../firebase";
import {
  addDoc,
  doc,
  collection,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import { useSession } from "next-auth/react";
import Post from "./Post";

function Modal() {
  const { data: session } = useSession();
  const [Modalopen, setModalopen] = useRecoilState(modalState);
  const [selectedFile, setselectedFile] = useState(null);
  const [loading, setloading] = useState(false);
  const FilePickerRef = useRef(null);

  const captionRef = useRef(null);

  const uploadPost = async () => {
    if (loading) return;
    setloading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      useremail: session.user.email,
      username: session.user.name,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestemp: serverTimestamp(),
    });

    console.log("New doc add with ID", docRef.id);

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadUrl,
        });
      }
    );
    setModalopen(false);
    setloading(false);
    setselectedFile(null);
  };

  const addImg = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setselectedFile(readerEvent.target.result);
    };
  };
  return (
    <Transition.Root show={Modalopen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setModalopen}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            {" "}
            &#8203
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full m-auto">
              <div>
                <XIcon
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => setModalopen(false)}
                />
                <div>
                  {selectedFile ? (
                    <img
                      src={selectedFile}
                      onClick={() => setselectedFile(null)}
                    />
                  ) : (
                    <div
                      onClick={() => FilePickerRef.current.click()}
                      className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-300 cursor-pointer"
                    >
                      <CameraIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-gray-900"
                      />
                    </div>
                  )}

                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900 w-full text-center"
                  >
                    Upload a Photo
                  </Dialog.Title>
                  <div>
                    <input
                      type="file"
                      hidden
                      ref={FilePickerRef}
                      onChange={addImg}
                    />
                  </div>
                  <div>
                    <input
                      className="border-none focus:ring-0 w-full text-center"
                      type="text"
                      ref={captionRef}
                      placeholder="Enter a caption..."
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    disabled={!selectedFile}
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-700 text-white font-medium hover:bg-blue-900 focus:outline-none disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                    onClick={uploadPost}
                  >
                    {loading ? "Uploading..." : "Upload Post"}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
