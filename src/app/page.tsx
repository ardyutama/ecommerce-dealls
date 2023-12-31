import Table from '@/features/products/product-list'
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

export const dynamic = "force-dynamic"

async function getProducts(): Promise<Products> {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=0', {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data:Products = await response.json();
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
  
  const data = await getProducts()
  return (
    <>
      <Table data={data} />
    </>
  )
}
