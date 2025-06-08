import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowRight } from 'lucide-react';

export const HeroSection = () => {
    return (
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <GraduationCap className="h-16 w-16 text-blue-600" />
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                        Excellence in
                        <span className="text-blue-600 block">Higher Education</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                        At Enterprise University, we cultivate brilliant minds, foster innovation,
                        and prepare students to lead in an ever-evolving world through rigorous academics
                        and transformative experiences.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            asChild
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
                        >
                            <Link href="/login" className="flex items-center gap-2">
                                Access Student Portal
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="px-8 py-4 text-lg font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                            asChild
                        >
                            <Link href="#about">Learn More</Link>
                        </Button>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-50"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-50 rounded-full opacity-30"></div>
                <div className="absolute top-1/2 right-20 w-16 h-16 bg-yellow-100 rounded-full opacity-40"></div>
            </div>
        </section>
    );
};
