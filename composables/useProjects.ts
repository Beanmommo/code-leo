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
  link: string;
  github: string;
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
      projectAim:
        "To create a modern, user-friendly website that serves as the digital hub for Christ Covenant Church, enabling them to effectively communicate with their congregation, manage events, and provide resources to members in a secure and accessible way.",
      image: "/projects/christ-covenant.png",
      tags: ["Wix Studio", "Wix Events", "Canva"],
      link: "https://www.covenant.org.au",
      github: "#",
      featured: true,
      screenshots: [
        "/projects/ecommerce/screenshot1.jpg",
        "/projects/ecommerce/screenshot2.jpg",
        "/projects/ecommerce/screenshot3.jpg",
      ],
      technicalContributions: [
        "Designed and implemented a responsive layout that adapts seamlessly to all device sizes",
        "Integrated Wix Events for streamlined event management and registration",
        "Created custom member authentication and access control for private resources",
        "Optimized site performance with lazy loading and image optimization techniques",
        "Implemented SEO best practices to improve search engine visibility",
        "Developed custom contact forms with validation and email notification integration",
      ],
      technologies: [
        {
          name: "Wix Studio",
          description: "Website builder with advanced features",
          icon: "/icons/wixstudio.svg",
        },
        {
          name: "Canva",
          description: "Design tool for creating graphics and layouts",
          icon: "/icons/canva.svg",
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
      github: "https://github.com/yourusername/task-management",
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
      github: "https://github.com/yourusername/weather-dashboard",
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
