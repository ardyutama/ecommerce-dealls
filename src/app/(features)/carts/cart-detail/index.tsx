'use client'
import Image from "next/image"
import Link from "next/link"
import ArrowIcon from '@/icons/vector.svg'
import UserIcon from '@/icons/mdi_user-outline.svg'
import MoneyIcon from '@/icons/ph_money.svg'
import Pagination from "@/ui/pagination"
import { useState } from "react"
type UserType = {
    id: number,
    firstName: string,
    lastName: string
}

type CartItem = {
    id: number,
    total: number,
    products: ProductType[],
    discountedTotal: number,
    totalProducts: number,
    totalQuantity: number,
    userId: number,
    userData: UserType,
}

type ProductType = {
    id: number,
    title: string,
    price: number,
    quantity: number,
    discountedPrice: number,
    total: number
}
interface PaginationProps {
    handlePreviousPage: () => void;
    handleNextPage: () => void;
    currentPage: number;
    totalPages: number;
}



export default function Page({ data }: { data: CartItem }) {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const totalPages = Math.ceil(data.products.length / ITEMS_PER_PAGE)
    const displayedItems = data.products.slice(startIndex, endIndex)
    const paginationProps: PaginationProps = {
        handlePreviousPage: () => {
            setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
        },
        handleNextPage: () => {
            setCurrentPage(prevPage => Math.max(prevPage + 1, 1));
        },
        currentPage: currentPage, // Replace with the actual current page number
        totalPages: totalPages, // Replace with the actual total number of pages
    };
    return (
        <div className="py-6 px-6 flex flex-col gap-4">
            <div className="flex gap-2 items-center">
                <Link
                    href={'/carts'}
                >
                    <Image src={ArrowIcon} alt='previous' width={12} height={24} />
                </Link>
                <span className="text-xl text-primary font-bold">Cart {data.id}</span>
            </div>
            <div className="flex flex-col gap-3">
                <p className="text-lg">Details</p>
                <div className="flex flex-col gap-3 bg-grey-light rounded-3xl p-6">
                    <div className="flex gap-3">
                        <Image src={UserIcon} alt="user" />
                        <p>{data.userData.firstName}</p>
                    </div>
                    <div className="flex gap-3">
                        <Image src={MoneyIcon} alt="user" />
                        <p>Discount Total {data.discountedTotal} from {data.total} </p>
                    </div>
                </div>
                <span className="text-lg">Total Item {data.totalQuantity}</span>
                <div className='relative rounded-lg border overflow-auto'>
                    <table className='table-auto border-collapse w-full'>
                        <thead>
                            <tr>
                                <th className='text-start border-b py-2 px-4'>Product Name</th>
                                <th className='text-start border-b py-2 px-4'>Price</th>
                                <th className='text-start border-b py-2 px-4'>Qty</th>
                                <th className='text-start border-b py-2 px-4'>Discount</th>
                                <th className='text-start border-b py-2 px-4'>Normal Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                displayedItems.map((product, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='border-b py-6 px-4'>{product.title}</td>
                                            <td className='border-b py-6 px-4'>{product.price}</td>
                                            <td className='border-b py-6 px-4'>{product.quantity}</td>
                                            <td className='border-b py-6 px-4'>{product.discountedPrice}</td>
                                            <td className='border-b py-6 px-4'>{product.total}</td>
                                        </tr>
                                    )
                                }
                                )}
                        </tbody>
                    </table>
                </div>
                <Pagination {...paginationProps} />
            </div>
        </div>
    )
}