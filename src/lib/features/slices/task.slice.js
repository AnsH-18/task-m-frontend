import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { BASE_SERVER_URL } from "../../../constants" 
import { Action } from "@radix-ui/react-toast";

const initialState = {  
    tasks : [],
    loading: false,
    task: {
        _id: "",
        tittle: "",
        description: "",
        author: {
            userName: ""
        },
        priority: "",
        status: "",
        dueDate: ""
    }
}

const getAllTasks = createAsyncThunk(
    "task/getall",
    async (userName) => {
        const baseUrl = `${BASE_SERVER_URL}/get-user-tasks`
        const url = new URL(baseUrl)

        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const data = await response.json()
        console.log(data)

        return data
    }
)

const createTask = createAsyncThunk(
    "task/create",
    async (input) => {
        const baseUrl = `${BASE_SERVER_URL}/create-task`
        const url = new URL(baseUrl)
        url.searchParams.set("tittle", input.tittle)
        url.searchParams.set("description", input.description)
        url.searchParams.set("dueDate", input.dueDate)
        url.searchParams.set("priority", input.priority)

        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const data = await response.json()
        console.log(data)

        return data
    }
)

const deleteTask = createAsyncThunk(
    "task/delete", 
    async (taskid) => {
        const baseUrl = `${BASE_SERVER_URL}/delete-task`
        const url = new URL(baseUrl)
        url.searchParams.set("taskid", taskid)
        const response = await fetch(url, {
            method: "DELETE",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const data = await response.json()
        console.log(data)

        return data
    }
)

const updateTaskStatus = createAsyncThunk(
    "task/update",
    async (taskinfo) => {
        const baseUrl = `${BASE_SERVER_URL}/update-task`
        const url = new URL(baseUrl)
        url.searchParams.set("status", taskinfo.status)
        url.searchParams.set("taskid", taskinfo._id)
        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const data = await response.json()
        console.log(data)

        return data
    }
)

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllTasks.fulfilled, (state, action) => {
            state.tasks = action.payload.data
        })
        .addCase(updateTaskStatus.fulfilled, (state, action) => {
            const updatedTask = action.payload.data
            state.tasks = state.tasks.map((task) =>
                task._id === updatedTask._id ? updatedTask : task
            );
        })
    }

})

export default taskSlice.reducer
export {getAllTasks, createTask, deleteTask, updateTaskStatus}
