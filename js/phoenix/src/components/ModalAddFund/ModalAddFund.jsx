import React, { useEffect, useState } from "react";
import { Button, Datepicker } from "../../components";
import { AddPortfolioFunds } from "../../containers";
import { auth } from "../../config/firebase";
import { BASE_URL, formatDate, yesterday } from "../Constant";
import Notification from "../Notification/Notification";

export function ModalAddFund() {
  const [showModal, setShowModal] = React.useState(false);
  const [navData, setNavData] = useState({});
  const [value, setValue] = useState(0);
  const [navValue, setNavValue] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [date, setDate] = useState(yesterday);
  const [navDate, setNavDate] = useState(new Date());
  const [transactionType, setTransactionType] = useState("Buy");
  const [type, setType] = useState("mutual fund");
  const [navType, setNavType] = useState(type);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (Object.keys(navData).length) {
      fetch(
        `${BASE_URL}/mutualfund/${navData.value}/navdata/${formatDate(date)}`
      )
        .then((response) => response.json())
        .then((data) => {
          setValue(data), setNavValue(data);
        })
        .catch((error) => {
          showToast("no data available on selected search", "error");
          console.log("no data available on selected search" + error);
        });
      if (navData.date) {
        setNavDate(navData.date[0].date);
        setNavType(navData.category);
      }
    }
  }, [navData, date, navType]);
  console.log(navData);

  const addTimeline = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const current = new Date();
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        schemeCode: navData.value,
        userId: auth.currentUser.uid,
        date: `${current.getFullYear()}-${current.getMonth() + 1
          }-${current.getDate()}`,
        description: transactionType+" - the transaction with amount - "+navValue
      }),
    };
    fetch("http://127.0.0.1:5000/api/portfolio/addtimeline", requestOptions)
      .then((response) => response.json())
      .then((data) => {console.log(data)})
      .catch((error) => console.error(error));
  };

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
  const showToast = (message, type) => {
    const newToast = { message, type, id: Date.now() };
    setToasts((prevToasts) => [...prevToasts, newToast]);
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== newToast.id));
    }, 3000);
  };

  const handleClose = () => {
    setShowModal(false);
    setQuantity(0);
    setValue(0);
    setDate(yesterday);
    setNavDate(new Date());
    setNavData({});
  };

  const handleNavData = (data) => {
    setNavData(data);
    setQuantity(1);
  };
  const onOptionChange = (e) => {
    setTransactionType(e.target.value);
    setQuantity(0);
    setValue(0);
    setDate(yesterday);
    setNavDate(new Date());
    setNavData({});
  };

  const handleAddFund = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        userId: auth.currentUser.uid,
        category: type,
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
      .then((data) => { console.log(data) })
      .catch((error) => { console.log(error.message) });

    addTimeline()
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
                    onClick={handleClose}
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
                    navDate={new Date(navDate)}
                    value={value}
                    type={type}
                    navType={navType}
                    transactionType={transactionType}
                    onOptionChange={(e) => {
                      onOptionChange(e);
                    }}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <Button
                    classes={navData.length === 0 || Object.keys(navData).length === 0 ? ["cursor-not-allowed", "opacity-80"] : ""}
                    handleClick={handleAddFund}
                    disabled={navData.length === 0}
                    text={transactionType}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {toasts.map((toast) => (
        <Notification key={toast.id} message={toast.message} type={toast.type} />
      ))}
    </>
  );
}
