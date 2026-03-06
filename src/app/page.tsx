// src/app/page.tsx
import WelcomeAnimation from '@/app/components/WelcomeAnimation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/app/components/HeroSection';
import AboutSection from '@/app/components/AboutSection';
import CertificateSection from '@/app/components/CertificateSection';
import ProjectsSection from '@/app/components/ProjectsSection';
import ContactSection from '@/app/components/ContactSection';
import ResumeSection from '@/app/components/ResumeSection';
import ChatBot from '@/app/components/ChatBot';

export default function Home() {
  return (
    <>
      <WelcomeAnimation />
      <Navbar />

      <main>
        <HeroSection backgroundUrl="/images/hero-bg.jpg" />
        <AboutSection />
        <ResumeSection />
        <ProjectsSection />
        <CertificateSection />
        <ContactSection />
      </main>

      <Footer />
      <ChatBot />
    </>
  );
}
