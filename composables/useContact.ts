import { ref } from "vue";

export interface ContactLink {
  id: string;
  name: string;
  value?: string;
  url?: string;
  icon?: string;
  type: "text" | "link" | "email" | "location";
}

export function useContact() {
  const contactLinks = ref<ContactLink[]>([
    {
      id: "email",
      name: "Email",
      value: "leonardo.prasetyo5@gmail.com",
      icon: "/icons/gmail.svg",
      type: "email",
    },
    {
      id: "location",
      name: "Location",
      value: "Melbourne, Australia",
      icon: "/icons/google-maps.svg",
      type: "location",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/lpra25",
      icon: "/icons/linkedin.svg",
      type: "link",
    },
    {
      id: "github",
      name: "GitHub",
      url: "https://github.com/Beanmommo",
      icon: "/icons/github.svg",
      type: "link",
    },
  ]);

  return {
    contactLinks,
  };
}
