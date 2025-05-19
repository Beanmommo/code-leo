import { ref } from "vue";

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  fullDescription?: string;
  projectAim?: string;
  image: string;
  tags: string[];
  link?: string; // Keep for backward compatibility
  links: {
    name: string;
    url: string;
    icon?: string;
  }[];
  featured?: boolean;
  screenshots?: string[];
  technicalContributions?: string[];
  challenges?: string[];
  solutions?: string[];
  technologies?: {
    name: string;
    description: string;
    icon?: string;
  }[];
  testimonials?: {
    name: string;
    role: string;
    company: string;
    text: string;
    avatar?: string;
  }[];
  date?: string;
  duration?: string;
}

export function useProjects() {
  const projects = ref<Project[]>([
    {
      id: 1,
      slug: "christ-covenant-church",
      title: "Christ Covenant Church Website",
      description:
        "An enterprise-level website for a church, featuring church details, event management, and member resources.",
      fullDescription:
        "An enterprise-level website for a church, featuring church details, event management, and member resources. The site includes a content management system, and member resources for accessing private resources. Built with Wix Studio and integrated with Wix Events for seamless event management.",
      projectAim: "To enhance church's website user experience and design",
      image: "/projects/christ-covenant.png",
      tags: ["Wix Studio", "Canva", "Google SEO", "Power BI"],
      link: "https://www.covenant.org.au",
      links: [
        {
          name: "Website",
          url: "https://www.covenant.org.au",
          icon: "globe",
        },
      ],
      featured: true,
      screenshots: [
        "/projects/christ-covenant/screenshot1.png",
        "/projects/christ-covenant/screenshot2.png",
        "/projects/christ-covenant/screenshot3.png",
      ],
      technicalContributions: [
        "Developed 8 responsive web pages on Wix Studio for church's public visibility",
        "Optmised individual pages indexing to optimse public visibility using Google SEO.",
        "Added password-protected navigation guard for member's only visibility.",
        "Embeded Power-BI <i-frame> to display church financials responsively.",
        "Created custom ministry icons using Canva for personal church branding.",
        "Optimised website look and feel to attract church attendee demographics.",
        "Translated product owner requirements into production features.",
        "Performs regular content updates.",
      ],
      technologies: [
        {
          name: "Wix Studio",
          description: "Website builder with advanced features",
          icon: "/icons/wix.svg",
        },
        {
          name: "Canva",
          description: "Design tool for creating graphics and layouts",
          icon: "/icons/canva.svg",
        },
        {
          name: "Google SEO",
          description: "Search engine optimization for better visibility",
          icon: "/icons/google.svg",
        },
        {
          name: "Power BI",
          description: "Business analytics service for data visualization",
          icon: "/icons/power-bi.svg",
        },
      ],
      date: "January 2024",
      duration: "3.5 months",
    },
  ]);

  const getFeaturedProject = () => {
    return (
      projects.value.find((project) => project.featured) || projects.value[0]
    );
  };

  const getProjectBySlug = (slug: string) => {
    return projects.value.find((project) => project.slug === slug);
  };

  return {
    projects,
    getFeaturedProject,
    getProjectBySlug,
  };
}
