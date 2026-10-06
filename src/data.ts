export const profile = {
  name: 'Yash Gupta',
  handle: 'cynicalmindset',
  title: 'Systems, Applications & Design',
  role: 'Ex SDE and Content @Workik',
  education: 'CSE Student, KIIT',
  location: 'Jharkhand ↔ Odisha, IN',
  status: 'Open to Collab & Internships',
  githubHandle: 'cynicalmindset',
  githubUrl: 'https://github.com/cynicalmindset',
  email: 'yashguptaadfg@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/yash-g-3322b9253/',
  linkedinLabel: 'linkedin.com/in/yash-g-3322b9253',
  twitterUrl: 'https://x.com/allabouttyash',
  twitterHandle: '@allabouttyash',
  leetcodeUrl: 'https://leetcode.com/u/https_yash/',
  leetcodeHandle: 'https_yash',
  codeforcesUrl: 'https://codeforces.com/profile/ihatecodingbtw',
  codeforcesHandle: 'ihatecodingbtw',
  resumeUrl: 'https://drive.google.com/file/d/1DP1VtybxaM8aiv6xY8i46d7IMbTGUc6J/view?usp=drive_link',
  bio: [
    "Computer science undergrad and software engineer interested in understanding systems from first principles and turning ideas into working products.",
    "Previously a Frontend SDE Intern at Workik, currently building and exploring AI agents, LLM systems, distributed protocols and UIUX Designing."
  ],
  specs: [
    { label: 'PRIMARY FOCUS', value: 'Full-Stack Systems, Developer Tooling & Applied AI' },
    { label: 'LANGUAGES', value: 'TypeScript, Python, C++, Kotlin, JavaScript, SQL' },
    { label: 'ARCHITECTURE', value: 'Distributed Systems, Event-Driven Pipelines, Modern Web' },
    { label: 'ECOSYSTEM', value: 'Node.js / React / Next.js / Linux / Cloud Services' },
  ]
};

import thumb3 from './assets/download (3).jfif';
import thumb4 from './assets/download (4).jfif';
import thumb5 from './assets/download (5).jfif';
import thumb6 from './assets/download (6).jfif';
import thumb7 from './assets/download (7).jfif';

export type TermRow = {
  key: string;
  text?: string;
  link?: { href: string; label: string };
};

export type Project = {
  id: string;
  sym: string;
  number: string;
  name: string;
  category: 'Web & 3D' | 'Hardware & AI' | 'Protocols & Systems' | 'Developer Tools';
  status: 'LIVE' | 'IN PROGRESS' | 'PROTOTYPE';
  desc: string;
  paragraph: string;
  thumbnail: string | null;
  specs: { label: string; value: string }[];
  rows: TermRow[];
};

export const projects: Project[] = [
  {
    id: 'grid',
    sym: '◆',
    number: '01',
    name: 'Grid',
    category: 'Web & 3D',
    status: 'LIVE',
    desc: 'GitHub developers, rendered as an interactive 3D city',
    paragraph:
      'A 3D browser city built with React Three Fiber — every GitHub developer gets a building, with height algorithmically mapped to public repo count. Features WASD movement, mobile touch joysticks, dynamic night atmosphere, collision physics, and roaming NPCs.',
    thumbnail: thumb5,
    specs: [
      { label: 'RENDER ENGINE', value: 'Three.js / React Three Fiber' },
      { label: 'PHYSICS', value: 'Rapier Physics Engine' },
      { label: 'BACKEND', value: 'Supabase + GitHub GraphQL' },
      { label: 'CONTROLS', value: 'WASD + Touch Virtual Joystick' },
    ],
    rows: [
      { key: 'stack:', text: 'react-three-fiber, rapier, supabase, tailwindcss' },
      { key: 'live:', link: { href: 'https://grid-six-swart.vercel.app', label: 'grid-six-swart.vercel.app' } },
      { key: 'src:', link: { href: 'https://github.com/cynicalmindset/Grid', label: 'github.com/cynicalmindset/Grid' } },
    ],
  },
  {
    id: 'miki',
    sym: '◆',
    number: '02',
    name: 'Miki',
    category: 'Hardware & AI',
    status: 'IN PROGRESS',
    desc: 'A physical benchtop AI companion trapped in an OLED display',
    paragraph:
      'A hardware benchtop companion running on an ESP32-CAM + I2C OLED display, powered by an entirely local RAG pipeline with zero cloud dependence. Features a witty Gen-Z persona, 1-4 word quick replies, persistent local memory, and audio wake hooks.',
    thumbnail: thumb3,
    specs: [
      { label: 'MICROCONTROLLER', value: 'ESP32-CAM + I2C SSD1306 OLED' },
      { label: 'PIPELINE', value: 'Fully Local Offline RAG' },
      { label: 'LATENCY', value: '< 240ms Inference Time' },
      { label: 'POWER', value: '5V Micro-USB / LiPo Battery' },
    ],
    rows: [
      { key: 'stack:', text: 'javascript, esp32-cam, c++, local-rag, oled' },
      { key: 'live:', link: { href: 'https://miki-ashy-eight.vercel.app', label: 'miki-ashy-eight.vercel.app' } },
      { key: 'status:', text: 'in progress' },
      { key: 'src:', link: { href: 'https://github.com/cynicalmindset/Miki', label: 'github.com/cynicalmindset/Miki' } },
    ],
  },
  {
    id: 'ripple',
    sym: '◆',
    number: '03',
    name: 'Ripple',
    category: 'Protocols & Systems',
    status: 'IN PROGRESS',
    desc: 'Decentralized social network operating over Bluetooth Low Energy',
    paragraph:
      'A React Native mobile application that runs an entire peer-to-peer social network over Bluetooth LE — zero servers, zero cloud, zero accounts. Messages spread node-to-node using a custom GATT sync protocol with 5-hop decay and Ed25519 cryptographic keypairs for self-sovereign identity.',
    thumbnail: thumb6,
    specs: [
      { label: 'TOPOLOGY', value: 'P2P Bluetooth LE Mesh' },
      { label: 'GOSSIP PROTOCOL', value: 'Custom GATT Sync / 5-hop TTL' },
      { label: 'CRYPTOGRAPHY', value: 'Ed25519 Keypair Signatures' },
      { label: 'OFFLINE FIRST', value: '100% Serverless / Local SQLite' },
    ],
    rows: [
      { key: 'stack:', text: 'react native, expo, react-native-ble-plx, kotlin' },
      { key: 'status:', text: 'in progress' },
      { key: 'src:', link: { href: 'https://github.com/cynicalmindset/Ripple-main', label: 'github.com/cynicalmindset/Ripple-main' } },
    ],
  },
  {
    id: 'research-agent',
    sym: '◆',
    number: '04',
    name: 'Research Agent',
    category: 'Developer Tools',
    status: 'IN PROGRESS',
    desc: 'CLI-first multi-agent autonomous research engine',
    paragraph:
      "A terminal-first multi-agent research engine built for rapid exploration and paper synthesis, running on Groq's high-speed inference pipeline with Qwen open-weights models. Supports deep recursive search, citation graph synthesis, and markdown summary generation.",
    thumbnail: thumb4,
    specs: [
      { label: 'INTERFACE', value: 'Terminal CLI / Interactive TUI' },
      { label: 'INFERENCE', value: 'Groq LPUs / Qwen 2.5 72B' },
      { label: 'MULTI-AGENT', value: 'Planner + Searcher + Synthesizer' },
      { label: 'OUTPUT', value: 'Structured Academic Markdown' },
    ],
    rows: [
      { key: 'stack:', text: 'python, groq, qwen, beautifulsoup4' },
      { key: 'status:', text: 'in progress' },
      { key: 'src:', link: { href: 'https://github.com/cynicalmindset/Terminal-Reaserch_agent', label: 'github.com/cynicalmindset/Terminal-Reaserch_agent' } },
    ],
  },
  {
    id: 'vibecoder',
    sym: '◆',
    number: '05',
    name: 'Vibecoder',
    category: 'Developer Tools',
    status: 'IN PROGRESS',
    desc: 'Express API, Next.js dashboard, and terminal CLI in a unified monorepo',
    paragraph:
      'A full-stack developer platform featuring an Express API with Better Auth, Next.js web dashboard, and a Node.js CLI tool — authenticated via GitHub OAuth device code flow, with Google Gemini powering terminal chat, tool calling, and automated web app scaffolding.',
    thumbnail: thumb7,
    specs: [
      { label: 'AUTH PROTOCOL', value: 'GitHub OAuth Device Flow + Better Auth' },
      { label: 'AI ENGINE', value: 'Google Gemini 2.5 Flash / Tool Calling' },
      { label: 'STACK', value: 'Next.js 15, Express, Prisma, TypeScript' },
      { label: 'CLI ENGINE', value: 'Node.js Commander + Ink Terminal UI' },
    ],
    rows: [
      { key: 'stack:', text: 'express, next.js, prisma, better-auth, gemini' },
      { key: 'status:', text: 'in progress' },
      { key: 'src:', link: { href: 'https://github.com/cynicalmindset/vibecoder', label: 'github.com/cynicalmindset/vibecoder' } },
    ],
  },
];

export const youtubeSpotlight = {
  sectionTitle: 'College Life & Vlogs',
  sectionSubtitle: 'CAMPUS & BUILDS',
  title: 'Documenting the Engineering Journey',
  description: 'A candid glimpse into life as a CS undergrad — from late-night hackathons to hardware prototyping.',
  videoId: 'h0yYj0e2Hk4',
  embedUrl: 'https://www.youtube.com/embed/h0yYj0e2Hk4',
  videoUrl: 'https://youtu.be/h0yYj0e2Hk4',
  duration: 'CAMPUS VLOG',
};

export const stackGroups = [
  { 
    label: 'languages & core', 
    code: '01',
    description: 'Foundational syntax and compiled runtimes',
    tags: ['C++', 'Python', 'JavaScript', 'TypeScript', 'Kotlin', 'SQL'] 
  },
  { 
    label: 'frontend & 3d web', 
    code: '02',
    description: 'Modern reactive interfaces and WebGL graphics',
    tags: ['React', 'Next.js', 'React Three Fiber', 'Three.js', 'React Native', 'Tailwind CSS'] 
  },
  { 
    label: 'backend & storage', 
    code: '03',
    description: 'High-throughput APIs, ORMs, and persistence',
    tags: ['Node.js', 'Express', 'Supabase', 'Prisma', 'SQLite', 'Bun', 'Better Auth'] 
  },
  { 
    label: 'ai & inference', 
    code: '04',
    description: 'Local RAG, fast LPUs, and multimodal tool agents',
    tags: ['Ollama', 'Groq / Qwen', 'Google Gemini API', 'LangChain', 'Local RAG'] 
  },
  { 
    label: 'hardware & protocols', 
    code: '05',
    description: 'Microcontrollers, BLE GATT, and networking',
    tags: ['ESP32-CAM', 'Bluetooth LE', 'GATT Sync', 'I2C OLED', 'Ed25519 Crypto'] 
  },
  { 
    label: 'toolchain & devops', 
    code: '06',
    description: 'Development environment, versioning, and CI/CD',
    tags: ['Git', 'GitHub Actions', 'Vercel', 'Tailscale', 'Expo', 'Vite'] 
  },
];

export interface TimelineMilestone {
  id: string;
  step: string;
  period: string;
  title: string;
  role: string;
  org?: string;
  desc: string;
  category: 'origin' | 'design' | 'mobile' | 'content' | 'sde' | 'frontier';
  tags: string[];
  link?: {
    label: string;
    href: string;
  };
  highlight?: boolean;
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: 'kiit-join',
    step: '01',
    period: '2024 · SEM 01',
    title: 'Joined KIIT University',
    role: 'Undergraduate Freshman (CSE)',
    org: 'KIIT, Bhubaneswar',
    desc: 'Began Computer Science & Engineering journey at KIIT, diving headfirst into software and student engineering culture.',
    category: 'origin',
    tags: ['KIIT', 'CSE', 'Foundations']
  },
  {
    id: 'tech-society-uiux',
    step: '02',
    period: '2024 · 1ST YEAR',
    title: 'MLSA (KIIT #1 Tech Society) & UI/UX Designer',
    role: 'UI/UX Designer',
    org: 'MLSA KIIT',
    desc: 'Cleared the competitive interview for MLSA (KIIT’s #1 premier tech society). Led UI/UX design, crafting design systems, web mockups, and interaction prototypes.',
    category: 'design',
    tags: ['MLSA', 'Figma', 'UI/UX Design', 'Design Systems'],
    link: {
      label: 'All Figma Designs',
      href: 'https://www.figma.com/design/Qb6CJAv1dGxdSNHk8953Pq/All-Designs?node-id=0-1&t=7h04wxz83sAIllSC-1'
    }
  },
  {
    id: 'android-dev',
    step: '03',
    period: '2024 · 1ST YEAR',
    title: 'Android Development with React Native',
    role: 'Android & React Native Developer',
    org: 'MLSA Mobile Wing',
    desc: 'Transitioned into Android development with React Native, engineering responsive mobile apps, native bridge modules, Expo workflows, and modern mobile UI architectures.',
    category: 'mobile',
    tags: ['Android', 'React Native', 'Expo', 'Mobile Architecture', 'APIs']
  },
  {
    id: 'video-editing-intern',
    step: '04',
    period: '2025 · SEM 03',
    title: 'Video Editing Internship & Tech Deep-Dive',
    role: 'Video Editor & Media Engineer',
    org: 'Media Internship',
    desc: 'During 2nd year, accelerated deep technical immersion and cracked a video editing internship in 3rd semester, mastering visual pacing and technical storytelling.',
    category: 'content',
    tags: ['Video Editing', 'Motion Design', 'Visual Storytelling']
  },
  {
    id: 'neostack-ai',
    step: '05',
    period: '2025 · SEM 03',
    title: 'Promoted to AI Tools Content Creator',
    role: 'AI Tools Content Creator',
    org: 'Neo Stack',
    desc: 'Promoted to lead AI tools content creation at Neo Stack, breaking down emerging developer workflows, AI agent frameworks, and modern developer tooling.',
    category: 'content',
    tags: ['Neo Stack', 'AI Tooling', 'Developer Content', 'LLM Workflows']
  },
  {
    id: 'bize-intern',
    step: '06',
    period: '2025 · SEM 04',
    title: 'Curator & Content Internship',
    role: 'Curator & Content Intern',
    org: 'Bize',
    desc: 'Internship in 4th semester focused on developer curation, tech content strategy, product discovery, and community engagement.',
    category: 'content',
    tags: ['Bize', 'Curation', 'Tech Strategy', 'Community']
  },
  {
    id: 'workik-sde',
    step: '07',
    period: '2025 · END OF SEM 04',
    title: 'Software Development Engineer (SDE)',
    role: 'Software Development Engineer',
    org: 'Workik AI',
    desc: 'Joined Workik as SDE at the end of 4th semester. Building production developer platforms, modern frontend architecture, and intelligent workflow systems.',
    category: 'sde',
    tags: ['Workik AI', 'SDE', 'Frontend Systems', 'Developer Platforms', 'Production'],
    highlight: true
  },
  {
    id: 'polymath-systems',
    step: '08',
    period: 'PRESENT · ACTIVE HORIZON',
    title: 'Polymath Engineering & Low-Level Systems',
    role: 'Systems & Exploration',
    org: 'Independent R&D',
    desc: 'Explored full-stack web, mobile apps, game engines (Godot/WASM), and autonomous agentic AI. Currently exploring low-level computing and systems programming with C++.',
    category: 'frontier',
    tags: ['Web Dev', 'App Dev', 'Game Dev', 'Agentic AI', 'C++', 'Low-Level Systems'],
    highlight: true
  }
];

export const topologyNodes = [
  { id: 'core', label: 'Yash G. / Core', type: 'hub', x: 50, y: 50, tag: 'ENGINE' },
  { id: 'web', label: '3D Web & R3F', type: 'node', x: 20, y: 22, tag: 'GRID' },
  { id: 'ble', label: 'P2P BLE Mesh', type: 'node', x: 80, y: 22, tag: 'RIPPLE' },
  { id: 'hardware', label: 'ESP32 & Local RAG', type: 'node', x: 15, y: 78, tag: 'MIKI' },
  { id: 'agents', label: 'CLI Research Agents', type: 'node', x: 85, y: 78, tag: 'GROQ' },
  { id: 'platform', label: 'Fullstack Dev Tools', type: 'node', x: 50, y: 15, tag: 'VIBECODER' },
  { id: 'workik', label: 'Dev Platform Frontend', type: 'node', x: 50, y: 88, tag: 'WORKIK' },
];

export const socialLinks: { label: string; handle: string; href: string; external: boolean; icon: string; highlight?: boolean }[] = [
  { label: 'GitHub', handle: '@cynicalmindset', href: profile.githubUrl, external: true, icon: 'github', highlight: true },
  { label: 'LinkedIn', handle: 'yash-g-3322b9253', href: profile.linkedinUrl, external: true, icon: 'linkedin', highlight: true },
  { label: 'Twitter / X', handle: '@allabouttyash', href: profile.twitterUrl, external: true, icon: 'twitter' },
  { label: 'LeetCode', handle: 'https_yash', href: profile.leetcodeUrl, external: true, icon: 'leetcode' },
  { label: 'Codeforces', handle: 'ihatecodingbtw', href: profile.codeforcesUrl, external: true, icon: 'codeforces' },
  { label: 'Portfolio', handle: 'elbaf.vercel.app', href: 'https://elbaf.vercel.app', external: true, icon: 'globe' },
  { label: 'Email', handle: profile.email, href: `mailto:${profile.email}`, external: false, icon: 'email' },
  { label: 'Resume', handle: 'Google Drive PDF', href: profile.resumeUrl, external: true, icon: 'resume' },
];

export const commandPaletteItems: { cmd: string; desc: string; action: string }[] = [
  { cmd: 'goto 01 / about', desc: 'Jump to bio & system capabilities', action: '#about' },
  { cmd: 'goto 02 / projects', desc: 'Explore shipped projects and architectures', action: '#projects' },
  { cmd: 'goto 03 / stack', desc: 'Inspect engineering timeline and tech stack', action: '#tech-stack' },
  { cmd: 'goto 04 / community', desc: 'Live GitHub telemetry, PRs & heatmap', action: '#community' },
  { cmd: 'goto 05 / contact', desc: 'Get in touch & contact links', action: '#contact' },
  { cmd: 'exec play portfolio_game.exe', desc: 'Launch browser arcade simulation', action: 'game' },
  { cmd: 'open elbaf.vercel.app', desc: 'Visit alternate portfolio / web experience', action: 'https://elbaf.vercel.app' },
  { cmd: 'open github.com/cynicalmindset', desc: 'Visit public GitHub profile', action: 'https://github.com/cynicalmindset' },
  { cmd: 'open leetcode.com/u/https_yash', desc: 'Visit LeetCode profile', action: profile.leetcodeUrl },
  { cmd: 'open codeforces.com/profile/ihatecodingbtw', desc: 'Visit Codeforces profile', action: profile.codeforcesUrl },
  { cmd: 'open resume.pdf', desc: 'Download / view official resume', action: profile.resumeUrl },
];
