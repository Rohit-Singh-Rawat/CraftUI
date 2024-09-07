import Link from 'next/link'

import Craft from '../icons/Craft'
import Logo from '../icons/logo'

import ThemeSwitch from './ThemeSwitch'

const Navbar = () => {
  return (
    <div className="z-1 shadow-ssm sticky top-0 flex items-center justify-around bg-white p-2 py-3 text-black/50 dark:bg-black dark:text-white/50">
      <Link href={'/'} className="flex items-center gap-1">
        <Craft className="h-14 w-20 dark:invert" />
        <Logo className="h-8 dark:invert" />
      </Link>
      <div className="flex items-center justify-around gap-5">
        <Link href={'/'} className="font-medium hover:blur">
          Github
        </Link>
        <Link href={'/'} className="font-medium">
          Twitter
        </Link>
        <ThemeSwitch />
      </div>
    </div>
  )
}
export default Navbar
