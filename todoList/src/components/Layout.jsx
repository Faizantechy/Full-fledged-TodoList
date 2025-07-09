import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import ToDos from "./ToDos";
import Today from "./Today";

function Layout({ setIsOpen, isOpen, selectedItems, setSelectedItems,profileIcon, setProfileIcon }) {

  console.log(profileIcon,"Layooooooooout")
  return (
    <div className="w-full h-screen flex">
      <NavBar setIsOpen={setIsOpen} isOpen={isOpen} profileIcon={profileIcon} />

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <ToDos
        setSelectedItems={setSelectedItems}
        selectedItems={selectedItems}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
    </div>
  );
}

export default Layout;
