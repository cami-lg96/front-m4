"use client";
import { useEffect, useState,  } from 'react'; 
import { useRouter } from 'next/navigation';
import { isAuthenticated } from "@/helpers/auth";
import { CartItem } from '@/interface/orderInterface';
import { createOrder } from '@/helpers/orders.helper';

const UserCart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [subtotal, setSubtotal] = useState(0);
    const [userIsAuthenticated, setUserIsAuthenticated] = useState<boolean | null>(null); 
    const [isPurchasing, setIsPurchasing] = useState(false); 
    const router = useRouter();
    
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(cart);
        calculateSubtotal(cart);

        const isAuthenticatedUser = isAuthenticated();
        setUserIsAuthenticated(isAuthenticatedUser);
    }, []);

    const calculateSubtotal = (items: CartItem[]) => {
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setSubtotal(total);
    };

    const removeFromCart = (productId: string) => {
        const updatedCart = cartItems.map(item => {
            if (item.productId === productId) {
                return { ...item, quantity: Math.max(item.quantity - 1, 0) };
            }
            return item;
        });

        const filteredCart = updatedCart.filter(item => item.quantity > 0);
        setCartItems(filteredCart);
        localStorage.setItem("cart", JSON.stringify(filteredCart));
        calculateSubtotal(filteredCart);
    };

    const handlePurchase = async () => {
        if (!userIsAuthenticated) {
            router.push("/login");
            return;
        }

        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        const token = userData.token;
        if (!token) return;

        const purchaseData = {
            products: cartItems.map(item => item.productId),
            userId: userData.id
        };

        setIsPurchasing(true); 

        try {
            await createOrder(token, purchaseData);
            alert("Purchase successful!");
            setCartItems([]);
            localStorage.removeItem("cart");
            router.push(`/user/${userData.name}/orders`);
        } catch (error) {
            console.error("Error during purchase:", error);
            alert("Purchase failed. Please try again.");
        } finally {
            setIsPurchasing(false); 
        }
    };

    if (userIsAuthenticated === null) {
        return  <div className="flex flex-col items-center justify-center h-screen">Loading...</div>;
    }

    if (!userIsAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-xl font-bold p-4">Please login to view your cart.</h1>
                <button onClick={() => router.push("/login")} className="transition-colors text-sm bg-white border border-slate-600  rounded  text-slate-900 text-hover shadow-md p-2">
                    Go to Login
                </button>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-xl font-bold p-4">Your cart is empty.</h1>
                <button onClick={() => router.push("/store")} className="transition-colors text-sm bg-white border border-slate-600  rounded  text-slate-900 text-hover shadow-md p-2">
                    Go to Store
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row w-screen h-full px-14 py-7">
            <div className="w-full flex flex-col h-fit gap-4 p-4">
                <p className="text-blue-950 text-xl font-extrabold">My Cart</p>

                {cartItems.map((item) => (
                    <div key={item.productId} className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm bg-white">
                        <div className="flex flex-col md:flex-row" style={{ justifyContent: "space-around" }}>
                            <div className="flex flex-row gap-6 items-center">
                                <div className=" m-4 p-4">
                                    <img 
                                    style={{ height: '7rem', objectFit: 'contain' }} 
                                    src={item.image} alt={item.name} />
                                </div>
                            </div> 
                            <div className="flex flex-col justify-center">
                                <div className="flex flex-col gap-1 self-center">
                                    <p className="text-lg text-slate-800 font-semibold">{item.name}</p>
                                </div>
                                <div className="flex flex-row gap-1 self-center">       
                                    <p className="flex-none text-sm text-slate-600 p-4">Quantity: {item.quantity}</p>
                                    <p className="text-slate-600 font-normal text-sm p-4">${(item.price).toFixed(2)}</p>                           

                                </div>
                                <div className="self-center"> 
                                    <button className="mt-2 text-blue-500 hover:text-blue-700 text-sm" onClick={() => removeFromCart(item.productId)}>
                                        Remove
                                    </button> 
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full md:w-[30%] h-fit"> 
                <div className="flex flex-col gap-3 p-4"> 
                    <p className="text-blue-950 text-xl font-extrabold">Summary</p> 
                    <div className="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm bg-white">
                        <div className="flex flex-row justify-between items-center">
                            <p className=" text-slate-600">Subtotal: ({cartItems.length} items)</p>
                            <p className="text-end font-bold">${subtotal.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <p className=" text-slate-600">Shipping:</p>
                            <p className="text-end font-bold">$10.00</p>
                        </div>
                        <hr />
                        <div className="flex flex-row justify-between items-center">
                            <p className="text-lg text-slate-600">Total</p>
                            <p className="text-lg text-end font-bold">${(subtotal + 10.00).toFixed(2)}</p>
                        </div>
                        <button 
                            className={`mt-4 w-full bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded ${isPurchasing ? 'opacity-50 cursor-not-allowed' : ''}`} 
                            onClick={handlePurchase}
                            disabled={isPurchasing} 
                        >
                            {isPurchasing ? 'Processing...' : 'BUY'} 
                        </button>
                        <button onClick={() => router.push("/store")} className="transition-colors text-sm bg-slate-300 border border-slate-600 py-2 px-4 rounded w-full text-slate-700 text-hover shadow-md">
                            ADD MORE PRODUCTS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCart;
