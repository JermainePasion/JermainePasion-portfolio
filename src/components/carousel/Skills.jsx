import React, { useEffect, useRef, useState } from "react";
import "../css/Skills.css";

const technicalSkills = [
  {
    title: "Full-Stack Web Development",
    description:
      "Develops and maintains web applications using React, Node.js, and RESTful APIs with clean, readable code.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Frontend & Responsive Design",
    description:
      "Builds user-friendly interfaces that adapt seamlessly across devices using modern CSS frameworks like Tailwind.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <polyline points="8 21 12 17 16 21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Version Control & Collaboration",
    description:
      "Uses Git and platforms like GitHub to manage code, track changes, and collaborate efficiently with teams.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M6 9v6" />
        <path d="M9 6h3a3 3 0 0 1 3 3v6" />
      </svg>
    ),
  },
];

const softSkills = [
  {
    title: "Problem-Solving",
    description:
      "Breaks down technical challenges into manageable steps and implements effective solutions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    title: "Communication",
    description:
      "Clearly conveys ideas, progress, and issues to team members and stakeholders.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Willingness to Learn",
    description:
      "Actively seeks feedback and continuously improves by learning new tools, frameworks, and best practices.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
];

const SkillCard = ({ title, description, icon, index }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`skill-card ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="skill-icon">{icon}</div>
      <div className="skill-text">
        <h3 className="skill-title">{title}</h3>
        <p className="skill-desc">{description}</p>
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section className="skills-section">
      <div className="skills-header">
        <p className="skills-eyebrow">What I bring to the table</p>
        <h2 className="skills-main-heading">Skills</h2>
      </div>

      <div className="skills-inner">
        <div className="skills-column">
          <div className="skills-column-header">
            <span className="skills-tag">Technical</span>
          </div>
          <div className="skills-list">
            {technicalSkills.map((skill, i) => (
              <SkillCard key={i} {...skill} index={i} />
            ))}
          </div>
        </div>

        <div className="skills-divider" />

        <div className="skills-column">
          <div className="skills-column-header">
            <span className="skills-tag">Interpersonal</span>
          </div>
          <div className="skills-list">
            {softSkills.map((skill, i) => (
              <SkillCard key={i} {...skill} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;