import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { BareIcon, Button, Card, Dropdown, Input, Label, Separator, Table } from "../../components";
import { PortfolioGraph } from "../PortfolioGraph/PortfolioGraph";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../../../src/context/AuthContext";
import TodoList from "../../components/TodoList/TodoList";
import { LineGraph } from "../LineGraph/LineGraph";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";

export const DashboardDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [activeindex, setActiveIndex] = useState(1);
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [checked, setChecked] = useState([]);

  const Menu = [
    {
      id: 1,
      title: " All",
    },
    {
      id: 2,
      title: "Mutual",
    },
    {
      id: 3,
      title: "Equity",
    },
  ];

  useEffect(() => {
    fetch(
      `http://127.0.0.1:5000/api/overallPortfolioStat/${auth.currentUser.uid}`
    )
      .then((response) => response.json())
      .then((data) => {
        setDashboardData(data);
      });
  }, []);

  const handleClick = (index) => { setActiveIndex(index) };
  const checkActive = (index, className) =>
    activeindex === index ? className : "w-20";

  const handleCheck = (id) => {
    if (checked.includes(id)) {
      setChecked(checked.filter(function (e) { return e !== id }));
    }
    else {
      setChecked(checked => [...checked, id]);
    }
  }
  const submitHandler = () => {
    let len = todos.length;
    setTodos(todos => [...todos, { id: len, data: task }]);
    setTask("");
  }

  const deleteHandler = () => {
    setTodos(todos.filter(function(e) { return !checked.includes(e.id)}));
  }
  return (
    <div className="mx-5">
      <div className="flex flex-col md:flex-row justify-between items-center my-5">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">Welcome {auth.currentUser.displayName}</h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="bg-white border border-gray-800 flex items-center rounded-full px-1 py-1 w-60 md:w-auto">
            {Menu.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`${checkActive(
                  item.id,
                  "bg-bgColor w-20 py-2 font-medium rounded-full text-white-600 drop-shadow-md"
                )}`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-bgColor rounded-lg p-6 mb-5 h-72">
        <h1 className="text-2xl font-bold mb-5 ml-4">Details</h1>
        <h3 className="text-xl font-medium mb-5 ml-4">Shares : 10</h3>
        <h3 className="text-xl font-medium mb-5 ml-4">Invested : ₹ 20000</h3>
        <h4 className="text-xl font-medium mb-5 ml-4">Profit/loss : ₹ 10000</h4>
        <h1 className="text-2xl font-bold ml-4">Total Amt : ₹ 30000</h1>
      </div>
      <div className="">
        <h1 className="text-2xl font-bold my-3">To-do's</h1>
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="">
            <select className="p-2 rounded bg-bgColor w-28 border-2 border-black">
              <option className="bg-white">All</option>
              <option className="bg-white">Mutual</option>
              <option className="bg-white">Equity</option>
            </select>
          </div>
          <div className="flex items-center">
            <Input
              type="text"
              classes="mt-0 mb-0 rounded-r-none border-r-0 py-0 h-10"
              placeholder="Add Todo"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Button
              handleClick={submitHandler}
              classes={["text-base", "border-2 border-gray-600", "pl-2", "pr-2", "border-l-0", "rounded-l-none", "py-0", "font-medium", "h-10", "shadow-none"]}
              text="+Todo"
            />
            <div onClick={deleteHandler} className="bg-red-600 text-white rounded-full mx-2 hover:bg-red-700 drop-shadow-md cursor-pointer">
              <BareIcon
                IconComponent={<RiDeleteBin5Line />}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`${todos.length ? "border-2" : null} border-gray-600 max-w-lg my-2 rounded-lg divide-y divide-black`}>
        {todos.map((data) => (
          <div key={data.id} className="p-2 flex items-center">
            <div onClick={() => handleCheck(data.id)} className="mx-5 cursor-pointer">
              {checked.includes(data.id) ? <BsCheckCircleFill className="text-green-500" /> : <BsCheckCircle />}
            </div>
            <p className={`${checked.includes(data.id)?"opacity-30":null}`}>{data.data}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
