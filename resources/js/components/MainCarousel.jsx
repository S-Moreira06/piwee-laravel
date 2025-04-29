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
                <CarouselItem key={item.id} className=" rounded shadow-xl md:basis-1/3 lg:basis-1/5">
                    {/* <Link href={`/details/${item.id}`}>
                        <img src={item.image} alt={item.name} className="" />
                        <h2 className="text-gray-600">{item.name}</h2>
                        <p className="text-gray-600">{item.price}€</p>
                    </Link>  */}
                    <div className="card bg-base-100 ">
                        <figure>
                            <img
                            src={item.image}
                            alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <div className="flex w-auto justify-between">
                                <h2 className="card-title text-lg text-nowrap">{item.name}</h2>
                                <span className="text-bold text-lg">{item.price}€</span>
                            </div>
                            <p>
                            {item.description && item.description.length > 100
                                ? item.description.slice(0, 50) + '...'
                                : item.description}
                            </p>
                            <div className="card-actions justify-end">
                            <button className="btn btn-primary">Voir détails</button>
                            </div>
                        </div>
                    </div>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}