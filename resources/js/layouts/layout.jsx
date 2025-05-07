import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Divider from "@/components/Divider";

export default function Layout({ children }) {
    
    return (
        <div>
            <Header />
                <main className='min-h-screen'>{children}</main>
            <Divider />
            <Footer />
        </div>
    );
}
