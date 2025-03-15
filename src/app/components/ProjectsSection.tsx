// src/app/components/ProjectsSection.tsx
import ProductReveal from '@/app/components/ProductReveal';

interface Project {
  id: string;
  image: string;
  title: string;
  description: string;
}

export default function ProjectsSection() {
  const projects: Project[] = [
    {
      id: "project1",
      image: "/images/project1.png",
      title: "Project One",
      description: "This is my flagship project showcasing my skills in design and development."
    },
    {
      id: "project2",
      image: "/images/project2.png",
      title: "Project Two",
      description: "An innovative solution designed to solve real-world problems."
    },
    {
      id: "project3",
      image: "/images/project3.png",
      title: "Project Three",
      description: "A cutting-edge application that demonstrates my technical capabilities."
    },
    {
      id: "project4",
      image: "/images/project4.png",
      title: "Project Two",
      description: "An innovative solution designed to solve real-world problems."
    },
    {
      id: "project5",
      image: "/images/project5.png",
      title: "Project Two",
      description: "An innovative solution designed to solve real-world problems."
    },
    {
      id: "project6",
      image: "/images/project6.png",
      title: "Project Two",
      description: "An innovative solution designed to solve real-world problems."
    }
  ];

  // Project One is always featured
  const featuredProject = projects[0];
  // All other projects are regular
  const regularProjects = projects.slice(1);

  return (
    <div id="projects" className="py-20">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-4xl font-bold text-center">My Projects</h2>
        <p className="text-xl text-center mt-4 max-w-2xl mx-auto opacity-70">
          A showcase of my creative work and technical projects
        </p>
      </div>
      
      {/* Featured Project */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-center mb-8">Featured Project</h3>
        <ProductReveal
          productImage={featuredProject.image}
          title={featuredProject.title}
          description={featuredProject.description}
        />
      </div>
      
      {/* Regular Projects - Side by Side */}
      <div className="container mx-auto px-6">
        <h3 className="text-2xl font-bold text-center mb-8">Other Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regularProjects.map((project) => (
            <div key={project.id} className="bg-foreground/5 rounded-lg overflow-hidden shadow-md">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                <p className="opacity-70">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}