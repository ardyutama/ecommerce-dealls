'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'

type navigationType = {
    href: string,
    name: string
}
type navLinks = navigationType[]

export default function Navigation({ navLinks }:{navLinks: navLinks}) {
  const pathname = usePathname()
 
  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href
 
        return (
          <Link
            className={ `text-white ${isActive ? 'font-bold' : 'font-normal'}`}
            href={link.href}
            key={link.name}
          >
            {link.name}
          </Link>
        )
      })}
    </>
  )
}