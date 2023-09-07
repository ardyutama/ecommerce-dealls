import CartDetail from "@/features/carts/cart-detail"

type CartList = {
    id: number,
    total: number,
    products: ProductType[],
    discountedTotal: number,
    totalProducts: number,
    totalQuantity: number,
    userId: number
    userData: UserType
}

type ProductType = {
  id: number,
  title: string,
  price: number,
  quantity: number,
  discountedPrice: number,
  total: number
}

type UserType = {
  id: number,
  firstName: string,
  lastName: string
}

  async function getCartsDetail(id:string): Promise<CartList> {
    try {
      const response = await fetch(`https://dummyjson.com/carts/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data:CartList = await response.json();
      return data;
    } catch (error:unknown) {
      if (error instanceof Error) {
        throw new Error('Failed to fetch data: ' + error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  async function getUserData(id:string): Promise<UserType> {
    try {
      const response = await fetch(`https://dummyjson.com/users/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data:UserType = await response.json();
      return data;
    } catch (error:unknown) {
      if (error instanceof Error) {
        throw new Error('Failed to fetch data: ' + error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }


export default async function DetailPage({params}: {params: {id: string}}){
      const data = await getCartsDetail(params.id)
      const user = await getUserData(data.userId.toString())
      const mergeData = {...data, userData: user}
    return(
        <>
            <CartDetail data={mergeData} />
        </>
    )
}