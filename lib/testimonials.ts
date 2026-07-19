export type Testimonial = {
  quote: string;
  name: string;
  major: string;
  university: string;
  image: string;
};

export type TestimonialCard = Testimonial & { initials: string };

const T: Testimonial[] = [
  {
    quote:
      "Balancing multiple engineering projects was overwhelming. Aqademiq helps me track deadlines across all my courses and breaks down complex assignments into manageable steps. My grades improved significantly.",
    name: "Jonathan Samuel",
    major: "Mechatronics Engineering",
    university: "University of Wollongong",
    image: "/testimonials/JonathanSamuel.webp",
  },
  {
    quote:
      "As a commerce student, I juggle multiple subjects with different assignment styles. Aqademiq's smart scheduling adapts to my workload and helps me prioritize what needs attention first.",
    name: "Thisal Perera",
    major: "BCom Student",
    university: "Deakin University",
    image: "/testimonials/ThisalPerera.webp",
  },
  {
    quote:
      "Managing my Master's thesis while keeping up with coursework was challenging. Aqademiq organizes my research tasks and coursework deadlines in one place. It's been a game-changer for my productivity.",
    name: "Kaviyan Elan",
    major: "MEng Electrical and Electronics",
    university: "Loughborough University",
    image: "/testimonials/KaviyanElan.webp",
  },
  {
    quote:
      "Clinical rotations plus study time requires careful planning. Aqademiq helps me balance my dental school schedule, ensuring I don't miss important deadlines or exam prep sessions.",
    name: "Sana khan",
    major: "Bachelors in Dentistry",
    university: "Ajman University",
    image: "/testimonials/SanaSultana.webp",
  },
  {
    quote:
      "Economics courses have overlapping deadlines that used to stress me out. With Aqademiq, I can see everything at a glance and plan my study sessions more effectively. Much less anxiety now.",
    name: "Abdullah Al Ameri",
    major: "Bachelor's of Economics",
    university: "United Arab Emirates University",
    image: "/testimonials/AbdullahAlAmeri.webp",
  },
  {
    quote:
      "AI engineering projects can be complex with many moving parts. Aqademiq breaks everything down and helps me track progress across multiple coding assignments. I stay on top of everything now.",
    name: "Haseeb Zulfiqar",
    major: "AI Engineering",
    university: "Abu Dhabi University",
    image: "/testimonials/HaseebZulfiqar.webp",
  },
  {
    quote:
      "Finance courses have frequent exams and assignments. Aqademiq's grade tracking and deadline reminders keep me organized. I can focus on studying instead of worrying about missing deadlines.",
    name: "Ethan D'souza",
    major: "BBA (Finance)",
    university: "University of Wollongong",
    image: "/testimonials/EthanDsouza.webp",
  },
  {
    quote:
      "Medical school is intense with clinical rotations and studies. Aqademiq helps me manage my cardiology rotation schedule alongside my coursework. It's become essential for staying organized.",
    name: "Adeel Zulfiqar",
    major: "MD. Cardiology",
    university: "Tbilisi State Medical University",
    image: "/testimonials/AdeelZulfiqar.webp",
  },
  {
    quote:
      "I have ADHD and I was constantly juggling five apps. Now everything's in one place and Ada's suggestions actually make sense. I stopped procrastinating because I don't have decision paralysis anymore.",
    name: "Devadutt B",
    major: "BEng Computer Science",
    university: "BITS Pilani",
    image: "/testimonials/DevaduttB.webp",
  },
  {
    quote:
      "Biotechnology labs require precise timing and organization. Aqademiq helps me plan my lab work around my coursework deadlines. The weekly reviews help me understand my productivity patterns.",
    name: "Gaurish CP",
    major: "BEng Biotechnology",
    university: "BITS Pilani",
    image: "/testimonials/GaurishCP.webp",
  },
];

const initials = (n: string): string =>
  n
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/**
 * A marquee row: 5 testimonials starting at `start`, each stamped with initials,
 * then repeated 4× (the CSS translates the track by -50% for a seamless loop).
 */
export function testiRows(start: number): TestimonialCard[] {
  const set = T.slice(start, start + 5).map((t) => ({ ...t, initials: initials(t.name) }));
  return set.concat(set, set, set);
}
