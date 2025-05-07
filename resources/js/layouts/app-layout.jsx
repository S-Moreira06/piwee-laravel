import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default ({ children, breadcrumbs, ...props }) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <Header/>
        {children}
        <Footer/>
    </AppLayoutTemplate>
);
