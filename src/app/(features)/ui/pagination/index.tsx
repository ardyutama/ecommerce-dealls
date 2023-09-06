'use client'
import ArrowIcon from '@/icons/vector.svg'
import Image from 'next/image'

interface PaginationProps {
    handlePreviousPage: () => void;
    handleNextPage: () => void;
    currentPage: number;
    totalPages: number;
  }

export default function Pagination({handlePreviousPage,handleNextPage,currentPage, totalPages}:PaginationProps){
    return (
        <div className='sticky bottom-0 w-full bg-grey-light'>
        <div className='flex gap-6 justify-center py-4'>
        <button
          onClick={() => { handlePreviousPage() }}
          disabled={currentPage === 1}
        >
          <Image src={ArrowIcon} alt='previous' width={12} height={24} />
        </button>
        <button
          onClick={() => { handleNextPage() }}
          disabled={currentPage === totalPages}
        >
          <Image
            src={ArrowIcon}
            alt='previous'
            style={{
              scale: -1
            }}
            width={12} height={24}
          />
        </button>
        </div>
      </div>
    )
}