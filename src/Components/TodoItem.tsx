import React, { useState } from 'react';
import { ITodo } from '../Interfaces/Todo';

interface TodoItemProps {
  todo: ITodo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim().length > 0) {
      onUpdate(todo.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 mb-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 gap-4 group">
      <div className="flex items-center gap-3 flex-1">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => onToggle(todo.id)}
            className="w-5 h-5 cursor-pointer accent-indigo-600 rounded border-gray-300 focus:ring-indigo-500 transition-all duration-200"
          />
        </div>
        
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            className="flex-1 px-3 py-1.5 text-sm border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
            autoFocus
          />
        ) : (
          <span
            className={`text-gray-800 text-lg transition-all duration-200 ${
              todo.isCompleted ? 'line-through text-gray-400' : ''
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-3 py-1.5 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300 transition-all"
          >
            Kaydet
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-blue-500 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors"
            title="Düzenle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors"
          title="Sil"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
