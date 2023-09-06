import Image from 'next/image'
import ShopIcon from "@/icons/shop.svg"
import Navigation from "@/ui/navigation"
export default function Header() {
    const paths = [
        {
            href: '/',
            name: 'Products',
        },
        {
            href: '/carts',
            name: 'Carts'
        }
    ]
    return (
        <header>
            <div className="bg-primary w-full ">
                <div className='px-4 py-4 justify-between flex items-center'>
                    <div className='flex items-center gap-4'>
                        <Image src={ShopIcon} alt='shop' width={24} height={24} />
                        <p className='font-bold text-white'>E-Commerce</p>
                    </div>
                    <div className='flex gap-4 text-white'>
                        <Navigation navLinks={paths} />
                    </div>
                </div>
            </div>
        </header>
    )
}
