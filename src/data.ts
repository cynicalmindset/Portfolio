export const profile = {
  name: 'Yash G.',
  githubHandle: 'cynicalmindset',
  githubUrl: 'https://github.com/cynicalmindset',
  email: 'yashguptaadfg@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/yash-g-3322b9253/',
  linkedinLabel: 'linkedin.com/in/yash-g-3322b9253',
  twitterUrl: 'https://x.com/allabouttyash',
  resumeUrl: 'https://drive.google.com/file/d/1DP1VtybxaM8aiv6xY8i46d7IMbTGUc6J/view?usp=drive_link',
};

export type TermRow = {
  key: string;
  text?: string;
  link?: { href: string; label: string };
};

export type Project = {
  sym: string;
  name: string;
  desc: string;
  paragraph: string;
  rows: TermRow[];
};

export const projects: Project[] = [
  {
    sym: '◆',
    name: 'Grid',
    desc: 'GitHub developers, rendered as a city',
    paragraph:
      'A 3D browser city built with React Three Fiber — every GitHub developer gets a building, height mapped to public repo count. WASD movement, a mobile joystick, night atmosphere, and a roaming NPC that reacts to collisions.',
    rows: [
      { key: 'stack:', text: 'react-three-fiber, rapier, supabase, tailwindcss' },
      { key: 'live:', link: { href: 'https://grid-six-swart.vercel.app', label: 'grid-six-swart.vercel.app' } },
      { key: 'src:', link: { href: 'https://github.com/cynicalmindset/Grid', label: 'github.com/cynicalmindset/Grid' } },
    ],
  },
  {
    sym: '◆',
    name: 'Miki',
    desc: 'a terminal AI agent, trapped in a screen',
    paragraph:
      'A benchtop companion running on an ESP32-CAM + OLED display, powered by a fully local RAG pipeline — no cloud dependency. Dark Gen-Z persona, one-to-four word replies, reminders and memory.',
    rows: [
      { key: 'stack:', text: 'javascript, esp32-cam, local rag' },
      { key: 'live:', link: { href: 'https://miki-ashy-eight.vercel.app', label: 'miki-ashy-eight.vercel.app' } },
      { key: 'status:', text: 'in progress' },
      { key: 'src:', link: { href: 'https://github.com/cynicalmindset/Miki', label: 'github.com/cynicalmindset/Miki' } },
    ],
  },
  {
    sym: '◆',
    name: 'Ripple',
    desc: 'social, without a server',
    paragraph:
      'A React Native app that runs an entire social network over Bluetooth LE — no accounts, no cloud, no server. Posts spread peer-to-peer over a custom GATT sync protocol and decay after 5 hops; identity is a self-sovereign Ed25519 keypair.',
    rows: [
      { key: 'stack:', text: 'react native, expo, react-native-ble-plx, kotlin' },
      { key: 'status:', text: 'in progress' },
      { key: 'src:', link: { href: 'https://github.com/cynicalmindset/Ripple-main', label: 'github.com/cynicalmindset/Ripple-main' } },
    ],
  },
  {
    sym: '◆',
    name: 'Research Agent',
    desc: 'a CLI-first research agent',
    paragraph:
      "A terminal-first multi-agent tool built as a stepping stone toward a larger research-integration project, running on Groq's Qwen models for fast inference.",
    rows: [
      { key: 'stack:', text: 'python, groq, qwen' },
      { key: 'status:', text: 'in progress' },
      { key: 'src:', link: { href: 'https://github.com/cynicalmindset/Terminal-Reaserch_agent', label: 'github.com/cynicalmindset/Terminal-Reaserch_agent' } },
    ],
  },
  {
    sym: '◆',
    name: 'Vibecoder',
    desc: 'express, next.js, and a cli, in one repo',
    paragraph:
      'A full-stack developer tool: an Express API with Better Auth, a Next.js dashboard, and a Node CLI — authenticated via GitHub OAuth device flow, with Google Gemini powering terminal chat, tool calls, and app generation.',
    rows: [
      { key: 'stack:', text: 'express, next.js, prisma, better-auth, gemini' },
      { key: 'status:', text: 'in progress' },
      { key: 'src:', link: { href: 'https://github.com/cynicalmindset/vibecoder', label: 'github.com/cynicalmindset/vibecoder' } },
    ],
  },
];

export const stackGroups: { label: string; tags: string[] }[] = [
  { label: 'languages', tags: ['C++', 'Python', 'JavaScript', 'TypeScript', 'Kotlin'] },
  { label: 'frontend', tags: ['React', 'Next.js', 'React Three Fiber', 'React Native', 'Tailwind CSS'] },
  { label: 'backend / infra', tags: ['Node.js', 'Express', 'Supabase', 'Prisma', 'SQLite', 'Bun', 'Better Auth'] },
  { label: 'ai / ml', tags: ['Ollama', 'Groq', 'Google Gemini'] },
  { label: 'tools', tags: ['Git', 'GitHub', 'Vercel', 'Tailscale', 'Expo'] },
];

export const socialLinks: { label: string; href: string; external: boolean }[] = [
  { label: 'github', href: profile.githubUrl, external: true },
  { label: 'linkedin', href: profile.linkedinUrl, external: true },
  { label: 'twitter', href: profile.twitterUrl, external: true },
  { label: 'mail', href: `mailto:${profile.email}`, external: false },
  { label: 'resume', href: profile.resumeUrl, external: true },
];

export const commandPaletteItems: string[] = [
  'sudo hire yash-g',
  'npm install good-vibes --save',
  'git commit -m "send the offer"',
  'ping resume.pdf — 4 packets, 0 lost',
  'echo "you were always going to click this"',
];
