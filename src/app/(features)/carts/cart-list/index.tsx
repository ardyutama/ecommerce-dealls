'use client'
import Image from 'next/image'
import SearchIcon from '@/icons/search.svg'
import FilterIcon from '@/icons/bi_filter.svg'
import Pagination from "@/ui/pagination"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type ProductType = {
    id: number,
    brand: string,
    category: string,
    price: number,
    stock: number,
    title: string
}

interface PaginationProps {
    handlePreviousPage: () => void;
    handleNextPage: () => void;
    currentPage: number;
    totalPages: number;
}

type CartList = {
    id: number,
    total: number,
    products: ProductType[],
    discountedTotal: number,
    totalProducts: number,
    totalQuantity: number
}

type Cart = {
    carts: CartList[]
}

export default function Table({ data }: { data: Cart }) {
    const carts = data.carts
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        brand: '',
        product: '',
        priceRange: '',
        category: ''
    })
    
    const [isActive, setIsActive] = useState(false)
    const ITEMS_PER_PAGE = 10;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const [filteredList, setFilteredList] = useState<CartList[]>([])
    const displayedItems = Object.values(filters).every(value => value == '') ? carts.slice(startIndex, endIndex) : filteredList.slice(startIndex, endIndex) 
    const totalPages = Math.ceil(carts.length / ITEMS_PER_PAGE)
    
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
        <>
            <div className='py-6 px-6 flex flex-col gap-6 min-h-screen'>
                <div className='relative rounded-lg border overflow-auto'>
                    <table className='table-auto border-collapse w-full'>
                        <thead>
                            <tr>
                                <th className='text-start border-b py-2 px-4'>ID</th>
                                <th className='text-start border-b py-2 px-4'>Price</th>
                                <th className='text-start border-b py-2 px-4'>Total Discount</th>
                                <th className='text-start border-b py-2 px-4'>Total Products</th>
                                <th className='text-start border-b py-2 px-4'>Total Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                displayedItems.map((cart, index) => {
                                    return (
                                        <tr key={index} onClick={()=> router.push(`/carts/detail/${cart.id}`)} className='cursor-pointer'>
                                            <td className='border-b py-6 px-4'>{cart.id}</td>
                                            <td className='border-b py-6 px-4'>{cart.totalQuantity}</td>
                                            <td className='border-b py-6 px-4'>{cart.discountedTotal}</td>
                                            <td className='border-b py-6 px-4'>{cart.totalProducts}</td>
                                            <td className='border-b py-6 px-4'>{cart.totalQuantity}</td>
                                        </tr>
                                    )
                                }
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination {...paginationProps} />
        </>
    )
}