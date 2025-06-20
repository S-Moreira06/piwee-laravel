import Hero from "@/components/Hero";
import MainCarousel from "../components/MainCarousel";
import SelectedItem from "../components/SelectedItem";
import {Head, usePage} from "@inertiajs/react";
import Layout from "../layouts/layout";

export default function Home(){
    const  items  = usePage().props.items;

    return (
        <Layout className="min-h-screen">
            <Head title={"Acceuil"} />
            <Hero />
            <SelectedItem />
            <div className="p-20">
                <div className="">
                    <h2 className="text-4xl font-bold place-self-center joti mb-4">T-shirt</h2>
                    <MainCarousel data={items} cat={1} />
                    
                </div>
                <div>
                    <h2 className="text-4xl font-bold place-self-center md:mt-3 joti">Sneakers</h2>
                    <MainCarousel data={items} cat={2} />
                </div>
            </div>
            
        </Layout>
    )
}