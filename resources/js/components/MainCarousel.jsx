import { Carousel, CarouselItem, CarouselContent, CarouselNext, CarouselPrevious } from "../components/ui/carousel";
import { useIsMobile } from "../hooks/useMobile";
import { getRandomItems } from "../hooks/useGetRandomItems";
import { usePage, Link, router} from '@inertiajs/react';

export default function MainCarousel (props) {
    const isMobile = useIsMobile();
    const orientation = isMobile ? 'vertical' : 'horizontal';
    const items = props.cat 
    ? props.data.filter((item) => item.category.id === props.cat)
    : props.data;
    const randomItems = getRandomItems(items, 6);

    return (
        <Carousel orientation={orientation} opts={{ align: "start",loop: true }} className="">
            <CarouselContent className="max-md:h-105 ml-0 max-md:mt-0 max-md:mb-1 md:mr-2.5">
            {randomItems.map((item) => (
                // 
                    <CarouselItem key={item.id} className="bg-white p-2 m-0.5 rounded shadow md:basis-1/3 lg:basis-1/5">
                        <Link href={`/details/${item.id}`} >
                            <img src={item.image} alt={item.name} className="" />
                            <h2 className="text-gray-600">{item.name}</h2>
                            <p className="text-gray-600">{item.price}€</p>
                        </Link> 
                    </CarouselItem>
                //  
            ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}