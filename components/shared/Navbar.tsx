import Link from 'next/link'

import Craft from '../icons/Craft'
import Logo from '../icons/logo'

import { CommandDialogDemo } from './Command'
import ThemeSwitch from './ThemeSwitch'

const Navbar = () => {
  return (
    <div className="z-1 shadow-ssm sticky top-0 flex items-center justify-between bg-white/20 p-2 px-10 py-3 backdrop-blur-sm dark:bg-black/20">
      <div className="flex items-center gap-2">
        <Link
          href={'/'}
          className="flex items-center gap-1 text-black/50 hover:text-black dark:text-white/50 hover:dark:text-white"
        >
          <Logo className="h-10 dark:invert" />
          <Craft className="h-12 w-28 dark:invert" />
        </Link>{' '}
        <Link
          href={'/components'}
          className="text-black/50 hover:text-black dark:text-white/50 hover:dark:text-white"
        >
          Components
        </Link>
      </div>

      <div className="flex items-center gap-5">
        <Link
          href={'https://x.com/intent/follow?screen_name=jh3yy'}
          target="_blank"
          className="text-black/50 hover:text-black dark:text-white/50 hover:dark:text-white"
        >
          Github
        </Link>
        <Link
          href={'https://x.com/intent/follow?screen_name=Spacing_Whale'}
          className="text-black/50 hover:text-black dark:text-white/50 hover:dark:text-white"
          target="_blank"
        >
          Twitter
        </Link>

        <ThemeSwitch />
        <CommandDialogDemo />
      </div>
    </div>
  )
}
export default Navbar
