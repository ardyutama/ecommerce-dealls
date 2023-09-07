'use client'
import Image from 'next/image'
import SearchIcon from '@/icons/search.svg'
import FilterIcon from '@/icons/bi_filter.svg'
import Pagination from "@/ui/pagination"
import { useEffect, useState } from 'react'

type ProductType = {
    id: number,
    brand: string,
    category: string,
    price: number,
    stock: number,
    title: string
}

type Products = {
    products: ProductType[]
}

interface PaginationProps {
    handlePreviousPage: () => void;
    handleNextPage: () => void;
    currentPage: number;
    totalPages: number;
}

export default function Table({ data }: { data: Products }) {
    const products = data.products
    const [currentPage, setCurrentPage] = useState(1);

    const [filters, setFilters] = useState({
        brand: '',
        product: '',
        priceRangeMax: '',
        category: ''
    })

    const [isActive, setIsActive] = useState(false)
    const ITEMS_PER_PAGE = 10;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const [filteredList, setFilteredList] = useState<ProductType[]>([])
    const displayedItems = Object.values(filters).every(value => value == '') ? products.slice(startIndex, endIndex) : filteredList.slice(startIndex, endIndex)

    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)

    useEffect(() => {
        filterProduct()
    }, [filters])

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value })
        filterProduct()
    }

    const filterProduct = () => {
        const filtered = products.filter(product => {
            return (
                (!filters.brand || product.brand.toLowerCase().includes(filters.brand.toLowerCase())) &&
                (!filters.product || product.title.toLowerCase().includes(filters.product.toLowerCase())) &&
                (!filters.category || product.category.toLowerCase().includes(filters.category.toLowerCase())) &&
                (!filters.priceRangeMax ||product.price >= 0 && product.price <= parseFloat(filters.priceRangeMax))
            )
        })
        setFilteredList(filtered)
    }

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
                <div className='flex w-full border-black border px-2 py-2 rounded-2xl gap-2 max-w-[400px]'>
                    <Image src={SearchIcon} alt='search' />
                    <input type='text' placeholder='Search Product' className='block outline-none' name='product' onChange={(event) => {
                        handleInputChange(event);
                    }} />
                </div>
                <div className='inline-block relative'>
                    <button className='dropdown px-4 py-2 flex self-start border-black border gap-2 rounded-2xl ' onClick={() => setIsActive(!isActive)}>
                        <Image src={FilterIcon} alt='filter' />
                        <p>Filter</p>
                    </button>
                    <div className={`absolute block mt-2 border rounded-lg bg-white z-10 ${isActive ? 'visible' : 'hidden'}`}>
                        <div className='flex flex-col py-4 px-4 gap-2'>
                            <p>Search By:</p>
                            <div className='flex gap-4 items-center justify-between'>
                                <span>Brand</span>
                                <input className='px-3 py-1 block rounded border border-black bg-white' type='text' name='brand' onChange={(event) => {
                                    handleInputChange(event);
                                }} />
                            </div>
                            <div className='flex gap-4 items-center justify-between'>
                                <span>Product</span>
                                <input className='px-3 py-1 block rounded border border-black bg-white' type='text' name='product' onChange={(event) => {
                                    handleInputChange(event);
                                }} />
                            </div>
                            <div className='flex gap-4 items-center justify-between'>
                                <span>Price</span>
                                <input className='px-3 py-1 block rounded border border-black bg-white w-1/2' type='text' name='priceRangeMax' onChange={(event) => {
                                    handleInputChange(event);
                                }} />
                            </div>
                            <div className='flex gap-4 items-center justify-between'>
                                <span>Category</span>
                                <input className='px-3 py-1 block rounded border border-black bg-white' type='text' name='category' onChange={(event) => {
                                    handleInputChange(event);
                                }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='relative rounded-lg border overflow-auto'>
                    <table className='table-auto border-collapse w-full'>
                        <thead>
                            <tr>
                                <th className='text-start border-b py-2 px-4'>Product Name</th>
                                <th className='text-start border-b py-2 px-4'>Brand</th>
                                <th className='text-start border-b py-2 px-4'>Price</th>
                                <th className='text-start border-b py-2 px-4'>Stock</th>
                                <th className='text-start border-b py-2 px-4'>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                displayedItems.map((product, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='border-b py-6 px-4'>{product.title}</td>
                                            <td className='border-b py-6 px-4'>{product.brand}</td>
                                            <td className='border-b py-6 px-4'>{product.price}</td>
                                            <td className='border-b py-6 px-4'>{product.stock}</td>
                                            <td className='border-b py-6 px-4'>{product.category}</td>
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