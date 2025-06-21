import Link from 'next/link';
import { memo } from 'react';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = memo(() => {
    return (
        <footer className="bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* University Info */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <GraduationCap className="h-6 w-6 text-blue-400" />
                            <span className="font-serif text-lg font-semibold">Enterprise University</span>
                        </div>
                        <p className="text-gray-300 mb-4 max-w-md">
                            Shaping tomorrows leaders through excellence in education, research, and innovation.
                            Join our community of scholars dedicated to making a positive impact on the world.
                        </p>
                        <div className="space-y-2 text-sm text-gray-300">
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4" />
                                <span>123 University Ave, Academic City, AC 12345</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span>(555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span>info@enterpriseuniversity.edu</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-serif font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="#about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                            <li><Link href="#programs" className="hover:text-blue-400 transition-colors">Programs</Link></li>
                            <li><Link href="#admissions" className="hover:text-blue-400 transition-colors">Admissions</Link></li>
                            <li><Link href="#research" className="hover:text-blue-400 transition-colors">Research</Link></li>
                            <li><Link href="#campus" className="hover:text-blue-400 transition-colors">Campus Life</Link></li>
                        </ul>
                    </div>

                    {/* Student Resources */}
                    <div>
                        <h3 className="font-serif font-semibold mb-4">Student Resources</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="/login" className="hover:text-blue-400 transition-colors">Student Portal</Link></li>
                            <li><Link href="#library" className="hover:text-blue-400 transition-colors">Library</Link></li>
                            <li><Link href="#support" className="hover:text-blue-400 transition-colors">Academic Support</Link></li>
                            <li><Link href="#career" className="hover:text-blue-400 transition-colors">Career Services</Link></li>
                            <li><Link href="#wellness" className="hover:text-blue-400 transition-colors">Student Wellness</Link></li>
                        </ul>
                    </div>
                </div>                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; 2025 Enterprise University. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
});

Footer.displayName = 'Footer';
