import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-hot-toast";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ContentModal = ({
  openModal,
  closeModal,
  afterOpenModal,
  modalIsOpen,
  subtitle,
  urlAnalytics,
}: any) => {

    console.log(urlAnalytics);
    
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
          >
              <div className="flex justify-between flex-col gap-3">
                  <h1 className="text-lg font-semibold">{ urlAnalytics?.redirectShortUrl}</h1>   
                  <div className="flex">
                      <h1 className="text-lg font-semibold">Total Clicks  -- &nbsp;</h1>
                      <h1 className="text-[red]">{ urlAnalytics?.totalClicks}</h1>
                  </div>
              </div>
       
      </Modal>
    </div>
  );
};
export default ContentModal;
