"use client"

import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs"
import { useAppDispatch, useAppSelector } from "../lib/hooks"
import { useState } from "react"
import { registerUser,loginUser } from "../lib/features/slices/auth.slice"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export function AuthTab() {
  const router = useRouter()
    const dispatch = useAppDispatch()
    const authSlice = useAppSelector(state => state.auth)

    const [userCredentials, setUserCredentials] = useState({

      userName: "",
      password: ""
    })

    useEffect(() => {
      if (authSlice.status === 200 && authSlice.loggedin == false) {
        dispatch(loginUser(userCredentials))
      }
      },[authSlice.status, authSlice.loggedin, handleLogin, dispatch, userCredentials])

    useEffect(() => {
      if(authSlice.status === 200 && authSlice.loggedin == true){
        router.push("/dashboard")
      }
    }, [authSlice.status, authSlice.loggedin, router, dispatch, userCredentials])
    
    const handleUserInput = (e) => {

        const {name, value} = e.target
        setUserCredentials(prev => {
            return {
              ... prev,
              [name]: value
            }
        })
    }

    const clearUserInput = () => {
        setUserCredentials({
            userName : "",
            password : ""
        })
    }

    const handleRegister = () => {
        console.log("click")
        dispatch(registerUser(userCredentials))
    }

    const handleLogin = () => {
        dispatch(loginUser(userCredentials))
    }

  return (


    

    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger onClick = {clearUserInput} value="signin">Sign In</TabsTrigger>
        <TabsTrigger onClick = {clearUserInput} value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Regiter using username and password to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">UserName</Label>
              <Input onChange={handleUserInput} value={userCredentials.userName} name="userName" id="name" defaultValue="" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input onChange={handleUserInput} value={userCredentials.password} name="password" id="password" defaultValue="" type = "password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick = {handleRegister}>Register</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Already have an Account? Login into your account to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">UserName</Label>
              <Input onChange={handleUserInput} value={userCredentials.userName} name="userName" id="current" type="text" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Password</Label>
              <Input onChange={handleUserInput} value={userCredentials.password} name="password" id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick = {handleLogin}>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
