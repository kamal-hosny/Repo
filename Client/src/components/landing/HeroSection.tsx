"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export const HeroSection = () => {

  const { t } = useTranslation()

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
                {t("pages.herosection.title")}
              </h1>
              <p className="text-2xl font-normal">
                {t("pages.herosection.description")}
              </p>
              <div className="flex gap-2">
                <Button className="bg-primary hover:bg-primary-hover text-theme">
                  {t("pages.herosection.startbutton")}
                </Button>
                <Button className="bg-light hover:bg-light-hover text-theme">
                {t("pages.herosection.demobutton")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
