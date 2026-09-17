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
  Rocket
} from 'lucide-react';

import puzzleBg from './background.jpeg';
import bgImage from './background.jpeg';
import gcpGif from './gcp.gif';

/* =========================================================
   TYPES
========================================================= */

type SolutionId = 'core' | 'elevate' | 'sme' | 'accelerate';
type NavigationId = 'home' | SolutionId;
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

      @keyframes themePulse {
        0% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.6); }
        70% { box-shadow: 0 0 0 12px rgba(66, 133, 244, 0); }
        100% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0); }
      }

      .premium-hero {
        min-height: 90px !important;
        padding: 12px 40px !important;
      }
      
      .dark .app, 
      .dark .no-sidebar-app, 
      .dark .main-page-content,
      .dark .platform-card-row,
      .dark .premium-hero { 
       background-color: transparent !important; 
       background: transparent !important;
       border-bottom-color: var(--border-main) !important;
      }
      .dark .puzzle-piece,
      .dark .puzzle-slot-empty,
      .dark .puzzle-pool {
      background-color: transparent !important;
      }

      .dark .app, .dark .no-sidebar-app, .dark .main-page-content { background-color: transparent !important; }
      .dark .platform-card-row { background-color: transparent !important; border-bottom-color: var(--border-main) !important; }
      .dark .platform-card { background: var(--bg-card) !important; border-color: var(--border-main) !important; color: var(--text-main) !important; box-shadow: var(--shadow-sm) !important; }
      .dark .platform-copy h3 { color: var(--text-main) !important; }
      .dark .platform-copy p { color: var(--text-secondary) !important; }
      .dark .platform-arrow { color: var(--text-main) !important; }
      .dark .upgraded-footer { background: var(--bg-card) !important; border-top-color: var(--border-main) !important; color: var(--text-muted) !important; }
      .dark .footer-left strong { color: var(--text-main) !important; }
      
      .dark .wiki-home { background: var(--bg-card) !important; border-color: var(--border-main) !important; }
      .dark .wiki-home-heading h2 { color: var(--text-main) !important; }
      .dark .wiki-home-heading p { color: var(--text-secondary) !important; }
      .dark .wiki-table th { color: var(--text-main) !important; border-color: var(--border-main) !important; background: var(--bg-hover) !important; }
      .dark .wiki-table td { background: var(--bg-card) !important; color: var(--text-secondary) !important; border-color: var(--border-main) !important; }
      .dark .table-section-cell strong { color: var(--text-main) !important; }
      
      .dark .solution-page { background: var(--bg-card) !important; border-color: var(--border-main) !important; }
      .dark .solution-header { border-bottom-color: var(--border-main) !important; }
      .dark .solution-header h2 { color: var(--text-main) !important; }
      .dark .solution-header p, .dark .header-sub { color: var(--text-secondary) !important; }
      
      .dark .solution-tabs { background: var(--bg-card) !important; border-right-color: var(--border-main) !important; }
      .dark .solution-tabs button { color: var(--text-secondary) !important; }
      .dark .solution-tabs button:hover { background: var(--bg-hover) !important; }
      .dark .solution-tabs button.active { background: var(--bg-hover) !important; color: var(--text-main) !important; }
      
      .dark .premium-title { color: var(--text-main) !important; }
      .dark .outcome-item { color: var(--text-main) !important; }
      .dark .breadcrumbs { color: var(--text-muted) !important; }

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

      /* Pool Scrollbar Customization */
      .puzzle-pool::-webkit-scrollbar {
        width: 8px;
      }
      .puzzle-pool::-webkit-scrollbar-track {
        background: transparent;
      }
      .puzzle-pool::-webkit-scrollbar-thumb {
        background-color: var(--border-main);
        border-radius: 10px;
      }
    `}</style>
  );
}

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
 <div style={{ width: '400px', height: '400px', background: `url(${puzzleBg}) center/cover no-repeat`, position: 'relative', boxSizing: 'border-box', overflow: 'hidden' }}>
    
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
   TOP PLATFORM NAVIGATION & CONTENT DATA
========================================================= */

const solutions = [
  { id: 'home' as NavigationId, name: 'Innovation Wiki', subtitle: 'Overview & Knowledge Hub', icon: Home, color: '#1a73e8' },
  { id: 'core' as NavigationId, name: 'C.O.R.E.', subtitle: 'Talent Acquisition & Readiness', icon: Target, color: '#1967d2' },
  { id: 'elevate' as NavigationId, name: 'Elevate360', subtitle: 'Operational Governance', icon: BarChart3, color: '#16a34a' },
  { id: 'sme' as NavigationId, name: 'Digital SME', subtitle: 'Real-Time Case Execution', icon: Bot, color: '#7c3aed' },
  { id: 'accelerate' as NavigationId, name: 'Project Accelerate', subtitle: 'Customer Experience & Risk Control', icon: Zap, color: '#f59e0b' },
];

const FEEDBACK_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf0zu4Q-0kTjP03BLKMIPfQLePmL0P3xyAaaWr5COiuTGKqlA/viewform?usp=publish-editor';

const defaultPOCs = [
  { name: 'Harisankar PN', ldap: 'harisankar@xwf.google.com' },
  { name: 'Prashanth Kattanguri', ldap: 'kattanguri@xwf.google.com' }
];

const solutionContent = {
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
      metrics: [
        { label: 'Assessments Completed', value: '3,850+', change: '+24% this quarter' },
        { label: 'Active Evaluators', value: '185+', change: 'Global coverage' },
        { label: 'Adoption Rate', value: '92.4%', change: 'Across hiring loops' },
        { label: 'Ramp-up Reduction', value: '-35%', change: 'Days to Day-1 readiness' }
      ],
      highlights: [
        { title: 'Hiring Pipeline Integration', description: 'Over 92% of candidate evaluations for Tier-1 and Tier-2 technical support roles are now conducted through standardized C.O.R.E. sandboxes.', badge: 'High Adoption' },
        { title: 'Automated Skill Gap Remediation', description: 'Assessed candidates receive automated custom training paths targeted specifically to capability gaps identified during live simulation.', badge: 'Automated' },
        { title: 'Evaluation Consistency', description: 'Subjective interviewer variance dropped by 42% across regional evaluation boards following the rollout of automated rubric grading.', badge: 'Benchmark' }
      ]
    },
    impact: {
      title: 'Improved Talent Readiness',
      description: 'Enables consistent, hands-on assessment of technical skills, helping identify capability gaps and improve workforce readiness.',
      metrics: [
        { icon: Users, title: 'Talent Readiness', subtitle: 'Build job-ready skills' },
        { icon: BarChart, title: 'Skill Gap Visibility', subtitle: 'Identify and address gaps' },
        { icon: Settings, title: 'Consistent Evaluation', subtitle: 'Standardized assessments' }
      ]
    },
    access: 'https://stack-cognizant.web.app/login',
    poc: defaultPOCs,
    feedback: FEEDBACK_URL,
    demo: '',
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
      description: 'Operational processes are often fragmented across teams and tools, leading to lack of visibility, inconsistent practices and delays in decision-making. This makes it difficult to proactively identify issues, ensure accountability and drive continuous improvement.',
      cards: [
        { title: 'Fragmented Operations', description: 'Data and workflows are spread across multiple tools and teams.', icon: Layers, color: '#fdf2f8', iconBg: '#fce7f3', iconColor: '#db2777' },
        { title: 'Limited Real-time Visibility', description: 'Difficult to get a unified view of ongoing operations and risks.', icon: Eye, color: '#eff6ff', iconBg: '#dbeafe', iconColor: '#2563eb' },
        { title: 'Inconsistent Processes', description: 'Variations in practices lead to delays, inefficiencies and compliance gaps.', icon: Network, color: '#f5f3ff', iconBg: '#ede9fe', iconColor: '#7c3aed' }
      ],
      callout: 'A unified and transparent operational governance model is essential to improve efficiency, accountability and enable data-driven decisions.',
      transition: 'This gap led to Elevate360 — a centralized operational governance platform designed to bring transparency, standardization and continuous improvement across teams.',
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
      metrics: [
        { label: 'TSR Coverage', value: '94.8%', change: 'Across regional teams' },
        { label: 'Active Leaders', value: '320+', change: '+18% MoM engagement' },
        { label: 'Coaching Plans Executed', value: '1,420+', change: 'Monthly active cycles' },
        { label: 'Reporting Hours Saved', value: '450 hrs', change: 'Per month automated' }
      ],
      highlights: [
        { title: 'Balanced Scorecard Governance', description: 'Comprehensive operational telemetry benchmarking Technical Support Representatives (TSRs) across productivity, quality, and SLA adherence.', badge: 'Full Visibility' },
        { title: 'Fast Root-Cause Attribution', description: 'Over 85% of performance anomalies identified by Elevate360 are diagnosed down to specific training or workflow bottlenecks within 24 hours.', badge: 'Operational AI' },
        { title: 'Managerial Effectiveness', description: 'Front-line managers report a 60% reduction in manual spreadsheet prep, pivoting weekly 1-on-1s directly toward prescriptive action plans.', badge: 'Efficiency' }
      ]
    },
    impact: {
      title: 'Stronger Operational Governance',
      description: 'Improves visibility, standardization and governance across operations, enabling more informed decisions and consistent execution.',
      metrics: [
        { icon: Eye, title: 'Operational Visibility', subtitle: 'End-to-end transparency' },
        { icon: Network, title: 'Standardized Governance', subtitle: 'Consistent processes' },
        { icon: BarChart3, title: 'Better Decisions', subtitle: 'Data-driven outcomes' }
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
      'Free high-cost senior talent from repetitive operational questions to focus on high-impact initiatives.',
      'Provide live architectural reviews and automated root-cause analysis.'
    ],
    audience: 'Tier-1 and Tier-2 engineers, front-line agents, and senior subject matter experts (vSMEs).',
    metadata: { type: 'Virtual AI Tier', users: 'Support Engineers & Front-Line Agents', domain: 'Real-Time Case Execution', status: 'Active' },
    problem: {
      description: 'Accessing the right expertise at the right time is often challenging. Valuable knowledge is scattered across documents, individuals and systems, making it difficult for teams to get quick, accurate and consistent answers.',
      cards: [
        { title: 'Scattered Knowledge', description: 'Information is spread across multiple sources and hard to find when needed.', icon: FileText, color: '#fdf2f8', iconBg: '#fce7f3', iconColor: '#db2777' },
        { title: 'Dependency on Individuals', description: 'Teams rely on specific SMEs, leading to delays and knowledge bottlenecks.', icon: Clock, color: '#eff6ff', iconBg: '#dbeafe', iconColor: '#2563eb' },
        { title: 'Inconsistent Answers', description: 'Different interpretations can lead to varied responses and confusion.', icon: Users, color: '#f5f3ff', iconBg: '#ede9fe', iconColor: '#7c3aed' }
      ],
      callout: 'Teams need quick, reliable and consistent access to expertise to improve productivity, reduce rework and make informed decisions.',
      transition: 'This gap led to Digital SME — an AI-powered platform designed to democratize expertise, provide trusted answers and enable faster, smarter decision-making.',
      tagline: 'Know More. Do More.'
    },
    solution: {
      description: 'Digital SME leverages AI to capture, organize and deliver trusted knowledge, enabling teams to get quick, accurate and consistent answers from enterprise expertise.',
      cards: [
        { title: 'Centralized Knowledge', description: 'Brings together expert insights, documents and best practices in one place.', icon: BookOpen, color: '#f5f3ff', iconBg: '#ede9fe', iconColor: '#7c3aed' },
        { title: 'Instant, Trusted Answers', description: 'AI-powered search and recommendations for quick, accurate and relevant responses.', icon: MessageSquare, color: '#eff6ff', iconBg: '#dbeafe', iconColor: '#2563eb' },
        { title: 'Scalable Expertise', description: 'Makes organizational knowledge accessible to everyone, reducing dependency on individual experts.', icon: Users, color: '#fdf2f8', iconBg: '#fce7f3', iconColor: '#db2777' }
      ],
      calloutIcon: Lightbulb,
      callout: 'Empowers teams with the right knowledge at the right time, improving productivity and decision-making.',
      transition: 'Digital SME democratizes expertise, enabling faster, smarter and more consistent decisions across the organization.',
      tagline: 'Know More. Do More.'
    },
    benefits: [
      { title: 'Compressed MTTR', description: 'Junior engineers resolve complex issues autonomously without queuing for senior intervention.' },
      { title: 'Consistent Guidance', description: 'Ensures uniform, verified troubleshooting procedures across every global shift.' },
      { title: 'Expert Offloading', description: 'Frees high-cost senior talent from repetitive operational questions to focus on high-impact initiatives.' },
      { title: '24/7 Engineering Assistance', description: 'Delivers continuous on-demand technical support, real-time ticket summarization, and automated root-cause discovery.' }
    ],
    usage: {
      description: 'Digital SME operates 24/7 across global support shifts, handling complex query resolution, architectural validation, and automated RCA summarization.',
      metrics: [
        { label: 'Active Support Engineers', value: '2,150+', change: 'Daily active users' },
        { label: 'Troubleshooting Sessions', value: '52,400+', change: '+38% MoM volume' },
        { label: 'Autonomous Resolution', value: '76.8%', change: 'Without senior SME queue' },
        { label: 'MTTR Compression', value: '-34%', change: 'Average resolution time' }
      ],
      highlights: [
        { title: 'Senior SME Bandwidth Reclaimed', description: 'Senior Subject Matter Experts reclaimed an estimated 3,800 engineering hours per quarter previously consumed by repetitive triage questions.', badge: 'High Impact' },
        { title: 'Strict Technical Grounding', description: '100% of AI-generated answers are grounded directly in approved GCP technical documentation and customer-validated post-mortems.', badge: 'Grounded' },
        { title: 'Global Shift Uniformity', description: 'Standardized troubleshooting playbooks executed consistently across US, EMEA, and APAC shifts, eliminating regional procedural variance.', badge: 'Standardized' }
      ]
    },
    impact: {
      title: 'Faster Case Resolution',
      description: 'Provides real-time guidance and SME support during case execution, helping reduce dependency, improve accuracy and accelerate resolution.',
      metrics: [
        { icon: Zap, title: 'Faster Resolution', subtitle: 'Reduced turnaround time' },
        { icon: Users, title: 'Real-Time Guidance', subtitle: 'On-demand SME support' },
        { title: 'Improved Accuracy', subtitle: 'Reliable and consistent results', icon: Target }
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
      'Enforce automated, cascading alerting so handoffs between global shifts remain seamless and reliable.',
      'Coordinate Follow-the-Sun handoffs via Workload Management (WLM).'
    ],
    audience: 'Global support teams, escalation managers, and operational leaders.',
    metadata: { type: 'Escalation Radar', users: 'Support Teams & Escalation Managers', domain: 'Customer Experience & Risk Control', status: 'Active' },
    problem: {
      description: 'Customers expect faster, seamless and personalized experiences, while organizations face increasing risks from operational, compliance and security challenges. Manual processes and disconnected systems make it difficult to deliver consistent experiences and proactively manage risks.',
      cards: [
        { title: 'Rising Customer Expectations', description: 'Customers expect faster, seamless and personalized experiences.', icon: UserPlus, color: '#fdf2f8', iconBg: '#fce7f3', iconColor: '#db2777' },
        { title: 'Operational & Compliance Risks', description: 'Increasing risks from process gaps, compliance and security challenges.', icon: ShieldAlert, color: '#eff6ff', iconBg: '#dbeafe', iconColor: '#2563eb' },
        { title: 'Disconnected Systems', description: 'Siloed tools and data make it hard to get a unified view of customer journeys and risks.', icon: Unlink, color: '#f5f3ff', iconBg: '#ede9fe', iconColor: '#7c3aed' }
      ],
      callout: 'Delivering exceptional customer experiences while effectively managing risks is critical for business growth, trust and long-term success.',
      transition: 'This gap led to Project Accelerate — a unified platform designed to enhance customer experiences, strengthen risk control and drive sustainable business impact.',
      tagline: 'Faster. Safer. Stronger.'
    },
    solution: {
      description: 'Project Accelerate provides a unified platform to deliver faster, seamless and personalized customer experiences while proactively identifying and managing operational, compliance and security risks.',
      cards: [
        { title: 'Enhanced Customer Experience', description: 'Streamlines processes to deliver faster, more seamless and personalized experiences.', icon: UserCheck, color: '#fff7ed', iconBg: '#ffedd5', iconColor: '#ea580c' },
        { title: 'Proactive Risk Management', description: 'Identifies and mitigates operational, compliance and security risks early.', icon: ShieldCheck, color: '#fef2f2', iconBg: '#fee2e2', iconColor: '#dc2626' },
        { title: 'End-to-End Visibility', description: 'Provides a unified view across customer journeys, systems and risks.', icon: Eye, color: '#f5f3ff', iconBg: '#ede9fe', iconColor: '#7c3aed' }
      ],
      calloutIcon: Zap,
      callout: 'Builds trust, ensures compliance and drives sustainable business growth through a better customer experience.',
      transition: 'Project Accelerate connects customer experience and risk control, enabling a safer, faster and stronger future-ready organization.',
      tagline: 'Faster. Safer. Stronger.'
    },
    benefits: [
      { title: 'Proactive Risk Mitigation', description: 'Identifies simmering customer frustration to trigger interventions before formal escalations occur.' },
      { title: 'Dynamic Case Prioritization', description: 'Continuously re-indexes tickets based on live sentiment and business risk rather than day-one tags.' },
      { title: 'Continuous Operational Continuity', description: 'Enforces automated, cascading alerting so handoffs between global shifts remain seamless and reliable.' },
      { title: 'Improved Customer Experience', description: 'Delivers faster, seamless, and personalized experiences by preventing critical cases from languishing in the silence gap.' }
    ],
    usage: {
      description: 'Project Accelerate actively monitors case streams around the clock, providing real-time sentiment telemetry and coordinating seamless Follow-the-Sun workload transfers.',
      metrics: [
        { label: 'Cases Monitored 24/7', value: '140,000+', change: 'Continuous real-time stream' },
        { label: 'Early Risk Signals Detected', value: '3,820', change: 'Flagged before escalation' },
        { label: 'Escalation Prevention Rate', value: '89.2%', change: '+14% improvement' },
        { label: 'Handoff Accuracy', value: '99.6%', change: 'Across global shifts' }
      ],
      highlights: [
        { title: 'Silence Gap Elimination', description: 'Real-time tone and anxiety analysis identifies languishing cases, automatically elevating operational priority before formal customer dissatisfaction occurs.', badge: 'Proactive' },
        { title: 'Dynamic Workload Re-Indexing', description: 'Cases are continuously re-ranked based on evolving business risks rather than static day-one tags, preventing critical bottlenecks.', badge: 'Dynamic Priority' },
        { title: 'Seamless Global Shift Handoffs', description: 'Automated cascading alerts and synthesized handover notes ensure zero information drop during APAC to EMEA to US transitions.', badge: '24/7 Continuity' }
      ]
    },
    impact: {
      title: 'Improved Customer Experience',
      description: 'Strengthens execution and risk control to improve service consistency, reduce operational friction and deliver better customer outcomes.',
      metrics: [
        { icon: UserCheck, title: 'Enhanced Customer Experience', subtitle: 'More consistent service' },
        { icon: ShieldCheck, title: 'Risk Reduction', subtitle: 'Proactive risk control' },
        { icon: Rocket, title: 'Execution Efficiency', subtitle: 'Faster, smoother delivery' }
      ]
    },
    access: 'http://go/incrupaccelerator',
    poc: defaultPOCs,
    feedback: FEEDBACK_URL,
    demo: '',
  },
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

    if (timeLeft <= 0) {
      setIsFailed(true);
      return;
    }

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
      } catch (e) {
        console.error('Audio play failed', e);
      }
    }

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, isSolved, isFailed]);

  useEffect(() => {
    const isComplete = slots.every((piece, index) => piece === index);
    if (isComplete && !slots.includes(null)) {
      setIsSolved(true);
    }
  }, [slots]);

  const handleRetry = () => {
    setPoolPieces([...INITIAL_PIECES].sort(() => Math.random() - 0.5));
    setSlots(Array(TOTAL_PIECES).fill(null));
    setIsSolved(false);
    setIsFailed(false);
    setTimeLeft(120);
    setDragState({ id: null, source: null, isDragging: false, x: 0, y: 0 });
  };

  const handlePointerDown = (e: React.PointerEvent, pieceId: number, source: 'pool' | 'grid') => {
    if (isFailed || isSolved) return;
    
    const zoom = parseFloat(window.getComputedStyle(document.body).zoom || '1');
    
    setDragState({
      id: pieceId,
      source,
      isDragging: true,
      x: (e.clientX / zoom) - (TILE_SIZE / 2),
      y: (e.clientY / zoom) - (TILE_SIZE / 2),
    });
    
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    if (source === 'pool') {
      setPoolPieces(prev => prev.filter(p => p !== pieceId));
    } else {
      setSlots(prev => {
        const newSlots = [...prev];
        const slotIndex = newSlots.indexOf(pieceId);
        if (slotIndex !== -1) newSlots[slotIndex] = null;
        return newSlots;
      });
    }
  };

  useEffect(() => {
    if (!dragState.isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      const zoom = parseFloat(window.getComputedStyle(document.body).zoom || '1');
      setDragState(prev => ({
        ...prev,
        x: (e.clientX / zoom) - (TILE_SIZE / 2),
        y: (e.clientY / zoom) - (TILE_SIZE / 2)
      }));
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
          setSlots(prev => {
            const newSlots = [...prev];
            newSlots[dragState.id!] = dragState.id;
            return newSlots;
          });
        } else {
          setPoolPieces(prev => [...prev, dragState.id!]);
        }
      }
      setDragState({ id: null, source: null, isDragging: false, x: 0, y: 0 });
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [dragState.isDragging, dragState.id]);

  const renderPuzzlePiece = (pieceId: number) => {
    const row = Math.floor(pieceId / GRID_SIZE);
    const col = pieceId % GRID_SIZE;
    
    return (
      <div style={{ 
        width: '150px', height: '150px', position: 'absolute',
        top: '-25px', left: '-25px',
        overflow: 'visible', pointerEvents: 'none',
        clipPath: `url(#jigsaw-${pieceId})` 
      }}>
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
     <div style={{ minHeight: '100vh', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', fontFamily: 'system-ui, sans-serif', position: 'relative' }}>
        {dragState.isDragging && dragState.id !== null && (
        <div style={{
          position: 'fixed',
          left: 0, top: 0,
          width: '100px', height: '100px',
          transform: `translate(${dragState.x}px, ${dragState.y}px) scale(1.05)`,
          zIndex: 9999,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.25))'
        }}>
          {renderPuzzlePiece(dragState.id)}
        </div>
      )}

      {/* FIXED MATHEMATICAL JIGSAW SVG PATHS */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          {INITIAL_PIECES.map(id => {
            const r = Math.floor(id / 4);
            const c = id % 4;
            
            // Corrected Mathematical Interlocking Formula:
            // Adjacent edges now perfectly oppose each other via parity check.
            const even = (r + c) % 2 === 0;
            
            const top = r === 0 ? 0 : (even ? 1 : -1);
            const right = c === 3 ? 0 : (even ? 1 : -1);
            const bottom = r === 3 ? 0 : (even ? 1 : -1);
            const left = c === 0 ? 0 : (even ? 1 : -1);
            
            const path = `M 25,25 
              ${top === 0 ? 'L 125,25' : top === 1 ? 'L 60,25 C 60,0 90,0 90,25 L 125,25' : 'L 60,25 C 60,50 90,50 90,25 L 125,25'}
              ${right === 0 ? 'L 125,125' : right === 1 ? 'L 125,60 C 150,60 150,90 125,90 L 125,125' : 'L 125,60 C 100,60 100,90 125,90 L 125,125'}
              ${bottom === 0 ? 'L 25,125' : bottom === 1 ? 'L 90,125 C 90,150 60,150 60,125 L 25,125' : 'L 90,125 C 90,100 60,100 60,125 L 25,125'}
              ${left === 0 ? 'L 25,25' : left === 1 ? 'L 25,90 C 0,90 0,60 25,60 L 25,25' : 'L 25,90 C 50,90 50,60 25,60 L 25,25'} Z`;

            return (
              <clipPath id={`jigsaw-${id}`} key={id} clipPathUnits="userSpaceOnUse">
                <path d={path} />
              </clipPath>
            );
          })}
        </defs>
      </svg>

      <div style={{ position: 'absolute', top: '30px', right: '40px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px', zIndex: 10 }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Target Design
          </span>
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '8px', 
            border: '1px solid var(--border-main)', overflow: 'hidden', 
            boxShadow: 'var(--shadow-sm)', backgroundColor: 'var(--bg-card)', position: 'relative'
          }}>
            <div style={{ transform: 'scale(0.2)', transformOrigin: 'top left', width: '400px', height: '400px' }}>
              <CodeGeneratedPuzzleArtwork />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', 
            background: 'var(--bg-card)', border: '1px solid var(--border-main)', 
            borderRadius: '8px', fontWeight: 'bold', fontSize: '18px', 
            boxShadow: 'var(--shadow-sm)', color: '#dc2626'
          }}>
            <Clock size={20} />
            {formatTime(timeLeft)}
          </div>
          <button 
            onClick={handleRetry} 
            style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--border-main)', background: 'var(--bg-card)', color: 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s', boxShadow: 'var(--shadow-sm)' }}
          >
            Retry
          </button>
        </div>

      </div>
       
     <div style={{ position: 'fixed', bottom: '40px', left: '40px', zIndex: 50 }}>
  <button 
    onClick={onSkip} 
    style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--border-main)', background: 'var(--bg-card)', color: 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s', boxShadow: 'var(--shadow-sm)' }}
  >
    Skip Puzzle
  </button>
</div>

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ color: 'var(--text-main)', margin: '0 0 12px', fontSize: '32px' }}>Innovation Wiki Access</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '16px' }}>
          {isSolved ? 'Assembly complete. System unlocked.' : isFailed ? 'Time expired. Please try again.' : 'Drag the matching pieces into the grid to build the artwork and unlock the platform.'}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center' }}>
        
        <div 
          id="puzzle-grid"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${TILE_SIZE}px)`, 
            gridTemplateRows: `repeat(${GRID_SIZE}, ${TILE_SIZE}px)`, 
            gap: '0px', 
            padding: '12px', 
            background: 'var(--bg-card)', 
            borderRadius: '16px', 
            boxShadow: isSolved ? '0 0 30px rgba(52, 168, 83, 0.4)' : isFailed ? '0 0 30px rgba(220, 38, 38, 0.4)' : 'var(--shadow-sm)', 
            border: `2px solid ${isSolved ? '#34a853' : isFailed ? '#dc2626' : 'var(--border-main)'}`,
            transition: 'all 0.5s ease',
            position: 'relative'
          }}
        >
          {slots.map((pieceId, index) => (
            <div 
              key={index}
              style={{ 
                width: `${TILE_SIZE}px`, 
                height: `${TILE_SIZE}px`, 
                position: 'relative',
                border: pieceId === null ? '1px dashed var(--border-main)' : 'none',
                borderRadius: '6px'
              }}
            >
              {pieceId !== null && (
                <div 
                  onPointerDown={(e) => handlePointerDown(e, pieceId, 'grid')}
                  style={{ width: '100%', height: '100%', cursor: 'grab', zIndex: 2 }}
                >
                  {renderPuzzlePiece(pieceId)}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="puzzle-pool" style={{ 
        width: '500px', height: '428px', boxSizing: 'border-box',
         overflowY: 'auto', overflowX: 'hidden',
        display: 'flex', flexDirection: 'column', 
        padding: '24px', background: 'var(--bg-card)', 
         borderRadius: '16px', border: '1px solid var(--border-main)' 
      }}>
          {isSolved ? (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.5s ease' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <ShieldCheck size={32} />
              </div>
              <h3 style={{ margin: '0 0 20px', color: 'var(--text-main)' }}>Verification Successful</h3>
              <button 
                onClick={onComplete}
                style={{ padding: '14px 28px', borderRadius: '8px', border: 'none', background: '#1a73e8', color: 'white', fontSize: '16px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(26, 115, 232, 0.3)' }}
              >
                Enter Innovation Wiki
              </button>
            </div>
          ) : isFailed ? (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.5s ease' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <X size={32} />
              </div>
              <h3 style={{ margin: '0 0 12px', color: 'var(--text-main)' }}>Time's Up!</h3>
              <p style={{ margin: '0 0 20px', color: 'var(--text-secondary)', textAlign: 'center' }}>You ran out of time to complete the puzzle.</p>
              <button 
                onClick={handleRetry}
                style={{ padding: '14px 28px', borderRadius: '8px', border: 'none', background: '#dc2626', color: 'white', fontSize: '16px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)' }}
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <h3 style={{ margin: '0 0 24px', fontSize: '18px', color: 'var(--text-main)', textAlign: 'center' }}>Drag Pieces to the Board</h3>
              <div style={{ 
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px 20px', justifyItems: 'center', paddingBottom: '20px' 
              }}>
                {poolPieces.map(pieceId => (
                  <div 
                    key={pieceId}
                    style={{ width: '100px', height: '100px', position: 'relative' }}
                  >
                    <div 
                      onPointerDown={(e) => handlePointerDown(e, pieceId, 'pool')}
                      style={{ 
                        width: '100%', height: '100%', 
                        cursor: 'grab', zIndex: 1, touchAction: 'none'
                      }}
                    >
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
   MAIN APP WITH THEME PROVIDER
========================================================= */

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isPuzzleCompleted, setIsPuzzleCompleted] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<NavigationId>('home');
  const [activeSection, setActiveSection] = useState<SectionId>('overview');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const openSolution = (id: NavigationId) => {
    setSelectedSolution(id);
    setActiveSection('overview');
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
      <main className="main no-sidebar-main" style={{ minHeight: '100vh' }}>
        
        <section className="hero top-hero premium-hero" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', position: 'relative' }}>
          <div className="hero-copy" style={{ width: '100%', maxWidth: '100%', display: 'flex', alignItems: 'center', gap: '20px' }}>
            
            {/* Shifts the image upward by targeting the top 15%, cropping out the bottom text */}
            <img 
              src={gcpGif} 
              alt="GCP Animation" 
              style={{ 
                width: '75px', 
                height: '75px', 
                objectFit: 'cover', 
                objectPosition: 'center 15%', 
                borderRadius: '50%', 
                flexShrink: 0 
              }} 
            />
            
            <div>
              <h1 className="premium-title" style={{ fontSize: '2.2rem', margin: 0, lineHeight: 1.2 }}>
                <span>GCP Tech</span>
                <span className="title-highlight"> Transformation </span>
                <span>Solutions</span>
              </h1>
              <div className="outcome-row" style={{ marginTop: '8px' }}>
                <div className="outcome-item"><Users size={16} /><span>Smarter People</span></div>
                <div className="outcome-divider"></div>
                <div className="outcome-item"><BarChart3 size={16} /><span>Stronger Operations</span></div>
                <div className="outcome-divider"></div>
                <div className="outcome-item"><Star size={16} /><span>Better Customer Experiences</span></div>
              </div>
            </div>

          </div>
        </section>
        <section className="platform-card-row five-platforms">
          {solutions.map((platform) => {
            const Icon = platform.icon;
            const isSelected = selectedSolution === platform.id;
            return (
              <button
                type="button"
                key={platform.id}
                className={`platform-card ${isSelected ? 'selected-glow' : ''}`}
                onClick={() => openSolution(platform.id)}
              >
                <div className="platform-icon" style={{ color: platform.color, backgroundColor: `${platform.color}10` }}>
                  <Icon size={44} strokeWidth={2.2} />
                </div>
                <div className="platform-copy">
                  <h3>{platform.name}</h3>
                  <p>{platform.subtitle}</p>
                </div>
                <ChevronRight size={22} className="platform-arrow" />
              </button>
            );
          })}
        </section>

        <div className="page-content main-page-content">
          {selectedSolution === 'home' ? (
            <InnovationWikiHome />
          ) : (
            <SolutionPage solutionId={selectedSolution} activeSection={activeSection} setActiveSection={setActiveSection} />
          )}
        </div>

        <footer className="footer upgraded-footer" style={{ marginTop: 'auto' }}>
          <div className="footer-left">
            <strong>GCP Tech Transformation</strong>
            <span className="footer-separator">|</span>
            <span>Innovation Wiki</span>
            <span className="footer-separator">|</span>
            <span>© 2026 Google</span>
          </div>
          <div className="footer-vision">
            <span className="vision-line"></span>
            <span>Knowledge drives progress. Innovation creates impact.</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

/* =========================================================
   INNOVATION WIKI HOME
========================================================= */

function InnovationWikiHome() {
  return (
    <section className="wiki-home clean-wiki-home">
      <div className="wiki-home-heading">
        <h2>What you’ll find here</h2>
        <p>Explore the key aspects we cover for each solution. Select a solution above to view detailed information.</p>
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
   SOLUTION PAGE
========================================================= */

type SolutionPageProps = {
  solutionId: SolutionId;
  activeSection: SectionId;
  setActiveSection: Dispatch<SetStateAction<SectionId>>;
};

function SolutionPage({ solutionId, activeSection, setActiveSection }: SolutionPageProps) {
  const content = solutionContent[solutionId];
  const platform = solutions.find((item) => item.id === solutionId);

  if (!platform) return null;
  const Icon = platform.icon;

  return (
    <section className="solution-page">
      
      {/* START: Solution Header Block */}
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
      {/* END: Solution Header Block */}

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
   ENHANCED OVERVIEW COMPONENT 
========================================================= */

function EnhancedOverview({ content, setActiveSection }: any) {
  if (!content || !content.objectives) return null;
  return (
    <div className="enhanced-overview">
      <style>{`
        .enhanced-overview { 
          animation: fadeContent 0.25s ease; 
          height: 100%; 
          font-family: system-ui, -apple-system, sans-serif; 
        }
        .overview-grid { 
          display: grid; 
          grid-template-columns: 2.2fr 1fr; 
          gap: 24px; 
          align-items: stretch; 
        }
        
        /* --- Left Column --- */
        .overview-main { 
          display: flex; 
          flex-direction: column; 
          gap: 16px; 
        }
        
        .overview-title {
          font-size: 22px;
          color: var(--text-main);
          margin: 0 0 16px 0;
          padding-bottom: 12px;
          border-bottom: 2px solid var(--border-main);
          position: relative;
          font-weight: 700;
        }
        .overview-title::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 48px;
          height: 2px;
          background-color: #1a73e8;
        }

        .overview-card {
          border-radius: 12px;
          padding: 20px 24px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
          flex: none;
        }
        .card-white {
          background: var(--bg-card);
          border: 1px solid var(--border-main);
        }
        .card-blue {
          background: var(--bg-blue-card);
          border: 1px solid var(--border-main);
        }
        .card-blue h4 { color: var(--text-main); }
        .card-green {
          background: var(--bg-green-card);
          border: 1px solid var(--border-main);
        }
        .card-green h4 { color: var(--text-green); }
        
        .card-icon-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .card-white .card-icon-badge { color: #1a73e8; }
        .card-blue .card-icon-badge { color: #1a73e8; }
        .card-green .card-icon-badge { color: #16a34a; }
        
        .card-content-wrap { flex: 1; }
        .card-content-wrap h4 {
          margin: 0 0 10px 0;
          font-size: 15px;
          font-weight: 700;
          color: var(--text-main);
        }
        .card-content-wrap p {
          margin: 0;
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .card-content-wrap ul {
          margin: 0;
          padding-left: 18px;
          color: var(--text-secondary);
          font-size: 13.5px;
          line-height: 1.6;
        }
        .card-content-wrap li { margin-bottom: 6px; }
        .card-content-wrap li:last-child { margin-bottom: 0; }

        /* --- Right Column (Sidebar) --- */
        .overview-sidebar {
          height: 100%;
        }

        .sidebar-container {
          background: var(--bg-card);
          border-radius: 12px;
          padding: 24px;
          border: 1px solid var(--border-main);
          display: flex;
          flex-direction: column;
          height: 100%; 
          box-sizing: border-box;
        }
        
        .sidebar-section {
          margin-bottom: 24px;
        }
        
        .side-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .side-header h4 {
          margin: 0;
          font-size: 15px;
          color: var(--text-main);
          font-weight: 700;
        }
        .info-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid #2563eb;
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid var(--border-soft);
          font-size: 12px;
        }
        .meta-row:last-child { border-bottom: none; }
        .meta-row span:first-child { color: var(--text-muted); }
        .meta-row strong {
          color: var(--text-main);
          font-weight: 500;
          text-align: right;
          max-width: 65%;
        }
        .status-pill {
          background: var(--pill-bg);
          color: var(--text-green);
          padding: 4px 12px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 11px;
        }
        
        .quick-links { display: flex; flex-direction: column; }
        .ql-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 0;
          border: none;
          background: transparent;
          border-bottom: 1px solid var(--border-soft);
          cursor: pointer;
          width: 100%;
          text-align: left;
          font-size: 13px;
          color: var(--text-secondary);
          transition: background 0.2s;
        }
        .ql-btn:hover { background: var(--bg-hover); }
        .ql-btn:last-child { border-bottom: none; padding-bottom: 0; }
        .ql-btn .arrow { margin-left: auto; color: var(--text-muted); }
        
        .feedback-promo {
          background: var(--bg-blue-card);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: auto;
          border: 1px solid transparent;
        }
        .fp-left { display: flex; align-items: flex-start; gap: 12px; }
        .fp-text h5 { margin: 0; font-size: 13px; color: var(--text-main); font-weight: 700; }
        .fp-text p { margin: 4px 0 0; font-size: 11.5px; color: var(--text-secondary); }
        .fp-btn {
          background: #1a73e8; 
          color: white;
          border: none;
          border-radius: 6px;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s;
        }
        .fp-btn:hover { background: #1557b0; }
        
        @media (max-width: 1000px) {
          .overview-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      
      <div className="overview-grid">
        {/* LEFT COLUMN */}
        <div className="overview-main">
          <h2 className="overview-title">Overview</h2>
          <div className="overview-card card-white">
            <div className="card-icon-badge">
              <FileText size={22} strokeWidth={2.5} />
            </div>
            <div className="card-content-wrap">
              <h4>Overview</h4>
              <p>{content.overview}</p>
            </div>
          </div>

          <div className="overview-card card-blue">
            <div className="card-icon-badge">
              <ShieldCheck size={22} strokeWidth={2.5} />
            </div>
            <div className="card-content-wrap">
              <h4>Key Objectives</h4>
              <ul>
                {content.objectives.map((obj: string, i: number) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="overview-card card-green">
            <div className="card-icon-badge">
              <UserIcon size={22} strokeWidth={2.5} />
            </div>
            <div className="card-content-wrap">
              <h4>Who is it for?</h4>
              <p>{content.audience}</p>
            </div>
          </div>
        </div>
        
        {/* RIGHT COLUMN */}
        <div className="overview-sidebar">
          <div className="sidebar-container">
            
            <div className="sidebar-section">
              <div className="side-header">
                <div className="info-circle"><Info size={14} strokeWidth={3} /></div>
                <h4>At a Glance</h4>
              </div>
              <div className="metadata-list">
                <div className="meta-row"><span>Solution Type</span><strong>{content.metadata.type}</strong></div>
                <div className="meta-row"><span>Target Users</span><strong>{content.metadata.users}</strong></div>
                <div className="meta-row"><span>Domain</span><strong>{content.metadata.domain}</strong></div>
                <div className="meta-row"><span>Status</span><span className="status-pill">{content.metadata.status}</span></div>
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
                <button className="ql-btn" onClick={() => setActiveSection('demo')}>
                  <Youtube size={18} color="#dc2626" />
                  <span>Watch Demo</span>
                  <ChevronRight size={16} className="arrow" />
                </button>
                <button className="ql-btn" onClick={() => setActiveSection('feedback')}>
                  <MessageSquare size={18} color="#9333ea" />
                  <span>Give Feedback</span>
                  <ChevronRight size={16} className="arrow" />
                </button>
              </div>
            </div>

            <div className="feedback-promo">
              <div className="fp-left">
                <Lightbulb size={22} color="#2563eb" strokeWidth={2} />
                <div className="fp-text">
                  <h5>Have questions or ideas?</h5>
                  <p>We'd love to hear from you!</p>
                </div>
              </div>
              <button className="fp-btn" onClick={() => setActiveSection('feedback')}>Share Feedback</button>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}

/* =========================================================
   ENHANCED PROBLEM COMPONENT
========================================================= */

function EnhancedProblem({ data, platformColor, platformIcon: PlatformIcon }: any) {
  if (!data || !data.cards) return null;
  return (
    <div className="enhanced-problem">
      <style>{`
        .enhanced-problem { animation: fadeContent 0.25s ease; }
        
        .problem-title {
          font-size: 22px;
          color: var(--text-main);
          margin: 0 0 16px 0;
          padding-bottom: 12px;
          border-bottom: 2px solid var(--border-main);
          position: relative;
          font-weight: 700;
        }
        .problem-title::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 48px;
          height: 2px;
          background-color: #1a73e8;
        }

        .problem-desc { font-size: 15px; color: var(--text-secondary); margin: 0 0 24px 0; line-height: 1.6; }
        
        .p-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px; }
        .p-card { padding: 12px 16px; border-radius: 10px; display: flex; flex-direction: column; align-items: flex-start; gap: 6px; background: var(--bg-hover); border: 1px solid transparent; }
        .p-icon-wrap { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 2px; background: var(--bg-card); box-shadow: var(--shadow-sm); }
        .p-card h4 { margin: 0; font-size: 14px; color: var(--text-main); line-height: 1.3; font-weight: 600; }
        .p-card p { margin: 0; font-size: 12px; color: var(--text-secondary); line-height: 1.4; }
        
        .p-callout { display: flex; align-items: center; gap: 16px; padding: 16px 20px; border-radius: 12px; margin-bottom: 24px; background: var(--bg-card); border: 1px solid var(--border-main); }
        .c-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .c-cont { display: flex; flex-direction: column; justify-content: center; }
        .c-cont strong { color: var(--text-main); font-size: 15px; margin-bottom: 4px; }
        .c-cont p { margin: 0; color: var(--text-secondary); font-size: 14px; line-height: 1.5; }
        
        .p-trans { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; border-radius: 12px; background: var(--bg-card); border: 1px solid var(--border-main); }
        .t-left { display: flex; align-items: center; gap: 16px; flex: 1; }
        .t-plat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .t-text { display: flex; flex-direction: column; gap: 4px; }
        .t-head { display: flex; align-items: center; gap: 8px; font-size: 16px; color: var(--text-main); }
        .t-text p { margin: 0; font-size: 13px; color: var(--text-secondary); line-height: 1.5; max-width: 90%; }
        .t-right { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; flex-shrink: 0; margin-left: 20px;}
        .t-tag { font-family: Georgia, serif; font-style: italic; font-size: 20px; white-space: nowrap; }
        .t-send { transform: rotate(-15deg); margin-bottom: -4px; }
        
        @media (max-width: 850px) { .p-cards { grid-template-columns: 1fr; } .p-trans { flex-direction: column; align-items: flex-start; gap: 20px;} .t-right { align-items: flex-start; margin-left: 64px; } }
      `}</style>

      <h2 className="problem-title">The Problem</h2>

      <p className="problem-desc">{data.description}</p>

      <div className="p-cards">
        {data.cards.map((card: any, index: number) => {
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

      <div className="p-trans">
        <div className="t-left">
          <div className="t-plat-icon" style={{ color: platformColor, backgroundColor: `${platformColor}15` }}>
            <PlatformIcon size={26} strokeWidth={2.5} />
          </div>
          <div className="t-text">
            <div className="t-head">
              <strong>Problem</strong> <ArrowRight size={18} color="var(--text-muted)" /> <strong>Solution</strong>
            </div>
            <p>{data.transition}</p>
          </div>
        </div>
        <div className="t-right" style={{ color: platformColor }}>
          <Send size={24} className="t-send" />
          <div className="t-tag">{data.tagline}</div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ENHANCED SOLUTION COMPONENT
========================================================= */

function EnhancedSolution({ data, platformColor, platformIcon: PlatformIcon }: any) {
  if (!data || !data.cards) return null;
  return (
    <div className="enhanced-solution">
      <style>{`
        .enhanced-solution { animation: fadeContent 0.25s ease; }

        .solution-title {
          font-size: 22px;
          color: var(--text-main);
          margin: 0 0 16px 0;
          padding-bottom: 12px;
          border-bottom: 2px solid var(--border-main);
          position: relative;
          font-weight: 700;
        }
        .solution-title::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 48px;
          height: 2px;
          background-color: #1a73e8;
        }

        .solution-desc { font-size: 15px; color: var(--text-secondary); margin: 0 0 24px 0; line-height: 1.6; }
        
        .s-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px; }
        .s-card { padding: 16px 20px; border-radius: 12px; display: flex; flex-direction: column; align-items: flex-start; gap: 6px; border: 1px solid transparent; }
        .s-icon-wrap { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 2px; flex-shrink: 0; }
        .s-card h4 { margin: 0; font-size: 15px; color: var(--text-main); line-height: 1.3; font-weight: 600; }
        .s-card p { margin: 0; font-size: 13px; color: var(--text-secondary); line-height: 1.4; }
        
        .s-callout { display: flex; align-items: center; gap: 16px; padding: 16px 20px; border-radius: 12px; margin-bottom: 24px; background: var(--bg-card); border: 1px solid var(--border-main); }
        .sc-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .sc-cont { display: flex; flex-direction: column; justify-content: center; }
        .sc-cont strong { color: var(--text-main); font-size: 15px; margin-bottom: 4px; }
        .sc-cont p { margin: 0; color: var(--text-secondary); font-size: 14px; line-height: 1.5; }
        
        .s-trans { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; border-radius: 12px; background: var(--bg-card); border: 1px solid var(--border-main); }
        .st-left { display: flex; align-items: center; gap: 16px; flex: 1; }
        .st-plat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .st-text { display: flex; flex-direction: column; gap: 4px; }
        .st-head { display: flex; align-items: center; gap: 8px; font-size: 16px; color: var(--text-main); }
        .st-text p { margin: 0; font-size: 13px; color: var(--text-secondary); line-height: 1.5; max-width: 90%; }
        .st-right { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; flex-shrink: 0; margin-left: 20px;}
        .st-tag { font-family: Georgia, serif; font-style: italic; font-size: 20px; white-space: nowrap; }
        .st-send { transform: rotate(-15deg); margin-bottom: -4px; }
        
        @media (max-width: 850px) { .s-cards { grid-template-columns: 1fr; } .s-trans { flex-direction: column; align-items: flex-start; gap: 20px;} .st-right { align-items: flex-start; margin-left: 64px; } }
      `}</style>

      <h2 className="solution-title">The Solution</h2>
      
      <p className="solution-desc">{data.description}</p>

      <div className="s-cards">
        {data.cards.map((card: any, index: number) => {
          const CardIcon = card.icon;
          return (
            <div key={index} className="s-card" style={{ backgroundColor: card.iconBg }}>
              <div className="s-icon-wrap" style={{ backgroundColor: 'var(--bg-card)', color: card.iconColor, boxShadow: 'var(--shadow-sm)' }}>
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
          <data.calloutIcon size={22} />
        </div>
        <div className="sc-cont">
          <strong>How it helps</strong>
          <p>{data.callout}</p>
        </div>
      </div>

      <div className="s-trans">
        <div className="st-left">
          <div className="st-plat-icon" style={{ color: platformColor, backgroundColor: `${platformColor}15` }}>
            <PlatformIcon size={26} strokeWidth={2.5} />
          </div>
          <div className="st-text">
            <div className="st-head">
              <strong>From Problem</strong> <ArrowRight size={18} color="var(--text-muted)" /> <strong>Impact</strong>
            </div>
            <p>{data.transition}</p>
          </div>
        </div>
        <div className="st-right" style={{ color: platformColor }}>
          <Send size={24} className="st-send" />
          <div className="st-tag">{data.tagline}</div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DROPDOWN / ACCORDION KEY BENEFITS COMPONENT
========================================================= */

function Benefits({ benefits }: { benefits: BenefitItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="content-section">
      <style>{`
        .benefits-accordion-list {
          background: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 12px;
          overflow: hidden;
        }
        .benefit-accordion-item {
          border-bottom: 1px solid var(--border-soft);
          transition: background 0.2s;
        }
        .benefit-accordion-item:last-child {
          border-bottom: none;
        }
        .benefit-header-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          cursor: pointer;
          user-select: none;
        }
        .benefit-header-row:hover {
          background: var(--bg-hover);
        }
        .benefit-badge {
          width: 34px;
          height: 28px;
          border-radius: 6px;
          background: var(--badge-bg);
          color: #2563eb;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .benefit-title-text {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-main);
          flex: 1;
        }
        .benefit-chevron {
          color: var(--text-muted);
          transition: transform 0.2s ease;
        }
        .benefit-chevron.open {
          transform: rotate(180deg);
          color: #2563eb;
        }
        .benefit-dropdown-content {
          padding: 0 20px 16px 70px;
          animation: fadeContent 0.2s ease;
        }
        .benefit-dropdown-content p {
          margin: 0;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
      `}</style>

      <div className="section-heading">
        <h3>Key Benefits</h3>
      </div>

      <div className="benefits-accordion-list">
        {benefits.map((benefit, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={benefit.title} className="benefit-accordion-item">
              <div
                className="benefit-header-row"
                onClick={() => toggleItem(index)}
              >
                <div className="benefit-badge">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="benefit-title-text">
                  {benefit.title}
                </div>
                <ChevronDown
                  size={18}
                  className={`benefit-chevron ${isOpen ? 'open' : ''}`}
                />
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

/* =========================================================
   ENHANCED USAGE & ADOPTION COMPONENT
========================================================= */

function Usage({ content, platformColor }: { content: any; platformColor: string }) {
  const usageData = content.usage;
  if (!usageData) return null;

  return (
    <div className="content-section">
      <style>{`
        .usage-section { animation: fadeContent 0.25s ease; display: flex; flex-direction: column; gap: 24px; }
        
        .usage-desc-card {
          background: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 12px;
          padding: 16px 20px;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .usage-desc-card p { margin: 0; }

        .highlights-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .highlights-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-main);
          margin: 4px 0 0;
        }
        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .highlight-card {
          background: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 12px;
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .highlight-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .highlight-top h5 {
          margin: 0;
          font-size: 14.5px;
          font-weight: 600;
          color: var(--text-main);
        }
        .highlight-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 999px;
          background: var(--badge-bg);
          color: var(--text-secondary);
          white-space: nowrap;
        }
        .highlight-card p {
          margin: 0;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        @media (max-width: 950px) {
          .highlights-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="section-heading">
        <h3>Usage & Adoption</h3>
      </div>

      <div className="usage-section">
        <div className="usage-desc-card">
          <p>{usageData.description}</p>
        </div>

        <div className="highlights-container">
          <div className="highlights-title">Programmatic Adoption & Insights</div>
          <div className="highlights-grid">
            {usageData.highlights.map((h: any, idx: number) => (
              <div key={idx} className="highlight-card">
                <div className="highlight-top">
                  <h5>{h.title}</h5>
                  <span className="highlight-badge" style={{ color: platformColor, backgroundColor: `${platformColor}14` }}>
                    {h.badge}
                  </span>
                </div>
                <p>{h.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ACCORDION IMPACT COMPONENT
========================================================= */

function Impact({ content, platformColor }: any) {
  const data = content.impact;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (typeof data === 'string') return null;

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="content-section">
      <style>{`
        .impact-header-text { margin-bottom: 24px; animation: fadeContent 0.25s ease; }
        .impact-header-text h4 { font-size: 18px; color: var(--text-main); margin: 0 0 8px 0; font-weight: 700; }
        .impact-header-text p { font-size: 15px; color: var(--text-secondary); line-height: 1.6; margin: 0; }
        
        .benefits-accordion-list {
          background: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 12px;
          overflow: hidden;
          animation: fadeContent 0.25s ease;
        }
        .benefit-accordion-item {
          border-bottom: 1px solid var(--border-soft);
          transition: background 0.2s;
        }
        .benefit-accordion-item:last-child {
          border-bottom: none;
        }
        .benefit-header-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          cursor: pointer;
          user-select: none;
        }
        .benefit-header-row:hover {
          background: var(--bg-hover);
        }
        .benefit-badge {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .benefit-title-text {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-main);
          flex: 1;
        }
        .benefit-chevron {
          color: var(--text-muted);
          transition: transform 0.2s ease;
        }
        .benefit-chevron.open {
          transform: rotate(180deg);
          color: ${platformColor};
        }
        .benefit-dropdown-content {
          padding: 0 20px 16px 70px;
        }
        .benefit-dropdown-content p {
          margin: 0;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
      `}</style>

      <div className="section-heading">
        <h3>Impact</h3>
      </div>

      <div className="impact-header-text">
        <h4>{data.title}</h4>
        <p>{data.description}</p>
      </div>

      <div className="benefits-accordion-list">
        {data.metrics.map((m: any, index: number) => {
          const isOpen = openIndex === index;
          return (
            <div key={m.title} className="benefit-accordion-item">
              <div className="benefit-header-row" onClick={() => toggleItem(index)}>
                <div className="benefit-badge" style={{ color: platformColor, backgroundColor: `${platformColor}15` }}>
                  <m.icon size={18} strokeWidth={2.5} />
                </div>
                <div className="benefit-title-text">{m.title}</div>
                <ChevronDown size={18} className={`benefit-chevron ${isOpen ? 'open' : ''}`} />
              </div>
              {isOpen && (
                <div className="benefit-dropdown-content">
                  <p>{m.subtitle}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   GENERIC COMPONENTS
========================================================= */

function TextSection({ title, text }: { title: string; text: string }) {
  return <div className="content-section"><div className="section-heading"><h3>{title}</h3></div><div className="text-panel"><p>{text}</p></div></div>;
}

function Access({ content }: { content: (typeof solutionContent)[SolutionId] }) {
  const hasUrl = content.access.startsWith('http');
  return (
    <div className="content-section">
      <div className="section-heading"><h3>Access Details</h3></div>
      <div className="access-panel">
        <div className="access-row" style={{ justifyContent: 'space-between' }}>
          <div>
            <span>Application Access</span>
            {/* Only display the raw text if it is NOT a valid URL */}
            {!hasUrl && <strong>{content.access}</strong>}
          </div>
          {hasUrl && <a href={content.access} target="_blank" rel="noreferrer" className="primary-button">Open Tool<ExternalLink size={16} /></a>}
        </div>
        <div className="poc-row">
          <span>Points of Contact</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            {content.poc.map((p: any, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserIcon size={16} style={{ color: 'var(--text-muted)' }} />
                <strong style={{ color: 'var(--text-main)', fontSize: '14px' }}>{p.name}</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>({p.ldap})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Feedback({ content }: { content: (typeof solutionContent)[SolutionId] }) {
  return <div className="content-section"><div className="section-heading"><h3>Feedback</h3></div><div className="feedback-panel"><MessageSquare size={33} /><div><h4>Share your feedback</h4><p>Use the approved Google Form to share suggestions and improvement feedback.</p><a href={content.feedback} target="_blank" rel="noreferrer" className="primary-button">Open Google Form<ExternalLink size={16} /></a></div></div></div>;
}

function Demo({ content }: { content: (typeof solutionContent)[SolutionId] }) {
  return <div className="content-section"><div className="section-heading"><h3>Demo</h3></div><div className="demo-panel">{content.demo ? <video controls src={content.demo} /> : <><PlayCircle size={53} /><h4>{content.shortName} Demo</h4><p>Approved demo video can be embedded here.</p></>}</div></div>;
}

export default App;
