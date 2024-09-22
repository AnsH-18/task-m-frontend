"use client"

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { AuthTab } from "../components/AuthTab";
import { useSelector } from "react-redux";
import { useToast } from "../../@/hooks/use-toast"
import { useEffect } from "react"
import { cn } from "../lib/utils"
export default function Home() {
  

  return (
    <div className="flex justify-center pt-5">
        
        <AuthTab/>
    </div>
  );
}
