import React, { useEffect, useState } from "react";
import { BsSave } from "react-icons/bs";

import { BareIcon, Button, FetchAllWatchlists, Input } from "../../components";

export function ModalSave({ saveData }) {
  const [showModal, setShowModal] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [showExisting, setShowExisting] = React.useState(false);
  const [saveLabel, setSaveLabel] = useState("");

  const handleSave = () => {
    setShowModal(false);
    setShowNew(false);
    setShowExisting(false);
    saveData(saveLabel);
  };

  const handleClose = () => {
    setShowNew(false);
    setShowExisting(false);
    setShowModal(false);
  };

  const [selectedWatchlist, setSelectedWatchlist] = useState("");
  const [wlNavData, setWlNavData] = useState([]);
  
  useEffect(() => {
    let wlNavData = [];
    fetch(`http://127.0.0.1:5000/api/wlnavdata/${selectedWatchlist}`)
      .then((response) => response.json())
      .then((data) => {
        setWlNavData(data);
      })
      .catch((error) => console.error(error));
  }, [selectedWatchlist]);


  return (
    <>
      <div>
        <div onClick={() => setShowModal(true)} className="bg-bgColor rounded-md py-2 px-2 cursor-pointer text-sm md:text-base font-medium text-center md:w-40">Add Watchlist</div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-3 sm:mx-0">
            <div className="relative w-auto my-3 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add to watchlist
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleClose}
                  >
                    <div className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </div>
                  </button>
                </div>
                <div className="p-3">
                  <Button handleClick={() => { setShowNew(true); setShowExisting(false) }} disabled={showNew} text="New watchlist" classes={[`mx-3 ${showNew ? "cursor-not-allowed":null}`]} />
                  <Button handleClick={() => { setShowExisting(true); setShowNew(false) }} disabled={showExisting} text="Add Existing" classes={[`mx-3 ${showExisting ? "cursor-not-allowed":null}`]} />
                </div>
                {/*body*/}
                {showNew ? (
                  <div className="relative p-6 flex-auto">
                    <Input
                      placeholder={"Enter label you want to save"}
                      classes={["rounded"]}
                      onChange={(e) => setSaveLabel(e.target.value)}
                      autoFocus={true}
                    />
                  </div>) : null
                }
                {showExisting ? (
                  <div className="relative p-6 flex-auto">
                    <div>
                      <FetchAllWatchlists setSelectedWatchlist={setSelectedWatchlist} />
                    </div>
                  </div>) : null
                }
                {/*footer*/}
                {showNew || showExisting ? (
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleClose}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>) : null
                }
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
