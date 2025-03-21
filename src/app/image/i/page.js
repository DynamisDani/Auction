'use client'
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core';
import { CopilotPopup } from "@copilotkit/react-ui"; // Import CopilotPopup

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const addTodo = () => {
    if (input.trim() !== '') {
      const newTodo = {
        id: nanoid(),
        text: input.trim(),
        isCompleted: false,
      };
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const openModal = (todo = null) => {
    setCurrentTodo(todo);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentTodo(null);
  };

  const handleSaveTodo = (todo) => {
    if (currentTodo) {
      setTodos(todos.map((item) => (item.id === currentTodo.id ? { ...item, text: todo.text } : item)));
    } else {
      addTodo();
    }
    closeModal();
  };

  useCopilotReadable({
    description: "The user's todo list.",
    value: todos,
  });

  useCopilotAction({
    name: "updateTodoList",
    description: "Update the user's todo list",
    parameters: [
      {
        name: "items",
        type: "object[]",
        description: "The new and updated todo list items.",
        attributes: [
          {
            name: "id",
            type: "string",
            description: "The id of the todo item.",
          },
          {
            name: "text",
            type: "string",
            description: "The text of the todo item.",
          },
          {
            name: "isCompleted",
            type: "boolean",
            description: "The completion status of the todo item.",
          },
        ],
      },
    ],
    handler: ({ items }) => {
      const newTodos = [...todos];
      for (const item of items) {
        const existingItemIndex = newTodos.findIndex((todo) => todo.id === item.id);
        if (existingItemIndex !== -1) {
          newTodos[existingItemIndex] = item;
        } else {
          newTodos.push(item);
        }
      }
      setTodos(newTodos);
    },
    render: "Updating the todo list...",
  });

  useCopilotAction({
    name: "deleteTodo",
    description: "Delete a todo item",
    parameters: [
      {
        name: "id",
        type: "string",
        description: "The id of the todo item to delete.",
      },
    ],
    handler: ({ id }) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    render: "Deleting a todo item...",
  });

  return (
    <div>
      <div className="flex mb-4">
        <input
          className="border rounded-md p-2 flex-1 mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button className="bg-blue-500 rounded-md p-2 text-white" onClick={addTodo}>
          Add Todo
        </button>
      </div>

      {todos.length > 0 && (
        <div className="border rounded-lg">
          {todos.map((todo, index) => (
            <div
              key={todo.id}
              className={'flex items-center justify-between px-4 py-2 group' + (index !== todos.length - 1 ? ' border-b' : '')}
            >
              <div className="flex items-center">
                <input
                  className="h-5 w-5 text-blue-500"
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => toggleComplete(todo.id)}
                />
                <span
                  className={`ml-2 text-sm ${todo.isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'}`}
                >
                  {todo.text}
                </span>
              </div>
              <div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
                <button
                  onClick={() => openModal(todo)}
                  className="ml-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-80">
            <h2 className="text-xl mb-4">{currentTodo ? 'Edit Todo' : 'Add Todo'}</h2>
            <input
              type="text"
              className="border rounded-md p-2 mb-4 w-full"
              value={currentTodo ? currentTodo.text : input}
              onChange={(e) => (currentTodo ? setCurrentTodo({ ...currentTodo, text: e.target.value }) : setInput(e.target.value))}
            />
            <div className="flex justify-between">
              <button onClick={closeModal} className="bg-gray-300 p-2 rounded-md">Cancel</button>
              <button onClick={() => handleSaveTodo(currentTodo || { text: input })} className="bg-blue-500 text-white p-2 rounded-md">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CopilotPopup */}
      <CopilotPopup
        instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
        labels={{
          title: "Popup Assistant",
          initial: "Need any help?",
        }}
      />
    </div>
  );
};

export default TodoList;
