

export default function Hero(){
    return (
        <div  className="hero h-100 md:h-150 lg:h-200 mb-5" style={{backgroundImage:"url('/img/hero.jpg')",}}>
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-9xl font-bold joti">Piwee!</h1>
                    <p className="mb-5 montserrat-semibold-italic">
                        Revendeur officiel de vêtements et sneakers de marques tendances.
                    </p>
                    <button className="btn btn-primary">Inscrivez-vous</button>
                </div>
            </div>
        </div>
    )
}