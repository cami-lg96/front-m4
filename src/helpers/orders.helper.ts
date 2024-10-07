import { IOrder } from "@/interface/orderInterface";

const APIURL = process.env.NEXT_PUBLIC_API_URL

export const getUserOrders = async (token: string) => {
  try {
    console.log('token before request:', token);
    const response = await fetch(`${APIURL}/users/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`, 
      },
    });
    console.log('Response getuserIrders:', response);


    if (!response.ok) {
      throw new Error('Failed to fetch user orders');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error; 
  }
};


export const createOrder = async (token: string, purchaseData:  { products: string[], userId: number }) => {
  try {
    const response = await fetch(`${APIURL}/orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify(purchaseData),
    });
    
    if (!response.ok) {
      throw new Error('Error creating order');
    }
    const newOrder: IOrder = await response.json();
    return newOrder;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error creating order');
  }
};

