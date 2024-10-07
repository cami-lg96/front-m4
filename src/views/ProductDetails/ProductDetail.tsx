"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2"; 
import { IProduct } from "@/interface/productInterface";
import { isAuthenticated } from "@/helpers/auth";
import { CartItem } from "@/interface/orderInterface";

interface ProductDetailProps extends IProduct {
  productId: string; 
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  name,
  image,
  description,
  stock,
  price,
  productId,
}) => {
  const router = useRouter();

  const addToCart = (cartItem: CartItem) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingItem = cart.find(
      (item: CartItem) => item.productId === cartItem.productId
    );

    if (existingItem) {
      existingItem.quantity += 1; 
    } else {
      cartItem.quantity = 1; 
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    Swal.fire({
      title: "Item added to cart",
      confirmButtonText: "Go to cart",
      confirmButtonColor: "#1e40af",
      allowOutsideClick: false, 
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/cart");
      }
    });
  };

  const handleAddToCart = () => {
    if (!isAuthenticated()) {

      Swal.fire({
        title: "You need to login to add items to your cart.",
        showCloseButton: true,
        showDenyButton: true,
        focusConfirm: false,
        confirmButtonText: "Login",
        confirmButtonColor: "#1e40af", 
        denyButtonText: "Register",
        denyButtonColor: "#374151",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        } else if (result.isDenied) {
          router.push("/register");
        }
      });
      return;
    }

    const cartItem: CartItem = {
      productId, 
      name,
      price,
      image,
      quantity: 1,
    };
    addToCart(cartItem);
  };

  return (
    <div className="container mx-auto px-6">
      <div className="md:flex md:items-center p-4">
        <div className="w-full h-64 p-4 md:w-1/2 lg:h-96">
          <img
            className="h-full w-full rounded-md object-cover max-w-lg mx-auto"
            src={image}
            alt="imagen del producto"
          />
        </div>
        <div className="w-full max-w-lg p-4 md:ml-8 md:mt-0 md:w-1/2">
          <h3 className="text-gray-700 uppercase text-lg">{name}</h3>
          <span className="text-gray-500 ">${price}</span>
          <hr className="my-3" />
          <div className="mt-3">
            <p className="text-gray-700 text-sm">{description}</p>
            <p className="text-gray-700 text-sm">Stock: {stock}</p>
          </div>
          <div className="flex items-center mt-6">
            <button
              className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
