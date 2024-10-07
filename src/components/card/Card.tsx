import { IProduct } from "@/interface/productInterface";
import Link from "next/link";

const Card: React.FC<IProduct> = ({ id, name, image, price }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="relative m-3 flex flex-wrap mx-auto justify-center">
        <div className="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
          <div className="overflow-x-hidden rounded-2xl relative">
            <div className="relative overflow-hidden bg-cover bg-no-repeat">
              <img className="rounded-lg sm:m-h-64 md:h-64 w-full" src={image} alt={name} />
              <Link href={`/product/${id}`} key={id}>
                <div className="absolute bottom-0 left-0 right-0 top-0 w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
              </Link>
            </div>
          </div>
          <div className="mt-4 pl-2 mb-2 flex justify-between">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-0">{name}</p>
              <p className="text-md text-gray-800 mt-0">Price: ${price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card
