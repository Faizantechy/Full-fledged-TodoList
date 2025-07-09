import React, { useEffect, useState } from "react";
import { account, databases } from "./appwrite/appwrite";
import { v4 as uuidv4 } from "uuid";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { allLies, getItem, getSelectedTodos } from "../redux/TodosSlice";
import { useDispatch } from "react-redux";

function Next7Days({ setIsOpen, isOpen, setSelectedItems, selectedItems }) {
  const [isCompleted, setIsCompleted] = useState(true);
  const [todo, setTodo] = useState({ tasks: "" });
  const [toDoItems, setTodoItems] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [updatedValue, setUpdatedValue] = useState({ value: "" });
  const [editingid, seteditingid] = useState(null);
  const dispatch = useDispatch();

  const [index, setindex] = useState();
  console.log(index, "This is the INDEEEEEEX");

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

  // ✅ FIXED: Corrected key from "Eneter" ➜ "Enter"
  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (e.key === "Enter") {
  //       addTodosToDataBase();
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, [todo]);

  return (
    <div className="">
      <div
        className={`${
          isOpen ? "w-[800px]" : "w-[1000px]"
        } h-screen border-1 z-[100] border-black px-5 py-5`}
      >
        <div className="icon-text flex gap-4 text-2xl font-semibold items-center ">
          <i
            className="ri-menu-unfold-line px-1 py-1 hover:bg-gray-200"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          ></i>
          <h2>Next7Days</h2>
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

        <div className="tasks px-2 py-9 flex flex-col gap-4 ">
          {toDoItems.map((item, index) => {
            console.log(index, "These are the index");

            return (
              <div className="flex justify-baseline w-[full]">
                <div className="w-full bg-red-600">
                  <li
                    className={`list-none px-4 flex py-2 rounded-lg w-full gap-4 items-center cursor-pointer
    ${isClicked ? "bg-gray-300" : "bg-gray-200"}
    hover:bg-gray-300`}
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
                      dispatch(getItem(clickedId)); // 💡 Pass ID directly
                    }}
                  >
                    <input
                      type="checkbox"
                      className={``}
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
                    {item.tasks}{" "}
                  </li>
                </div>
                <div className="rounded-full hover:scale-[1.1] active:scale-90 duration-1000 active:bg-red-600 w-[35px] h-[35px] flex justify-center items-center">
                  <i
                    className="ri-delete-bin-fill text-xl cursor-pointer transition-all duration-300 ease-in "
                    onClick={(e) => {
                      const icon = e.target.closest("div");
                      icon.style.backgroundColor = "#156CFC";
                      icon.style.transform = "scale(1.1)";
                      icon.style.color = "white";
                      icon.style.fontWeight = "600";
                      icon.style.fontSize = "25px";
                      icon.style.padding = "8px 8px";
                      icon.style.transform = "translateX(-10px)";
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

                {/* updateTodoDiv */}
                <i
                  className="ri-edit-line text-2xl cursor-pointer"
                  onClick={() => {
                    setShowForm(true);
                    seteditingid(item.$id);

                    updateTodo(editingid);
                  }}
                ></i>
              </div>
            );
          })}
        </div>

        {showForm ? (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40 transition ease-linear duration-100">
            <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
              <div className="bg-white p-6 rounded-2xl shadow-lg w-[1000px] max-w-md mx-auto flex flex-col gap-4 transition translate-[-10] duration-75">
                <input
                  type="text"
                  placeholder="Update your task..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={updatedValue.value}
                  onChange={(e) => {
                    setUpdatedValue({ value: e.target.value });
                  }}
                />

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
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

export default Next7Days;
