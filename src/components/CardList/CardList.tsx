import Card from "@/components/card/Card";
import { getProductsDB } from "@/helpers/product.helper"

export const CardList = async () => {
    const products = await getProductsDB();
    return (
        <div>
            <div className="flex flex-wrap items-center gap-4 justify-center ">
                 {
                products && products?.map((product) => {
                    return ( 
                        <Card
                        key={product.id} {...product} />
                    )
                }) 
            }     
            </div>
              </div>
    )
}

export default CardList;