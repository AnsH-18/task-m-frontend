"use client"

import React, { useEffect, useState } from 'react'
import {TaskDataTable} from '../../components/TaskTable'
import { Button } from '../../components/ui/button'
import {DialogDemo} from "../../components/AddTaskDialog"
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks, createTask } from '../../lib/features/slices/task.slice';
import  formatDate  from '../../lib/helper'
// const tasks = [

//   {

//     _id: "1a2b3c4d",
//     title: "Design Homepage",
//     description: "Create the design mockup for the homepage",
//     author: "John Doe",
//     status: "TODO",
//     priority: "HIGH",
//     dueDate: "2024-09-30",
//     createdAt: "2024-09-01",
//     updatedAt: "2024-09-18",
//     created_by: { _id: "abc123", userName: "johndoe" }
//   },
//   {
//     _id: "2b3c4d5e",
//     title: "Fix Login Bug",
//     description: "Resolve the issue with incorrect password validation",
//     author: "Jane Smith",
//     status: "PENDING",
//     priority: "MEDIUM",
//     dueDate: "2024-09-25",
//     createdAt: "2024-09-10",
//     updatedAt: "2024-09-19",
//     created_by: { _id: "def456", userName: "janesmith" }
//   },
//   {
//     _id: "3c4d5e6f",
//     title: "Update User Documentation",
//     description: "Revise the user manual to include new features",
//     author: "Alex Johnson",
//     status: "COMPLETED",
//     priority: "LOW",
//     dueDate: "2024-09-20",
//     createdAt: "2024-09-05",
//     updatedAt: "2024-09-15",
//     created_by: { _id: "ghi789", userName: "alexjohnson" }
//   },
//   {
//     _id: "4d5e6f7g",
//     title: "Backend API Optimization",
//     description: "Optimize the database queries for better performance",
//     author: "Emily Davis",
//     status: "PENDING",
//     priority: "HIGH",
//     dueDate: "2024-10-05",
//     createdAt: "2024-09-12",
//     updatedAt: "2024-09-18",
//     created_by: { _id: "jkl012", userName: "emilydavis" }
//   },
//   {
//     _id: "5e6f7g8h",
//     title: "Add Unit Tests",
//     description: "Write unit tests for the new feature modules",
//     author: "Chris Lee",
//     status: "TODO",
//     priority: "MEDIUM",
//     dueDate: "2024-09-28",
//     createdAt: "2024-09-15",
//     updatedAt: "2024-09-20",
//     created_by: { _id: "mno345", userName: "chrislee" }
//   },
//   {
//     _id: "2b3c4d5e",
//     title: "Fix Login Bug",
//     description: "Resolve the issue with incorrect password validation",
//     author: "Jane Smith",
//     status: "PENDING",
//     priority: "MEDIUM",
//     dueDate: "2024-09-25",
//     createdAt: "2024-09-10",
//     updatedAt: "2024-09-19",
//     created_by: { _id: "def456", userName: "janesmith" }
//   },
//   {
//     _id: "3c4d5e6f",
//     title: "Update User Documentation",
//     description: "Revise the user manual to include new features",
//     author: "Alex Johnson",
//     status: "COMPLETED",
//     priority: "LOW",
//     dueDate: "2024-09-20",
//     createdAt: "2024-09-05",
//     updatedAt: "2024-09-15",
//     created_by: { _id: "ghi789", userName: "alexjohnson" }
//   },
//   {
//     _id: "4d5e6f7g",
//     title: "Backend API Optimization",
//     description: "Optimize the database queries for better performance",
//     author: "Emily Davis",
//     status: "PENDING",
//     priority: "HIGH",
//     dueDate: "2024-10-05",
//     createdAt: "2024-09-12",
//     updatedAt: "2024-09-18",
//     created_by: { _id: "jkl012", userName: "emilydavis" }
//   },
//   {
//     _id: "5e6f7g8h",
//     title: "Add Unit Tests",
//     description: "Write unit tests for the new feature modules",
//     author: "Chris Lee",
//     status: "TODO",
//     priority: "MEDIUM",
//     dueDate: "2024-09-28",
//     createdAt: "2024-09-15",
//     updatedAt: "2024-09-20",
//     created_by: { _id: "mno345", userName: "chrislee" }
//   }
// ];

function Page() {
  const tasks = useSelector(state => state.task?.tasks)
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false); // State to control the dialog


  useEffect(() => {
    dispatch(getAllTasks())
  }, [isOpen])
  
  const [task, setTask] = useState({
      tittle: "",
      description: "",
      dueDate: ""
  })

  const [priority, setPriority] = useState("")
  const [Date, setDate] = useState("")
 

  // Function to handle dialog open and close
  const handleDialogOpen = () => setIsOpen(true);
  const handleDialogClose = () => setIsOpen(false);

  const setSelectedPriority = (newValue) => {
    setPriority(newValue)
  }

  const setDateValue = (dateString) => {
    const date  = formatDate(dateString)
    console.log(date)
    setDate(date)
  } 
  
  const handleChange = (e) => {
    const {name, value} = e.target
    setTask(prev => {
        return {
          ... prev,
          [name]: value
        }
    })
  }

  const handleSubmit = (e) => {
    const taskinput = {
      tittle: task.tittle,
      description: task.description,
      dueDate: Date,
      priority: priority
    }
    handleDialogClose()
    dispatch(createTask(taskinput))
  }

  return (
    <div className='flex flex-col justify-center gap-10'>
      
      <div className='flex justify-between px-5'>
        <h1 className='font-medium text-3xl'>My Tasks</h1> 
              <DialogDemo
                state = {task}
                set = {handleChange}
                priorityValue = {priority}
                setPriority = {setSelectedPriority}
                dateValue = {Date}
                setDate = {setDateValue} 
                submit = {handleSubmit}
                open = {isOpen}
                optionOpen = {setIsOpen}
                handleOpen = {handleDialogOpen}
                handleClose = {handleDialogClose}
              />
      </div>
        <TaskDataTable tasks={tasks} />
    </div>
  )
}

export default Page