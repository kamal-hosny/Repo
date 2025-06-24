import React from "react";
import {
    Microscope,
    Calculator,
    Palette,
    Briefcase,
    Stethoscope,
    Code,
    ArrowRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ProgramsSection = () => {
    const programs = [
        {
            icon: <Microscope className="h-10 w-10 text-green-500" />,
            title: "School of Sciences",
            description: "Cutting-edge research in biology, chemistry, physics, and environmental sciences.",
            courses: ["Biology", "Chemistry", "Physics", "Environmental Science"],
        },
        {
            icon: <Calculator className="h-10 w-10 text-blue-500" />,
            title: "School of Engineering",
            description: "Innovation-driven programs in various engineering disciplines.",
            courses: ["Computer Engineering", "Mechanical", "Electrical", "Civil"],
        },
        {
            icon: <Briefcase className="h-10 w-10 text-purple-500" />,
            title: "School of Business",
            description: "Preparing future leaders with comprehensive business education.",
            courses: ["MBA", "Finance", "Marketing", "International Business"],
        },
        {
            icon: <Palette className="h-10 w-10 text-pink-500" />,
            title: "School of Arts",
            description: "Creative programs fostering artistic expression and cultural understanding.",
            courses: ["Fine Arts", "Music", "Theater", "Creative Writing"],
        },
        {
            icon: <Stethoscope className="h-10 w-10 text-red-500" />,
            title: "School of Medicine",
            description: "World-class medical education and healthcare research programs.",
            courses: ["Medicine", "Nursing", "Public Health", "Biomedical Sciences"],
        },
        {
            icon: <Code className="h-10 w-10 text-indigo-500" />,
            title: "School of Technology",
            description: "Advanced programs in computer science and information technology.",
            courses: ["Computer Science", "Data Science", "Cybersecurity", "AI/ML"],
        },
    ];

    return (
        <section id="programs" className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className=" mb-16">
                    <h2 className="text-5xl font-black mb-6">Academic Programs</h2>
                    <p className="text-2xl font-normal text-gray-600 max-w-3xl ">
                        Discover world-class programs designed to challenge, inspire, and prepare you for success in your chosen field. Our comprehensive curriculum combines theoretical knowledge with practical application.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {programs.map((program, index) => (
                        <Card key={index} className="w-full shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                            <CardHeader className="flex flex-col items-center gap-4 py-8">
                                <div>{program.icon}</div>
                                <CardTitle className="text-xl font-bold text-center">{program.title}</CardTitle>
                                <CardDescription className="text-center text-base text-gray-600">
                                    {program.description}
                                </CardDescription>
                                <div className="flex flex-wrap gap-2 justify-center mt-4">
                                    {program.courses.map((course, courseIndex) => (
                                        <span
                                            key={courseIndex}
                                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                                        >
                                            {course}
                                        </span>
                                    ))}
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
                <div className="text-center mt-16">
                    <Button size="lg" className="bg-primary hover:bg-primary-hover px-8 py-4 text-lg font-semibold rounded">
                        View All Programs
                    </Button>
                </div>
            </div>
        </section>
    );
};
