import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Microscope, 
  Calculator, 
  Palette, 
  Briefcase, 
  Stethoscope, 
  Code,
  ArrowRight 
} from 'lucide-react';

export const ProgramsSection = () => {
  const programs = [
    {
      icon: <Microscope className="h-8 w-8" />,
      title: "School of Sciences",
      description: "Cutting-edge research in biology, chemistry, physics, and environmental sciences.",
      courses: ["Biology", "Chemistry", "Physics", "Environmental Science"],
      color: "bg-green-500"
    },
    {
      icon: <Calculator className="h-8 w-8" />,
      title: "School of Engineering",
      description: "Innovation-driven programs in various engineering disciplines.",
      courses: ["Computer Engineering", "Mechanical", "Electrical", "Civil"],
      color: "bg-blue-500"
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "School of Business",
      description: "Preparing future leaders with comprehensive business education.",
      courses: ["MBA", "Finance", "Marketing", "International Business"],
      color: "bg-purple-500"
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "School of Arts",
      description: "Creative programs fostering artistic expression and cultural understanding.",
      courses: ["Fine Arts", "Music", "Theater", "Creative Writing"],
      color: "bg-pink-500"
    },
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: "School of Medicine",
      description: "World-class medical education and healthcare research programs.",
      courses: ["Medicine", "Nursing", "Public Health", "Biomedical Sciences"],
      color: "bg-red-500"
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "School of Technology",
      description: "Advanced programs in computer science and information technology.",
      courses: ["Computer Science", "Data Science", "Cybersecurity", "AI/ML"],
      color: "bg-indigo-500"
    }
  ];

  return (
    <section id="programs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Academic Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover world-class programs designed to challenge, inspire, and prepare you 
            for success in your chosen field. Our comprehensive curriculum combines theoretical 
            knowledge with practical application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className={`${program.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    {program.icon}
                    <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2">{program.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-gray-900 text-sm">Featured Programs:</h4>
                    <div className="flex flex-wrap gap-1">
                      {program.courses.map((course, courseIndex) => (
                        <span 
                          key={courseIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors"
                  >
                    Explore Programs
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
          >
            View All Programs
          </Button>
        </div>
      </div>
    </section>
  );
};
