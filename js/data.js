/* Content data for the Skills and Certificates pages */

// Skills page: groups shown in this order
const SKILL_GROUPS = [
  { title: "Languages", items: ["C++", "Python", "C", "Java"] },
  { title: "Frontend", items: ["HTML5", "CSS3", "React.js", "Next.js", "Tailwind CSS", "Leaflet.js"] },
  { title: "Backend", items: ["Node.js", "Express.js", "Socket.IO", "JWT"] },
  { title: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma"] },
  { title: "Tools and platforms", items: ["Git", "GitHub", "Postman"] },
  { title: "Machine learning", items: ["Scikit-learn", "Llama 3.1", "Groq API"] }
];

// Brand color and fallback monogram for each technology
const TECH = {
  "C++": { color: "#00599C", mono: "C++" },
  "Python": { color: "#3776AB", mono: "Py" },
  "C": { color: "#5C7FB5", mono: "C" },
  "Java": { color: "#E76F00", mono: "Ja" },
  "HTML5": { color: "#E34F26", mono: "5" },
  "CSS3": { color: "#1572B6", mono: "3" },
  "React.js": { color: "#0aa6c9", mono: "react" },
  "Next.js": { color: "#222B3A", mono: "N" },
  "Tailwind CSS": { color: "#06A6C4", mono: "Tw" },
  "Leaflet.js": { color: "#199900", mono: "Lf" },
  "Node.js": { color: "#5FA04E", mono: "node" },
  "Express.js": { color: "#4B5565", mono: "ex" },
  "Socket.IO": { color: "#3B4252", mono: "IO" },
  "JWT": { color: "#D63AFF", mono: "JWT" },
  "PostgreSQL": { color: "#336791", mono: "Pg" },
  "MySQL": { color: "#00758F", mono: "My" },
  "MongoDB": { color: "#47A248", mono: "Mo" },
  "Prisma": { color: "#2D3748", mono: "Pr" },
  "Git": { color: "#F05032", mono: "git" },
  "GitHub": { color: "#2B3137", mono: "GH" },
  "Postman": { color: "#FF6C37", mono: "Pm" },
  "Scikit-learn": { color: "#F7931E", mono: "sk" },
  "Llama 3.1": { color: "#0467DF", mono: "L3" },
  "Groq API": { color: "#F55036", mono: "Gq" }
};

// Certificates page (category: course | intern | contest)
const CERTIFICATES = [
  {
    category: "course",
    title: "Agentic AI Certified Foundations Associate",
    issuer: "Oracle University",
    date: "Sep 26, 2026",
    note: "Credential ID 103522509AAI26OFA",
    image: "images/oracle-agentic-ai.jpg"
  },
  {
    category: "course",
    title: "Database Management System, Part 1",
    issuer: "Infosys Springboard",
    date: "Jul 14, 2026",
    note: "Verify at verify.onwingspan.com",
    image: "images/infosys-dbms.jpg"
  },
  {
    category: "course",
    title: "Certificate of Merit: Mastering Data Structures using Java",
    issuer: "Centre for Professional Enhancement, Lovely Professional University",
    date: "Course Jun 12 to Jul 26, 2026",
    note: "Grade A · Certificate No. 492313 · Issued Aug 13, 2026",
    image: "images/lpu-java-merit.jpg"
  },
  {
    category: "intern",
    title: "CyberSmart Awareness, CSR Project Internship",
    issuer: "WNS Cares Foundation",
    date: "Jul to Aug 2025",
    note: "Certificate dated Sep 30, 2025",
    image: "images/wns-cybersmart.jpg"
  },
  {
    category: "contest",
    title: "Break the Bug, Badge of Participation",
    issuer: "Infineon, under the Centre for Professional Enhancement",
    date: "",
    note: "Technical debugging competition",
    image: "images/infineon-break-the-bug.jpg"
  },
  {
    category: "course",
    title: "Oracle AI Database Certified Foundations Associate",
    issuer: "Oracle University",
    date: "Aug 23, 2026",
    note: "Credential ID 103522509OCI26DCFA · eCertificate valid until Aug 23, 2028",
    image: "images/oracle-ai-database.jpg"
  }
];
