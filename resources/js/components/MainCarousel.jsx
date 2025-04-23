import { Carousel, CarouselItem, CarouselContent, CarouselNext, CarouselPrevious } from "../components/ui/carousel";
import { useIsMobile } from "../hooks/useMobile";
import { usePage, Link, router} from '@inertiajs/react';

export default function MainCarousel (props) {
    const isMobile = useIsMobile();
    const orientation = isMobile ? 'vertical' : 'horizontal';
    const shirts = props.data
    return (
        <Carousel orientation={orientation} opts={{ align: "start",loop: true }} className="">
            <CarouselContent className="ml-0 max-md:h-[735px] max-md:mt-0 max-md:mb-1">
            {shirts.map((shirt) => (
                <Link href={`/details/${shirt.id}`} >
                <CarouselItem key={shirt.id} className="bg-white p-2 m-0.5 rounded shadow basis-[33%]">
                    <img src={shirt.image} alt={shirt.name} className="" />
                    <h2 className="text-gray-600">{shirt.name}</h2>
                    <p className="text-gray-600">${shirt.price}</p>
                </CarouselItem>
                </Link>
            ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}