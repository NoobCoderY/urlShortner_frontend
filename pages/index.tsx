import React from "react";
import { GiClick } from "react-icons/gi";
import axios from "axios";
import toast from "react-hot-toast";
import  { useRouter } from "next/router";

export default function Home() {
  const [shortUrl, setShortUrl] = React.useState<string>("");
  const [longUrl, setLongUrl] = React.useState<string>("");
  const router = useRouter();
  const urltoshortid = async () => {
  
    try {
      await axios
        .post("http://localhost:8000/api/v1/shorten", {
          url: longUrl,
        })
        .then((data) => {
          setShortUrl(data.data.shortID)
          toast.success("successfully convert");
        });
    } catch (error: any) {
      toast.error(error.response.data.err);
    }
  };

  const redirectPage = async () => {
    try {
      window.open(`http://localhost:8000/api/v1/${shortUrl}`, "_blank");
    } catch (error) {
      console.log(error);

      toast.error(error as string);
    }
  };

  return (
    <>
      <div className="w-full">
        <h1 className="text-center text-4xl mt-10 font-bold text-[#0186da]">
          Short Url
        </h1>
        <div className="flex justify-end mr-3">
          <div className=" border-[1px] text-[white] py-2 px-2 bg-[#0186da] rounded-[5px] cursor-pointer" onClick={() => {
            router.push("/all")
          }}> Get All Shortend Urls</div>
        </div>
        <div className=" mt-10 flex justify-center ">
          <div className="px-[3rem] py-[1.5rem] flex flex-col gap-5 main">
            <h1 className="text-center text-4xl font-semibold ">
              Paste the URL to be shortened
            </h1>
            <div className="flex gap-4 mt-4">
              <input
                type="text"
                className="w-[70%] px-4 py-2  border-[1px] border-[brown] border-solid outline-none rounded-[5px] "
                onChange={(e) => {
                  setLongUrl(e.target.value);
                }}
                value={longUrl}
              />
              <button
                className="py-[0.5rem] px-[0.8rem] text-lg bg-[#0186da] rounded-[5px] text-[white]"
                onClick={() => {
                  urltoshortid();
                }}
              >
                Shorten Url
              </button>
            </div>
            <div className="flex flex-col gap-5 justify-center">
              <h1 className="text-2xl font-bold text-center text-[#0186da]">
                Shorten-Url{" "}
              </h1>
              {shortUrl.length > 0 && (
                <div className="border-[1px] border-[brown] border-solid px-[1rem] py-2 text-center flex justify-center items-center gap-4  m-auto rounded-[5px]">
                  <h1>{shortUrl}</h1>
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      redirectPage();
                    }}
                  >
                    <GiClick size={20} />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
