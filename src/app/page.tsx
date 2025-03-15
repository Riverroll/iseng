// src/app/page.tsx
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/app/components/HeroSection';
import ProjectsSection from '@/app/components/ProjectsSection';
import ContactSection from '@/app/components/ContactSection';
import CertificateSection from '@/app/components/CertificateSection';

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section with Profile Coin */}
        <HeroSection backgroundUrl="/images/hero-bg.jpg" />

        {/* Certificate Section */}
        <CertificateSection />

        {/* Projects Section */}
        <ProjectsSection />
        
        {/* Contact Section */}
        <ContactSection />
      </main>
      
      <Footer />
    </>
  );
}