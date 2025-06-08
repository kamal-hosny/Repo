import Head from 'next/head';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { HeroSection } from '@/components/landing/HeroSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { ProgramsSection } from '@/components/landing/ProgramsSection';
import { NewsSection } from '@/components/landing/NewsSection';
import { CTASection } from '@/components/landing/CTASection';

export default function Home() {
  return (
    <>
      <Head>
        <title>Enterprise University - Excellence in Higher Education</title>
        <meta name="description" content="Shaping tomorrow's leaders through excellence in education, research, and innovation. Join our community of scholars dedicated to making a positive impact on the world." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageWrapper>
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <NewsSection />
        <CTASection />
      </PageWrapper>
    </>
  );
}
