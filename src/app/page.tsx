// src/app/page.tsx
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/app/components/HeroSection';
import ProjectsSection from '@/app/components/ProjectsSection';

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section with Profile Coin */}
        <HeroSection backgroundUrl="/images/hero-bg.jpg" />

        {/* Projects Section */}
        <ProjectsSection />
        
        {/* Contact Section */}
        <div id="contact" className="py-20 bg-foreground/5">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
              <p className="text-xl mb-8 opacity-70">
                Interested in working together? Feel free to reach out to discuss your project.
              </p>
              <a 
                href="mailto:your.email@example.com" 
                className="inline-block px-8 py-3 bg-foreground text-background font-medium rounded-md hover:opacity-90 transition-opacity"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}