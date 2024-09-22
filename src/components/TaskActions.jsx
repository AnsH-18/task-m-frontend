import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteTask,getAllTasks } from '../lib/features/slices/task.slice';
import { MoreHorizontal } from 'lucide-react';
import {

    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "./ui/dropdown-menu"
  import { Button } from "./ui/button"

function TaskActions({task}) {
    const dispatch = useDispatch()
    const deletetask = (taskid) => {
        console.log("delete");
        dispatch(deleteTask(taskid))
        dispatch(getAllTasks())
    }
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        onClick={() => navigator.clipboard.writeText(task._id)}
      >
        Copy task ID
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick= {() => deletetask(task._id)}>
          Delete 
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default TaskActions