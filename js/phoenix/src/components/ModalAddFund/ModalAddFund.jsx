import React, { useEffect, useState } from "react";

import { Button, Datepicker } from "../../components";
import { AddPortfolioFunds } from "../../containers";
import { auth } from "../../config/firebase";

export function ModalAddFund() {
  const [showModal, setShowModal] = React.useState(false);
  const [navData, setNavData] = useState({});
  const [value, setValue] = useState(0);
  const [navValue, setNavValue] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [date, setDate] = useState(new Date());
  const [transactionType, setTransactionType] = useState("Buy");
  const [type, setType] = useState("mutual fund");

  useEffect(() => {
    if (Object.keys(navData).length) {
      fetch(
        `http://127.0.0.1:5000/api/mutualfund/${navData.value}/navdata/${formatDate(date)}`
      )
        .then((response) => response.json())  
        .then((data) => {
          setValue(data), setNavValue(data);
        })
        .catch((error) => {
          console.log("no data available on selected search" + error);
        });
    }
  }, [navData, date]);
  
  // console.log("Q ", quantity, " n ", navValue," v ",value);
  function formatDate(date) {
    let d = new Date(date);
    let day = ("0" + d.getDate()).slice(-2);
    let month = ("0" + (d.getMonth() + 1)).slice(-2);
    let year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    if (Object.keys(navData).length) {
      setValue(quantity * navValue);
    }
  }, [quantity]);

  useEffect(() => {
    if (Object.keys(navData).length) {
      setQuantity(value / navValue);
    }
  }, [value]);

  const handleClose = () => {
    setShowModal(false);
    setQuantity(0);
    setDate(new Date());
  };

  const handleNavData = (data) => {
    setNavData(data);
    setQuantity(1);
  };
  const onOptionChange = (e) => {
    setTransactionType(e.target.value);
  };

  const handleAddFund = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        userId: auth.currentUser.uid,
        category:type,
        schemeCode: navData.value,
        quantity: quantity,
        transactionType: transactionType,
        date: date,
        navValue: navValue,
        transactionValue: value,
      }),
    };
    fetch("http://127.0.0.1:5000/api/transaction", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    setShowModal(false);
  };

  return (
    <>
      <Button
        type="button"
        classes={["text-sm", "md:text-lg", "pl-5", "pr-5", "md:pl-10", "md:pr-10"]}
        handleClick={() => setShowModal(true)}
        text="Add Transaction"
      />
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-3 sm:mx-0">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Transaction</h3>
                  <button
                    className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <div className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </div>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <AddPortfolioFunds
                    setNavData={handleNavData}
                    setQuantity={setQuantity}
                    setValue={setValue}
                    setDate={setDate}
                    setType={setType}
                    quantity={quantity}
                    date={date}
                    value={value}
                    type={type}
                    transactionType={transactionType}
                    onOptionChange={(e) => {
                      onOptionChange(e);
                    }}
                  />
                </div>
                {/*footer*/}
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
                    onClick={handleAddFund}
                  >
                    Add Fund
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
