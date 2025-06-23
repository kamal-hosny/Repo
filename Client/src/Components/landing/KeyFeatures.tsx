import React from "react";
import {
  BookOpen,
  Calendar,
  File,
  Users,
  ChartSpline,
  MessageCircleMore,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const KeyFeatures = () => {
  const features = [
    {
      icon: <BookOpen />,
      title: "Courses",
      description:
        "Manage courses, materials, and resources in one central hub.",
    },
    {
      icon: <File />,
      title: "Assignments",
      description: "Create, distribute, and grade assignments efficiently.",
    },
    {
      icon: <Calendar />,
      title: "Scheduling",
      description: "Streamline scheduling for classes, meetings, and events.",
    },
    {
      icon: <Users />,
      title: "Collaboration",
      description: "Foster collaboration among students, teachers, and staff.",
    },
    {
      icon: <ChartSpline />,
      title: "Analytics",
      description:
        "Gain insights into performance with comprehensive analytics.",
    },
    {
      icon: <MessageCircleMore />,
      title: "Communication",
      description:
        "Facilitate seamless communication across the academic community.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-5xl font-black pb-20">Key Features</h3>
        <div className="flex flex-col gap-10">
          <h2 className="text-6xl font-black">
            Streamline Your Academic Operations
          </h2>
          <p className="text-2xl font-normal">
            Task Flow offers a comprehensive suite of tools to manage every
            aspect of your academic operations, from course management to
            communication.
          </p>
          <div className="flex gap-10">
            {features.map((feature) => (
              <Card className="w-[176px]">
                <CardHeader className="flex flex-col gap-2">
                  <CardTitle>{feature.icon}</CardTitle>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
