"use client"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuActiveStyle, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type LinkElementProps = {
    href: string,
    children: React.ReactNode
}
// TODO: Make Trigger active if any child link is active
function LinkElement({ href, children }: LinkElementProps) {
    const pathname = usePathname()
    const isActive = href === pathname
    console.log(isActive)
    return (
        <Link href={href} legacyBehavior passHref>
            <NavigationMenuLink active={isActive} className={navigationMenuTriggerStyle()}>
                {children}
            </NavigationMenuLink>
        </Link>
    )
}

export default function NavBar() {
    const pathname = usePathname()
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <LinkElement href='/'>HEMA Broadcast</LinkElement>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className={pathname.includes('/config/') ? navigationMenuActiveStyle() : ''}>Graphics</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <LinkElement href='/config/fightercard'>Fighter Card</LinkElement>
                        <LinkElement href='/config/lowerthird'>Lower Third</LinkElement>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <LinkElement href='/about'>About</LinkElement>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        // </nav>
    )
}