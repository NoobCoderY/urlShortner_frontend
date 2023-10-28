import Link from "next/link";
import React,{useState,useEffect} from "react";
import { GiClick } from "react-icons/gi";
import axios from "axios";
import { useRouter } from "next/router";
import ContentModal from "@/component/ContentModal";
import { toast } from "react-hot-toast";

const All = () => {
  
    const [allUrl, setallUrl] = useState<any>();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalId, setModalId] = useState("")
     const[urlAnalytics,setUrlAnalytics]=useState()

  function openModal() {
    setIsOpen(true);
  }

    
  let subtitle: any;
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const fetechALlUrls = async () => {
    await axios.get("http://localhost:8000/api/v1/getall").then((data) => {
      console.log(data.data.allUrl);
      setallUrl(data.data.allUrl);
    });
  };

  React.useEffect(() => {
    fetechALlUrls();
  }, []);
    
  const fetechUrl = async () => {
      if (modalId.length == 0) {
      return
      }
      try {
        await axios.get(`http://localhost:8000/api/v1/analytics/${modalId}`).then((data) => {
            setUrlAnalytics(data.data)
          });
       } catch (error:any) {
        toast.error(error?.response?.data.err);
       }
   };
 
   React.useEffect(() => {
    fetechUrl();
  }, [modalId]);
  return (
    <>
      <div className="w-full px-4">
        <h1 className="text-center text-4xl mt-10 font-bold text-[#0186da]">
          All URLS
        </h1>
        <div className=" my-4">
          {allUrl?.map((allUrlData: any, index: number) => {
            return (
              <div className="flex justify-between mx-3 my-2 border-[brown] border-solid  border-[1px] px-3 py-2 main " key={`${allUrlData+index}`}>
                <h1 className="text-lg font-semibold basis-[45%]">
                  {allUrlData.redirectURL}{" "}
                </h1>
                <h1 className="text-lg font-semibold basis-[30%]">
                  {allUrlData.shortId}
                </h1>

                <div
                  className="cursor-pointer text-[#0186da] text-lg font-bold flex justify-center items-center gap-2 basis-[25%]"
                        onClick={() => {
                            setModalId(allUrlData.shortId)
                            openModal()
                  }}
                >
                  Click for more information
                  <GiClick />
                </div>
              </div>
            );
          })}
        </div>
          </div>
          <ContentModal openModal={openModal} closeModal={closeModal} afterOpenModal={ afterOpenModal} modalIsOpen={modalIsOpen} subtitle={subtitle} urlAnalytics={urlAnalytics} />
    </>
  );
};

export default All;
