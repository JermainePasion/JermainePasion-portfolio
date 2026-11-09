// Projects shown in the Projects carousel, in display order.
// image: a file in /public (WebP, about 1200px wide).
// visit: live site or demo (visitLabel overrides the button text). github: repo link (optional).

const tech = {
  react: { name: "React", icon: "/icons/React.webp" },
  node: { name: "Node.js", icon: "/icons/Node.webp" },
  express: { name: "Express", icon: "/icons/Express.webp" },
  tailwind: { name: "Tailwind CSS", icon: "/icons/Tailwind.webp" },
  mongo: { name: "MongoDB", icon: "/icons/Mongo.webp" },
  tensorflow: { name: "TensorFlow", icon: "/icons/Tensorflow.webp" },
  gemini: { name: "Gemini", icon: "/icons/Gemini.webp" },
  figma: { name: "Figma", icon: "/icons/Figma.svg" },
  supabase: { name: "Supabase", icon: "/icons/Supabase.svg" },
  postgres: { name: "PostgreSQL", icon: "/icons/PostgreSQL.svg" },
  docker: { name: "Docker", icon: "/icons/Docker.svg" },
};

const projects = [
  {
    image: "/projects/boxscore.webp",
    title: "BoxScore",
    description:
      "A Letterboxd-style app for NBA fans to rate and review games. It has natural-language game search, auto-matched YouTube highlights, shot charts, a drag-and-drop G.O.A.T. pyramid, profiles with follows and an activity feed.",
    role: "Full Stack",
    visit: "https://boxscoreclub.com/",
    github: "https://github.com/JermainePasion/Boxscore",
    tech: [tech.react, tech.node, tech.express, tech.tailwind, tech.postgres, tech.docker],
  },
  {
    image: "/projects/imo-ignacio-portfolio.webp",
    title: "Imo Ignacio Portfolio",
    description:
      "A portfolio site for illustrator and graphic designer Imo Ignacio, with collage galleries, hover-expand animations, swipe page transitions and a video edits carousel.",
    role: "Frontend, Freelance",
    visit: "https://imo-pro-portfolio.vercel.app/",
    github: "https://github.com/JermainePasion/ImoProPortfolio",
    tech: [tech.react],
  },
  {
    image: "/projects/project-upcycled-love.webp",
    title: "Project Upcycled Love and Crafts",
    description:
      "A product showcase site for a luxury-resale shop, with category filters, product pages and an admin page for managing listings and seeing product views. Sales happen through Facebook.",
    role: "Full Stack",
    visit: "https://projectupcycledlove.com/",
    tech: [tech.react, tech.tailwind, tech.supabase],
  },
  {
    image: "/projects/3d-price-calculator.webp",
    title: "3D Printing Price Calculator",
    description:
      "A calculator that helps you price 3D-printed products, with an AI chatbot powered by Gemini 2.5 Flash.",
    role: "Full Stack, Prompt Engineering",
    visit: "https://3d-printing-price-calculator-vert.vercel.app/",
    github: "https://github.com/JermainePasion/3dPrintPriceCalculator",
    tech: [tech.react, tech.node, tech.express, tech.tailwind, tech.mongo, tech.gemini],
  },
  {
    image: "/projects/squirkle.webp",
    title: "Squirkle Printing Services",
    description:
      "A showcase website for the BIR-registered printing business I co-run with my partner.",
    role: "Frontend, UI/UX",
    visit: "https://squirkle-website.vercel.app/",
    github: "https://github.com/JermainePasion/react-portfolio",
    tech: [tech.react, tech.tailwind, tech.figma],
  },
  {
    image: "/projects/track-your-toda.webp",
    title: "Track Your Toda",
    description:
      "A mobile app that estimates tricycle fares accurately based on the current fare matrix.",
    role: "Full Stack",
    visit:
      "https://www.linkedin.com/posts/jermaine-pasion-67415a343_as-a-college-student-in-angeles-city-pampanga-activity-7363256282255904768-msr2",
    visitLabel: "View post",
    github: "https://github.com/JermainePasion/TrackYourToda",
    tech: [tech.react, tech.node, tech.express, tech.mongo],
  },
  {
    image: "/projects/ai-got-your-back.webp",
    title: "AI Got Your Back",
    description:
      "An AI-powered wearable that monitors posture in real time using embedded sensors and machine learning. It gives vibration feedback to correct poor posture and support long-term spinal health.",
    role: "Full Stack, Machine Learning",
    visit: "https://ai-gyb.vercel.app/",
    github: "https://github.com/JermainePasion/AI-GYB",
    tech: [tech.react, tech.node, tech.express, tech.tailwind, tech.mongo, tech.tensorflow],
  },
];

export default projects;
