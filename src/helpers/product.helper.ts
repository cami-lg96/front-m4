import { IProduct } from "@/interface/productInterface";
import { categoriesToPreLoad } from "./preLoadCategories";

const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function getProductsDB(): Promise<IProduct[]> {
    try {
        const response = await fetch(`${APIURL}/products`, {next: {revalidate:1000}
        })
        const products: IProduct[] = await response.json();

        return products;
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        throw new Error(error as any);
    }
};

export async function getProductsById(id: string): Promise<IProduct> {
    try {
        const products: IProduct[] = await getProductsDB();
        const productFilterById = products.find((product) => product.id.toString() === id);
        if (!productFilterById) throw new Error("Product not found");
        return productFilterById;
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        throw new Error(error as any);
    }
};

export const getProductsByCategory = async (categoryName: string): Promise<IProduct[]> => {
    console.log('Category name from params:', categoryName); 
    console.log('Available categories:', categoriesToPreLoad); 
  
    const category = categoriesToPreLoad.find(c => c.name.toLowerCase() === categoryName.toLowerCase()); 
    if (!category) {
      throw new Error(`Category ${categoryName} not found`);
    }
  
    const categoryId = category.id;
  
    try {
      const products = await getProductsDB();
      const productsByCategory = products.filter(product => product.categoryId === categoryId);
      return productsByCategory;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error fetching products by category');
    }
  };
  