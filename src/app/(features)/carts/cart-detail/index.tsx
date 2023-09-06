type CartList = {
    id: number,
    total: number,
    products: ProductType[],
    discountedTotal: number,
    totalProducts: number,
    totalQuantity: number
}

type ProductType = {
    id: number,
    brand: string,
    category: string,
    price: number,
    stock: number,
    title: string
  }

export default function Page({data}: {data:CartList}){
    return (
        <div className="py-6 px-6 flex flex-col">
            
        </div>
    )
}