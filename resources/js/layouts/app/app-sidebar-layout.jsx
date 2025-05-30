import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';

export default function AppSidebarLayout({ children, breadcrumbs = [] }) {
    return (
        <AppShell >
            <AppSidebar />
            <AppContent>
                
                {children}
            </AppContent>
        </AppShell>
    );
}
