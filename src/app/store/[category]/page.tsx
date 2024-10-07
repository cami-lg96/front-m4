import { getProductsByCategory } from "@/helpers/product.helper";
import Card from "@/components/card/Card";
import { IProduct } from "@/interface/productInterface";


const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const { category } = params;

  const products: IProduct[] = await getProductsByCategory(category);

  return (
    <div>
      <h1  className="flex justify-center font-medium m-6">{category}</h1>
   
        <div className="flex flex-wrap items-center gap-4 justify-center">
        {products.map(product => (
          <Card key={product.id} {...product} />
        ))}
        </div>
    </div>
  );
};

export default CategoryPage;
