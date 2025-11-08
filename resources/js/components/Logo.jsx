
export function PiweeLogoImage({ width = 40, height = 40, className = '' }) {
    return (
        <img
            src="/img/logoPiwee.png"  // ← REMPLACEZ CECI par votre nom de fichier
            alt="Piwee Logo"
            width={width}
            height={height}
            className={`object-contain ${className}`}
        />
    );
}
