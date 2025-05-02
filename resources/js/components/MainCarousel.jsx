import { Carousel, CarouselItem, CarouselContent, CarouselNext, CarouselPrevious } from "../components/ui/carousel";
import { useIsMobile } from "../hooks/useMobile";
import { getRandomItems } from "../hooks/useGetRandomItems";
import { usePage, Link, router} from '@inertiajs/react';

export default function MainCarousel (props) {
    const isMobile = useIsMobile();
    // const orientation = isMobile ? 'vertical' : 'horizontal';
    const orientation = 'horizontal';
    const items = props.cat 
    ? props.data.filter((item) => item.category.id === props.cat)
    : props.data;
    const randomItems = getRandomItems(items, 10);

    return (
        <Carousel orientation={orientation} opts={{ align: "start",loop: true }} className="mb-5">
            <CarouselContent className="">
                {/*max-sm:h-105 max-md:h-120 ml-0 max-lg:mt-0 max-lg:mb-1 md:mr-2.5 */}
            {randomItems.map((item) => (
                <CarouselItem key={item.id} className=" rounded basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6">
                    <Link href={`/details/${item.id}`}>
                    <div className="card card-sm md:card-md lg:card-lg bg-base-100 h-full">
                        <figure className="">
                            <img
                            src={item.image}
                            alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <div className="flex w-auto justify-between">
                                <h2 className="card-title">{item.name}</h2>
                                <span className="text-bold text-xl">{item.price}€</span>
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
                    </Link>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}