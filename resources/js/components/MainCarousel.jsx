import { Carousel, CarouselItem, CarouselContent, CarouselNext, CarouselPrevious } from "../components/ui/carousel";
import { useIsMobile } from "../hooks/useMobile";
import { usePage, Link, router} from '@inertiajs/react';

export default function MainCarousel (props) {
    const isMobile = useIsMobile();
    const orientation = isMobile ? 'vertical' : 'horizontal';
    const shirts = props.data
    return (
        <Carousel orientation={orientation} opts={{ align: "start",loop: true }} className="">
            <CarouselContent className="max-sm:h-150 max-md:h-210 ml-0 max-md:mt-0 max-md:mb-1 md:mr-2.5">
            {shirts.map((shirt) => (
                // 
                    <CarouselItem key={shirt.id} className="bg-white p-2 m-0.5 rounded shadow basis-1/5">
                        <Link href={`/details/${shirt.id}`} >
                            <img src={shirt.image} alt={shirt.name} className="" />
                            <h2 className="text-gray-600">{shirt.name}</h2>
                            <p className="text-gray-600">${shirt.price}</p>
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