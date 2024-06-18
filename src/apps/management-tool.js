import React, { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Task 1" },
    "task-2": { id: "task-2", content: "Task 2" },
    "task-3": { id: "task-3", content: "Task 3" },
    "task-4": { id: "task-4", content: "Task 4" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-2"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: ["task-3"],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: ["task-4"],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

const App = () => {
  const [data, setData] = useState(initialData);
  const [newTaskContent, setNewTaskContent] = useState("");

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [newColumn.id]: newColumn,
        },
      }));
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    setData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }));
  };

  const handleAddTask = () => {
    const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
    const newTask = { id: newTaskId, content: newTaskContent };

    setData((prev) => {
      const newTasks = { ...prev.tasks, [newTaskId]: newTask };
      const newTaskIds = Array.from(prev.columns["column-1"].taskIds);
      newTaskIds.push(newTaskId);
      const newColumn = { ...prev.columns["column-1"], taskIds: newTaskIds };

      return {
        ...prev,
        tasks: newTasks,
        columns: {
          ...prev.columns,
          [newColumn.id]: newColumn,
        },
      };
    });

    setNewTaskContent("");
  };

  const handleDeleteTask = (taskId) => {
    setData((prev) => {
      const newTasks = { ...prev.tasks };
      delete newTasks[taskId];

      const newColumns = { ...prev.columns };
      for (const columnId in newColumns) {
        const column = newColumns[columnId];
        const newTaskIds = column.taskIds.filter((id) => id !== taskId);
        newColumns[columnId] = { ...column, taskIds: newTaskIds };
      }

      return {
        ...prev,
        tasks: newTasks,
        columns: newColumns,
      };
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Project Management Tool
      </h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="New task"
          className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-xl py-2 px-3 flex-grow"
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
        />
        <button
          className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleAddTask}
        >
          <FiPlus className="text-2xl" />
        </button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            return (
              <div
                key={column.id}
                className="bg-white rounded-lg shadow-lg p-4"
              >
                <h2 className="text-xl font-bold mb-4">{column.title}</h2>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-gray-100 rounded-lg p-4 flex justify-between items-center"
                            >
                              <span>{task.content}</span>
                              <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleDeleteTask(task.id)}
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
