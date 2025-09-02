import {
  type Icon as IconType,
  Mail,
  Github,
  BookText,
  Instagram,
  AudioLines,
  Linkedin,
  Film,
  Youtube,
  Rss,
} from "@lucide/astro";

export interface LinkProps {
  icon: typeof IconType;
  title: string;
  description: string;
  url: string;
}

export const LinkData: LinkProps[] = [
  {
    icon: Mail,
    title: "Email",
    description: "My inbox is always open for conversation :)",
    url: "mailto:JosiahJ.H@outlook.com",
  },
  {
    icon: Github,
    title: "Github",
    description: "Find my open-source projects and contributions here.",
    url: "https://www.github.com/pbinspanish",
  },
  {
    icon: Linkedin,
    title: "Linkedin",
    description: "My resume and connections.",
    url: "https://www.linkedin.com/in/josiahhenson",
  },
  {
    icon: Instagram,
    title: "Instagram",
    description: "Visual thoughts.",
    url: "https://www.instagram.com/pbinspanish",
  },
  {
    icon: BookText,
    title: "Goodreads",
    description: "Everything I've read, am reading, and want to read.",
    url: "https://www.goodreads.com/mantecademani",
  },
  {
    icon: AudioLines,
    title: "Last.fm",
    description: "Everything I'm listening to.",
    url: "https://www.last.fm/user/mantecademani",
  },
  {
    icon: Film,
    title: "Trakt.tv",
    description: "What I'm watching.",
    url: "https://trakt.tv/users/mantecademani",
  },
  {
    icon: Youtube,
    title: "Youtube",
    description: "My explorations of the motion visual medium.",
    url: "https://youtube.com/@pbinspanish",
  },
  {
    icon: Rss,
    title: "RSS",
    description: "RSS feed of the blog posts.",
    url: "rss.xml",
  },
];
