import CartList from '@/features/carts/cart-list'

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

type CartList = {
    id: number,
    total: number,
    products: ProductType[],
    discountedTotal: number,
    totalProducts: number,
    totalQuantity: number
}

type Carts = {
    carts: CartList[]
}

export const dynamic = "force-dynamic"

async function getCarts(): Promise<Carts> {
  try {
    const response = await fetch('https://dummyjson.com/carts?limit=0', {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data:Carts = await response.json();
    return data;
  } catch (error:unknown) {
    if (error instanceof Error) {
      throw new Error('Failed to fetch data: ' + error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}


export default async function Home() {
  const data = await getCarts()
  return (
    <>
      <CartList data={data}/>
    </>
  )
}
