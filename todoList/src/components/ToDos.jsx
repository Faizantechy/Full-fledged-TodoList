import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function ToDos({ setSelectedItems, selectedItems, setIsOpen, isOpen }) {
  const [startDate] = useState(new Date());
  const gottonItem = useSelector((state) => state.Todos.gottonItem);

  return (
    <div className="w-[20%] hidden lg:flex min-w-[240px] h-screen bg-white px-4 py-4  flex-col border-l border-gray-200">
      
      {/* Top Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <input type="checkbox" className="w-4 h-4 accent-gray-500" />
          <span className="text-blue-600 font-medium text-sm">
            Today, {startDate.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
            })}
          </span>
        </div>
        <span className="text-gray-500 text-lg">📍</span>
      </div>

      {/* Task Title */}
      <div className="flex-1 flex items-start justify-start">
        <h2 className="font-bold text-lg break-words">{gottonItem?.tasks || "No Task Selected"}</h2>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Inbox</span>
          <div className="flex gap-4 text-gray-500 text-lg">
            <span className="cursor-pointer text-sm font-medium">A</span>
            <span className="cursor-pointer">💬</span>
            <span className="cursor-pointer">⋯</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDos;
