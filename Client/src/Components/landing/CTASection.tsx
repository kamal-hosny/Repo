import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, BookOpen } from 'lucide-react';

export const CTASection = () => {
    return (
        <section className="py-20 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-black mb-6">
                        Ready to Begin Your Journey?
                    </h2>
                    <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Join thousands of students who are already transforming their futures through exceptional education and groundbreaking research opportunities.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                    <div className="bg-white rounded-2xl p-10 text-center shadow-lg flex flex-col items-center">
                        <div className="bg-main/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                            <Users className="h-8 w-8 text-main" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Current Students</h3>
                        <p className="text-gray-600 mb-6">
                            Access your student portal to view courses, grades, schedules, and connect with your academic community.
                        </p>
                        <Button
                            asChild
                            size="lg"
                            className="bg-main hover:bg-main-hover text-white font-semibold rounded"
                        >
                            <Link href="/login" className="flex items-center gap-2">
                                Sign In to Portal
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                    <div className="bg-white rounded-2xl p-10 text-center shadow-lg flex flex-col items-center">
                        <div className="bg-main/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                            <BookOpen className="h-8 w-8 text-main" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Prospective Students</h3>
                        <p className="text-gray-600 mb-6">
                            Explore our academic programs, campus life, and application process. Start your journey to academic excellence today.
                        </p>
                        <Button
                            asChild
                            size="lg"
                            className="bg-light hover:bg-light-hover font-semibold rounded"
                        >
                            <Link href="#programs" className="flex items-center gap-2">
                                Explore Programs
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-gray-500 mb-6 text-lg">
                        Have questions? Our admissions team is here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            className=" bg-main hover:bg-main-hover  font-semibold rounded"
                        >
                            Contact Admissions
                        </Button>
                        <Button
                            className="bg-light hover:bg-light-hover font-semibold rounded"
                        >
                            Schedule Campus Tour
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
