import { configureStore } from '@reduxjs/toolkit'
import authreducer from "./features/slices/auth.slice.js"
import taskReduer from "./features/slices/task.slice.js"

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth : authreducer,
      task: taskReduer
    },
  })
}