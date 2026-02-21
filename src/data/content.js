import { CONFIG } from '../config';

export const aboutContent = {
  heading: "System Engineer | TCS Aviation",
  subheading: "Backend Specialist for DGCA & BCAS Regulatory Systems",
  description: `
    I currently work at ${CONFIG.company}, where I contribute to backend services for regulatory aviation systems used by DGCA and BCAS. My work involves designing, developing, and maintaining RESTful APIs using Java and Spring Boot, enhancing and refactoring legacy backend code, and implementing transaction-safe workflows to ensure data consistency across critical business processes.
    
    I have hands-on experience working with multiple backend services (microservice-style systems), optimizing SQL queries for performance-critical use cases, and handling production issues through log analysis and debugging. I have optimized high-usage database queries executed over 1M+ times weekly, reducing execution time significantly and improving system reliability.
  `,
  experience: CONFIG.experience,
  company: CONFIG.company,
  role: CONFIG.role,
  stats: [
    { value: "10+", label: "Production Services" },
    { value: "1M+", label: "Weekly DB Queries" },
    { value: "DAW", label: "Module Lead" },
    { value: "0", label: "Downtime (MIS)" }
  ]
};

// Skills from your photo - organized by category
export const skillsData = [
  {
    category: "Frontend Engineering",
    icon: "code",
    items: ["React.js", "JavaScript (ES6+)", "HTML", "CSS", "Responsive layouts", "Performance-focused UI"],
    level: 85
  },
  {
    category: "Backend & APIs",
    icon: "server",
    items: ["Java", "Spring Boot", "REST APIs", "Service-layer design", "Production fixes", "Delivery"],
    level: 90
  },
  {
    category: "Design & Interaction",
    icon: "palette",
    items: ["Figma", "UI systems", "Layout hierarchy", "Interaction design", "Dev handoff"],
    level: 75
  },
  {
    category: "Data & Systems",
    icon: "database",
    items: ["SQL", "MIS dashboards", "Data reporting", "ERP systems", "Requirement-driven"],
    level: 88
  },
  {
    category: "Workflow & Tools",
    icon: "tool",
    items: ["Git", "Version control", "Collaborative development"],
    level: 92
  }
];

export const projectsData = [
  {
    title: "DGCA MIS Dashboard",
    category: "Enterprise Analytics",
    tagline: "Real-time aviation regulatory dashboard for 50+ operators",
    features: ["1M+ Weekly Queries", "PostgreSQL Optimization", "Compliance Reports", "Zero Downtime"],
    gradient: "gradient-0",
    impact: "Optimized queries executed 1M+ times weekly, reducing execution time by 40%"
  },
  {
    title: "DGCA DAW Module",
    category: "Mission-Critical ERP",
    tagline: "Airworthiness workflow management for DGCA & BCAS",
    features: ["15+ Workflows", "Transaction Safety", "Audit Trail", "Legacy Refactoring"],
    gradient: "gradient-1",
    impact: "Led backend development ensuring 100% data consistency across critical processes"
  },
  {
    title: "Production Services",
    category: "System Modernization",
    tagline: "10+ legacy service enhancements and security hardening",
    features: ["40% Performance Gain", "Security Hardened", "Monitoring", "Spring Boot Migration"],
    gradient: "gradient-2",
    impact: "Enhanced and refactored legacy code, improving system reliability for DGCA/BCAS"
  }
];

export const contactInfo = {
  email: CONFIG.email,
  location: CONFIG.location,
  status: "Available for projects",
  availability: "Full-time / Contract"
};