'use client'
import { useState } from 'react'
import { Drawer } from 'vaul'

import Code from '@/components/icons/code'

interface CodeDialogProps {
  code: string
}

const CodeDialog: React.FC<CodeDialogProps> = ({ code }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    alert('Code copied to clipboard')
  }

  return (
    <Drawer.Root shouldScaleBackground open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger asChild>
        <button className="group mt-2 flex items-center justify-center gap-2 rounded-lg border border-[#dfeae4] px-4 py-2 text-sm transition duration-300 hover:border-[#c3c8c6] dark:border-[#1a1e1c] dark:hover:border-[#3e4742]">
          <Code className="h-5 w-7 dark:invert" />
          Code
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 dark:bg-black/60" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 mt-24 flex h-[96%] flex-col rounded-t-[10px] border-2 border-zinc-400 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950">
          {' '}
          <div className="flex-1 rounded-t-[10px] bg-white p-4 dark:bg-zinc-950">
            <div className="mx-auto mb-8 h-1.5 w-12 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <div className="flex-1 rounded-t-[10px] bg-white p-4 dark:bg-zinc-950">
              <div className="mb-4 flex items-center justify-between">
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border border-[#dfeae4] px-4 py-2 text-sm transition duration-300 hover:border-[#c3c8c6] dark:border-[#1a1e1c] dark:hover:border-[#3e4742]"
                >
                  Close
                </button>
                <button
                  onClick={handleCopy}
                  className="rounded-lg border border-[#dfeae4] px-4 py-2 text-sm transition duration-300 hover:border-[#c3c8c6] dark:border-[#1a1e1c] dark:hover:border-[#3e4742]"
                >
                  Copy
                </button>
              </div>
              <div className="rounded-md bg-gray-100 p-4 dark:bg-zinc-700">
                {code}
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default CodeDialog
