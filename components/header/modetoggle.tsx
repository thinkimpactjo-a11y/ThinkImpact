"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, SunMoon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();

  // استخدم حالة افتراضية قبل mount
  const [mounted, setMounted] = useState(false);
  const [resolvedTheme, setResolvedTheme] = useState("light"); // قيمة افتراضية

  useEffect(() => {
    setMounted(true);
    // تحديد theme الفعلي عند mount
    setResolvedTheme(theme === "system" ? systemTheme || "light" : theme || "light");
  }, [theme, systemTheme]);

  // أيقونة تعرض حتى قبل mount
  const icon = resolvedTheme === "light" ? (
    <SunIcon className="w-5 h-5" />
  ) : resolvedTheme === "dark" ? (
    <MoonIcon className="w-5 h-5" />
  ) : (
    <SunMoon className="w-5 h-5" />
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">{icon}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={theme === "system"}
          onClick={() => setTheme("system")}
        >
          System
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === "dark"}
          onClick={() => setTheme("dark")}
        >
          Dark
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === "light"}
          onClick={() => setTheme("light")}
        >
          Light
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
