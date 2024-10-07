import { getProductsById } from "@/helpers/product.helper";
import ProductDetail from "@/views/ProductDetails/ProductDetail";

const DetailsP = async ({ params }: { params: { productId: string } }) => {
    console.log("product od en params: ", params.productId);
    try {
        const product = await getProductsById(params.productId);
        return <ProductDetail {...product} productId={params.productId} />;
    } catch (error) {
        console.error(error);
        return <div>Failed to load product details</div>;
    }
};

export default DetailsP;
