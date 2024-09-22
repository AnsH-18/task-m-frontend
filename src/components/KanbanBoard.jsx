"use client"
import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getAllTasks } from '../lib/features/slices/task.slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateTaskStatus } from '../lib/features/slices/task.slice';

// Define the task status columns
const COLUMN_TITLES = ['To Do', 'In Progress', 'Completed'];
const STATUS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
};

// Mock tasks data (Synthetic Data)
const mockTasks = [
  { _id: '1', title: 'Task 1', description: 'Description for Task 1', status: STATUS.TODO },
  { _id: '2', title: 'Task 2', description: 'Description for Task 2', status: STATUS.IN_PROGRESS },
  { _id: '3', title: 'Task 3', description: 'Description for Task 3', status: STATUS.TODO },
  { _id: '4', title: 'Task 4', description: 'Description for Task 4', status: STATUS.COMPLETED },
  { _id: '5', title: 'Task 5', description: 'Description for Task 5', status: STATUS.IN_PROGRESS },
];

// Task Card Component (Draggable)
function TaskCard({ task }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'task',
    item: task,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      className={`p-4 mb-4 shadow-md rounded-md${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      style={{ cursor: 'move' }}
    >
      <h4 className="font-bold text-sm">{task.tittle}</h4>
      <p className="text-sm text-gray-500">{task.description}</p>
    </div>
  );
}

// Column Component (Dropzone)
function Column({ status, tasks, onDropTask }) {
  const [, dropRef] = useDrop({
    accept: 'task',
    drop: (item) => onDropTask(item, status),
  });
  console.log(tasks)
  return (
    <div
      ref={dropRef}
      className="flex-1 p-4  rounded-lg shadow-md max-h-screen overflow-auto min-w-60"
    >
      <h2 className="text-lg font-bold mb-4">{status}</h2>
      <div>
        {tasks?.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}

// Main Kanban Board Component
export default function KanbanBoard() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks); // Get tasks directly from Redux
  const [state, setState] = useState(0)
  // Fetch tasks from the backend when component loads
  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  // Handle dropping a task in a new column (status change)
  const handleDropTask = (task, newStatus) => {
    if (task.status !== newStatus) {
      const updatedTask = { ...task, status: newStatus };
      dispatch(updateTaskStatus(updatedTask));
      setState(state+1)
    }
  };

  // Group tasks by status
  const tasksByStatus = {
    [STATUS.TODO]: tasks?.filter((task) => task.status === STATUS.TODO),
    [STATUS.IN_PROGRESS]: tasks?.filter((task) => task.status === STATUS.IN_PROGRESS),
    [STATUS.COMPLETED]: tasks?.filter((task) => task.status === STATUS.COMPLETED),
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 h-full p-4">
        {COLUMN_TITLES.map((column) => (
          <Column
            key={column}
            status={column}
            tasks={tasksByStatus[column]}
            onDropTask={handleDropTask}
          />
        ))}
      </div>
    </DndProvider>
  );
}