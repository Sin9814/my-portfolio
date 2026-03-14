// CENTRALIZED CONFIGURATION - Single Source of Truth

// ===== PERSONAL CONFIG =====
export const CONFIG = {
  name: "Sakshi Kataria",
  title: "", // Removed role tag
  email: "sakshikataria9814@gmail.com",
  resumeLink: "https://drive.google.com/file/d/1NqWjlVYqrnjnBiccEFwiWkCyUQB1jKRb/view?usp=sharing",
  location: "India",
  experience: "2+ Years",
  company: "Tata Consultancy Services",
  role: "System Engineer",
  social: {
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  }
};

// ===== NAVIGATION =====
export const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' }
];

// ===== SKILLS DATA - Simplified =====
// ===== SKILLS DATA - By Stack =====
export const SKILLS = [
  {
    category: "Backend",
    items: ["Java", "Spring Boot", "REST APIs", "SQL (PostgreSQL, Neon)", "JPA/Hibernate", "Postman"]
  },
  {
    category: "Frontend",
    items: ["React.js", "JavaScript","Angular", "HTML", "CSS","Bootstrap"]
  },
  {
    category: "DevOps & Tools",
    items: ["Git", "GitHub", "Render","Vercel","Docker"]
  }
];


// ===== PROJECTS DATA =====
export const PROJECTS = [
  {
    title: "Clinical Resource Manager",
    description: "Developed using Java 17/Spring Boot 3 with an Angular frontend and Neon PostgreSQL. Implemented RBAC/JWT security and orchestrated a cloud-native deployment via Render and Vercel to handle high-concurrency scheduling following Azure-aligned scalability best practices.",
    highlights: ["Java & Spring Boot", "JWT & RBAC", "Azure-aligned"],
      link: "https://your-clinical-link.vercel.app"
  },
  {
    title: "Vehicle Anti-Theft System",
    description: "Developed a high-fidelity biometric security module utilizing Python, OpenCV, and SSD optimized for real-time Edge-AI inference. Engineered a proactive SMTP alert engine for instant threat notification and bridged software-to-hardware execution via a validated ESP8266/Arduino prototype.",
    highlights: ["Edge-AI inference", "Python, OpenCV", "SMTP"]
  }
];

// ===== SOCIAL LINKS =====
export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com",
  github: "https://github.com"
};
