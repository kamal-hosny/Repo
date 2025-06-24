import Image from 'next/image';
import { GraduationCap, Users, Globe, Award } from 'lucide-react';
import { Button } from '@/Components/ui/button';

export const AboutSection = () => {
    const pillars = [
        {
            icon: <GraduationCap className="h-7 w-7 text-blue-600" />,
            title: 'Academic Excellence',
            desc: 'Over 130 years of shaping leaders and innovators.'
        },
        {
            icon: <Users className="h-7 w-7 text-green-600" />,
            title: 'Diverse Community',
            desc: 'Students and faculty from 85+ countries.'
        },
        {
            icon: <Globe className="h-7 w-7 text-purple-600" />,
            title: 'Global Perspective',
            desc: 'A curriculum designed for a connected world.'
        },
        {
            icon: <Award className="h-7 w-7 text-orange-600" />,
            title: 'Recognized Impact',
            desc: 'Award-winning programs and research.'
        },
    ];

    return (
        <section id="about" className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
                {/* Left: Illustration */}
                <div className="flex-1 flex justify-center">
                    <Image
                        src="/about.jpg"
                        alt="About Enterprise University"
                        width={500}
                        height={500}
                        className="rounded-3xl shadow-2xl object-contain bg-white/40 backdrop-blur-md"
                        priority
                    />
                </div>
                {/* Right: Content Card */}
                <div className="flex-1 w-full max-w-xl">
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 flex flex-col gap-8">
                        <div>
                            <h2 className="text-5xl font-black mb-4 text-gray-900">Who We Are</h2>
                            <p className="text-xl text-gray-700 mb-2">
                                Task Flow is a global leader in higher education, dedicated to empowering students to create positive change in the world.
                            </p>
                            <p className="text-lg text-gray-500">
                                Our mission is to inspire innovation, foster diversity, and cultivate excellence in every learner.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-6">
                            {pillars.map((pillar, i) => (
                                <div key={i} className="flex flex-col items-center text-center flex-1 gap-2">
                                    <div className="mb-1">{pillar.icon}</div>
                                    <div className="font-bold text-lg text-gray-900">{pillar.title}</div>
                                    <div className="text-gray-600 text-sm">{pillar.desc}</div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center pt-2">
                            <Button className="bg-main hover:bg-main-hover px-8 py-3 text-lg font-bold rounded-full shadow-md">
                                Discover More
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
