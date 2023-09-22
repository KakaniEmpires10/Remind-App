"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true);
  }, [])

  

  if (!mounted) return null
  return (
    <Tabs defaultValue={theme}>
      <TabsList>
        <TabsTrigger value="light" onClick={(e) => setTheme("light")}><SunIcon /></TabsTrigger>
        <TabsTrigger value="dark" onClick={(e) => setTheme("dark")}><MoonIcon className="rotate-[360deg] transition-all duration-500 dark:rotate-0" /></TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default ThemeSwitcher