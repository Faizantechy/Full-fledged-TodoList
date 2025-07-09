import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Today from "./components/Today";
import Inbox from "./components/Inbox";
import Next7Days from "./components/Next7days";
import SignUp from "./components/authentication/SignUp";
import Login from "./components/authentication/Login";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState();
  const [profileIcon, setProfileIcon] = useState(null);
  console.log(profileIcon, "Apppppppp");

  return (
    <Routes>
      <Route
        path="/layout"
        element={
          <Layout
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            profileIcon={profileIcon}
            setProfileIcon={setProfileIcon}
          />
        }
      >
        <Route
          index
          element={
            <Today
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              profileIcon={profileIcon}
              setProfileIcon={setProfileIcon}
            />
          }
        />

        <Route
          path="today"
          element={
            <Today
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              profileIcon={profileIcon}
              setProfileIcon={setProfileIcon}
            />
          }
        />

        <Route
          path="inbox"
          element={
            <Inbox
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              profileIcon={profileIcon}
              setProfileIcon={setProfileIcon}
            />
          }
        />

        <Route
          path="next7days"
          element={
            <Next7Days
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              profileIcon={profileIcon}
              setProfileIcon={setProfileIcon}
            />
          }
        />
      </Route>

      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
