import React, { useEffect, useState } from "react";
import { account, databases } from "./appwrite/appwrite";
import { v4 as uuidv4 } from "uuid";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { allLies, getItem, getSelectedTodos } from "../redux/TodosSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Today({
  setIsOpen,
  isOpen,
  setSelectedItems,
  selectedItems,
  profileIcon,
  setProfileIcon,
}) {
  const [isCompleted, setIsCompleted] = useState(true);
  const [todo, setTodo] = useState({ tasks: "" });
  const [toDoItems, setTodoItems] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [updatedValue, setUpdatedValue] = useState({ value: "" });
  const [editingid, seteditingid] = useState(null);
  const dispatch = useDispatch();
  const [userProfileIcon, setuserProfileIcon] = useState(null);
  const [currentUser, setcurrentUser] = useState();
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();

  const [index, setindex] = useState();

  const addTodosToDataBase = async () => {
    try {
      await databases.createDocument(
        "685514b200271d2c0666",
        "685514cd0037e1e10a28",
        uuidv4(),
        { tasks: todo.tasks }
      );
      console.log("Task is added to the database!");
      todo.tasks = "";
      location.reload();
    } catch (error) {
      console.error("Error adding the task:", error);
    }
  };

  useEffect(() => {
    const getTodos = async () => {
      const promise = databases.listDocuments(
        "685514b200271d2c0666",
        "685514cd0037e1e10a28"
      );

      promise.then((response) => {
        console.log(response.documents);
        setTodoItems(response.documents);
        dispatch(allLies(response.documents));
      }),
        (error) => {
          console.log(error, "Error Getting the todos.");
        };
    };

    getTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      await databases.deleteDocument(
        "685514b200271d2c0666",
        "685514cd0037e1e10a28",
        id
      );
      console.log("Todo Is Deleted!");
      const updatedTodos = await databases.listDocuments(
        "685514b200271d2c0666",
        "685514cd0037e1e10a28"
      );
      setTodoItems(updatedTodos.documents);
    } catch (error) {
      console.log(error, "Error Deleting'");
    }
  };

  const updateTodo = async (id) => {
    console.log("Task is Updated!");
    try {
      await databases.updateDocument(
        "685514b200271d2c0666",
        "685514cd0037e1e10a28",
        id,
        { tasks: updatedValue.value }
      );
    } catch (error) {
      console.log("Error Updating the Todo!", error);
    }
  };

  const logoutUser = async () => {
    setisLoading(true);
    try {
      await account.deleteSession("current");
      navigate("/");
      setisLoading(false);
    } catch (error) {
      console.log(error.message, "couldn't logout the user!");
    }
  };

  const getUserInfo = async () => {
    try {
      const user = await account.get();
      setcurrentUser(user);

      if (user?.name) {
        setProfileIcon(user.name[0].toUpperCase());
      } else {
        setProfileIcon("H");
      }
    } catch (error) {
      console.error("Error getting user info:", error.message);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/bytesizedpieces/image/upload/v1656085547/article/a-how-to-guide-on-making-an-animated-loading-image-for-a-website/animated_loader_hghpbl.gif"
          className="w-[80vw] max-w-[300px] object-cover"
        />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen relative">
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col p-6 gap-6 transition-all duration-300 md:hidden">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Menu</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 text-2xl hover:text-black"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
                {profileIcon || "U"}
              </div>
              <h3 className="text-lg font-medium">{currentUser?.name}</h3>
            </div>
            <ul className="flex flex-col gap-3 text-base font-medium">
              <li className="cursor-pointer hover:text-blue-600">Inbox</li>
              <li className="cursor-pointer hover:text-blue-600">Today</li>
              <li className="cursor-pointer hover:text-blue-600">Upcoming</li>
            </ul>
            <button
              onClick={logoutUser}
              className="mt-auto bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </div>
        </>
      )}

      <div
        className={`${
          isOpen ? "w-full" : "w-full max-w-[1000px] mx-auto"
        } h-screen border-0 md:border border-black px-3 md:px-5 py-5`}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="icon-text flex gap-3 md:gap-4 text-xl md:text-2xl font-semibold items-center w-full  lg:justify-start justify-between ">
            <i
              className="ri-menu-unfold-line px-1 py-1 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            ></i>
            <div>
              <h2>Today</h2>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full justify-between md:justify-end">
            <h2 className="font-bold text-xl md:text-2xl">
              {currentUser?.name}
            </h2>
            <button
              className="bg-blue-500 text-white font-bold rounded-xl px-3 py-1 md:px-2 md:py-1 hover:bg-blue-600 active:scale-90 text-sm md:text-base"
              onClick={logoutUser}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="input w-full px-4 py-3 text-sm rounded-lg bg-gray-100 mt-5">
          <input
            type="text"
            className="w-full task-input border-none text-gray-400 outline-none"
            placeholder='+ Add tasks to "inbox"'
            value={todo.tasks}
            onChange={(e) => {
              setTodo({ tasks: e.target.value });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTodosToDataBase();
              }
            }}
          />
        </div>

        <div className="tasks px-2 py-6 md:py-9 flex flex-col gap-4">
          {toDoItems.map((item, index) => {
            return (
              <div
                className="flex items-center justify-between w-full gap-2"
                key={item.$id}
              >
                <div className="flex-1 min-w-0">
                  <li
                    className={`list-none px-3 md:px-4 py-2 rounded-lg w-full flex gap-3 md:gap-4 items-center cursor-pointer
                    ${isClicked ? "bg-gray-300" : "bg-gray-200"}
                    hover:bg-gray-300 text-sm md:text-base break-words`}
                    onClick={(e) => {
                      if (isClicked) {
                        e.target.style.backgroundColor = "#D1D5DB";
                        setIsClicked(false);
                      } else {
                        e.target.style.backgroundColor = "#E5E7EB";
                        setIsClicked(true);
                      }

                      const clickedId = item.$id;
                      dispatch(getSelectedTodos(clickedId));
                      dispatch(getItem(clickedId));
                    }}
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
                      onClick={(e) => {
                        const li = e.target.closest("li");
                        if (e.target.checked) {
                          li.style.backgroundColor = "orange";
                          li.style.color = "black";
                          setIsCompleted(true);

                          Toastify({
                            text: `${li.textContent}Task is Completed!`,
                            duration: 3000,
                            gravity: "top",
                            position: "right",
                            backgroundColor:
                              "linear-gradient(to right, #00b09b, #96c93d)",
                          }).showToast();
                        } else {
                          li.style.color = "black";
                          li.style.backgroundColor = "#E5E7EB";
                          li.style.border = "1px";
                          li.style.padding = "10px";

                          setIsCompleted(false);
                        }
                      }}
                      id={index}
                    ></input>
                    <span className="break-words">{item.tasks}</span>
                  </li>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="rounded-full hover:scale-[1.1] active:scale-90 duration-1000 active:bg-red-600 w-[30px] h-[30px] md:w-[35px] md:h-[35px] flex justify-center items-center">
                    <i
                      className="ri-delete-bin-fill text-lg md:text-xl cursor-pointer transition-all duration-300 ease-in"
                      onClick={(e) => {
                        const icon = e.target.closest("div");
                        icon.style.backgroundColor = "#156CFC";
                        icon.style.transform = "scale(1.1)";
                        icon.style.color = "white";
                        icon.style.fontWeight = "600";
                        icon.style.fontSize = "25px";
                        icon.style.padding = "8px 8px";
                        icon.style.transform = "translateX(10px)";

                        setTimeout(() => {
                          icon.style.backgroundColor = "";
                          icon.style.transform = "scale(1)";
                          icon.style.color = "";
                          icon.style.fontWeight = "";
                          icon.style.fontSize = "";
                          icon.style.padding = "";
                        }, 700);

                        deleteTodo(item.$id);
                      }}
                    ></i>
                  </div>
                  <i
                    className="ri-edit-line text-xl md:text-2xl cursor-pointer"
                    onClick={() => {
                      setShowForm(true);
                      seteditingid(item.$id);
                      updateTodo(editingid);
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>

        {showForm ? (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40 transition ease-linear duration-100">
            <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[400px] md:max-w-[500px]">
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Update your task..."
                  className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  value={updatedValue.value}
                  onChange={(e) => {
                    setUpdatedValue({ value: e.target.value });
                  }}
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 md:py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-sm md:text-base"
                  onClick={() => {
                    updateTodo(editingid);
                  }}
                >
                  Update Task
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Today;
