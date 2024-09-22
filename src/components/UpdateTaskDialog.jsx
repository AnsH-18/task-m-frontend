"use client"
import { Button } from "../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "../../@/components/ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {Textarea} from "../../@/components/ui/textarea"
import SelectPriority from "./SelectPriority"
import {X} from "lucide-react"

export function UpdateDialogDemo() {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button  variant="outline">Update Task</Button>
      </DialogTrigger>
      <DialogContent className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full">
          <DialogHeader className= "relative">
            <DialogTitle>Create A Task</DialogTitle>
            <DialogDescription>
             Create A new Task. Click save when you're done.
            </DialogDescription>
            <DialogClose   asChild className="absolute top-0 right-0 hover:cursor-pointer">
                <X className="w-4 h-4"></X>
            </DialogClose>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tittle" className="text-right">
                Tittle
              </Label>
              <Input  name="tittle" id="tittle" defaultValue="" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right grid-cols-1">
                Description
              </Label>
              <Textarea  id="description" className= "col-span-3" placeholder="write description" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right grid-cols-1">
                Priority
              </Label>
              <SelectPriority  />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duedate" className="text-right grid-cols-1">
                Due date
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" >Save changes</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}