import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ isOpen, setIsOpen, profileIcon }) {
  console.log(profileIcon, "NAVBAR PROFILE ICON");
  const links1 = [
    { icon: "ri-checkbox-line" },
    { icon: "ri-timeline-view" },
    { icon: "ri-timer-line" },
    { icon: "ri-search-2-line" },
  ];

  const links2 = [
    { icon: "ri-refresh-line" },
    { icon: "ri-notification-2-line" },
  ];

  const links3 = [
    { label: "Today", icon: "ri-sun-line", route: "today" },
    {
      label: "Next 7 Days",
      icon: "ri-calendar-2-line",
      route: "/layout/next7days",
    },
    { label: "Inbox", icon: "ri-inbox-line", route: "/inbox" },
  ];

  const links4 = [
    { label: "Completed", icon: "ri-check-double-line" },
    { label: "Trash", icon: "ri-delete-bin-6-line" },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-[25%]" : "w-[70px]"
      }  h-screen     hidden lg:flex`}
    >
      <div
        className={`${
          isOpen ? "w-[20%]" : "w-fit"
        } part-1  px-2 h-screen py-2 flex flex-col justify-between gap-5 `}
      >
        <div className="links-1 space-y-4 py-4  flex-col  ">
          <div className="profile-icon w-[32px] h-[30px] rounded-[5px] bg-green-800  flex justify-center items-center font-semibold text-gray-200">
            <h2>{profileIcon ? profileIcon : "F"}</h2>
          </div>

          {links1.map((link) => {
            // if(link.icon==="ri-chat-check-line"){

            //   const iconElement=document.querySelector("")

            //   link.icon.addEventListener("click",()=>{

            //     alert("Got Clicked!")
            //   })
            // }

            return (
              <div className="text-2xl  items-center justify-center ml-1 ">
                {" "}
                <i
                  className={`
          ${link.icon} 
          cursor-pointer 
          hover:scale-[1.2] 
          transition-transform 
          duration-200
          ${link.icon === "ri-checkbox-fill" ? "filled-icon" : ""}
        `}
                ></i>
              </div>
            );
          })}
        </div>

        <div className="links-2 flex flex-col gap-4  ">
          {links2.map((link) => {
            return (
              <div className="text-2xl">
                {" "}
                <i className={link.icon}></i>{" "}
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={`${
          isOpen ? "visible" : "hidden"
        } part-2 flex  lg:flex-col w-fit lg:relative absolute  overflow-x-auto lg:overflow-x-hidden h-screen  px-4 py-4`}
      >
        <div className="part-1 space-y-5">
          {links3.map((link) => {
            return (
              <div className="flex  w-full px-2 py-1 rounded-lg  hover:bg-gray-200 items-center text-lg list-none">
                {" "}
                <NavLink to={`${link.route}`}>
                  <li className={link.icon}>
                    {" "}
                    <span>{link.label}</span>
                  </li>
                </NavLink>
              </div>
            );
          })}
        </div>

        <div className="par-2 mt-[7rem]">
          {links4.map((link) => {
            return (
              <div className="flex w-full px-2 py-2 rounded-lg  hover:bg-gray-200 gap-10 items-center text-lg list-none">
                {" "}
                <li className={link.icon}>
                  {" "}
                  <span>{link.label}</span>
                </li>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
