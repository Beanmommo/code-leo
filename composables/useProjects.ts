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
    {
      id: 2,
      slug: "task-management-app",
      title: "Task Management App",
      description:
        "A productivity application for managing tasks and projects with drag-and-drop functionality, user authentication, and real-time updates.",
      fullDescription:
        "This task management application helps teams and individuals organize their work efficiently. Features include task creation and assignment, project organization, deadline tracking, and progress visualization. The drag-and-drop interface allows for intuitive task prioritization, while real-time updates ensure all team members stay synchronized.",
      projectAim:
        "To develop a highly intuitive task management solution that enhances team productivity by simplifying task organization, prioritization, and collaboration while providing real-time updates across all devices.",
      image: "/projects/taskapp.jpg",
      tags: ["Vue.js", "Firebase", "Vuex", "SCSS"],
      link: "#",
      links: [
        {
          name: "GitHub Repository",
          url: "https://github.com/yourusername/task-management",
          icon: "github",
        },
        {
          name: "Demo",
          url: "https://task-management-demo.example.com",
          icon: "external-link",
        },
        {
          name: "Documentation",
          url: "https://github.com/yourusername/task-management/wiki",
          icon: "book",
        },
      ],
      screenshots: [
        "/projects/taskapp/screenshot1.jpg",
        "/projects/taskapp/screenshot2.jpg",
      ],
      technicalContributions: [
        "Implemented real-time data synchronization using Firebase Realtime Database",
        "Developed an intuitive drag-and-drop interface with Vue Draggable",
        "Created a robust state management system using Vuex",
        "Built offline functionality with local storage for data persistence",
        "Designed and implemented user authentication with Firebase Auth",
        "Created responsive UI components that work across all device sizes",
      ],
      technologies: [
        {
          name: "Vue.js",
          description: "Frontend framework for building the user interface",
          icon: "/icons/vue.svg",
        },
        {
          name: "Firebase",
          description: "Backend platform for authentication and database",
          icon: "/icons/firebase.svg",
        },
        {
          name: "Vuex",
          description: "State management pattern and library",
          icon: "/icons/vuex.svg",
        },
      ],
      date: "June 2022",
      duration: "3 months",
    },
    {
      id: 3,
      slug: "weather-dashboard",
      title: "Weather Dashboard",
      description:
        "A weather application that displays current conditions and forecasts for any location, with beautiful visualizations and responsive design.",
      fullDescription:
        "This weather dashboard provides users with accurate weather information for any location worldwide. The application features current conditions, hourly forecasts, and 7-day predictions. Interactive charts visualize temperature trends, precipitation chances, and wind patterns. Users can save favorite locations for quick access and receive weather alerts for severe conditions.",
      projectAim:
        "To create a visually appealing and user-friendly weather application that provides accurate, real-time weather data and forecasts for any location, with intuitive data visualizations and location-based features.",
      image: "/projects/weather.jpg",
      tags: ["Vue.js", "OpenWeather API", "Chart.js", "Geolocation"],
      link: "#",
      links: [
        {
          name: "GitHub Repository",
          url: "https://github.com/yourusername/weather-dashboard",
          icon: "github",
        },
        {
          name: "Live Demo",
          url: "https://weather-dashboard-demo.example.com",
          icon: "cloud",
        },
        {
          name: "API Documentation",
          url: "https://openweathermap.org/api",
          icon: "code",
        },
      ],
      screenshots: [
        "/projects/weather/screenshot1.jpg",
        "/projects/weather/screenshot2.jpg",
      ],
      technicalContributions: [
        "Integrated OpenWeather API with custom caching for efficient data retrieval",
        "Developed interactive data visualizations using Chart.js",
        "Implemented geolocation services with browser API and IP-based fallback",
        "Created comprehensive error handling for API failures and edge cases",
        "Built a responsive UI that adapts to different screen sizes and orientations",
        "Implemented a favorites system with local storage for saving locations",
      ],
      technologies: [
        {
          name: "Vue.js",
          description: "Frontend framework for building the user interface",
          icon: "/icons/vue.svg",
        },
        {
          name: "OpenWeather API",
          description: "Weather data provider",
          icon: "/icons/openweather.svg",
        },
        {
          name: "Chart.js",
          description: "JavaScript charting library for data visualization",
          icon: "/icons/chartjs.svg",
        },
      ],
      date: "October 2022",
      duration: "2 months",
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
