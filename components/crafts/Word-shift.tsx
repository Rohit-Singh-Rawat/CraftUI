'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

export const WordShift = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[]
  duration?: number
  className?: string
}) => {
  const [currentWord, setCurrentWord] = useState(words[0])
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0]
    setCurrentWord(word)
    setIsAnimating(true)
  }, [currentWord, words])

  useEffect(() => {
    if (!isAnimating)
      setTimeout(() => {
        startAnimation()
      }, duration)
  }, [isAnimating, duration, startAnimation])

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false)
      }}
      mode="wait"
    >
      <motion.div
        className={cn(
          'relative z-10 inline-block px-2 text-left text-neutral-900 dark:text-neutral-100',
          className
        )}
        key={currentWord}
      >
        {currentWord.split(' ').map((word, wordIndex) => (
          <motion.span
            key={word + wordIndex}
            className="inline-block whitespace-nowrap text-9xl"
          >
            {word.split('').map((letter, letterIndex) => (
              <motion.span
                className="group inline-block text-xl leading-none"
                key={letter + letterIndex}
              >
                <motion.span
                  className="block overflow-hidden"
                  initial={{
                    translateX: '-50%',
                    translateY: '-50%',
                    rotate: -45,
                    opacity: 0,
                    filter: 'blur(80px)',
                  }}
                  animate={{
                    translateX: 0,
                    translateY: 0,
                    rotate: 0,
                    opacity: 1,
                    filter: 'blur(0)',
                  }}
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
                  }}
                  exit={{
                    translateX: '-50%',
                    translateY: '-50%',
                    rotate: -45,
                    opacity: 0,
                    filter: 'blur(20px)',
                  }}
                  transition={{
                    duration: 0.2,
                    delay: wordIndex * 0.3 + letterIndex * 0.05,
                  }}
                >
                  {letter}
                </motion.span>
                <motion.span
                  className="block overflow-hidden"
                  style={{
                    clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
                  }}
                  initial={{
                    translateX: '-50%',
                    translateY: '-50%',
                    rotate: -45,
                    opacity: 0,
                    filter: 'blur(80px)',
                  }}
                  animate={{
                    translateY: '-100%',
                    translateX: 0,
                    rotate: 0,
                    opacity: 1,
                    filter: 'blur(0)',
                  }}
                  exit={{
                    translateX: '-50%',
                    translateY: '-50%',
                    rotate: 45,
                    opacity: 0,
                    filter: 'blur(20px)',
                  }}
                  transition={{
                    duration: 0.2,
                    delay: wordIndex * 0.3 + letterIndex * 0.05,
                  }}
                >
                  {letter}
                </motion.span>
              </motion.span>
            ))}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
