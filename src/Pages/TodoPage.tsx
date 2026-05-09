import React, { useState } from 'react';
import { ITodo } from '../Interfaces/Todo';
import TodoItem from '../Components/TodoItem';

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim().length === 0) return;

    const newTodo: ITodo = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      text: inputValue.trim(),
      isCompleted: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue('');
  };

  const handleToggle = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleUpdate = (id: string, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const completedCount = todos.filter(t => t.isCompleted).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
        
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-10 text-white">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Görevlerim</h1>
          <p className="text-indigo-100 font-medium">
            {totalCount === 0 
              ? 'Henüz bir görev eklenmemiş.' 
              : `${totalCount} görevden ${completedCount} tanesi tamamlandı.`}
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleAddTodo} className="relative flex items-center mb-8">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Yeni bir görev ekle..."
              className="w-full pl-6 pr-32 py-4 text-lg bg-gray-50 border-2 border-transparent focus:border-indigo-300 focus:bg-white rounded-2xl outline-none transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-2 top-2 bottom-2 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
            >
              Ekle
            </button>
          </form>

          <div className="space-y-1">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))
            ) : (
              <div className="text-center py-12 text-gray-400 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-lg font-medium">Hadi, ilk görevini ekle!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
