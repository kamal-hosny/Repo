"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight } from "lucide-react";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="relative bg-background py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-x-8 items-center">
            <div className="flex-1">
                <Image src={"./landing.svg"} alt={"landingImg"} width={1200} height={912} />
            </div>
          <div className="flex flex-col flex-1">
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl font-black">
                Simplify Learning. Empower Education.
              </h1>
              <p className="text-2xl font-normal">
                Task Flow is the all-in-one academic operations management
                platform designed to streamline workflows, enhance
                collaboration, and drive success for students, teachers, and
                administrators.
              </p>
              <div className="flex gap-2">
                <Button className="bg-main hover:bg-main-hover">
                  Get Started Free
                </Button>
                <Button className="bg-light hover:bg-light-hover">
                  Request a demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
