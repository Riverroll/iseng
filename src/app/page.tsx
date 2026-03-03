// src/app/page.tsx
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/app/components/HeroSection';
import AboutSection from '@/app/components/AboutSection';
import CertificateSection from '@/app/components/CertificateSection';
import ProjectsSection from '@/app/components/ProjectsSection';
import ContactSection from '@/app/components/ContactSection';

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection backgroundUrl="/images/hero-bg.jpg" />
        <AboutSection />
        <ProjectsSection />
        <CertificateSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
