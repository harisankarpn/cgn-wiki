import { useState } from "react";
import {
 Home,
 Target,
 BarChart3,
 Bot,
 Zap,
 HelpCircle,
 Search,
 Bell,
 Menu,
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
 UserRound,
} from "lucide-react";
const solutions = [
 {
   id: "core",
   name: "C.O.R.E.",
   subtitle: "Talent Acquisition & Readiness",
   icon: Target,
   color: "#1967d2",
 },
 {
   id: "elevate",
   name: "Elevate360",
   subtitle: "Operational Governance",
   icon: BarChart3,
   color: "#16a34a",
 },
 {
   id: "sme",
   name: "Digital SME",
   subtitle: "Real-Time Case Execution",
   icon: Bot,
   color: "#7c3aed",
 },
 {
   id: "accelerate",
   name: "Project Accelerate",
   subtitle: "Customer Experience & Risk Control",
   icon: Zap,
   color: "#f59e0b",
 },
];
const solutionContent = {
 core: {
   shortName: "C.O.R.E.",
   name: "C.O.R.E. (Comprehensive Online Review of Expertise)",
   tagline: "Realistic Flight Simulator for Technical Talent",
   overview:
     "C.O.R.E. is an intelligent, proctored and adaptive assessment ecosystem designed to evaluate technical talent through realistic, hands-on scenarios.",
   problem:
     "Traditional interviews may rely heavily on theoretical or memory-based questions and may not accurately demonstrate how an engineer performs during a real technical outage or customer interaction.",
   solution:
     "C.O.R.E. combines hands-on troubleshooting, adaptive assessments, live technical environments, proctoring and simulated customer interactions to create a more practical and objective evaluation experience.",
   benefits: [
     "Zero-Guesswork Hiring",
     "Targeted Onboarding",
     "End-to-End Training",
     "Objective Benchmarking",
   ],
   usage:
     "Usage and adoption can include total users, active users, completed assessments, assessment participation rate and monthly adoption trends.",
   impact:
     "Improves Day-1 proficiency, identifies technical skill gaps earlier, supports targeted training and reduces subjectivity during technical evaluation.",
   access:
     "Add C.O.R.E. application access link here.",
   poc:
     "Add C.O.R.E. Product Owner / POC name, team and contact details.",
   feedback:
     "https://docs.google.com/forms/",
   demo:
     "",
 },
 elevate: {
   shortName: "Elevate360",
   name: "Elevate360",
   tagline: "Full-Funnel Performance Intelligence",
   overview:
     "Elevate360 is an AI-enabled performance intelligence platform that consolidates operational information and helps leaders understand performance trends.",
   problem:
     "Fragmented operational metrics may reveal that productivity has dropped without explaining whether the root cause is a skill gap, management issue or operational bottleneck.",
   solution:
     "Elevate360 connects reporting streams and provides AI-assisted analysis, root-cause attribution and prescriptive remediation recommendations.",
   benefits: [
     "Root-Cause Attribution",
     "Prescriptive Action Plans",
     "Scalable Oversight",
     "Performance Intelligence",
   ],
   usage:
     "Usage and adoption can include active leaders, TSR coverage, report usage, AI interactions and monthly engagement trends.",
   impact:
     "Improves managerial effectiveness, reduces manual reporting effort and supports faster data-driven corrective actions.",
   access:
     "https://e360-uat-dot-digital-sme.uc.r.appspot.com/e360-home/login",
   poc:
     "Add Elevate360 Product Owner / POC name, team and contact details.",
   feedback:
     "https://docs.google.com/forms/",
   demo:
     "",
 },
 sme: {
   shortName: "Digital SME",
   name: "Digital SME",
   tagline: "24/7 Virtual AI Engineering Tier",
   overview:
     "Digital SME is an on-demand AI technical specialist grounded in approved technical documentation and validated historical resolutions.",
   problem:
     "Tier-1 and Tier-2 engineers may become dependent on a limited number of senior SMEs, increasing resolution times and creating operational bottlenecks.",
   solution:
     "Digital SME provides technical guidance, architectural review assistance, automated root-cause analysis, troubleshooting support and ticket summarization.",
   benefits: [
     "Compressed MTTR",
     "Consistent Guidance",
     "Expert Offloading",
     "24/7 Engineering Assistance",
   ],
   usage:
     "Usage and adoption can include active engineers, AI interactions, troubleshooting sessions, knowledge usage and monthly adoption trends.",
   impact:
     "Reduces dependency on senior SMEs, improves troubleshooting consistency and helps engineers resolve complex issues faster.",
   access:
     "https://34.120.137.34.nip.io/",
   poc:
     "Add Digital SME Product Owner / POC name, team and contact details.",
   feedback:
     "https://docs.google.com/forms/",
   demo:
     "",
 },
 accelerate: {
   shortName: "Project Accelerate",
   name: "Project Accelerate",
   tagline: "Early-Warning Sentiment & Escalation Radar",
   overview:
     "Project Accelerate is an agentic AI solution that analyzes case interactions in real time to identify increasing customer risk and potential escalations.",
   problem:
     "Static ticket priorities may not reflect changing customer impact, allowing critical cases to remain unnoticed until a significant escalation occurs.",
   solution:
     "Project Accelerate analyzes customer tone, detects rising risk, dynamically adjusts operational priority and supports Follow-the-Sun handoffs.",
   benefits: [
     "Proactive Risk Mitigation",
     "Dynamic Case Prioritization",
     "Operational Continuity",
     "Improved Customer Experience",
   ],
   usage:
     "Usage and adoption can include monitored cases, generated alerts, active users, detected risk signals and adoption trends.",
   impact:
     "Enables earlier intervention, reduces escalation risk and improves operational continuity across global support teams.",
   access:
     "Add Project Accelerate application access link here.",
   poc:
     "Add Project Accelerate Product Owner / POC name, team and contact details.",
   feedback:
     "https://docs.google.com/forms/",
   demo:
     "",
 },
};
const sections = [
 {
   id: "overview",
   label: "Overview",
   icon: Home,
 },
 {
   id: "problem",
   label: "Problem",
   icon: FileText,
 },
 {
   id: "solution",
   label: "Solution",
   icon: Lightbulb,
 },
 {
   id: "benefits",
   label: "Key Benefits",
   icon: Star,
 },
 {
   id: "usage",
   label: "Usage & Adoption",
   icon: BarChart3,
 },
 {
   id: "impact",
   label: "Impact",
   icon: TrendingUp,
 },
 {
   id: "access",
   label: "Access Details",
   icon: KeyRound,
 },
 {
   id: "feedback",
   label: "Feedback",
   icon: MessageSquare,
 },
 {
   id: "demo",
   label: "Demo",
   icon: PlayCircle,
 },
];
const wikiTableRows = [
 {
   id: "overview",
   icon: FileText,
   color: "#1967d2",
   section: "Overview",
   covers: "Purpose, vision and scope of the solution.",
   details: "Introduction and key objectives",
 },
 {
   id: "problem",
   icon: Target,
   color: "#ea4335",
   section: "Problem",
   covers: "Key challenges and pain points we aim to solve.",
   details: "Current state and business challenges",
 },
 {
   id: "solution",
   icon: Lightbulb,
   color: "#f9ab00",
   section: "Solution",
   covers: "Approach, features and key capabilities.",
   details: "How the solution addresses the problem",
 },
 {
   id: "benefits",
   icon: BarChart3,
   color: "#16a34a",
   section: "Key Benefits",
   covers: "Value delivered for people, operations and customers.",
   details: "Business and operational benefits",
 },
 {
   id: "usage",
   icon: Users,
   color: "#7c3aed",
   section: "Usage & Adoption",
   covers: "Adoption metrics and usage insights.",
   details: "Usage trends and adoption details",
 },
 {
   id: "impact",
   icon: TrendingUp,
   color: "#f97316",
   section: "Impact",
   covers: "Measurable impact and outcomes.",
   details: "Key impact areas and success metrics",
 },
 {
   id: "access",
   icon: KeyRound,
   color: "#06b6d4",
   section: "Access Details",
   covers: "Application links and respective POC information.",
   details: "Access link, tool owner and POC details",
 },
 {
   id: "feedback",
   icon: MessageSquare,
   color: "#ec4899",
   section: "Feedback",
   covers: "Share feedback via Google Form.",
   details: "Direct link to feedback form",
 },
 {
   id: "demo",
   icon: PlayCircle,
   color: "#1a73e8",
   section: "Demo",
   covers: "Watch a short demo to see the solution in action.",
   details: "Embedded video demo",
 },
];
function App() {
 const [sidebarOpen, setSidebarOpen] =
   useState(true);
 const [selectedSolution, setSelectedSolution] =
   useState(null);
 const [activeSection, setActiveSection] =
   useState("overview");
 const openInnovationWiki = () => {
   setSelectedSolution(null);
   setActiveSection("overview");
 };
 const openSolution = (id) => {
   setSelectedSolution(id);
   setActiveSection("overview");
 };
 return (
<div className="app">
<aside
       className={`sidebar ${
         sidebarOpen ? "" : "collapsed"
       }`}
>
<div className="brand">
<div className="brand-symbol">
<span className="brand-blue"></span>
<span className="brand-red"></span>
<span className="brand-yellow"></span>
<span className="brand-green"></span>
</div>
         {sidebarOpen && (
<div className="brand-text">
<strong>GCP</strong>
<span>Tech Transformation</span>
</div>
         )}
</div>
<nav className="sidebar-nav">
<button
           className={`sidebar-item ${
             selectedSolution === null
               ? "active"
               : ""
           }`}
           onClick={openInnovationWiki}
>
<Home size={21} />
           {sidebarOpen && (
<span>Innovation Wiki</span>
           )}
</button>
         {solutions.map((solution) => {
           const Icon = solution.icon;
           return (
<button
               key={solution.id}
               className={`sidebar-item ${
                 selectedSolution === solution.id
                   ? "active"
                   : ""
               }`}
               onClick={() =>
                 openSolution(solution.id)
               }
>
<Icon size={21} />
               {sidebarOpen && (
<span>{solution.name}</span>
               )}
</button>
           );
         })}
</nav>
<div className="sidebar-bottom">
<button className="sidebar-item support">
<HelpCircle size={21} />
           {sidebarOpen && (
<span>Help & Support</span>
           )}
</button>
<button className="sidebar-item support">
<MessageSquare size={21} />
           {sidebarOpen && (
<span>Feedback</span>
           )}
</button>
         {sidebarOpen && (
<div className="sidebar-message">
<span>Knowledge</span>
<span>Drives Progress</span>
<i></i>
</div>
         )}
</div>
</aside>
<main
       className={`main ${
         sidebarOpen
           ? "sidebar-expanded"
           : "sidebar-minimized"
       }`}
>
<header className="topbar">
<button
           className="menu-button"
           onClick={() =>
             setSidebarOpen((value) => !value)
           }
>
<Menu size={23} />
</button>
<div className="search-box">
<Search size={19} />
<input
             placeholder="Search for solutions, topics, or keywords..."
           />
</div>
<div className="topbar-actions">
<button className="notification-button">
<Bell size={21} />
<span></span>
</button>
<div className="profile">
<div className="avatar">
<UserRound size={18} />
</div>
<div className="profile-text">
<strong>CGN User</strong>
<span>GCP Tech Transformation</span>
</div>
</div>
<div className="google-wordmark">
<span className="google-blue">G</span>
<span className="google-red">o</span>
<span className="google-yellow">o</span>
<span className="google-blue">g</span>
<span className="google-green">l</span>
<span className="google-red">e</span>
</div>
</div>
</header>
<section className="hero">
<div className="hero-copy">
<span className="hero-kicker">
             INNOVATION WIKI
</span>
<h1>
             {selectedSolution
               ? solutionContent[
                   selectedSolution
                 ].shortName
               : "GCP Tech Transformation Solutions"}
</h1>
<p>
             {selectedSolution
               ? solutionContent[
                   selectedSolution
                 ].tagline
               : "A centralized knowledge hub showcasing how our innovative solutions are transforming people, operations and customer experiences across GCP."}
</p>
</div>
<div className="hero-right">
<strong>“Ideas to Impact”</strong>
<span className="hero-rule"></span>
           {!selectedSolution && (
<p>
               Smarter People
<span>|</span>
               Stronger Operations
<span>|</span>
               Better Experiences
</p>
           )}
</div>
</section>
<div className="page-content">
         {selectedSolution === null ? (
<InnovationWikiHome />
         ) : (
<SolutionPage
             solutionId={selectedSolution}
             activeSection={activeSection}
             setActiveSection={setActiveSection}
           />
         )}
</div>
<footer className="footer">
<div>
           © 2026 Google
<span>|</span>
           GCP Tech Transformation Solutions
<span>|</span>
           Innovation Wiki
</div>
<div>
           Privacy
<span>|</span>
           Terms
<span>|</span>
           Support
</div>
</footer>
</main>
</div>
 );
}
function InnovationWikiHome() {
 return (
<section className="wiki-home">
<div className="wiki-home-heading">
<h2>What you’ll find here</h2>
<p>
         Explore the key aspects we cover for
         each solution. Select a solution from
         the left menu to view detailed
         information.
</p>
</div>
<div className="wiki-table-wrapper">
<table className="wiki-table">
<thead>
<tr>
<th className="icon-column"></th>
<th>Section</th>
<th>What it covers</th>
<th>Details available</th>
</tr>
</thead>
<tbody>
           {wikiTableRows.map((row) => {
             const Icon = row.icon;
             return (
<tr key={row.id}>
<td className="icon-column">
<div
                     className="table-icon"
                     style={{
                       color: row.color,
                       backgroundColor:
                         `${row.color}12`,
                     }}
>
<Icon size={21} />
</div>
</td>
<td className="section-name">
                   {row.section}
</td>
<td>{row.covers}</td>
<td>
<div className="details-cell">
<span className="bullet">
                       •
</span>
<span>{row.details}</span>
</div>
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
function SolutionPage({
 solutionId,
 activeSection,
 setActiveSection,
}) {
 const content =
   solutionContent[solutionId];
 const solution = solutions.find(
   (item) => item.id === solutionId
 );
 const Icon = solution.icon;
 return (
<section className="solution-page">
<div className="solution-header">
<div
         className="solution-header-icon"
         style={{
           color: solution.color,
           backgroundColor:
             `${solution.color}12`,
         }}
>
<Icon size={34} />
</div>
<div>
<h2>{content.name}</h2>
<p>{content.tagline}</p>
</div>
</div>
<div className="solution-layout">
<aside className="solution-tabs">
         {sections.map((section) => {
           const SectionIcon =
             section.icon;
           return (
<button
               key={section.id}
               className={
                 activeSection ===
section.id
                   ? "active"
                   : ""
               }
               onClick={() =>
                 setActiveSection(
section.id
                 )
               }
>
<SectionIcon size={18} />
<span>
                 {section.label}
</span>
</button>
           );
         })}
</aside>
<div className="solution-content">
         {activeSection ===
           "overview" && (
<TextSection
             title="Overview"
             text={content.overview}
           />
         )}
         {activeSection ===
           "problem" && (
<TextSection
             title="The Problem"
             text={content.problem}
           />
         )}
         {activeSection ===
           "solution" && (
<TextSection
             title="The Solution"
             text={content.solution}
           />
         )}
         {activeSection ===
           "benefits" && (
<Benefits
             benefits={content.benefits}
           />
         )}
         {activeSection ===
           "usage" && (
<Usage content={content} />
         )}
         {activeSection ===
           "impact" && (
<Impact content={content} />
         )}
         {activeSection ===
           "access" && (
<Access content={content} />
         )}
         {activeSection ===
           "feedback" && (
<Feedback
             content={content}
           />
         )}
         {activeSection ===
           "demo" && (
<Demo content={content} />
         )}
</div>
</div>
</section>
 );
}
function TextSection({ title, text }) {
 return (
<div className="content-section">
<div className="section-heading">
<h3>{title}</h3>
</div>
<div className="text-panel">
<p>{text}</p>
</div>
</div>
 );
}
function Benefits({ benefits }) {
 return (
<div className="content-section">
<div className="section-heading">
<h3>Key Benefits</h3>
</div>
<div className="benefits-list">
       {benefits.map(
         (benefit, index) => (
<div
             className="benefit-row"
             key={benefit}
>
<span>
               {String(index + 1).padStart(
                 2,
                 "0"
               )}
</span>
<strong>
               {benefit}
</strong>
</div>
         )
       )}
</div>
</div>
 );
}
function Usage({ content }) {
 return (
<div className="content-section">
<div className="section-heading">
<h3>Usage & Adoption</h3>
</div>
<div className="text-panel">
<p>{content.usage}</p>
</div>
<div className="metric-row">
<Metric
         label="Active Users"
         value="—"
       />
<Metric
         label="Total Usage"
         value="—"
       />
<Metric
         label="Adoption"
         value="—%"
       />
<Metric
         label="Monthly Trend"
         value="—"
       />
</div>
</div>
 );
}
function Metric({ label, value }) {
 return (
<div className="metric">
<span>{label}</span>
<strong>{value}</strong>
</div>
 );
}
function Impact({ content }) {
 return (
<div className="content-section">
<div className="section-heading">
<h3>Impact</h3>
</div>
<div className="impact-panel">
<TrendingUp size={29} />
<p>{content.impact}</p>
</div>
</div>
 );
}
function Access({ content }) {
 const hasUrl =
   content.access.startsWith(
     "http"
   );
 return (
<div className="content-section">
<div className="section-heading">
<h3>Access Details</h3>
</div>
<div className="access-panel">
<div className="access-row">
<div>
<span>Application Access</span>
<strong>
             {content.access}
</strong>
</div>
         {hasUrl && (
<a
             href={content.access}
             target="_blank"
             rel="noreferrer"
             className="primary-button"
>
             Open Tool
<ExternalLink
               size={16}
             />
</a>
         )}
</div>
<div className="poc-row">
<span>
           Point of Contact
</span>
<p>{content.poc}</p>
</div>
</div>
</div>
 );
}
function Feedback({ content }) {
 return (
<div className="content-section">
<div className="section-heading">
<h3>Feedback</h3>
</div>
<div className="feedback-panel">
<MessageSquare size={33} />
<div>
<h4>
           Share your feedback
</h4>
<p>
           Use the approved Google
           Form to share suggestions
           and improvement feedback.
</p>
<a
           href={content.feedback}
           target="_blank"
           rel="noreferrer"
           className="primary-button"
>
           Open Google Form
<ExternalLink
             size={16}
           />
</a>
</div>
</div>
</div>
 );
}
function Demo({ content }) {
 return (
<div className="content-section">
<div className="section-heading">
<h3>Demo</h3>
</div>
<div className="demo-panel">
       {content.demo ? (
<video
           controls
           src={content.demo}
         />
       ) : (
<>
<PlayCircle size={53} />
<h4>
{content.shortName} Demo
</h4>
<p>Approved demo video can be embedded here.</p>
</>
       )}
</div>
</div>
 );
}
export default App;
