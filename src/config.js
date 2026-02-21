// CENTRALIZED CONFIGURATION - Single Source of Truth

// ===== PERSONAL CONFIG =====
export const CONFIG = {
  name: "Sakshi Kataria",
  title: "", // Removed role tag
  email: "sakshi@example.com",
  resumeLink: "https://drive.google.com/file/d/1s4TZBF8jM6UAo2I1IiDfq6uLATdGdy-4/view",
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
    items: ["Java", "Spring Boot", "SQL", "REST API"]
  },
  {
    category: "Frontend",
    items: ["React.js", "JavaScript", "HTML", "CSS"]
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Bootstrap"]
  }
];


// ===== PROJECTS DATA =====
export const PROJECTS = [
  {
    title: "DGCA (Directorate General of Civil Aviation)",
    description: "Enhanced legacy backend systems for aircraft safety certifications and airworthiness monitoring. Refactored critical services, implemented transaction management for data consistency, and optimized high-usage SQL queries executed 1M+ times weekly.",
    highlights: ["Java & Spring Boot", "SQL Optimization (17s → 4s)", "30+ Services Maintained"]
  },
  {
    title: "BCAS (Bureau of Civil Aviation Security)",
    description: "Developed reusable backend services and transaction-safe workflows for aviation security platforms. Built internal deployment utilities to streamline environment management and reduce manual errors.",
    highlights: ["Java & Spring Boot", "REST APIs", "Deployment Automation"]
  }
];

// ===== SOCIAL LINKS =====
export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com",
  github: "https://github.com"
};