import React, { useEffect, useState } from 'react'
import { Button, Input } from '../components';
import { BiEdit } from "react-icons/bi";
import { BareIcon } from "../components";
import { GrLocation } from "react-icons/gr";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase"

export default function profile() {
    const [values, setValues] = useState({
        username: "Trinath Gundla",
        phone: "8522994206",
        address: "Hyderabad",
    })

    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [edit, setEdit] = useState(false);

    let handleEdit = () => { setEdit(!edit) };
    const resetValues = {
        username: "Trinath Gundla",
        phone: "8522994206",
        address: "Hyderabad",
    }
    const handleReset = () => { setValues(resetValues) };
    const handleChange = (e) => {
        const newObj = { ...values, [e.target.name]: e.target.value }
        setValues(newObj);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUserName(user.displayName);
                setEmail(user.email);
            } else {
                console.log("user is logged out");
            }
        });
    }, []);
    return (
        <div className='container mx-auto md:mt-5'>
            <div className="grid grid-cols-1 md:grid-cols-4 mx-10">
                <div className="flex justify-center p-3">
                    <div className="relative">
                        <img className='group rounded-full w-40 h-40 cursor-pointer' src='https://www.html.am/images/html-codes/links/boracay-white-beach-sunset-300x225.jpg' />
                        {/* <Button text="edit picture" classes={["absolute bottom-0 align-center left-5"]} /> */}
                    </div>
                </div>
                <div className="col-span-2 flex justify-center lg:justify-start p-3">
                    <div className="px-5 text-center md:text-left">
                        <div className="text-3xl font-bold">{userName}</div>
                        <div className="flex justify-center md:justify-start items-center">
                            <BareIcon
                                IconComponent={<GrLocation />}
                                classes={["h-4 my-0 mx-0"]}
                            />
                            <p className='ml-2'>hyderabad</p>
                        </div>
                        <div className="flex justify-center md:justify-start items-center mt-4 font-medium">
                            <BareIcon
                                IconComponent={<AiOutlineMail />}
                                classes={["h-5 my-0 mx-0"]}
                            />
                            <p className='ml-2'>{email}</p>
                        </div>
                        <div className="flex justify-center md:justify-start items-center font-medium mt-4">
                            <BareIcon
                                IconComponent={<BsTelephone />}
                                classes={["h-5 my-0 mx-0"]}
                            />
                            <p className='ml-2'>+91 8522994206</p>
                        </div>
                        <Button text="Change password" />
                    </div>
                </div>
                <div className="flex justify-center items-start p-3">
                    <button onClick={handleEdit} className="align-start">
                        <div className="flex items-center bg-bgColor rounded px-3 pr-6 cursor-pointer">
                            <BareIcon
                                IconComponent={<BiEdit />}
                            />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                                Edit
                            </span>
                        </div>
                    </button>
                </div>
            </div>
            {edit ?
                <div className="text-center mx-10 mt-10">
                    <div className="">EDIT PROFILE</div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                            <Input name="username" placeholder="Full Name" type="text" value={values.username} onChange={handleChange} />
                            <Input classes="cursor-not-allowed" name="Email" value={email} disabled={true} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                            <Input name="phone" type="text" placeholder="Phone" value={values.phone} onChange={handleChange} />
                            <Input name="address" type="text" placeholder="Address" value={values.address} onChange={handleChange} />
                        </div>
                        <div className="flex justify-between">
                            <Button classes={["bg-red-500"]} text="cancel" handleClick={handleReset} />
                            <Button classes={["bg-green-500"]} text="save changes" />
                        </div>
                    </form>
                </div>
                : null}

        </div>
    )
}
