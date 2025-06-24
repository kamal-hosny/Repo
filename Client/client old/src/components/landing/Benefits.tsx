import React from "react";
import { GraduationCap, SquareUserRound, User } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Benefits = () => {
  const benifits = [
    {
      icon: <GraduationCap />,
      title: "For Students",
      description:
        "Stay organized, manage assignments, and collaborate effectively with peers.",
    },
    {
      icon: <SquareUserRound />,
      title: "For Teachers",
      description:
        "Simplify course management, grading, and communication with students.",
    },
    {
      icon: <User />,
      title: "For Administrators",
      description:
        "Gain insights into performance, streamline workflows, and improve overall efficiency.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-5xl font-black pb-20">Benefits for Everyone</h3>
        <div className="flex flex-col gap-10">
          <h2 className="text-6xl font-black">
            Empowering Students, Teachers, and Administrators
          </h2>
          <p className="text-2xl font-normal">
            Task Flow provides tailored solutions to meet the unique needs of
            each member of the academic community.
          </p>
          <div className="flex justify-center gap-10">
            {benifits.map((benefit) => (
              <Card className="w-[300px]">
                <CardHeader className="flex flex-col gap-2">
                  <CardTitle>{benefit.icon}</CardTitle>
                  <CardTitle>{benefit.title}</CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
