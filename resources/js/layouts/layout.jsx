import Header from '@/components/Header';

export default function Layout({ children }) {
    return (
        <div>
            {/* Header sera ici, visible sur toutes les pages */}
            <Header />
            {/* Le reste du contenu de la page est injecté ici */}
            <main>{children}</main>
        </div>
    );
}
