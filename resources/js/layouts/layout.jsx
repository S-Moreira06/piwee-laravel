import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Divider from "@/components/Divider";
import EmailVerificationAlert from '../components/email-verification-alert';

export default function Layout({ children }) {
    
    return (
        <div>
            <Header />
            <Divider />
            <EmailVerificationAlert />
                <main className='min-h-screen'>{children}</main>
            <Divider />
            <Footer />
        </div>
    );
}
