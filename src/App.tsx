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
  ArrowLeft,
  Bell,
  LayoutGrid,
  Cloud
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
   GLOBAL THEME STYLES (Required to prevent crashes)
========================================================= */

function GlobalThemeStyles() {
  return (
    <style>{`
      :root {
        --bg-main: #f4f8ff; /* Light blue/white background as requested */
        --bg-card: #ffffff;
        --bg-hover: #f1f5f9;
        --text-main: #0c1d3d;
        --text-secondary: #405476;
        --text-muted: #64748b;
        --border-main: #dce8fa;
        --border-soft: #eaf0f6;
        --shadow-sm: 0 4px 14px rgba(24, 55, 95, 0.05);
      }

      .dark {
        --bg-main: #0f172a;
        --bg-card: #1e293b;
        --bg-hover: #334155;
        --text-main: #f8fafc;
        --text-secondary: #cbd5e1;
        --text-muted: #94a3b8;
        --border-main: #334155;
        --border-soft: #1e293b;
        --shadow-sm: 0 4px 12px rgba(0,0,0,0.5);
      }

      body {
        background-color: var(--bg-main) !important;
        color: var(--text-main);
        margin: 0 !important;
      }

      .app, .no-sidebar-app, .main-page-content { 
        background-color: transparent !important; 
      }
      
      .dark .hub-card, .dark .hub-hero-card {
        background: var(--bg-card) !important;
        border-color: var(--border-main) !important;
      }
      .dark .hub-hero-card h3, .dark .hub-card h4 { color: var(--text-main) !important; }
      .dark .hub-hero-card p, .dark .hub-card p { color: var(--text-secondary) !important; }

      .dark .wiki-home, .dark .solution-page { background: var(--bg-card) !important; border-color: var(--border-main) !important; }
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
   SOLUTIONS DATA
========================================================= */

const solutions = [
  { id: 'core' as NavigationId, name: 'C.O.R.E.', subtitle: 'Talent Acquisition & Readiness', icon: Target, color: '#4285F4' },
  { id: 'elevate' as NavigationId, name: 'Elevate360', subtitle: 'Operational Governance', icon: BarChart3, color: '#34A853' },
  { id: 'sme' as NavigationId, name: 'Digital SME', subtitle: 'Automating Case Execution', icon: Bot, color: '#9333EA' },
  { id: 'accelerate' as NavigationId, name: 'Project Accelerate', subtitle: 'Risk Intelligence & Control', icon: Zap, color: '#FBBC04' },
  { id: 'crado' as NavigationId, name: 'CRADO', subtitle: 'Automated Billing Deduction', icon: FileText, color: '#0EA5E9' },
  { id: 'arc' as NavigationId, name: 'ARC', subtitle: 'Intelligent Frontline Routing', icon: GitBranch, color: '#F43F5E' },
  { id: 'aura' as NavigationId, name: 'AURA', subtitle: 'End-to-End Support Enablement', icon: Layers3, color: '#6366F1' },
  { id: 'star' as NavigationId, name: 'STAR', subtitle: 'Intelligent Re-contact Deflection', icon: FilterX, color: '#10B981' },
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
   NEW GCP LOGO COMPONENT (Coded SVG)
========================================================= */

const NewGCPLogo = ({ size = 200 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <defs>
      <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34A853" />
        <stop offset="33%" stopColor="#4285F4" />
        <stop offset="66%" stopColor="#EA4335" />
        <stop offset="100%" stopColor="#FBBC04" />
      </linearGradient>
      <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="15" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="15" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="glow-yellow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="15" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="15" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="cloud-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.15" />
      </filter>
    </defs>
    <circle cx="200" cy="200" r="160" stroke="var(--border-main, #e2e8f0)" strokeWidth="1" fill="none" />
    <circle cx="200" cy="200" r="115" stroke="var(--border-soft, #f1f5f9)" strokeWidth="8" fill="none" />
    <circle cx="200" cy="200" r="140" stroke="url(#ring-grad)" strokeWidth="4" fill="none" />
    <circle cx="101" cy="101" r="4" fill="#34A853" />
    <circle cx="299" cy="101" r="4" fill="#EA4335" />
    <circle cx="299" cy="299" r="4" fill="#FBBC04" />
    <circle cx="101" cy="299" r="4" fill="#4285F4" />
    <g transform="translate(0, 25)" filter="url(#cloud-shadow)">
      <path d="M 150 230 L 250 230 A 30 30 0 0 0 250 170 A 50 50 0 0 0 150 170 A 30 30 0 0 0 150 230 Z" fill="var(--bg-main, #ffffff)" />
      <g fill="none" strokeWidth="24" strokeLinecap="butt">
        <path d="M 150 230 L 200 230" stroke="#34A853" /> 
        <path d="M 200 230 L 250 230 A 30 30 0 0 0 250 170" stroke="#4285F4" /> 
        <path d="M 250 170 A 50 50 0 0 0 150 170" stroke="#EA4335" /> 
        <path d="M 150 170 A 30 30 0 0 0 150 230" stroke="#FBBC04" /> 
      </g>
    </g>
    <circle cx="200" cy="60" r="32" fill="#4285F4" filter="url(#glow-blue)" opacity="0.8" />
    <circle cx="200" cy="60" r="32" fill="#4285F4" stroke="var(--bg-main, #ffffff)" strokeWidth="6" />
    <g transform="translate(184, 44)" stroke="#ffffff" strokeWidth="2.5" fill="none">
      <circle cx="16" cy="16" r="12" />
      <ellipse cx="16" cy="16" rx="6" ry="12" />
      <path d="M4 16h24 M16 4v24" />
    </g>
    <circle cx="340" cy="200" r="32" fill="#EA4335" filter="url(#glow-red)" opacity="0.8" />
    <circle cx="340" cy="200" r="32" fill="#EA4335" stroke="var(--bg-main, #ffffff)" strokeWidth="6" />
    <g transform="translate(324, 184)" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="5" />
      <path d="M16 8V5 M16 27v-3 M8 16H5 M27 16h-3 M10.3 10.3l-2.1-2.1 M27.8 27.8l-2.1-2.1 M10.3 21.7l-2.1 2.1 M27.8 4.2l-2.1 2.1" />
    </g>
    <circle cx="200" cy="340" r="32" fill="#FBBC04" filter="url(#glow-yellow)" opacity="0.8" />
    <circle cx="200" cy="340" r="32" fill="#FBBC04" stroke="var(--bg-main, #ffffff)" strokeWidth="6" />
    <g transform="translate(184, 324)" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" fill="#ffffff" />
      <path d="M23 24a8 8 0 0 0-14 0" fill="#ffffff"/>
      <circle cx="8" cy="12" r="3" fill="#ffffff" stroke="none" />
      <path d="M4 22a6 6 0 0 1 6-6" />
      <circle cx="24" cy="12" r="3" fill="#ffffff" stroke="none" />
      <path d="M28 22a6 6 0 0 0-6-6" />
    </g>
    <circle cx="60" cy="200" r="32" fill="#34A853" filter="url(#glow-green)" opacity="0.8" />
    <circle cx="60" cy="200" r="32" fill="#34A853" stroke="var(--bg-main, #ffffff)" strokeWidth="6" />
    <g transform="translate(44, 184)" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="8" width="24" height="12" rx="2" />
      <path d="M2 24h28" />
    </g>
  </svg>
);

/* =========================================================
   PURE CODE-GENERATED PUZZLE ARTWORK 
========================================================= */

const CodeGeneratedPuzzleArtwork = () => (
 <div style={{ width: '400px', height: '400px', background: `url(${puzzleBg}) center/cover no-repeat`, position: 'relative', boxSizing: 'border-box', overflow: 'hidden', borderRadius: '12px' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, width: '200px', height: '200px', background: 'radial-gradient(circle at top left, rgba(66, 133, 244, 0.15), transparent 70%)' }}></div>
    <div style={{ position: 'absolute', bottom: 0, right: 0, width: '200px', height: '200px', background: 'radial-gradient(circle at bottom right, rgba(251, 188, 4, 0.15), transparent 70%)' }}></div>
    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '200px', height: '200px', background: 'radial-gradient(circle at bottom left, rgba(52, 168, 83, 0.15), transparent 70%)' }}></div>
    <div style={{ position: 'absolute', top: '24px', left: '24px', textAlign: 'left' }}>
      <div style={{ fontSize: '26px', fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#1a73e8', lineHeight: '1.1', fontWeight: 'bold' }}>One<br/>Cloud</div>
      <div style={{ fontSize: '13px', color: 'var(--text-main)', marginTop: '6px', fontWeight: 600 }}>Many<br/>Possibilities</div>
      <div style={{ width: '40px', height: '4px', background: 'linear-gradient(90deg, #4285F4, #34A853)', marginTop: '6px', borderRadius: '2px' }}></div>
    </div>
    <div style={{ position: 'absolute', top: '24px', right: '24px', textAlign: 'right' }}>
      <div style={{ fontSize: '26px', fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#1a73e8', lineHeight: '1.1', fontWeight: 'bold' }}>Ideas<br/>to Impact</div>
      <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #EA4335, #FBBC04, #34A853)', marginTop: '6px', float: 'right', borderRadius: '2px' }}></div>
    </div>
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -60%)' }}>
       <NewGCPLogo size={200} />
    </div>
    <div style={{ position: 'absolute', bottom: '65px', left: '0', width: '100%', textAlign: 'center' }}>
      <h2 style={{ margin: 0, color: 'var(--text-main)', fontSize: '32px', fontWeight: 800, letterSpacing: '-0.5px' }}>GCP Tech</h2>
      <h2 style={{ margin: 0, color: '#1a73e8', fontSize: '24px', fontWeight: 700, letterSpacing: '-0.5px' }}>Transformation Solutions</h2>
      <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 500 }}>One Cloud &nbsp;&bull;&nbsp; Many Possibilities</p>
    </div>
    <div style={{ position: 'absolute', bottom: '16px', display: 'flex', justifyContent: 'space-around', width: '100%', padding: '0 24px', boxSizing: 'border-box' }}>
       <div style={{ textAlign: 'center', color: '#4285F4', display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Users size={24}/><div style={{ fontSize: '12px', fontWeight: 700, marginTop: '4px', color: 'var(--text-main)' }}>People</div></div>
       <div style={{ textAlign: 'center', color: '#34A853', display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Lightbulb size={24}/><div style={{ fontSize: '12px', fontWeight: 700, marginTop: '4px', color: 'var(--text-main)' }}>Innovation</div></div>
       <div style={{ textAlign: 'center', color: '#EA4335', display: 'flex', flexDirection: 'column', alignItems: 'center' }}><BarChart3 size={24}/><div style={{ fontSize: '12px', fontWeight: 700, marginTop: '4px', color: 'var(--text-main)' }}>Impact</div></div>
       <div style={{ textAlign: 'center', color: '#FBBC04', display: 'flex', flexDirection: 'column', alignItems: 'center' }}><TrendingUp size={24}/><div style={{ fontSize: '12px', fontWeight: 700, marginTop: '4px', color: 'var(--text-main)' }}>Growth</div></div>
    </div>
  </div>
);

/* =========================================================
   LIGHT THEME EXACT REPLICA: ASYMMETRIC DASHBOARD
========================================================= */

function LightAsymmetricDashboard({ onSelect }: { onSelect: (id: NavigationId) => void }) {
  return (
    <div className="dashboard-hub-container">
      {/* 1. Large Left Card: Innovation Wiki */}
      <div className="hub-hero-card">
        {/* Abstract pale-blue top curve */}
        <div className="hub-hero-blob-blue">
          <svg viewBox="0 0 200 200" width="100%" height="100%" preserveAspectRatio="none">
            <path d="M 0,0 L 200,0 L 200,200 C 130,200 60,130 0,60 Z" fill="#dbeafe" />
          </svg>
        </div>
        {/* Bottom-left green curve wave */}
        <div className="hub-hero-blob-green">
          <svg viewBox="0 0 200 200" width="100%" height="100%" preserveAspectRatio="none">
            <path d="M 0,200 L 0,0 C 0,80 80,200 200,200 Z" fill="#d1fae5" />
          </svg>
        </div>
        {/* Bottom-right subtle curve */}
        <div className="hub-hero-blob-soft">
          <svg viewBox="0 0 200 200" width="100%" height="100%" preserveAspectRatio="none">
            <path d="M 200,200 L 200,0 C 120,0 0,120 0,200 Z" fill="#e0f2fe" />
          </svg>
        </div>
        
        <div className="hub-hero-content">
          <div className="hub-hero-icon-container">
            {/* Pixel-Matched Google Multi-Color House Icon */}
            <svg viewBox="0 0 120 120" width="100%" height="100%" fill="none">
              <path d="M 60 26 L 18 60" stroke="#4285F4" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M 60 26 L 102 60" stroke="#EA4335" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M 32 60 V 96 A 4 4 0 0 0 36 100 H 48 A 4 4 0 0 0 52 96 V 76 A 8 8 0 0 1 68 76" stroke="#FBBC04" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M 68 76 V 96 A 4 4 0 0 0 72 100 H 84 A 4 4 0 0 0 88 96 V 60" stroke="#34A853" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>Innovation Wiki</h3>
          <p>Your central hub for<br/>knowledge, collaboration<br/>and innovation.</p>
          <button 
            type="button" 
            className="hub-hero-arrow" 
            onClick={() => onSelect('home')} 
            title="Explore Innovation Wiki"
            aria-label="Explore Innovation Wiki"
          >
            <ArrowRight size={22} color="white" strokeWidth={2.8} />
          </button>
        </div>
      </div>

      {/* 2. Right Grid Container (All 8 Application Cards Unified in Size) */}
      <div className="hub-grid-right">
        {solutions.map((s, index) => {
          // Top Left accent for Project Accelerate, Top Right for others based on typical layout rules
          const isTopLeftAccent = s.id === 'accelerate';
          return (
            <div key={s.id} className="hub-card" onClick={() => onSelect(s.id)}>
              {/* Colored Corner Decoration matching light image styling */}
              <div className={`hub-card-corner-accent ${isTopLeftAccent ? 'accent-top-left' : 'accent-top-right'}`} style={{ color: s.color }}>
                <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none">
                  <path d="M 0 0 H 100 V 100 C 100 44.77 55.23 0 0 0 Z" fill="currentColor" />
                </svg>
              </div>
              
              <div className="hub-card-content">
                <div className="hub-card-icon-wrap" style={{ color: s.color, backgroundColor: `${s.color}15` }}>
                  <s.icon size={36} strokeWidth={2.3} />
                </div>
                <h4>{s.name}</h4>
                <p>{s.subtitle}</p>
              </div>
              <div className="hub-card-arrow" style={{ backgroundColor: `${s.color}15`, color: s.color }}>
                <ArrowRight size={16} strokeWidth={3} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   SPLASH PUZZLE COMPONENT
========================================================= */

const GRID_SIZE = 4;
const TOTAL_PIECES = GRID_SIZE * GRID_SIZE;
const TILE_SIZE = 100; 
const INITIAL_PIECES = Array.from({ length: TOTAL_PIECES }, (_, i) => i);

function PuzzleSplash({ onComplete, onSkip }: { onComplete: () => void, onSkip: () => void }) {
  const [poolPieces, setPoolPieces] = useState<number[]>(() => 
    [...INITIAL_PIECES].sort(() => Math.random() - 0.5)
  );
  const [slots, setSlots] = useState<(number | null)[]>(Array(TOTAL_PIECES).fill(null));
  const [dragState, setDragState] = useState<{
    id: number | null;
    source: 'pool' | 'grid' | null;
    isDragging: boolean;
    x: number;
    y: number;
  }>({ id: null, source: null, isDragging: false, x: 0, y: 0 });

  const [isSolved, setIsSolved] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); 
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    if (isSolved || isFailed) return;
    if (timeLeft <= 0) { setIsFailed(true); return; }
    if (timeLeft <= 10 && timeLeft > 0) {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } catch (e) { console.error('Audio play failed', e); }
    }
    const timerId = setInterval(() => { setTimeLeft(prev => prev - 1); }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, isSolved, isFailed]);

  useEffect(() => {
    const isComplete = slots.every((piece, index) => piece === index);
    if (isComplete && !slots.includes(null)) { setIsSolved(true); }
  }, [slots]);

  const handleRetry = () => {
    setPoolPieces([...INITIAL_PIECES].sort(() => Math.random() - 0.5));
    setSlots(Array(TOTAL_PIECES).fill(null));
    setIsSolved(false); setIsFailed(false); setTimeLeft(120);
    setDragState({ id: null, source: null, isDragging: false, x: 0, y: 0 });
  };

  const handlePointerDown = (e: React.PointerEvent, pieceId: number, source: 'pool' | 'grid') => {
    if (isFailed || isSolved) return;
    const zoom = parseFloat(window.getComputedStyle(document.body).zoom || '1');
    setDragState({ id: pieceId, source, isDragging: true, x: (e.clientX / zoom) - (TILE_SIZE / 2), y: (e.clientY / zoom) - (TILE_SIZE / 2) });
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    if (source === 'pool') { setPoolPieces(prev => prev.filter(p => p !== pieceId)); } 
    else { setSlots(prev => { const newSlots = [...prev]; const slotIndex = newSlots.indexOf(pieceId); if (slotIndex !== -1) newSlots[slotIndex] = null; return newSlots; }); }
  };

  useEffect(() => {
    if (!dragState.isDragging) return;
    const handlePointerMove = (e: PointerEvent) => {
      const zoom = parseFloat(window.getComputedStyle(document.body).zoom || '1');
      setDragState(prev => ({ ...prev, x: (e.clientX / zoom) - (TILE_SIZE / 2), y: (e.clientY / zoom) - (TILE_SIZE / 2) }));
    };
    const handlePointerUp = (e: PointerEvent) => {
      const gridEl = document.getElementById('puzzle-grid');
      const zoom = parseFloat(window.getComputedStyle(document.body).zoom || '1');
      if (gridEl && dragState.id !== null) {
        const gridRect = gridEl.getBoundingClientRect();
        const gridLeft = gridRect.left / zoom;
        const gridTop = gridRect.top / zoom;
        const slotRow = Math.floor(dragState.id / GRID_SIZE);
        const slotCol = dragState.id % GRID_SIZE;
        const targetX = gridLeft + 12 + (slotCol * TILE_SIZE);
        const targetY = gridTop + 12 + (slotRow * TILE_SIZE);
        const pointerX = e.clientX / zoom;
        const pointerY = e.clientY / zoom;
        const slotCenterX = targetX + (TILE_SIZE / 2);
        const slotCenterY = targetY + (TILE_SIZE / 2);

        if (Math.abs(pointerX - slotCenterX) < 60 && Math.abs(pointerY - slotCenterY) < 60) {
          setSlots(prev => { const newSlots = [...prev]; newSlots[dragState.id!] = dragState.id; return newSlots; });
        } else {
          setPoolPieces(prev => [...prev, dragState.id!]);
        }
      }
      setDragState({ id: null, source: null, isDragging: false, x: 0, y: 0 });
    };
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => { window.removeEventListener('pointermove', handlePointerMove); window.removeEventListener('pointerup', handlePointerUp); };
  }, [dragState.isDragging, dragState.id]);

  const renderPuzzlePiece = (pieceId: number) => {
    const row = Math.floor(pieceId / GRID_SIZE);
    const col = pieceId % GRID_SIZE;
    return (
      <div style={{ width: '150px', height: '150px', position: 'absolute', top: '-25px', left: '-25px', overflow: 'visible', pointerEvents: 'none', clipPath: `url(#jigsaw-${pieceId})` }}>
        <div style={{ position: 'absolute', top: `${25 - (row * TILE_SIZE)}px`, left: `${25 - (col * TILE_SIZE)}px`, width: '400px', height: '400px' }}>
          <CodeGeneratedPuzzleArtwork />
        </div>
      </div>
    );
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
     <div style={{ minHeight: '100vh', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', fontFamily: 'system-ui, sans-serif', position: 'relative', zIndex: 10 }}>
      {dragState.isDragging && dragState.id !== null && (
        <div style={{ position: 'fixed', left: 0, top: 0, width: '100px', height: '100px', transform: `translate(${dragState.x}px, ${dragState.y}px) scale(1.05)`, zIndex: 9999, pointerEvents: 'none', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.25))' }}>
          {renderPuzzlePiece(dragState.id)}
        </div>
      )}

      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          {INITIAL_PIECES.map(id => {
            const r = Math.floor(id / 4); const c = id % 4; const even = (r + c) % 2 === 0;
            const top = r === 0 ? 0 : (even ? 1 : -1); const right = c === 3 ? 0 : (even ? 1 : -1);
            const bottom = r === 3 ? 0 : (even ? 1 : -1); const left = c === 0 ? 0 : (even ? 1 : -1);
            const path = `M 25,25 
              ${top === 0 ? 'L 125,25' : top === 1 ? 'L 60,25 C 60,0 90,0 90,25 L 125,25' : 'L 60,25 C 60,50 90,50 90,25 L 125,25'}
              ${right === 0 ? 'L 125,125' : right === 1 ? 'L 125,60 C 150,60 150,90 125,90 L 125,125' : 'L 125,60 C 100,60 100,90 125,90 L 125,125'}
              ${bottom === 0 ? 'L 25,125' : bottom === 1 ? 'L 90,125 C 90,150 60,150 60,125 L 25,125' : 'L 90,125 C 90,100 60,100 60,125 L 25,125'}
              ${left === 0 ? 'L 25,25' : left === 1 ? 'L 25,90 C 0,90 0,60 25,60 L 25,25' : 'L 25,90 C 50,90 50,60 25,60 L 25,25'} Z`;
            return ( <clipPath id={`jigsaw-${id}`} key={id} clipPathUnits="userSpaceOnUse"><path d={path} /></clipPath> );
          })}
        </defs>
      </svg>

      {!isSolved && (
        <>
          <div style={{ position: 'absolute', top: '30px', right: '40px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px', zIndex: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Target Design</span>
              <div style={{ width: '80px', height: '80px', borderRadius: '8px', border: '1px solid var(--border-main)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', backgroundColor: 'var(--bg-card)', position: 'relative' }}>
                <div style={{ transform: 'scale(0.2)', transformOrigin: 'top left', width: '400px', height: '400px' }}><CodeGeneratedPuzzleArtwork /></div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-main)', borderRadius: '8px', fontWeight: 'bold', fontSize: '18px', boxShadow: 'var(--shadow-sm)', color: '#ef4444' }}>
                <Clock size={20} />{formatTime(timeLeft)}
              </div>
              <button onClick={handleRetry} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--border-main)', background: 'var(--bg-card)', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s', boxShadow: 'var(--shadow-sm)' }}>Retry</button>
            </div>
          </div>
          <div style={{ position: 'fixed', bottom: '40px', left: '40px', zIndex: 50 }}>
            <button onClick={onSkip} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--border-main)', background: 'var(--bg-card)', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s', boxShadow: 'var(--shadow-sm)' }}>Skip Puzzle</button>
          </div>
        </>
      )}

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ color: 'var(--text-main)', margin: '0 0 12px', fontSize: '32px', fontWeight: 'bold' }}>Innovation Wiki Access</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '16px' }}>
          {isSolved ? 'Assembly complete. System unlocked.' : isFailed ? 'Time expired. Please try again.' : 'Drag the matching pieces into the grid to build the artwork and unlock the platform.'}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center' }}>
        
        {isSolved ? (
          <div style={{ 
            width: '400px', height: '400px', borderRadius: '12px', overflow: 'hidden', 
            border: '2px solid #34a853', boxShadow: '0 0 30px rgba(52, 168, 83, 0.4)',
            animation: 'fadeIn 0.5s ease'
          }}>
            <CodeGeneratedPuzzleArtwork />
          </div>
        ) : (
          <div id="puzzle-grid" style={{ 
              display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, ${TILE_SIZE}px)`, gridTemplateRows: `repeat(${GRID_SIZE}, ${TILE_SIZE}px)`, 
              gap: '0px', padding: '12px', background: 'var(--bg-card)', borderRadius: '16px', 
              boxShadow: isFailed ? '0 0 30px rgba(220, 38, 38, 0.4)' : 'var(--shadow-sm)', 
              border: `2px solid ${isFailed ? '#ef4444' : 'var(--border-main)'}`, transition: 'all 0.5s ease', position: 'relative'
            }}>
            {slots.map((pieceId, index) => (
              <div key={index} style={{ width: `${TILE_SIZE}px`, height: `${TILE_SIZE}px`, position: 'relative', border: pieceId === null ? '1px dashed var(--border-main)' : 'none', borderRadius: '6px' }}>
                {pieceId !== null && ( <div onPointerDown={(e) => handlePointerDown(e, pieceId, 'grid')} style={{ width: '100%', height: '100%', cursor: 'grab', zIndex: 2 }}>{renderPuzzlePiece(pieceId)}</div> )}
              </div>
            ))}
          </div>
        )}

        <div className="puzzle-pool" style={{ width: '500px', height: isSolved ? '400px' : '428px', boxSizing: 'border-box', overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column', padding: '24px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-main)' }}>
          {isSolved ? (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.5s ease' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(52, 168, 83, 0.2)', color: '#34A853', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <ShieldCheck size={32} />
              </div>
              <h3 style={{ margin: '0 0 20px', color: 'var(--text-main)', fontWeight: 'bold' }}>Verification Successful</h3>
              <button onClick={onComplete} style={{ padding: '14px 32px', borderRadius: '8px', border: 'none', background: '#1a73e8', color: 'white', fontSize: '15px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(26, 115, 232, 0.3)' }}>
                Enter Innovation Wiki
              </button>
            </div>
          ) : isFailed ? (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.5s ease' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <X size={32} />
              </div>
              <h3 style={{ margin: '0 0 12px', color: 'var(--text-main)' }}>Time's Up!</h3>
              <p style={{ margin: '0 0 20px', color: 'var(--text-secondary)', textAlign: 'center' }}>You ran out of time to complete the puzzle.</p>
              <button onClick={handleRetry} style={{ padding: '14px 28px', borderRadius: '8px', border: 'none', background: '#ef4444', color: 'white', fontSize: '16px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)' }}>Try Again</button>
            </div>
          ) : (
            <>
              <h3 style={{ margin: '0 0 24px', fontSize: '18px', color: 'var(--text-main)', textAlign: 'center' }}>Drag Pieces to the Board</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px 20px', justifyItems: 'center', paddingBottom: '20px' }}>
                {poolPieces.map(pieceId => (
                  <div key={pieceId} style={{ width: '100px', height: '100px', position: 'relative' }}>
                    <div onPointerDown={(e) => handlePointerDown(e, pieceId, 'pool')} style={{ width: '100%', height: '100%', cursor: 'grab', zIndex: 1, touchAction: 'none' }}>
                      {renderPuzzlePiece(pieceId)}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
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
  const [isPuzzleCompleted, setIsPuzzleCompleted] = useState(false);
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
        background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: 'var(--shadow-sm)', cursor: 'pointer', color: 'var(--text-main)',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)'
      }}
    >
      {theme === 'light' ? <Moon size={22} color="#1a73e8" /> : <Sun size={22} color="#FBBC04" />}
    </button>
  );

  if (!isPuzzleCompleted) {
    return (
      <div className={`app no-sidebar-app ${theme}`}>
        <GlobalThemeStyles />
        <ThemeToggle />
        <PuzzleSplash onComplete={() => setIsPuzzleCompleted(true)} onSkip={() => setIsPuzzleCompleted(true)} />
      </div>
    );
  }

  return (
    <div className={`app no-sidebar-app ${theme}`}>
      <GlobalThemeStyles />
      <ThemeToggle />
      
      {/* GLOBAL LIGHT BACKGROUND WAVES AND GLOW */}
      <div className="global-bg-waves" aria-hidden="true">
        <div className="global-pale-center-glow"></div>
      </div>

      <main className="main no-sidebar-main" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* HEADER: Light Theme Replica */}
        <header className="image-replica-header">
          <div className="header-left">
            <span className="gcp-brand">
              <span className="gcp-blue">G</span>
              <span className="gcp-red">C</span>
              <span className="gcp-green">P</span>
            </span>
            <h1 className="header-title">Tech Transformation Solutions</h1>
          </div>

          <div className="header-right">
            <div className="google-dots-row">
              <span className="dot dot-blue"></span>
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>

            <div className="header-pillars">
              <span>Stronger People</span>
              <span className="pillar-sep">|</span>
              <span>Smarter Operations</span>
              <span className="pillar-sep">|</span>
              <span>Better Customer Experiences</span>
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
        <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
          {selectedSolution === 'dashboard' ? (
            /* First Page View: Only Cards Are Shown (No Scroll Topbar) */
            <LightAsymmetricDashboard onSelect={openSolution} />
          ) : (
            /* Selected View: Isolated Detail View with Back Button */
            <div className="page-content main-page-content" style={{ padding: '24px 50px' }}>
              <div style={{ marginBottom: '24px' }}>
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
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'background 0.2s'
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

        {/* FOOTER: Light Theme Replica */}
        <footer className="image-replica-footer">
          <div className="footer-left">
            <svg width="26" height="26" viewBox="0 0 40 40" fill="none" style={{ flexShrink: 0 }}>
              <path d="M 28 30 H 12 A 7 7 0 0 1 12 16 A 8 8 0 0 1 17 14 A 10 10 0 0 1 33 21 A 7 7 0 0 1 28 30 Z" fill="none" stroke="#EA4335" strokeWidth="3" />
              <path d="M 12 30 H 28" stroke="#4285F4" strokeWidth="4" strokeLinecap="round" />
              <path d="M 12 22 A 6 6 0 0 1 18 16" stroke="#FBBC04" strokeWidth="4" strokeLinecap="round" />
              <path d="M 18 16 A 9 9 0 0 1 30 22" stroke="#34A853" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <span className="footer-motto">Build &nbsp;·&nbsp; Transform &nbsp;·&nbsp; Scale</span>
          </div>

          <div className="footer-center-bar-container">
            <div className="footer-center-bar">
              <span className="bar-seg bar-blue"></span>
              <span className="bar-seg bar-red"></span>
              <span className="bar-seg bar-yellow"></span>
              <span className="bar-seg bar-green"></span>
            </div>
          </div>

          <div className="footer-right-matrix" aria-hidden="true">
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
            <div className="solution-header-icon" style={{ color: '#ffffff', backgroundColor: platform.color, boxShadow: `0 0 15px ${platform.color}60` }}>
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
          {activeSection === 'benefits' && <Benefits benefits={content.benefits as BenefitItem[]} platformColor={platform.color} />}
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

function Benefits({ benefits, platformColor }: { benefits: BenefitItem[], platformColor: string }) {
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
                <div className="benefit-badge" style={{ backgroundColor: `${platformColor}20`, color: platformColor }}>{String(index + 1).padStart(2, '0')}</div>
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
