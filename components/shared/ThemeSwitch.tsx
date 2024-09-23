'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="size-9"></div>
  }

  function switchTheme() {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="flex items-center justify-center">
      <motion.button
        aria-label="Switch theme"
        type="button"
        onClick={switchTheme}
        className="flex size-9 flex-col items-center justify-center overflow-hidden rounded-full bg-black/5 font-medium outline-none duration-200 ease-in-out dark:bg-white/5"
      >
        <AnimatePresence mode="wait" initial={false}>
          {resolvedTheme === 'light' ? (
            <motion.span
              key="moon-icon"
              initial={{ rotate: '80deg', scale: 0 }}
              animate={{ rotate: '0deg', scale: 1 }}
              exit={{ rotate: '80deg', scale: 0.7 }}
              transition={{ duration: 0.2 }}
              className="size-4"
            >
              <Moon size={15} className="text-black/50 dark:text-white/50" />
            </motion.span>
          ) : (
            <motion.span
              key="sun-icon"
              initial={{ rotate: '-80deg', scale: 0 }}
              animate={{ rotate: '0deg', scale: 1 }}
              exit={{ rotate: '-80deg', scale: 0.7 }}
              className="size-4"
              transition={{ duration: 0.2 }}
            >
              <Sun size={15} className="text-black/50 dark:text-white/50" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
