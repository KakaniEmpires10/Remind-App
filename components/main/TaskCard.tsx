"use client"

import { Task } from "@prisma/client"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { setTaskToDone } from "@/action/task"

const TaskCard = ({ task }: { task: Task }) => {
  const [loading, startTransition] = useTransition()
  const router = useRouter()

  const getExpirationColor = (expiresAt: Date) => {
    const days = Math.floor(expiresAt.getTime() - Date.now()) / 1000 / 60 / 60;
    if (days <= 3 * 24) {
      return "text-red-500 dark:text-red-400"
    } else if (days <= 7 * 24) {
      return "text-orange-500 dark:text-orange-400"
    } else if (days < 0) {
      return "text-gray-500 dark:text-gray-300"
    } else {
      return "text-green-500 dark:text-green-400"
    }
  }

  return (
    <div className="flex gap-3 items-start">
      <Checkbox id={task.id.toString()} className="w-5 h-5" checked={task.done} disabled={task.done || loading} onCheckedChange={() => {
        startTransition(async () => {
          await setTaskToDone(task.id)
          router.refresh()
        })
      }} />
      <Label className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoration-1 dark:decoration-white", task.done && "line-through")} htmlFor={task.id.toString()}>
        {task.content}
        {task.expiresAt && (
          <p className={cn("text-xs text-neutral-500 dark:text-neutral-400", getExpirationColor(task.expiresAt))}>{format(task.expiresAt, "dd/MM/yyyy")}</p>
        )}
      </Label>
    </div>
  )
}

export default TaskCard