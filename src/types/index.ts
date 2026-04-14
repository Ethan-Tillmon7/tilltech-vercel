// Navigation
export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

// Social
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// Projects
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  thumbnailUrl: string;
  screenshots?: string[];
  screenshotLayout?: "carousel" | "grid";
  githubUrl?: string | null;
  liveUrl?: string | null;
  demoUrl?: string | null;
  featured: boolean;
  category: "professional" | "personal" | "academic";
  status?: "in-development" | "completed";
  order: number;
}

// Skills
export interface Skill {
  name: string;
  level: number;
  category: "languages" | "frameworks" | "tools" | "soft-skills";
  icon?: string;
}

export interface SkillCategory {
  name: string;
  slug: string;
  skills: Skill[];
}

// About
export interface Education {
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
  location: string;
  highlights?: string[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "education" | "career" | "personal" | "travel";
  location?: string;
}

export interface PlaceLived {
  city: string;
  state: string;
  years: string;
  description?: string;
}

// Health
export interface StravaActivity {
  id: number;
  name: string;
  type: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  start_date: string;
  average_speed: number;
  max_speed: number;
}

export interface FitnessGoal {
  id: string;
  title: string;
  target: string;
  current?: string;
  deadline?: string;
  completed: boolean;
}

// Interests
export interface FavoriteItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  rating?: number;
  comment?: string;
  category: "movie" | "book" | "music" | "place";
}

// Travels
export interface TravelLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  country: string;
  state?: string;
  type: "international" | "domestic";
  visitDate?: string;
  description?: string;
  photos?: string[];
}

export interface TravelCountry {
  name: string;
  cities: string[];
}

export interface TravelState {
  name: string;
  cities: string[];
}

export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
  location?: string;
  date?: string;
  tags?: string[];
}

// GitHub
export interface GitHubRepoInfo {
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
  openIssues: number;
}

// Contact
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
