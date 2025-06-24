import { useState, memo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, GraduationCap } from 'lucide-react';

interface NavbarProps {
    showAuthButton?: boolean;
}

export const Navbar = memo(({ showAuthButton = true }: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <GraduationCap className="h-8 w-8 text-blue-600" />
                        <span className="font-serif text-xl font-semibold text-gray-900">
                            Enterprise University
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                            Home
                        </Link>
                        <Link href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
                            About
                        </Link>
                        <Link href="#programs" className="text-gray-600 hover:text-blue-600 transition-colors">
                            Programs
                        </Link>
                        <Link href="#news" className="text-gray-600 hover:text-blue-600 transition-colors">
                            News
                        </Link>
                        {showAuthButton && (
                            <Button asChild className="bg-blue-600 hover:bg-blue-700">
                                <Link href="/login">Sign In</Link>
                            </Button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-blue-600"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-4">
                            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                                Home
                            </Link>
                            <Link href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
                                About
                            </Link>
                            <Link href="#programs" className="text-gray-600 hover:text-blue-600 transition-colors">
                                Programs
                            </Link>
                            <Link href="#news" className="text-gray-600 hover:text-blue-600 transition-colors">
                                News
                            </Link>
                            {showAuthButton && (
                                <Button asChild className="bg-blue-600 hover:bg-blue-700 w-fit">
                                    <Link href="/login">Sign In</Link>
                                </Button>
                            )}
                        </div>
                    </div>
                )}            </div>
        </nav>
    );
});

Navbar.displayName = 'Navbar';
