import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, BookOpen } from 'lucide-react';

export const CTASection = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
                <div className="absolute top-32 right-20 w-24 h-24 border border-white rounded-full"></div>
                <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white rounded-full"></div>
                <div className="absolute bottom-32 right-1/3 w-20 h-20 border border-white rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                        Ready to Begin Your Journey?
                    </h2>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        Join thousands of students who are already transforming their futures through
                        exceptional education and groundbreaking research opportunities.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                        <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold mb-4">Current Students</h3>
                        <p className="text-blue-100 mb-6">
                            Access your student portal to view courses, grades, schedules, and connect
                            with your academic community.
                        </p>
                        <Button
                            asChild
                            size="lg"
                            className="bg-white text-blue-900 hover:bg-blue-50 font-semibold"
                        >
                            <Link href="/login" className="flex items-center gap-2">
                                Sign In to Portal
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </Button>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                        <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold mb-4">Prospective Students</h3>
                        <p className="text-blue-100 mb-6">
                            Explore our academic programs, campus life, and application process.
                            Start your journey to academic excellence today.
                        </p>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold"
                        >
                            <Link href="#programs" className="flex items-center gap-2">
                                Explore Programs
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-blue-200 mb-6 text-lg">
                        Have questions? Our admissions team is here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-2 border-blue-300 text-blue-100 hover:bg-blue-300 hover:text-blue-900"
                        >
                            Contact Admissions
                        </Button>
                        <Button
                            variant="ghost"
                            size="lg"
                            className="text-blue-100 hover:bg-white/10"
                        >
                            Schedule Campus Tour
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
