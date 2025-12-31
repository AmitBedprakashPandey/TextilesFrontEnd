"use client"

import React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button";
import { Sun,Moon } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null 

  return (
    <Button
    variant={"ghost"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-transparent hover:bg-transparent dark:hover:bg-transparent"
    >
      {theme === "dark" ? <Sun color="#ffff"/>: <Moon color="#ffff"/>}
    </Button>
  )
}