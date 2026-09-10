export const site = {
  name: "Muhammad Taha",
  role: "Software Engineer",
  focus: "AI systems & backend infrastructure",
  location: "Karachi, PK",
  email: "tahaghulam10@gmail.com",
  github: "https://github.com/taha1202",
  linkedin: "https://linkedin.com/in/taha-ghulam",
  available: "Open to 2026 roles",
} as const;

export type Project = {
  index: string;
  title: string;
  kind: string;
  year: string;
  summary: string;
  detail: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  href?: string;
  repo?: string;
  status: "shipped" | "active" | "research";
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Cascade",
    kind: "Research · Developer tooling",
    year: "2026",
    summary:
      "Chaos engineering for LLM agents. It injects semantically distinct faults at an agent's tool boundary, then searches for the failure modes single-fault testing structurally cannot find.",
    detail:
      "The claim is that agent robustness is not compositional: an agent that survives fault A and survives fault B can still fail reliably on both together. Against a reference agent with retry logic, a cache fallback, and response validation, the experiment found 27 such interaction failures — every one pairing a persistent primary outage with a degraded fallback, the path that by construction is least exercised. Single-fault testing scores that same agent at 70% robust and finds none of them.",
    stack: ["Python", "Pydantic", "Typer", "pytest", "delta-debugging"],
    metrics: [
      { label: "Interaction failures", value: "27" },
      { label: "Schedules searched", value: "510" },
      { label: "Runtime, CPU only", value: "~7s" },
    ],
    status: "active",
  },
  {
    index: "02",
    title: "Durable Agent Runtime",
    kind: "Systems / infrastructure",
    year: "2026",
    summary:
      "An execution engine for LLM agents that survives crashes. Every step is journalled, so a run can resume mid-flight, fork at any point, or be replayed backwards for debugging.",
    detail:
      "Agent frameworks treat a run as an in-memory loop — kill the process and the work evaporates. This models a run as an append-only event log with content-addressed step results. Deterministic replay makes a failure reproducible instead of anecdotal, and time-travel lets you rewind to step nine, change the tool response, and branch a new timeline.",
    stack: ["Python", "asyncio", "SQLite WAL", "Pydantic", "OpenTelemetry"],
    metrics: [
      { label: "Resume after kill -9", value: "Lossless" },
      { label: "Replay determinism", value: "Byte-exact" },
      { label: "Step overhead", value: "~2ms" },
    ],
    status: "active",
  },
  {
    index: "03",
    title: "FraudHunt",
    kind: "Applied machine learning",
    year: "2025",
    summary:
      "Counterfeit-listing detection across three signals at once — product imagery, review language, and temporal anomalies in rating behaviour.",
    detail:
      "Final year project. A CNN reads listing images, transformer embeddings surface coordinated review language, and PELT changepoint detection catches the moment a seller's rating curve stops behaving like an organic one. Fusing all three cut false positives well below any single signal on its own.",
    stack: ["PyTorch", "FastAPI", "PostgreSQL", "scikit-learn", "React"],
    metrics: [
      { label: "Signals fused", value: "3" },
      { label: "Detection surface", value: "Text · Image · Time" },
      { label: "Deployment", value: "Dockerised" },
    ],
    status: "shipped",
  },
  {
    index: "04",
    title: "Document Extraction Pipeline",
    kind: "Production · ByteCorp",
    year: "2025",
    summary:
      "An agent-based pipeline that pulls structured data out of long, messy, multi-page documents — and runs unattended through authentication that was never designed to be automated.",
    detail:
      "The hard part was never extraction; it was the four external systems in front of the documents. Automating Microsoft Graph two-factor flows meant the pipeline could finally run overnight without a human relaying codes. Work that took an analyst hours now finishes in under ten minutes.",
    stack: ["Python", "FastAPI", "Microsoft Graph", "Azure Blob", "SQL MI"],
    metrics: [
      { label: "Hours to", value: "< 10 min" },
      { label: "Extraction accuracy", value: "80%+" },
      { label: "External APIs", value: "4" },
    ],
    status: "shipped",
  },
];

export const stack = [
  { group: "Languages", items: ["Python", "C#", "TypeScript", "SQL", "C++"] },
  { group: "Backend", items: ["FastAPI", "ASP.NET Core", "Nest.js", "REST"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind", "GSAP"] },
  { group: "Data", items: ["PostgreSQL", "MSSQL", "MongoDB", "DuckDB"] },
  { group: "Infra", items: ["Azure", "AWS", "Docker", "Git"] },
  { group: "AI", items: ["LLM integration", "Agent design", "RAG", "ONNX"] },
];

export const timeline = [
  {
    year: "2025 — now",
    org: "ByteCorp",
    role: "Associate Software Engineer",
    note: "AI agent pipelines, LLM-backed .NET applications, Azure data infrastructure.",
  },
  {
    year: "2025",
    org: "ByteCorp",
    role: "Software Engineer Intern",
    note: "Clean architecture refactors; resolved 30+ platform stability issues.",
  },
  {
    year: "2022 — 2026",
    org: "FAST NUCES, Karachi",
    role: "BS Computer Science",
    note: "Final year project on multi-signal counterfeit detection.",
  },
];
