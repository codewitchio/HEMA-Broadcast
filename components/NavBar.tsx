"use client"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { GraphicInfoList } from '@/lib/Graphics'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type LinkElementWithDescriptionProps = LinkElementProps & {
    title: string
    description: string
}

function LinkElementWithDescription({ href, description, title }: LinkElementWithDescriptionProps) {
    return (
        <LinkElement href={href} className='!w-72 justify-start'>
            <div className="flex flex-col justify-start">
                <div>
                    {title}
                </div>
                <div className='text-muted-foreground text-sm'>
                    {description}
                </div>
            </div>
        </LinkElement>
    )
}

type LinkElementProps = {
    href: string
} & React.HTMLProps<HTMLElement>

function LinkElement({ href, children, className }: LinkElementProps) {
    const pathname = usePathname()
    const isActive = href === pathname
    console.log(className)
    return (
        <Link href={href} legacyBehavior passHref>
            <NavigationMenuLink active={isActive} className={cn(navigationMenuTriggerStyle(), className)}>
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
                    <NavigationMenuTrigger {...(pathname.includes('/config/') ? { 'data-active': '' } : {})}>Graphics</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        {GraphicInfoList.map((graphic) => <LinkElementWithDescription href={graphic.path} title={graphic.title} description={graphic.description} key={graphic.path} />)}
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