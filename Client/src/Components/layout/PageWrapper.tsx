import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PageWrapperProps {
    children: ReactNode;
    showAuthButton?: boolean;
    showFooter?: boolean;
}

export const PageWrapper = ({
    children,
    showAuthButton = true,
    showFooter = true
}: PageWrapperProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar showAuthButton={showAuthButton} />
            <main className="flex-1">
                {children}
            </main>
            {showFooter && <Footer />}
        </div>
    );
};
