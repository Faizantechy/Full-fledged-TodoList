import React, { useState } from "react";

function Inbox({setIsOpen, isOpen}) {
  const [isCompleted, setisCompleted] = useState(true);
  return (
    <div className="w-[45%] h-screen border-1 border-black px-5 py-5">
      <div className="icon-text flex gap-4 text-2xl font-semibold items-center ">
        <i className="ri-menu-unfold-line px-1 py-1 hover:bg-gray-200" onClick={()=>{

            setIsOpen(!isOpen)
        }}></i>
        <h2>Inbox</h2>
      </div>

      <div className="input w-full px-4 py-3 text-sm rounded-lg bg-gray-100 mt-5">
        <input
          type="text"
          className="w-full task-input border-none text-gray-400 outline-none"
          placeholder='+ Add tasks to "inbox"'
        />
      </div>

      <div className="tasks px-2 py-9 flex flex-col gap-4">
        <li
          className={`${
            isCompleted ? "bg-amber-200 " : "bg-gray-100"
          } list-none px-4 py-2 rounded-lg  hover:bg-gray-200 w-full flex gap-2 items-center`}
        >
          {" "}
          <i
            className={`${
              isCompleted ? "ri-checkbox-fill" : "ri-checkbox-blank-line"
            } complete text-lg`}
            onClick={() => {
              setisCompleted(!isCompleted);
            }}
          ></i>
          Reading
        </li>
        <li className="list-none px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 w-full">
          Reading
        </li>
      </div>
    </div>
  );
}

export default Inbox;
