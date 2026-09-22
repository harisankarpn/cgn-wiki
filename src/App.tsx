import {
  useState,
  type Dispatch,
  type SetStateAction,
  useEffect
} from 'react';

import {
  Home,
  Target,
  BarChart3,
  Bot,
  Zap,
  Search,
  FileText,
  Lightbulb,
  Star,
  TrendingUp,
  KeyRound,
  MessageSquare,
  PlayCircle,
  Users,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Info,
  Link as LinkIcon,
  BrainCircuit,
  Scale,
  Megaphone,
  Send,
  Layers,
  Eye,
  Network,
  Clock,
  UserPlus,
  ShieldAlert,
  Unlink,
  ArrowRight,
  Laptop,
  BarChart,
  Settings,
  BookOpen,
  UserCheck,
  ShieldCheck,
  X,
  Youtube,
  User as UserIcon,
  Moon,
  Sun,
  Rocket,
  GitBranch,
  Layers3,
  FilterX,
  ArrowLeft
} from 'lucide-react';

import puzzleBg from './background.jpeg';
import bgImage from './background.jpeg';
import coreVideo from './C.O.R.E.mp4';

/* =========================================================
   TYPES
========================================================= */

type SolutionId = 'core' | 'elevate' | 'sme' | 'accelerate' | 'crado' | 'arc' | 'aura' | 'star';
type NavigationId = 'dashboard' | 'home' | SolutionId;
type SectionId = 'overview' | 'problem' | 'solution' | 'benefits' | 'usage' | 'impact' | 'access' | 'feedback' | 'demo';

type BenefitItem = {
  title: string;
  description: string;
};

/* =========================================================
   GLOBAL THEME STYLES (Light & Dark Mode)
========================================================= */

function GlobalThemeStyles() {
  return (
    <style>{`
      :root {
        --bg-main: #f8fafc;
        --bg-card: #ffffff;
        --bg-hover: #f1f5f9;
        --bg-blue-card: #f4f8fd;
        --bg-green-card: #f0fdf4;
        --text-main: #0f172a;
        --text-secondary: #475569;
        --text-muted: #64748b;
        --text-green: #166534;
        --border-main: #e2e8f0;
        --border-soft: #f1f5f9;
        --shadow-sm: 0 4px 12px rgba(0,0,0,0.05);
        --badge-bg: #eff6ff;
        --pill-bg: #dcfce7;
      }

      .dark {
        --bg-main: #0f172a;
        --bg-card: #1e293b;
        --bg-hover: #334155;
        --bg-blue-card: #1e293b;
        --bg-green-card: #1e293b;
        --text-main: #f8fafc;
        --text-secondary: #cbd5e1;
        --text-muted: #94a3b8;
        --text-green: #4ade80;
        --border-main: #334155;
        --border-soft: #1e293b;
        --shadow-sm: 0 4px 12px rgba(0,0,0,0.5);
        --badge-bg: #334155;
        --pill-bg: #064e3b;
      }

      body {
        background-color: transparent !important;
        color: var(--text-main);
        margin: 0 !important;
      }

      body::before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 125vw; 
        height: 125vh;
        background: url(${bgImage}) center/cover no-repeat;
        z-index: -999;
        pointer-events: none;
      }

      body.dark::before {
        display: none !important;
      }
      body.dark {
        background-color: var(--bg-main) !important;
      }

      @keyframes themePulse {
        0% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.6); }
        70% { box-shadow: 0 0 0 12px rgba(66, 133, 244, 0); }
        100% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0); }
      }

      .dark .app, 
      .dark .no-sidebar-app, 
      .dark .main-page-content { 
       background-color: transparent !important; 
      }
      
      .dark .hub-card,
      .dark .hub-hero-card {
        background: var(--bg-card) !important;
        border-color: var(--border-main) !important;
      }
      .dark .hub-hero-card h3, .dark .hub-card h4 { color: var(--text-main) !important; }
      .dark .hub-hero-card p, .dark .hub-card p { color: var(--text-secondary) !important; }

      .dark .wiki-home,
      .dark .solution-page { background: var(--bg-card) !important; border-color: var(--border-main) !important; }
      .dark .solution-header { border-bottom-color: var(--border-main) !important; }
      .dark .solution-header h2 { color: var(--text-main) !important; }
      .dark .solution-header p, .dark .header-sub { color: var(--text-secondary) !important; }
      
      .dark .solution-tabs { background: var(--bg-card) !important; border-right-color: var(--border-main) !important; }
      .dark .solution-tabs button { color: var(--text-secondary) !important; }
      .dark .solution-tabs button:hover { background: var(--bg-hover) !important; }
      .dark .solution-tabs button.active { background: var(--bg-hover) !important; color: var(--text-main) !important; }
      
      .dark .section-heading h3 { color: var(--text-main) !important; }
      .dark .text-panel, .dark .impact-panel, .dark .access-panel, .dark .feedback-panel, .dark .demo-panel { 
        background-color: var(--bg-card) !important; 
        border-color: var(--border-main) !important; 
      }
      .dark .text-panel p, .dark .impact-panel p, .dark .feedback-panel p, .dark .demo-panel p { color: var(--text-secondary) !important; }
      .dark .access-row { border-bottom-color: var(--border-soft) !important; }
      .dark .access-row span, .dark .poc-row span { color: var(--text-muted) !important; }
      .dark .access-row strong { color: var(--text-main) !important; }
      .dark .poc-row { background-color: var(--bg-hover) !important; }
      .dark .poc-row p { color: var(--text-secondary) !important; }
      .dark .feedback-panel h4, .dark .demo-panel h4 { color: var(--text-main) !important; }

      .dark .p-card, .dark .s-card { background-color: var(--bg-card) !important; border-color: var(--border-main) !important; }
      .dark .p-callout, .dark .s-callout { background-color: var(--bg-hover) !important; }
      .dark .p-trans, .dark .s-trans { background-color: var(--bg-hover) !important; border-color: var(--border-main) !important; }
    `}</style>
  );
}

/* =========================================================
   TOP PLATFORM NAVIGATION & CONTENT DATA
========================================================= */

const solutions = [
  { id: 'core' as NavigationId, name: 'C.O.R.E.', subtitle: 'Talent Acquisition & Readiness', icon: Target, color: '#1a73e8' },
  { id: 'elevate' as NavigationId, name: 'Elevate360', subtitle: 'Operational Governance', icon: BarChart3, color: '#34a853' },
  { id: 'sme' as NavigationId, name: 'Digital SME', subtitle: 'Automating Case Execution', icon: Bot, color: '#9333ea' },
  { id: 'accelerate' as NavigationId, name: 'Project Accelerate', subtitle: 'Risk Intelligence & Control', icon: Zap, color: '#ea580c' },
  { id: 'crado' as NavigationId, name: 'CRADO', subtitle: 'Automated Billing Deduction', icon: FileText, color: '#0284c7' },
  { id: 'arc' as NavigationId, name: 'ARC', subtitle: 'Intelligent Frontline Routing', icon: GitBranch, color: '#e11d48' },
  { id: 'aura' as NavigationId, name: 'AURA', subtitle: 'End-to-End Support Enablement', icon: Layers3, color: '#4f46e5' },
  { id: 'star' as NavigationId, name: 'STAR', subtitle: 'Intelligent Re-contact Deflection', icon: FilterX, color: '#059669' },
];

const FEEDBACK_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf0zu4Q-0kTjP03BLKMIPfQLePmL0P3xyAaaWr5COiuTGKqlA/viewform?usp=publish-editor';

const defaultPOCs = [
  { name: 'Harisankar PN', ldap: 'harisankar@xwf.google.com' },
  { name: 'Prashanth Kattanguri', ldap: 'kattanguri@xwf.google.com' }
];

const solutionContent: Record<SolutionId, any> = {
  core: {
    shortName: 'C.O.R.E.',
    name: 'C.O.R.E. (Comprehensive Online Review of Expertise)',
    tagline: 'Realistic Flight Simulator for Technical Talent',
    quote: '"Assess. Develop. Empower."',
    pillars: 'Build Talent | Strengthen Teams | Drive Impact',
    overview: 'An intelligent, proctored, and adaptive assessment ecosystem. Candidates demonstrate capability inside a live Linux sandbox while practicing verbal de-escalation with simulated customer personas. It transforms support talent evaluation into an intelligence-driven orchestration engine.',
    objectives: [
      'Evaluate live hands-on troubleshooting and communication skills before extending an offer.',
      'Identify technical and behavioral skill gaps with automated evaluation rubrics.',
      'Provide a complete custom training plan to key skill gaps found in the interview.',
      'Eliminate subjective interviews bias through standardized, automated evaluation rubrics.'
    ],
    audience: 'Hiring managers and technical talent evaluators looking to assess engineers and support staff.',
    metadata: { type: 'Assessment Platform', users: 'Technical Talent Evaluators', domain: 'Talent Acquisition & Readiness', status: 'Active' },
    problem: {
      description: 'Traditional technical interviews rely heavily on multiple-choice trivia and theoretical questions. This approach often fails to measure how effectively an engineer can diagnose, reason through, and resolve real-world technical scenarios.',
      cards: [
        { title: 'Memory Over Mastery', description: 'Rewards memorization rather than practical problem-solving.', icon: BrainCircuit, color: '#fdf2f8', iconBg: '#fce7f3', iconColor: '#db2777' },
        { title: 'Limited Skill Visibility', description: 'Difficult to assess troubleshooting, reasoning and decision-making ability.', icon: Search, color: '#eff6ff', iconBg: '#dbeafe', iconColor: '#2563eb' },
        { title: 'Inconsistent Evaluation', description: 'Interview outcomes can vary depending on interviewer style and judgement.', icon: Scale, color: '#f5f3ff', iconBg: '#ede9fe', iconColor: '#7c3aed' }
      ],
      callout: 'Hiring teams need a consistent way to evaluate how candidates think and solve problems, not simply what they can recall.',
      transition: 'This gap led to C.O.R.E. — a realistic technical flight simulator designed to assess engineering readiness through practical scenarios.',
      tagline: 'Assess. Develop. Empower.'
    },
    solution: {
      description: 'C.O.R.E. provides a realistic, scenario-based assessment environment that evaluates how engineers think, solve and perform in real-world situations, going beyond theoretical knowledge and multiple-choice trivia.',
      cards: [
        { title: 'Real-World Simulations', description: 'Hands-on, scenario-based assessments that mirror actual engineering challenges, enabling practical application of skills and real-world problem solving.', icon: Laptop, color: '#eff6ff', iconBg: '#dbeafe', iconColor: '#2563eb' },
        { title: 'Comprehensive Evaluation', description: 'Assesses problem-solving, reasoning, technical depth and decision-making through standard benchmarks.', icon: BarChart, color: '#ecfdf5', iconBg: '#d1fae5', iconColor: '#059669' },
        { title: 'Consistent & Scalable', description: 'Standardized assessments ensure fair, objective and repeatable evaluation across teams.', icon: Users, color: '#f5f3ff', iconBg: '#ede9fe', iconColor: '#7c3aed' }
      ],
      calloutIcon: Lightbulb,
      callout: 'Enables hiring teams to identify truly job-ready engineers with practical skills and real-world problem-solving ability.',
      transition: 'C.O.R.E. bridges the gap between theoretical knowledge and real-world readiness, building a stronger, more capable engineering talent pipeline.',
      tagline: 'Assess. Develop. Empower.'
    },
    benefits: [
      { title: 'Zero-Guesswork Hiring', description: 'Evaluates live hands-on troubleshooting and communication skills before extending an offer.' },
      { title: 'Targeted Onboarding', description: 'Pinpoints specific capability gaps to build tailored L&D paths immediately.' },
      { title: 'End-to-End Training mechanism', description: 'Complete your custom training plan to fix any skill gaps found in the interview. Tailored training based on test results.' },
      { title: 'Objective Benchmarking', description: 'Eliminates subjective interviewer bias through standardized, automated evaluation rubrics.' }
    ],
    usage: {
      description: 'C.O.R.E. is actively embedded within talent acquisition pipelines and internal promotion tracks, standardizing candidate assessments across global engineering hubs.',
      highlights: [
        { title: 'Hiring Pipeline Integration', description: 'Over 92% of candidate evaluations for technical support roles are now conducted through standardized C.O.R.E. sandboxes.', badge: 'High Adoption' },
        { title: 'Automated Skill Gap Remediation', description: 'Assessed candidates receive automated custom training paths targeted specifically to capability gaps identified during live simulation.', badge: 'Automated' },
        { title: 'Evaluation Consistency', description: 'Subjective interviewer variance dropped by 42% across regional evaluation boards following the rollout of automated rubric grading.', badge: 'Benchmark' }
      ]
    },
    impact: {
      title: 'Improved Talent Readiness',
      description: 'Enables consistent, hands-on assessment of technical skills, helping identify capability gaps and improve workforce readiness.',
      metrics: [
        { icon: Users, title: 'Higher Day-1 Proficiency', subtitle: 'Rapid job-ready enablement' },
        { icon: BarChart, title: 'Reduced Ramp-up Time', subtitle: 'Accelerated technical readiness' },
        { icon: Settings, title: 'Consistent Evaluation', subtitle: 'Standardized global benchmark' }
      ]
    },
    access: 'https://stack-cognizant.web.app/login',
    poc: defaultPOCs,
    feedback: FEEDBACK_URL,
    demo: coreVideo,
  },

  elevate: {
    shortName: 'Elevate360',
    name: 'Elevate360',
    tagline: 'Full-Funnel Performance Intelligence',
    quote: '"Analyze. Coach. Elevate."',
    pillars: 'Root-Cause Attribution | Prescriptive Action Plans | Scalable Oversight',
    overview: 'A centralized, AI-enabled performance platform that connects the dots across disparate reporting streams. Leaders interact directly with an AI assistant to interrogate performance trends and receive prescriptive remediation plans.',
    objectives: [
      'Instantly isolate individual skill shortfalls from leadership and operational bottlenecks.',
      'Replace static dashboards with concrete, step-by-step coaching guidance.',
      'Enable multi-program visibility without drowning leadership in manual spreadsheet reconciliations.',
      'Provide a balanced evaluation framework for TSRs comparing core metrics against operational benchmarks.'
    ],
    audience: 'Leadership, front-line managers, and operational governance teams overseeing Technical Support Representatives (TSRs).',
    metadata: { type: 'Performance Intelligence', users: 'Leaders & Front-Line Managers', domain: 'Operational Governance', status: 'Active' },
    problem: {
      description: 'Fragmented operational metrics reveal when productivity dips, but fail to explain why—making it impossible to distinguish between genuine skill deficits and poor front-line management.',
      cards: [
        { title: 'Fragmented Metrics', description: 'Productivity drops without root-cause explanation.', icon: Layers, color: '#fdf2f8', iconBg: '#fce7f3', iconColor: '#db2777' },
        { title: 'Skill vs Management Gaps', description: 'Hard to isolate coaching issues from systemic bottlenecks.', icon: Eye, color: '#eff6ff', iconBg: '#dbeafe', iconColor: '#2563eb' },
        { title: 'Reporting Overhead', description: 'Excessive time wasted parsing manual spreadsheets.', icon: Network, color: '#f5f3ff', iconBg: '#ede9fe', iconColor: '#7c3aed' }
      ],
      callout: 'A unified and transparent operational governance model is essential to improve efficiency, accountability and enable data-driven decisions.',
      transition: 'This gap led to Elevate360 — a centralized operational governance platform.',
      tagline: 'Streamline. Govern. Grow.'
    },
    solution: {
      description: 'Elevate360 brings teams, data and processes together on a unified platform to provide real-time visibility, streamline governance and drive continuous improvement across the organization.',
      cards: [
        { title: 'Unified Visibility', description: 'Consolidates data from multiple tools and teams into a single, real-time view.', icon: Network, color: '#ecfdf5', iconBg: '#d1fae5', iconColor: '#059669' },
        { title: 'Proactive Governance', description: 'Helps identify risks, track actions and ensure compliance before issues escalate.', icon: Settings, color: '#eff6ff', iconBg: '#dbeafe', iconColor: '#2563eb' },
        { title: 'Continuous Improvement', description: 'Data-driven insights to optimize processes and drive operational excellence.', icon: TrendingUp, color: '#f5f3ff', iconBg: '#ede9fe', iconColor: '#7c3aed' }
      ],
      calloutIcon: Target,
      callout: 'Enables better decision-making, stronger accountability and a more efficient, transparent way of working.',
      transition: 'Elevate360 transforms fragmented operations into a unified, transparent and continuously improving governance model.',
      tagline: 'Streamline. Govern. Grow.'
    },
    benefits: [
      { title: 'Root-Cause Attribution', description: 'Instantly isolates individual skill shortfalls from leadership and operational bottlenecks.' },
      { title: 'Prescriptive Action Plans', description: 'Replaces static dashboards with concrete, step-by-step coaching guidance.' },
      { title: 'Scalable Oversight', description: 'Enables multi-program visibility without drowning leadership in manual spreadsheet reconciliations.' },
      { title: 'Direct Overview', description: 'A balanced evaluation framework for TSRs comparing core metrics against operational benchmarks, identifying primary strengths and growth areas, and outlining a structured remediation roadmap.' }
    ],
    usage: {
      description: 'Elevate360 delivers continuous operational performance telemetry, connecting front-line metrics with prescriptive AI-assisted coaching across global support organizations.',
      highlights: [
        { title: 'Balanced Scorecard Governance', description: 'Operational telemetry benchmarking TSRs across productivity and quality.', badge: 'Full Visibility' },
        { title: 'Fast Root-Cause Attribution', description: '85% of performance anomalies diagnosed to specific bottlenecks within 24 hours.', badge: 'Operational AI' }
      ]
    },
    impact: {
      title: 'Stronger Operational Governance',
      description: 'Drives managerial efficacy and provides transparent actionable insights directly to front-line engineers.',
      metrics: [
        { icon: Eye, title: 'Insights to TSR', subtitle: 'Actionable self-service coaching' },
        { icon: Network, title: 'Managerial Efficacy', subtitle: 'Coaching quality improvement' },
        { icon: BarChart3, title: 'Operational Discipline', subtitle: 'Consistent execution' }
      ]
    },
    access: 'https://e360-uat-dot-digital-sme.uc.r.appspot.com/e360-home/login',
    poc: defaultPOCs,
    feedback: FEEDBACK_URL,
    demo: '',
  },

  sme: {
    shortName: 'Digital SME',
    name: 'Digital SME',
    tagline: '24/7 Virtual AI Engineering Tier',
    quote: '"Always On. Always Accurate."',
    pillars: 'Compress MTTR | Consistent Guidance | Expert Offloading',
    overview: 'An on-demand AI specialist grounded strictly in official technical documentation and customer-validated historical resolutions. It assists front-line agents with live architectural reviews, automated root-cause analysis (RCA), and ticket summarization.',
    objectives: [
      'Enable junior engineers to resolve complex issues autonomously without queuing for senior intervention.',
      'Ensure uniform, verified troubleshooting procedures across every global shift.',
      'Free high-cost senior talent from repetitive operational questions to focus on high-impact initiatives.'
    ],
    audience: 'Tier-1 and Tier-2 engineers, front-line agents, and senior subject matter experts (vSMEs).',
    metadata: { type: 'Virtual AI Tier', users: 'Support Engineers & Front-Line Agents', domain: 'Real-Time Case Execution', status: 'Active' },
    problem: {
      description: 'Tier-1 and Tier-2 engineers frequently bottleneck behind a handful of senior subject matter experts (vSMEs). Resolution times swing wildly depending on which senior engineer is online.',
      cards: [
        { title: 'vSME Bottlenecks', description: 'Queue paralysis waiting on specialized engineers.', icon: Clock, color: '#fdf2f8', iconBg: '#fce7f3', iconColor: '#db2777' },
        { title: 'Resolution Variance', description: 'Troubleshooting quality swings across global shifts.', icon: Users, color: '#eff6ff', iconBg: '#dbeafe', iconColor: '#2563eb' }
      ],
      callout: 'Engineers need instant access to verified answers to prevent case delays and unnecessary transfers.',
      transition: 'This led to Digital SME — an AI agent grounded strictly in validated post-mortems and official technical docs.',
      tagline: 'Know More. Do More.'
    },
    solution: {
      description: 'Digital SME provides real-time case triage, root-cause recommendations, and live ticket summarization directly into the engineer workflow.',
      cards: [
        { title: 'Instant Grounded Answers', description: 'Answers strictly backed by verified GCP technical resolutions.', icon: BookOpen, color: '#f5f3ff', iconBg: '#ede9fe', iconColor: '#7c3aed' },
        { title: 'Autonomous Resolutions', description: 'Empowers junior engineers to solve Tier-2 scenarios safely.', icon: Target, color: '#ecfdf5', iconBg: '#d1fae5', iconColor: '#059669' }
      ],
      calloutIcon: Lightbulb,
      callout: 'Drives down handle times while safeguarding senior engineering bandwidth.',
      transition: 'Digital SME democratizes expertise across the support lifecycle.',
      tagline: 'Know More. Do More.'
    },
    benefits: [
      { title: 'Compressed MTTR', description: 'Junior engineers resolve complex issues autonomously without queuing for senior intervention.' },
      { title: 'Consistent Guidance', description: 'Ensures uniform, verified troubleshooting procedures across every global shift.' },
      { title: 'Expert Offloading', description: 'Frees high-cost senior talent from repetitive operational questions to focus on high-impact initiatives.' }
    ],
    usage: {
      description: 'Operates 24/7 assisting global support agents with technical case investigations and RCA generation.',
      highlights: [
        { title: 'SME Bandwidth Saved', description: 'Over 3,800 engineering hours reclaimed per quarter.', badge: 'Impact' }
      ]
    },
    impact: {
      title: 'Faster Case Resolution',
      description: 'Measurably compresses Mean Time to Resolve while improving First Contact and Same Day Resolution rates.',
      metrics: [
        { icon: Zap, title: 'Reduced MTTR', subtitle: 'Faster case closure' },
        { icon: Star, title: 'Increased SDR', subtitle: 'Same Day Resolution boost' },
        { icon: Users, title: 'Autonomous Work', subtitle: 'Less senior handoffs' }
      ]
    },
    access: 'https://34.120.137.34.nip.io/',
    poc: defaultPOCs,
    feedback: FEEDBACK_URL,
    demo: '',
  },

  accelerate: {
    shortName: 'Project Accelerate',
    name: 'Project Accelerate',
    tagline: 'Early-Warning Sentiment & Escalation Radar',
    quote: '"Detect. Alert. Mitigate."',
    pillars: 'Proactive Risk Mitigation | Dynamic Case Prioritization | Operational Continuity',
    overview: 'An agentic AI layer that actively monitors case interactions in real time. It analyzes customer tone, detects rising anxiety, dynamically adjusts operational priority, and coordinates seamless 24/7 Follow-the-Sun handoffs via Workload Management (WLM).',
    objectives: [
      'Identify simmering customer frustration to trigger interventions before formal escalations occur.',
      'Continuously re-index tickets based on live sentiment and business risk rather than day-one tags.',
      'Coordinate Follow-the-Sun handoffs via Workload Management (WLM).'
    ],
    audience: 'Global support teams, escalation managers, and operational leaders.',
    metadata: { type: 'Escalation Radar', users: 'Support Teams & Escalation Managers', domain: 'Customer Experience & Risk Control', status: 'Active' },
    problem: {
      description: 'Static priority labels assigned at ticket creation fail to reflect worsening business impacts. Critical issues languish quietly in the "silence gap," surfacing only after an executive escalation.',
      cards: [
        { title: 'The Silence Gap', description: 'Issues languish unnoticed until customers explode.', icon: ShieldAlert, color: '#fdf2f8', iconBg: '#fce7f3', iconColor: '#db2777' },
        { title: 'Static Priority Flaws', description: 'Day-1 tags cannot adjust to evolving business risks.', icon: Clock, color: '#eff6ff', iconBg: '#dbeafe', iconColor: '#2563eb' }
      ],
      callout: 'Support teams need early alert indicators before negative sentiment becomes an irreparable escalation.',
      transition: 'Project Accelerate actively parses customer sentiment to trigger interventions in real time.',
      tagline: 'Faster. Safer. Stronger.'
    },
    solution: {
      description: 'Continuous tone parsing and Follow-the-Sun coordination prevents cases from dropping through cracks.',
      cards: [
        { title: 'Real-Time Tone Parsing', description: 'Flags customer anxiety and dissatisfaction early.', icon: ShieldCheck, color: '#fff7ed', iconBg: '#ffedd5', iconColor: '#ea580c' },
        { title: 'Dynamic Prioritization', description: 'Dynamically escalates operational urgency based on sentiment.', icon: Eye, color: '#f5f3ff', iconBg: '#ede9fe', iconColor: '#7c3aed' }
      ],
      calloutIcon: Zap,
      callout: 'Guarantees operational continuity across regional shifts.',
      transition: 'Transforms reactive firefighting into proactive escalation prevention.',
      tagline: 'Faster. Safer. Stronger.'
    },
    benefits: [
      { title: 'Proactive Risk Mitigation', description: 'Identifies simmering customer frustration to trigger interventions before formal escalations occur.' },
      { title: 'Dynamic Case Prioritization', description: 'Continuously re-indexes tickets based on live sentiment and business risk rather than day-one tags.' },
      { title: 'Continuous Operational Continuity', description: 'Enforces automated, cascading alerting so handoffs between global shifts remain seamless and reliable.' }
    ],
    usage: {
      description: 'Monitors incoming and ongoing customer case interactions 24/7 across global queues.',
      highlights: [
        { title: 'Escalation Reduction', description: 'Over 89% of potential escalations mitigated before formal complaint.', badge: 'Risk Shield' }
      ]
    },
    impact: {
      title: 'Customer Experience & Risk Shield',
      description: 'Measurably curbs escalation frequency while driving customer effort scores down.',
      metrics: [
        { icon: ShieldCheck, title: 'Reduced Escalation Rates', subtitle: 'Proactive intervention' },
        { icon: Star, title: 'Improved CES', subtitle: 'Lower Customer Effort' },
        { icon: Rocket, title: 'Seamless Handoffs', subtitle: 'Zero shift data loss' }
      ]
    },
    access: 'http://go/incrupaccelerator',
    poc: defaultPOCs,
    feedback: FEEDBACK_URL,
    demo: '',
  },

  crado: {
    shortName: 'CRADO',
    name: 'CRADO (Calculation of Revenue Adjustment and Drafting Orchestrator)',
    tagline: 'Automating Billing Calculations for GCP Billing',
    quote: '"Calculate. Draft. Resolve."',
    pillars: 'Financial Precision | Standardized Communication | Operational Efficiency',
    overview: 'A custom AI Agent built on Gemini Enterprise (go/ge-mercuri) that connects to internal data sources to automate template selection per Billing use case, perform complex billing math, and draft customer and internal communications.',
    objectives: [
      'Automate template selection based on specific billing use cases.',
      'Perform complex billing math with zero calculation inaccuracies.',
      'Automatically generate pre-filled, professional email drafts for customers and consults.'
    ],
    audience: 'Billing support agents and financial operations teams.',
    metadata: { type: 'AI Billing Agent', users: 'Billing Support Teams', domain: 'Real-Time Case Execution', status: 'Development in Progress' },
    problem: {
      description: 'The manual billing support process is time-intensive and error-prone, leading to calculation inaccuracies and delayed response times that negatively impact SLAs and customer experience.',
      cards: [
        { title: 'Manual Billing Math', description: 'Human error leads to credit and debit inaccuracies.', icon: Clock, color: '#fdf2f8', iconBg: '#fce7f3', iconColor: '#db2777' },
        { title: 'Slow Drafting Time', description: 'Manual template assembly inflates average handle time.', icon: FileText, color: '#eff6ff', iconBg: '#dbeafe', iconColor: '#2563eb' }
      ],
      callout: 'Financial adjustments demand mathematical accuracy and rapid execution.',
      transition: 'CRADO automates the entire calculation and drafting loop.',
      tagline: 'Calculate. Draft. Resolve.'
    },
    solution: {
      description: 'CRADO leverages Gemini Enterprise to automate formula selection, execute accurate adjustments, and synthesize outgoing emails.',
      cards: [
        { title: '100% Financial Precision', description: 'Zero calculation errors on credits and adjustments.', icon: Target, color: '#ecfdf5', iconBg: '#d1fae5', iconColor: '#059669' },
        { title: 'Automated Drafting', description: 'Pre-fills customer-ready emails with complete parameters.', icon: MessageSquare, color: '#eff6ff', iconBg: '#dbeafe', iconColor: '#2563eb' }
      ],
      calloutIcon: Lightbulb,
      callout: 'Protects customer trust while dropping handle times.',
      transition: 'Transforms repetitive billing workflows into seamless automated actions.',
      tagline: 'Calculate. Draft. Resolve.'
    },
    benefits: [
      { title: 'Financial Precision', description: 'Ensures 100% accuracy in calculating credits, debits, and adjustments.' },
      { title: 'Standardized Communication', description: 'Automatically generates pre-filled, professional email drafts that can be shared with customers and to raise consults.' },
      { title: 'Operational Efficiency', description: 'Reduces Average Handle Time (AHT) and improves SLA adherence.' }
    ],
    usage: {
      description: 'Integrated directly into billing engineering environments on go/ge-mercuri.',
      highlights: [
        { title: 'Zero Calculation Inaccuracies', description: 'Automates complex ledger reconciliations with zero discrepancy.', badge: 'Precision' }
      ]
    },
    impact: {
      title: 'Financial Precision & Operational Speed',
      description: 'Drives billing handle times down while eliminating costly manual consult loops.',
      metrics: [
        { icon: TrendingUp, title: 'Higher Productivity', subtitle: 'Lower AHT via automation' },
        { icon: ShieldCheck, title: 'Consult Preventability', subtitle: 'Standardized accurate data' },
        { icon: Star, title: 'Zero Financial Errors', subtitle: '100% precision' }
      ]
    },
    access: 'Development in Progress (go/ge-mercuri)',
    poc: defaultPOCs,
    feedback: FEEDBACK_URL,
    demo: '',
  },

  arc: {
    shortName: 'ARC',
    name: 'ARC (Automated Routing & Closure)',
    tagline: 'Intelligent Frontline Routing & Automated Resolution',
    quote: '"Intercept. Route. Resolve."',
    pillars: 'Hop Reduction | Queue Optimization | Agent Empowerment',
    overview: 'A frontline AI system that intercepts inbound queries to automatically detect out-of-scope & low complexity requests, notifies the agent of low complexity / OOS scenarios, and assists them in resolving it without needing to transfer.',
    objectives: [
      'Intercept incoming queries to detect out-of-scope and simple "How-to" requests.',
      'Eliminate unnecessary ticket transfer loops and cross-shard queue bounces.',
      'Provide frontline agents with real-time resolution guidance to resolve tickets on the spot.'
    ],
    audience: 'Frontline support agents, queue dispatchers, and triage teams.',
    metadata: { type: 'Intelligent Routing Agent', users: 'Frontline Agents', domain: 'Real-Time Case Execution', status: 'BRD in Progress' },
    problem: {
      description: 'Incoming out-of-scope and simple "How-to" inquiries are mixed with complex technical issues and undergo repetitive manual handoffs. This causes severe queue congestion, high transfer hops, and SLA breaches.',
      cards: [
        { title: 'Excessive Transfer Hops', description: 'Simple questions bounce across teams, bloating turnaround time.', icon: Unlink, color: '#fdf2f8', iconBg: '#fce7f3', iconColor: '#db2777' },
        { title: 'Queue Congestion', description: 'Complex engineers bogged down triaging low-complexity inquiries.', icon: Clock, color: '#eff6ff', iconBg: '#dbeafe', iconColor: '#2563eb' }
      ],
      callout: 'Unnecessary ticket transfers frustrate customers and exhaust high-tier engineering capacity.',
      transition: 'ARC empowers frontline agents to resolve simpler inquiries without queuing or transfer hops.',
      tagline: 'Intercept. Route. Resolve.'
    },
    solution: {
      description: 'ARC detects low-complexity and out-of-scope requests at ingestion, giving agents prescriptive step-by-step resolution scripts directly.',
      cards: [
        { title: 'Inbound Interception', description: 'Automatically identifies query complexity and scope upon receipt.', icon: Eye, color: '#ecfdf5', iconBg: '#d1fae5', iconColor: '#059669' },
        { title: 'Self-Contained Resolution', description: 'Gives frontline agents everything needed to close the issue.', icon: Target, color: '#eff6ff', iconBg: '#dbeafe', iconColor: '#2563eb' }
      ],
      calloutIcon: Zap,
      callout: 'Eliminates cross-shard handoff friction permanently.',
      transition: 'Transforms ticket triage into an instant first-contact resolution engine.',
      tagline: 'Intercept. Route. Resolve.'
    },
    benefits: [
      { title: 'Transfer & Hop Reduction', description: 'Drastically minimizes ticket transfer hops and eliminates cross-shard routing loops by enabling agents to resolve OOS and cross-shard low-complexity inquiries directly.' },
      { title: 'Agent Empowerment & Efficiency', description: 'Provides frontline agents with real-time resolution guidance, lowering handle times while freeing core engineering bandwidth for complex technical issues.' }
    ],
    usage: {
      description: 'Active design and architectural specification under technical evaluation.',
      highlights: [
        { title: 'Hop Reduction Target', description: 'Aiming to cut non-technical ticket transfers by over 60%.', badge: 'Efficiency' }
      ]
    },
    impact: {
      title: 'Transfer Rate & SDR Improvement',
      description: 'Directly impacts transfer hop counts and lifts first-contact resolution.',
      metrics: [
        { icon: TrendingUp, title: 'Lower Transfer Rate', subtitle: 'Eliminated routing loops' },
        { icon: Star, title: 'Higher SDR', subtitle: 'Direct frontline closure' },
        { icon: Users, title: 'Engineering Bandwidth', subtitle: 'Core capacity protected' }
      ]
    },
    access: 'BRD in Progress',
    poc: defaultPOCs,
    feedback: FEEDBACK_URL,
    demo: '',
  },

  aura: {
    shortName: 'AURA',
    name: 'AURA (Automated Unified Response Assistant)',
    tagline: 'End-to-End AI-Powered Support Enablement',
    quote: '"Unify. Guide. Empower."',
    pillars: 'Lifecycle Automation | Single-Pane SOPs | Reduced Cognitive Load',
    overview: 'An AI-powered support suite that integrates Precheck, Troubleshooting, and Quick Response modules to automate the support lifecycle from initial ticket ingestion to final resolution.',
    objectives: [
      'Integrate Precheck, Troubleshooting, and Quick Response into a single agent window.',
      'Eliminate copy-pasting, multi-tab sprawl, and manual pre-checks.',
      'Standardize technical troubleshooting SOPs to eradicate human error.'
    ],
    audience: 'Support engineers handling complex troubleshooting lifecycles.',
    metadata: { type: 'Support Enablement Suite', users: 'Support Engineers', domain: 'Real-Time Case Execution', status: 'BRD in Progress' },
    problem: {
      description: 'Current support workflows suffer from operational bottlenecks across troubleshooting, resolution, and communication phases, forcing agents to spend significant time on manual pre-checks, searching disparate knowledge bases for technical resolutions, and managing multiple tabs for canned responses.',
      cards: [
        { title: 'Multi-Tab Cognitive Load', description: 'Agents juggle disparate internal tools and documentation.', icon: Layers, color: '#fdf2f8', iconBg: '#fce7f3', iconColor: '#db2777' },
        { title: 'Manual Pre-Checks', description: 'Routine diagnostic validation takes up valuable troubleshooting time.', icon: Clock, color: '#eff6ff', iconBg: '#dbeafe', iconColor: '#2563eb' }
      ],
      callout: 'Context switching and manual diagnostic collation heavily inflate Average Handle Time.',
      transition: 'AURA synthesizes the entire diagnostics and response process into one consolidated workspace.',
      tagline: 'Unify. Guide. Empower.'
    },
    solution: {
      description: 'A unified agent assistant executing real-time pre-checks, automated diagnostic procedures, and synthesized communications.',
      cards: [
        { title: 'Automated Diagnostic Prechecks', description: 'Runs health checks and log queries before the agent opens the case.', icon: ShieldCheck, color: '#ecfdf5', iconBg: '#d1fae5', iconColor: '#059669' },
        { title: 'Contextual Quick Response', description: 'Drafts verified technical replies based on proven resolutions.', icon: MessageSquare, color: '#eff6ff', iconBg: '#dbeafe', iconColor: '#2563eb' }
      ],
      calloutIcon: Lightbulb,
      callout: 'Dramatically cuts handle times while enforcing standard quality benchmarks.',
      transition: 'Provides end-to-end enablement from ticket arrival to closure.',
      tagline: 'Unify. Guide. Empower.'
    },
    benefits: [
      { title: 'Operational Efficiency', description: 'Reduces Average Handle Time (AHT) by eliminating manual research, copy-paste workflows, and administrative pre-checks.' },
      { title: 'Accuracy & Consistency', description: 'Reduces human error and inconsistent troubleshooting by institutionalizing standard operating procedures and diagnostic steps.' }
    ],
    usage: {
      description: 'Specification phase with core modules undergoing integration testing.',
      highlights: [
        { title: 'AHT Compression', description: 'Engineered to reduce administrative handle time by up to 35%.', badge: 'Enablement' }
      ]
    },
    impact: {
      title: 'Productivity & SDR Acceleration',
      description: 'Elevates agent productivity and reinforces verified quality standards.',
      metrics: [
        { icon: TrendingUp, title: 'Enhanced Productivity', subtitle: 'Eliminated manual searches' },
        { icon: Star, title: 'Higher SDR', subtitle: 'Consistent SOP diagnostics' },
        { icon: Users, title: 'Lower Cognitive Load', subtitle: 'Single-pane workflow' }
      ]
    },
    access: 'BRD in Progress',
    poc: defaultPOCs,
    feedback: FEEDBACK_URL,
    demo: '',
  },

  star: {
    shortName: 'STAR',
    name: 'STAR (Smart Triage And Resolution)',
    tagline: 'Intelligent Re-contact Deflection & Resolution',
    quote: '"Identify. Deflect. Resolve."',
    pillars: 'Deflection Engine | Intent Analysis | Queue Optimization',
    overview: 'An AI-powered assistant that evaluates chat intents to automatically flag non-eligible re-contacts. It initially provides agents with proactive resolution guidance (Phase 1) and will eventually transition to fully automated deflection (Phase 2).',
    objectives: [
      'Screen out ineligible re-contact inquiries such as propagation delays and active service bugs.',
      'Provide proactive resolution guidance for chat agents during active customer dialogue.',
      'Transition safely from agent assistance (Phase 1) to autonomous deflection (Phase 2).'
    ],
    audience: 'Chat support agents, chat dispatchers, and capacity planning teams.',
    metadata: { type: 'Triage & Deflection System', users: 'Chat Support Agents', domain: 'Real-Time Case Execution', status: 'BRD in Progress' },
    problem: {
      description: 'Current systems fail to screen out ineligible re-contact volume inquiries like propagation delays and active bugs. This creates severe queue bottlenecks, degrades AHT, and skews staffing forecasts.',
      cards: [
        { title: 'Ineligible Volume Spikes', description: 'Known system delays fill queues with duplicate tickets.', icon: ShieldAlert, color: '#fdf2f8', iconBg: '#fce7f3', iconColor: '#db2777' },
        { title: 'Skewed Capacity Forecasts', description: 'Repetitive chats distort true support demand.', icon: BarChart, color: '#eff6ff', iconBg: '#dbeafe', iconColor: '#2563eb' }
      ],
      callout: 'Known propagation delays and reported bugs should not consume real-time support engineer capacity.',
      transition: 'STAR flags non-eligible chats dynamically before they clog active queues.',
      tagline: 'Identify. Deflect. Resolve.'
    },
    solution: {
      description: 'Natural intent analysis screens customer queries and provides guided deflection playbooks to agents.',
      cards: [
        { title: 'Intent Classification', description: 'Instantly identifies if an issue is an active bug or propagation delay.', icon: BrainCircuit, color: '#ecfdf5', iconBg: '#d1fae5', iconColor: '#059669' },
        { title: 'Automated Deflection (Phase 2)', description: 'Directs users to live status dashboards autonomously.', icon: Rocket, color: '#eff6ff', iconBg: '#dbeafe', iconColor: '#2563eb' }
      ],
      calloutIcon: Zap,
      callout: 'Clears queue backlogs so agents can focus on complex outages.',
      transition: 'Transforms chat triage into an intelligent deflection radar.',
      tagline: 'Identify. Deflect. Resolve.'
    },
    benefits: [
      { title: 'Efficient Case Handling', description: 'Accelerates resolution by providing agents with proactive, AI-generated guidance.' },
      { title: 'Queue Optimization', description: 'Reduces manual overhead and resolves non-eligible chat volume to clear queue bottlenecks.' }
    ],
    usage: {
      description: 'Requirement formulation underway for global real-time chat infrastructure.',
      highlights: [
        { title: 'Deflection Target', description: 'Targeting over 25% deflection of recurring status and propagation chats.', badge: 'Automation' }
      ]
    },
    impact: {
      title: 'TRT & Recontact Reduction',
      description: 'Cuts Turnaround Time (TRT) and minimizes repeat inquiries across chat queues.',
      metrics: [
        { icon: Clock, title: 'Reduced TRT', subtitle: 'Faster triage turnaround' },
        { icon: Star, title: 'Lower Re-contact Rate', subtitle: 'Clean, definitive guidance' },
        { icon: TrendingUp, title: 'Capacity Optimization', subtitle: 'True demand visibility' }
      ]
    },
    access: 'BRD in Progress',
    poc: defaultPOCs,
    feedback: FEEDBACK_URL,
    demo: '',
  }
};

/* =========================================================
   NAVIGATION HEADERS
========================================================= */

const sections = [
  { id: 'overview' as SectionId, label: 'Overview', icon: Home },
  { id: 'problem' as SectionId, label: 'Problem', icon: FileText },
  { id: 'solution' as SectionId, label: 'Solution', icon: Lightbulb },
  { id: 'benefits' as SectionId, label: 'Key Benefits', icon: Star },
  { id: 'usage' as SectionId, label: 'Usage & Adoption', icon: BarChart3 },
  { id: 'impact' as SectionId, label: 'Impact', icon: TrendingUp },
  { id: 'access' as SectionId, label: 'Access Details', icon: KeyRound },
  { id: 'feedback' as SectionId, label: 'Feedback', icon: MessageSquare },
  { id: 'demo' as SectionId, label: 'Demo', icon: PlayCircle },
];

const wikiTableRows = [
  { id: 'overview', icon: FileText, color: '#1a73e8', section: 'Overview', covers: 'Purpose, vision and scope of the solution.', details: 'Introduction and key objectives' },
  { id: 'problem-solution', icon: Target, color: '#ea4335', section: 'Problem & Solution', covers: 'Key challenges, approach and how the solution addresses them.', details: 'Current state, business challenges and solution details' },
  { id: 'benefits-impact', icon: BarChart3, color: '#16a34a', section: 'Benefits & Impact', covers: 'Value delivered for people, operations and customers.', details: 'Business benefits and key impact metrics' },
  { id: 'usage', icon: Users, color: '#7c3aed', section: 'Usage & Adoption', covers: 'Explore adoption metrics and usage insights.', details: 'Usage trends and adoption details' },
  { id: 'access', icon: KeyRound, color: '#06b6d4', section: 'Access & Support', covers: 'Application links, POC details and how to get help.', details: 'Access links, tool owner/POC and support information' },
  { id: 'feedback-demo', icon: PlayCircle, color: '#1a73e8', section: 'Feedback & Demo', covers: 'Share your feedback and watch a short demo.', details: 'Link to feedback form and embedded video demo' },
];

/* =========================================================
   ASYMMETRIC DASHBOARD COMPONENT (EXACT IMAGE REPLICA)
========================================================= */

function AsymmetricDashboard({ onSelect }: { onSelect: (id: NavigationId) => void }) {
  return (
    <div className="dashboard-hub-container">
      {/* 1. Large Left Card: Innovation Wiki */}
      <div className="hub-hero-card">
        <div className="hub-hero-blob-1"></div>
        <div className="hub-hero-blob-2"></div>
        
        <div className="hub-hero-content">
          <div className="hub-hero-icon">
            <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 50 25 L 20 50" stroke="#4285F4" />
              <path d="M 50 25 L 80 50" stroke="#EA4335" />
              <path d="M 30 45 L 30 80 L 45 80" stroke="#FBBC04" />
              <path d="M 70 45 L 70 80 L 55 80" stroke="#34A853" />
            </svg>
          </div>
          <h3>Innovation Wiki</h3>
          <p>Your central hub for<br/>knowledge, collaboration<br/>and innovation.</p>
          <button 
            type="button" 
            className="hub-hero-arrow" 
            onClick={() => onSelect('home')} 
            title="Explore Innovation Wiki"
          >
            <ArrowRight size={22} color="white" strokeWidth={2.8} />
          </button>
        </div>
      </div>

      {/* 2. Right Grid Container (Row 1 + Row 2) */}
      <div className="hub-grid-right">
        {/* ROW 1: CORE, Elevate360, Digital SME */}
        <div className="hub-grid-row">
          {solutions.slice(0, 3).map((s) => (
            <div key={s.id} className="hub-card" onClick={() => onSelect(s.id)}>
              <div className="hub-card-blob" style={{ backgroundColor: s.color }}></div>
              <div className="hub-card-content">
                <div className="hub-card-icon-wrap" style={{ color: s.color, backgroundColor: `${s.color}15` }}>
                  <s.icon size={38} strokeWidth={2.4} />
                </div>
                <h4>{s.name}</h4>
                <p>{s.subtitle}</p>
              </div>
              <div className="hub-card-arrow" style={{ backgroundColor: `${s.color}18`, color: s.color }}>
                <ArrowRight size={17} strokeWidth={3} />
              </div>
            </div>
          ))}
        </div>

        {/* ROW 2: Accelerate, CRADO, ARC, AURA, STAR */}
        <div className="hub-grid-row">
          {solutions.slice(3).map((s) => (
            <div key={s.id} className="hub-card" onClick={() => onSelect(s.id)}>
              <div className="hub-card-blob" style={{ backgroundColor: s.color }}></div>
              <div className="hub-card-content">
                <div className="hub-card-icon-wrap" style={{ color: s.color, backgroundColor: `${s.color}15` }}>
                  <s.icon size={36} strokeWidth={2.4} />
                </div>
                <h4>{s.name}</h4>
                <p>{s.subtitle}</p>
              </div>
              <div className="hub-card-arrow" style={{ backgroundColor: `${s.color}18`, color: s.color }}>
                <ArrowRight size={17} strokeWidth={3} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN APP CONTROLLER
========================================================= */

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedSolution, setSelectedSolution] = useState<NavigationId>('dashboard');
  const [activeSection, setActiveSection] = useState<SectionId>('overview');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const openSolution = (id: NavigationId) => {
    setSelectedSolution(id);
    setActiveSection('overview');
  };

  const backToDashboard = () => {
    setSelectedSolution('dashboard');
  };

  const ThemeToggle = () => (
    <button 
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      title="Switch Theme"
      aria-label="Switch Theme"
      style={{
        position: 'fixed', bottom: '30px', right: '40px', zIndex: 9999,
        width: '48px', height: '48px', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-card)', border: '2px solid #4285F4',
        boxShadow: 'var(--shadow-sm)', cursor: 'pointer', color: 'var(--text-main)',
        transition: 'all 0.3s ease',
        animation: 'themePulse 2s infinite'
      }}
    >
      {theme === 'light' ? <Moon size={22} color="#4285F4" /> : <Sun size={22} color="#FBBC04" />}
    </button>
  );

  return (
    <div className={`app no-sidebar-app ${theme}`}>
      <GlobalThemeStyles />
      <ThemeToggle />
      <main className="main no-sidebar-main" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* HEADER: Matches the Exact Image Architecture */}
        <header className="image-replica-header">
          <div className="header-left">
            <span className="gcp-brand">
              <span className="gcp-blue">G</span>
              <span className="gcp-red">C</span>
              <span className="gcp-yellow">P</span>
            </span>
            <h1 className="header-title">Tech Transformation Solutions</h1>
          </div>

          <div className="header-right">
            <div className="header-pillars">
              <span>Stronger People</span>
              <span className="pillar-sep">|</span>
              <span>Smarter Operations</span>
              <span className="pillar-sep">|</span>
              <span>Better Customer Experiences</span>
            </div>

            <div className="google-dots-row">
              <span className="dot dot-blue"></span>
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
          </div>

          {/* Decorative Google Quadrant Fan in Top-Right Corner */}
          <div className="google-corner-fan" aria-hidden="true">
            <svg viewBox="0 0 160 160" width="160" height="160" fill="none">
              <path d="M 160,0 A 160,160 0 0,0 0,160 L 160,160 Z" fill="#FBBC04" />
              <path d="M 160,0 A 120,120 0 0,0 40,160 L 160,160 Z" fill="#4285F4" />
              <path d="M 160,0 A 80,80 0 0,0 80,160 L 160,160 Z" fill="#EA4335" />
              <path d="M 160,0 A 40,40 0 0,0 120,160 L 160,160 Z" fill="#34A853" />
            </svg>
          </div>
        </header>

        {/* BODY CONTAINER */}
        <div style={{ flex: 1, position: 'relative' }}>
          {selectedSolution === 'dashboard' ? (
            /* First Page View: Only Cards Are Shown */
            <AsymmetricDashboard onSelect={openSolution} />
          ) : (
            /* Selected View: Isolated Detail View with Back Button */
            <div className="page-content main-page-content" style={{ padding: '24px 40px' }}>
              <div style={{ marginBottom: '20px' }}>
                <button 
                  onClick={backToDashboard}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-main)',
                    background: 'var(--bg-card)',
                    color: '#1a73e8',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '14px',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <ArrowLeft size={16} />
                  <span>Back to Overview</span>
                </button>
              </div>

              {selectedSolution === 'home' ? (
                /* Only Table View Displays on Explore */
                <InnovationWikiHome />
              ) : (
                /* Only Selected Solution Appears */
                <SolutionPage 
                  solutionId={selectedSolution as SolutionId} 
                  activeSection={activeSection} 
                  setActiveSection={setActiveSection} 
                />
              )}
            </div>
          )}
        </div>

        {/* FOOTER: Matches the Exact Image Architecture */}
        <footer className="image-replica-footer">
          <div className="footer-left">
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" style={{ flexShrink: 0 }}>
              <path d="M19.5 32H10A8 8 0 0 1 10 16a8.5 8.5 0 0 1 2.2.3A12 12 0 0 1 34 22a8 8 0 0 1-6 10h-8.5" stroke="#EA4335" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 32h18" stroke="#4285F4" strokeWidth="4" strokeLinecap="round"/>
              <path d="M10 24a8 8 0 0 1 8-8" stroke="#FBBC04" strokeWidth="4" strokeLinecap="round"/>
              <path d="M18 16a12 12 0 0 1 12 6" stroke="#34A853" strokeWidth="4" strokeLinecap="round"/>
            </svg>
            <span className="footer-motto">Build &nbsp;·&nbsp; Transform &nbsp;·&nbsp; Scale</span>
          </div>

          <div className="footer-center-bar">
            <span className="bar-seg bar-blue"></span>
            <span className="bar-seg bar-red"></span>
            <span className="bar-seg bar-yellow"></span>
            <span className="bar-seg bar-green"></span>
          </div>

          <div className="footer-right-matrix" aria-hidden="true">
            <div className="matrix-dot"></div><div className="matrix-dot"></div><div className="matrix-dot"></div><div className="matrix-dot"></div>
            <div className="matrix-dot"></div><div className="matrix-dot"></div><div className="matrix-dot"></div><div className="matrix-dot"></div>
            <div className="matrix-dot"></div><div className="matrix-dot"></div><div className="matrix-dot"></div><div className="matrix-dot"></div>
            <div className="matrix-dot"></div><div className="matrix-dot"></div><div className="matrix-dot"></div><div className="matrix-dot"></div>
          </div>
        </footer>
      </main>
    </div>
  );
}

/* =========================================================
   INNOVATION WIKI HOME (TABLE VIEW ONLY)
========================================================= */

function InnovationWikiHome() {
  return (
    <section className="wiki-home clean-wiki-home">
      <div className="wiki-home-heading">
        <h2>What you’ll find here</h2>
        <p>Explore the key aspects we cover for each solution. Select an item above or browse sections below.</p>
      </div>
      <div className="wiki-table-wrapper">
        <table className="wiki-table">
          <thead>
            <tr><th>Section</th><th>What it covers</th><th>Details available</th></tr>
          </thead>
          <tbody>
            {wikiTableRows.map((row) => {
              const Icon = row.icon;
              return (
                <tr key={row.id}>
                  <td>
                    <div className="table-section-cell">
                      <div className="table-icon" style={{ color: row.color, backgroundColor: `${row.color}12` }}><Icon size={22} /></div>
                      <strong>{row.section}</strong>
                    </div>
                  </td>
                  <td>{row.covers}</td>
                  <td>
                    <div className="details-cell"><span className="bullet">•</span><span>{row.details}</span></div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* =========================================================
   SOLUTION DETAIL PAGE
========================================================= */

type SolutionPageProps = {
  solutionId: SolutionId;
  activeSection: SectionId;
  setActiveSection: Dispatch<SetStateAction<SectionId>>;
};

function SolutionPage({ solutionId, activeSection, setActiveSection }: SolutionPageProps) {
  const content = solutionContent[solutionId];
  const platform = solutions.find((item) => item.id === solutionId);

  if (!platform || !content) return null;
  const Icon = platform.icon;

  return (
    <section className="solution-page">
      <div className="solution-header">
        <div className="solution-header-left">
          <div className="breadcrumbs">Solutions &gt; {content.shortName}</div>
          <div className="solution-title-row">
            <div className="solution-header-icon" style={{ color: platform.color, backgroundColor: `${platform.color}15` }}>
              <Icon size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h2>{content.name}</h2>
              <p>{content.tagline}</p>
            </div>
          </div>
        </div>
        <div className="solution-header-right">
          <div className="header-quote">{content.quote}</div>
          <div className="header-sub">{content.pillars}</div>
        </div>
      </div>

      <div className="solution-layout">
        <aside className="solution-tabs">
          {sections.map((section) => {
            const SectionIcon = section.icon;
            return (
              <button
                type="button"
                key={section.id}
                className={activeSection === section.id ? 'active' : ''}
                onClick={() => setActiveSection(section.id)}
              >
                <SectionIcon size={18} />
                <span>{section.label}</span>
              </button>
            );
          })}
        </aside>

        <div className="solution-content">
          {activeSection === 'overview' && <EnhancedOverview content={content} setActiveSection={setActiveSection} />}
          {activeSection === 'problem' && <EnhancedProblem data={content.problem} platformColor={platform.color} platformIcon={Icon} />}
          {activeSection === 'solution' && <EnhancedSolution data={content.solution} platformColor={platform.color} platformIcon={Icon} />}
          {activeSection === 'benefits' && <Benefits benefits={content.benefits as BenefitItem[]} />}
          {activeSection === 'usage' && <Usage content={content} platformColor={platform.color} />}
          {activeSection === 'impact' && <Impact content={content} platformColor={platform.color} />}
          {activeSection === 'access' && <Access content={content} />}
          {activeSection === 'feedback' && <Feedback content={content} />}
          {activeSection === 'demo' && <Demo content={content} />}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION SUBCOMPONENTS
========================================================= */

function EnhancedOverview({ content, setActiveSection }: any) {
  if (!content) return null;
  return (
    <div className="enhanced-overview">
      <div className="overview-grid">
        <div className="overview-main">
          <h2 className="overview-title">Overview</h2>
          <div className="overview-card card-white">
            <div className="card-icon-badge"><FileText size={22} strokeWidth={2.5} /></div>
            <div className="card-content-wrap">
              <h4>Overview</h4>
              <p>{content.overview}</p>
            </div>
          </div>

          <div className="overview-card card-blue">
            <div className="card-icon-badge"><ShieldCheck size={22} strokeWidth={2.5} /></div>
            <div className="card-content-wrap">
              <h4>Key Objectives</h4>
              <ul>
                {content.objectives?.map((obj: string, i: number) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="overview-card card-green">
            <div className="card-icon-badge"><UserIcon size={22} strokeWidth={2.5} /></div>
            <div className="card-content-wrap">
              <h4>Who is it for?</h4>
              <p>{content.audience}</p>
            </div>
          </div>
        </div>

        <div className="overview-sidebar">
          <div className="sidebar-container">
            <div className="sidebar-section">
              <div className="side-header">
                <div className="info-circle"><Info size={14} strokeWidth={3} /></div>
                <h4>At a Glance</h4>
              </div>
              <div className="metadata-list">
                <div className="meta-row"><span>Solution Type</span><strong>{content.metadata?.type}</strong></div>
                <div className="meta-row"><span>Target Users</span><strong>{content.metadata?.users}</strong></div>
                <div className="meta-row"><span>Domain</span><strong>{content.metadata?.domain}</strong></div>
                <div className="meta-row"><span>Status</span><span className="status-pill">{content.metadata?.status}</span></div>
              </div>
            </div>

            <div className="sidebar-section">
              <div className="side-header">
                <LinkIcon size={18} strokeWidth={2.5} color="#2563eb" />
                <h4>Quick Links</h4>
              </div>
              <div className="quick-links">
                <button className="ql-btn" onClick={() => setActiveSection('access')}>
                  <FileText size={18} color="#2563eb" />
                  <span>Go to Access Details</span>
                  <ChevronRight size={16} className="arrow" />
                </button>
                <button className="ql-btn" onClick={() => setActiveSection('benefits')}>
                  <Star size={18} color="#16a34a" />
                  <span>View Key Benefits</span>
                  <ChevronRight size={16} className="arrow" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnhancedProblem({ data, platformColor, platformIcon: PlatformIcon }: any) {
  if (!data) return null;
  return (
    <div className="enhanced-problem">
      <h2 className="problem-title">The Problem</h2>
      <p className="problem-desc">{data.description}</p>

      <div className="p-cards">
        {data.cards?.map((card: any, index: number) => {
          const CardIcon = card.icon;
          return (
            <div key={index} className="p-card">
              <div className="p-icon-wrap" style={{ color: card.iconColor }}>
                <CardIcon size={22} strokeWidth={2.5} />
              </div>
              <h4>{card.title}</h4>
              <p>{card.description}</p>
            </div>
          );
        })}
      </div>

      <div className="p-callout">
        <div className="c-icon" style={{ color: platformColor, backgroundColor: `${platformColor}15` }}>
          <Megaphone size={22} />
        </div>
        <div className="c-cont">
          <strong>Why this matters</strong>
          <p>{data.callout}</p>
        </div>
      </div>
    </div>
  );
}

function EnhancedSolution({ data, platformColor }: any) {
  if (!data) return null;
  return (
    <div className="enhanced-solution">
      <h2 className="solution-title">The Solution</h2>
      <p className="solution-desc">{data.description}</p>

      <div className="s-cards">
        {data.cards?.map((card: any, index: number) => {
          const CardIcon = card.icon;
          return (
            <div key={index} className="s-card" style={{ backgroundColor: card.iconBg }}>
              <div className="s-icon-wrap" style={{ backgroundColor: 'var(--bg-card)', color: card.iconColor }}>
                <CardIcon size={22} strokeWidth={2.5} />
              </div>
              <h4>{card.title}</h4>
              <p>{card.description}</p>
            </div>
          );
        })}
      </div>

      <div className="s-callout">
        <div className="sc-icon" style={{ color: platformColor, backgroundColor: `${platformColor}15` }}>
          <Lightbulb size={22} />
        </div>
        <div className="sc-cont">
          <strong>How it helps</strong>
          <p>{data.callout}</p>
        </div>
      </div>
    </div>
  );
}

function Benefits({ benefits }: { benefits: BenefitItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (!benefits) return null;

  return (
    <div className="content-section">
      <div className="section-heading"><h3>Key Benefits</h3></div>
      <div className="benefits-accordion-list">
        {benefits.map((benefit, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={benefit.title} className="benefit-accordion-item">
              <div className="benefit-header-row" onClick={() => setOpenIndex(isOpen ? null : index)}>
                <div className="benefit-badge">{String(index + 1).padStart(2, '0')}</div>
                <div className="benefit-title-text">{benefit.title}</div>
                <ChevronDown size={18} className={`benefit-chevron ${isOpen ? 'open' : ''}`} />
              </div>
              {isOpen && (
                <div className="benefit-dropdown-content">
                  <p>{benefit.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Usage({ content, platformColor }: { content: any; platformColor: string }) {
  const usageData = content.usage;
  if (!usageData) return null;

  return (
    <div className="content-section">
      <div className="section-heading"><h3>Usage & Adoption</h3></div>
      <div className="usage-desc-card"><p>{usageData.description}</p></div>
      <div className="highlights-container" style={{ marginTop: '20px' }}>
        <div className="highlights-grid">
          {usageData.highlights?.map((h: any, idx: number) => (
            <div key={idx} className="highlight-card">
              <div className="highlight-top">
                <h5>{h.title}</h5>
                <span className="highlight-badge" style={{ color: platformColor, backgroundColor: `${platformColor}14` }}>{h.badge}</span>
              </div>
              <p>{h.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Impact({ content, platformColor }: any) {
  const data = content.impact;
  if (!data) return null;

  return (
    <div className="content-section">
      <div className="section-heading"><h3>Impact</h3></div>
      <div className="impact-header-text">
        <h4>{data.title}</h4>
        <p>{data.description}</p>
      </div>
      <div className="benefits-accordion-list">
        {data.metrics?.map((m: any, index: number) => (
          <div key={index} className="benefit-accordion-item">
            <div className="benefit-header-row">
              <div className="benefit-badge" style={{ color: platformColor, backgroundColor: `${platformColor}15` }}>
                <m.icon size={18} strokeWidth={2.5} />
              </div>
              <div className="benefit-title-text">
                <strong>{m.title}</strong> — <span style={{ color: 'var(--text-secondary)' }}>{m.subtitle}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Access({ content }: { content: any }) {
  const hasUrl = content.access?.startsWith('http');
  return (
    <div className="content-section">
      <div className="section-heading"><h3>Access Details</h3></div>
      <div className="access-panel">
        <div className="access-row" style={{ justifyContent: 'space-between' }}>
          <div>
            <span>Application Access</span>
            {!hasUrl && <strong>{content.access}</strong>}
          </div>
          {hasUrl && <a href={content.access} target="_blank" rel="noreferrer" className="primary-button">Open Tool<ExternalLink size={16} /></a>}
        </div>
      </div>
    </div>
  );
}

function Feedback({ content }: { content: any }) {
  return (
    <div className="content-section">
      <div className="section-heading"><h3>Feedback</h3></div>
      <div className="feedback-panel">
        <MessageSquare size={33} />
        <div>
          <h4>Share your feedback</h4>
          <p>Use the Google Form to share suggestions and feedback for {content.shortName}.</p>
          <a href={content.feedback} target="_blank" rel="noreferrer" className="primary-button">Open Form<ExternalLink size={16} /></a>
        </div>
      </div>
    </div>
  );
}

function Demo({ content }: { content: any }) {
  return (
    <div className="content-section">
      <div className="section-heading"><h3>Demo</h3></div>
      <div className="demo-panel">
        {content.demo ? <video controls src={content.demo} /> : <><PlayCircle size={53} /><h4>{content.shortName} Demo</h4><p>Approved video demo will be hosted here.</p></>}
      </div>
    </div>
  );
}

export default App;
