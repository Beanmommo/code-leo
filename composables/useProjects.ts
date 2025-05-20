import { ref } from "vue";

export interface TimelineItem {
  month: string;
  year: string;
  description: string;
  image?: string;
}

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
  timeline?: TimelineItem[];
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
      timeline: [
        {
          month: "October",
          year: "2024",
          description:
            "Screenshot shows old website design. During this phase, I was tasked to enhance the design of the church's website.",
          image: "/projects/christ-covenant/timeline/oct2024.png",
        },
        {
          month: "November",
          year: "2024",
          description:
            "While working on the design, I found that Wix is limted in terms of advanced configuration options. I researched and came across Wix Studio which then I proposed to build the website from the ground up using this platform.",
          image: "/projects/christ-covenant/timeline/nov2024.png",
        },
        {
          month: "December",
          year: "2024",
          image: "/projects/christ-covenant/timeline/dec2024.png",
          description:
            "During development, I sought feedback on the website design and was advised to optimize the typography to better appeal to a Reformed church audience. However, we faced a challenge: the existing logo design did not pair well with serif fonts typically associated with that aesthetic.",
        },
        {
          month: "January",
          year: "2025",
          description:
            "Project deployment is delayed for 2 weeks due to stakeholder busy schedule, and directly used for church camp registration forms. (Covenant Camp 2025). you could access the website at covenant.org.au",
          image: "/projects/christ-covenant/timeline/jan2025.png",
        },
        {
          month: "Present",
          year: "",
          description:
            "website is live and currently being used for church frontpage, events, and member resources.",
          image: "/projects/christ-covenant/timeline/present.png",
        },
      ],
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
