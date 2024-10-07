
import Carousel from "@/components/Carousel/Carousel";
import Category from "@/components/categorys/Categorys";
import {images} from "../../../public/images"

const HomeContainer = () => {
    return (
        <div>
            <Carousel images={images}/>
            <Category/>
        </div>
    )
};

export default HomeContainer