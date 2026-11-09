import React, { useEffect, useRef, useState } from "react";
import skills from "../data/skills";
import "./css/Skills.css";

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

      <div className="skills-grid">
        {skills.map((skill, i) => (
          <SkillCard key={skill.title} {...skill} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
