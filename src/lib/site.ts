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
    repo: "https://github.com/taha1202/cascade",
    status: "active",
  },
  {
    index: "02",
    title: "Anchor",
    kind: "Systems / infrastructure",
    year: "2026",
    summary:
      "Durable execution for LLM agents. Steps are journalled as they complete, so a run killed halfway through resumes where it stopped instead of starting over.",
    detail:
      "Agent frameworks treat a run as an in-memory loop, which is fine until step nine of twelve fails and the eight expensive calls before it evaporate with the process. Anchor derives state from an append-only log rather than storing it separately, because two sources of truth can disagree after a crash. That one decision makes recovery and time travel the same mechanism: resuming folds the whole log, inspecting history folds a prefix. Durability is tested by spawning real subprocesses that hard-exit mid-run, on both Linux and Windows.",
    stack: ["Python", "Pydantic", "event sourcing", "JSONL", "pytest"],
    metrics: [
      { label: "Resume after hard kill", value: "Lossless" },
      { label: "Steps re-executed", value: "Zero" },
      { label: "CI matrix", value: "6 jobs green" },
    ],
    repo: "https://github.com/taha1202/anchor",
    status: "active",
  },
  {
    index: "03",
    title: "ELD Tracker",
    kind: "Full stack · Rules engine",
    year: "2025",
    summary:
      "Hours of Service compliance for commercial drivers. The interesting part isn't the CRUD, it's a rules engine implementing a legally defined sliding-window constraint where an off-by-one is a compliance violation.",
    detail:
      "US FMCSA regulations limit driving time across overlapping windows, so duty status has to be evaluated as a rolling calculation over history rather than a running total. That logic carries its own test suite, separate from the API tests, because the failure mode is silent and legal rather than a crash. Frontend plots duty status over time and maps routes; the backend is Django REST with a Postgres store and environment-split settings.",
    stack: ["Django", "DRF", "PostgreSQL", "React", "Material UI", "Leaflet"],
    metrics: [
      { label: "Core", value: "HOS rules engine" },
      { label: "Dedicated test suites", value: "4" },
      { label: "Deployment", value: "Declarative" },
    ],
    repo: "https://github.com/taha1202/eld-tracker",
    status: "shipped",
  },
  {
    index: "04",
    title: "Recruitment Platform",
    kind: "Backend · .NET",
    year: "2025",
    summary:
      "A seven-project ASP.NET Core solution where the layering is real: domain logic, data access, identity and background jobs are separate assemblies rather than folders in one app.",
    detail:
      "Areas split the Administrator, Employer and Talent domains at the routing level. Auth runs on IdentityServer4 with OAuth2 token validation, payments go through Stripe with a dedicated webhook controller, and scheduled work is handled by a background job runner rather than cron. Rate limiting, distributed SQL Server caching, API versioning and bulk CSV/Excel import were all production requirements rather than additions.",
    stack: ["ASP.NET Core", "EF Core", "IdentityServer4", "Stripe", "MSSQL"],
    metrics: [
      { label: "Solution projects", value: "7" },
      { label: "Auth", value: "OAuth2 / OIDC" },
      { label: "Routing domains", value: "4 areas" },
    ],
    status: "shipped",
  },
  {
    index: "05",
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
    index: "06",
    title: "Document Extraction Pipeline",
    kind: "Production · Applied AI",
    year: "2025",
    summary:
      "An agent-based pipeline that pulls structured data out of long, messy, multi-page documents and runs unattended through authentication that was never designed to be automated.",
    detail:
      "The hard part was never extraction, it was the systems standing in front of the documents. Automating the two-factor flow meant the pipeline could finally run overnight without a person relaying codes. Work that took an analyst hours now finishes in under ten minutes.",
    stack: ["Python", "FastAPI", "Azure Blob", "SQL MI"],
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
