import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { BareIcon, Button, Card, Dropdown, Input, Label, Separator, Table } from "../../components";
import { PortfolioGraph } from "../PortfolioGraph/PortfolioGraph";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../../../src/context/AuthContext";
import TodoList from "../../components/TodoList/TodoList";
import { LineGraph } from "../LineGraph/LineGraph";
import { RiDeleteBin5Line } from "react-icons/ri";
// import { BareIcon } from "../components";

export const DashboardDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserName(user.displayName);
        setEmail(user.email);
      }
    });
  }, []);

  useEffect(() => {
    fetch(
      `http://127.0.0.1:5000/api/overallPortfolioStat/${auth.currentUser.uid}`
    )
      .then((response) => response.json())
      .then((data) => {
        setDashboardData(data);
      });
  }, []);

  useEffect(() => {
    console.log("dd", dashboardData);
  }, [dashboardData]);
  const [activeindex, setActiveIndex] = useState(1);
  const handleClick = (index) => { setActiveIndex(index) };
  const checkActive = (index, className) =>
    activeindex === index ? className : "w-20";

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const changeHandler = e => {
    setTask(e.target.value)
  }

  const submitHandler = e => {
    e.preventDefault();
    console.log("todos", todos)
    setTodos(todos => [...todos, task]);
    setTask("");
  }

  const deleteHandler = (indexValue) => {
    const newTodos = todos.filter((todo, index) => index !== indexValue);
    setTodos(newTodos);
  }

  const todosdata = [
    'Once check the Apple shares',
    'Sell the Tata shares by 12/05/2023',
    'Check ICICI watchlist again',
    'shares',
  ];

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

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center my-5 ml-3 mr-3">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">Welcome {userName}</h1>
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
      <div className="bg-bgColor rounded-lg p-6 mr-4 ml-4 mb-5 h-72">
        <h1 className="text-2xl font-bold mb-5 ml-4">Details</h1>
        <h3 className="text-xl font-medium mb-5 ml-4">Shares : 10</h3>
        <h3 className="text-xl font-medium mb-5 ml-4">Invested : ₹ 20000</h3>
        <h4 className="text-xl font-medium mb-5 ml-4">Profit/loss : ₹ 10000</h4>
        <h1 className="text-2xl font-bold ml-4">Total Amt : ₹ 30000</h1>
      </div>
      <div className="ml-5 mt-2">
        <h1 className="text-2xl font-bold">To-do's</h1>
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-3 mt-4 mr-3">
            <select className="p-2 rounded md:w-32 bg-bgColor">
              <option className="bg-white">All</option>
              <option className="bg-white">Mutual</option>
              <option className="bg-white">Equity</option>
            </select>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-3 mt-2">
            <div className="flex ml-5">
              <Input
                type="text"
                classes="rounded-full rounded-r-none border-r-0"
                placeholder="Add todo"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <Input
                onClick={submitHandler}
                classes="bg-cyan-200 rounded-full rounded-l-none cursor-pointer border-l-0"
                type="submit"
                value="+Todo"
              />
              <div className="flex ml-2 mt-5 rounded-full logo text-white border-2 px-2 py-3 bg-red-600 h-12 mr-8">
                <BareIcon
                  IconComponent={<RiDeleteBin5Line />}
                  classes={["h-5 my-0 mx-0"]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-2 border-gray-600 max-w-lg ml-5 mr-4 mt-1">
        {todos.map((data) => (
          <div key={data} className="border-2 border-black">
            {data}
          </div>
        ))}
      </div>
    </div>
  );
};
