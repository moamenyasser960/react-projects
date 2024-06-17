import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Task({ task, onToggleComplete, onDelete, onEdit }) {
  return (
    <div className="flex items-center justify-between p-2 mb-2 bg-white rounded shadow">
      <span
        className={`flex-1 cursor-pointer ${
          task.completed ? "line-through text-gray-400" : ""
        }`}
        onClick={() => onToggleComplete(task.id)}
      >
        {task.text}
      </span>
      <div className="flex items-center space-x-2">
        <button
          className="bg-yellow-500 text-white p-1 rounded"
          onClick={() => onEdit(task.id)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white p-1 rounded"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  function handleAddTask() {
    if (newTask.trim() === "") return;
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...task, text: newTask } : task
        )
      );
      setEditingTask(null);
    } else {
      const newTaskObject = {
        id: Date.now().toString(),
        text: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskObject]);
    }
    setNewTask("");
  }

  function handleToggleComplete(taskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  function handleEditTask(taskId) {
    const task = tasks.find((task) => task.id === taskId);
    setNewTask(task.text);
    setEditingTask(task);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <div className="mb-4">
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter new task"
          />
          <button
            className="w-full mt-2 p-2 bg-blue-500 text-white rounded"
            onClick={handleAddTask}
          >
            {editingTask ? "Update Task" : "Add Task"}
          </button>
        </div>
        <div>
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
