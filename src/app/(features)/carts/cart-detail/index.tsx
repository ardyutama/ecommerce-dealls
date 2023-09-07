import Image from "next/image"
import Link from "next/link"
import ArrowIcon from '@/icons/vector.svg'
import UserIcon from '@/icons/mdi_user-outline.svg'

type CartList = {
    id: number,
    total: number,
    products: ProductType[],
    discountedTotal: number,
    totalProducts: number,
    totalQuantity: number,
    userId: number
}

type ProductType = {
    id: number,
    brand: string,
    category: string,
    price: number,
    stock: number,
    title: string
}

export default function Page({ data }: { data: CartList }) {
    return (
        <div className="py-6 px-6 flex flex-col gap-4">
            <div className="flex gap-2 items-center">
                <Link
                    href={'#'}
                >
                    <Image src={ArrowIcon} alt='previous' width={12} height={24} />
                </Link>
                <span className="text-xl text-primary font-bold">Cart {data.id}</span>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-lg">Details</p>
                <div className="flex flex-col gap-3 bg-grey-light rounded-3xl p-6">
                    <div className="flex gap-3">
                        <Image src={UserIcon} alt="user" />

                    </div>
                </div>
            </div>
        </div>
    )
}