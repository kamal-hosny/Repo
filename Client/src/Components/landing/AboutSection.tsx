import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, Globe, BookOpen } from 'lucide-react';

export const AboutSection = () => {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                        About Enterprise University
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Founded in 1892, Enterprise University has been a beacon of academic excellence
                        for over 130 years, shaping leaders who drive positive change across industries and communities.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                        <CardContent className="p-0">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">25,000+</h3>
                            <p className="text-gray-600">Active Students</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                        <CardContent className="p-0">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">150+</h3>
                            <p className="text-gray-600">Academic Programs</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                        <CardContent className="p-0">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Globe className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">85+</h3>
                            <p className="text-gray-600">Countries Represented</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                        <CardContent className="p-0">
                            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="h-8 w-8 text-orange-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">12:1</h3>
                            <p className="text-gray-600">Student-Faculty Ratio</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                                Our Mission
                            </h3>
                            <p className="text-lg text-gray-700 mb-6">
                                To provide transformative educational experiences that prepare students to excel
                                in their chosen fields while contributing meaningfully to society through innovation,
                                critical thinking, and ethical leadership.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                    <p className="text-gray-700">Academic excellence through rigorous curriculum and research</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                    <p className="text-gray-700">Character development and ethical leadership training</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                    <p className="text-gray-700">Global perspective and cultural understanding</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <h4 className="text-xl font-serif font-semibold text-gray-900 mb-4">Our Values</h4>
                            <div className="space-y-4">
                                <div className="border-l-4 border-blue-600 pl-4">
                                    <h5 className="font-semibold text-gray-900">Excellence</h5>
                                    <p className="text-gray-600 text-sm">Pursuing the highest standards in everything we do</p>
                                </div>
                                <div className="border-l-4 border-green-600 pl-4">
                                    <h5 className="font-semibold text-gray-900">Innovation</h5>
                                    <p className="text-gray-600 text-sm">Embracing new ideas and creative solutions</p>
                                </div>
                                <div className="border-l-4 border-purple-600 pl-4">
                                    <h5 className="font-semibold text-gray-900">Integrity</h5>
                                    <p className="text-gray-600 text-sm">Acting with honesty and ethical principles</p>
                                </div>
                                <div className="border-l-4 border-orange-600 pl-4">
                                    <h5 className="font-semibold text-gray-900">Community</h5>
                                    <p className="text-gray-600 text-sm">Building inclusive and supportive relationships</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
