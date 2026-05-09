import React, { useState } from 'react';
import type { ITodo } from '../Interfaces/Todo';
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
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header Section */}
        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 px-10 py-12 text-white relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 relative z-10">Görevlerim</h1>
          <p className="text-indigo-100 text-lg font-medium relative z-10">
            {totalCount === 0 
              ? 'Henüz bir görev eklenmemiş.' 
              : `${totalCount} görevden ${completedCount} tanesi tamamlandı.`}
          </p>
        </div>

        <div className="p-8 md:p-10">
          {/* Add Todo Form */}
          <form onSubmit={handleAddTodo} className="relative flex items-center mb-10 group">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Yeni bir görev ekle..."
              className="w-full pl-6 pr-36 py-5 text-lg font-medium bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none transition-all duration-300 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 shadow-inner group-hover:border-indigo-200"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-3 top-3 bottom-3 px-8 bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:bg-slate-300 disabled:active:scale-100 disabled:cursor-not-allowed text-white text-lg font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
            >
              Ekle
            </button>
          </form>

          {/* Todo List */}
          <div className="space-y-4">
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
              <div className="text-center py-16 px-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center">
                <div className="w-24 h-24 mb-6 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-700 mb-2">Tamamen Boş!</h3>
                <p className="text-slate-500 text-lg">Görünüşe göre yapacak bir işin yok.<br/>Hemen yukarıdan yeni bir görev ekle.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
