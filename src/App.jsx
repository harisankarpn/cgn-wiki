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
 ChevronRight,
 X,
 FileText,
 Lightbulb,
 Star,
 Trophy,
 Link as LinkIcon,
 MessageSquare,
 PlayCircle,
 Users,
 ShieldCheck,
 Settings,
 ExternalLink,
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
     "C.O.R.E. is an intelligent, proctored and adaptive assessment ecosystem. Candidates demonstrate capability inside a live Linux sandbox while practicing verbal de-escalation with simulated customer personas.",
   purpose:
     "Evaluate real-world technical competency and communication skills before extending an offer.",
   problem:
     "Traditional interviews rely heavily on multiple-choice trivia that tests memory rather than real-world technical competency, leaving hiring managers guessing how an engineer will perform during an actual outage.",
   solution:
     "An intelligent, proctored and adaptive assessment ecosystem that evaluates candidates using realistic technical scenarios, live troubleshooting and simulated customer interactions.",
   benefits: [
     {
       title: "Zero-Guesswork Hiring",
       text: "Evaluates live hands-on troubleshooting and communication skills before extending an offer.",
     },
     {
       title: "Targeted Onboarding",
       text: "Pinpoints specific capability gaps to build tailored learning paths immediately.",
     },
     {
       title: "End-to-End Training",
       text: "Creates customized training based on skill gaps identified during assessment.",
     },
     {
       title: "Objective Benchmarking",
       text: "Uses standardized evaluation criteria to reduce subjective interviewer bias.",
     },
   ],
   highlights: [
     "Real-world assessment",
     "Proctored & adaptive",
     "Live Linux sandbox",
     "Simulated customer interactions",
   ],
   access: "Configure the C.O.R.E. application link here.",
 },
 elevate: {
   shortName: "Elevate360",
   name: "Elevate360",
   tagline: "Full-Funnel Performance Intelligence",
   overview:
     "Elevate360 is a centralized AI-enabled performance platform that connects disparate reporting streams. Leaders can interrogate performance trends and receive prescriptive remediation plans.",
   purpose:
     "Turn fragmented operational performance data into actionable intelligence.",
   problem:
     "Fragmented operational metrics reveal when productivity dips but often fail to explain why, making it difficult to distinguish genuine skill deficits from management or operational bottlenecks.",
   solution:
     "A centralized AI-enabled performance platform that connects performance data and provides leaders with AI-assisted insights and prescriptive remediation plans.",
   benefits: [
     {
       title: "Root-Cause Attribution",
       text: "Isolates individual skill shortfalls from leadership and operational bottlenecks.",
     },
     {
       title: "Prescriptive Action Plans",
       text: "Provides concrete step-by-step coaching and remediation guidance.",
     },
     {
       title: "Scalable Oversight",
       text: "Enables multi-program visibility without extensive manual spreadsheet reconciliation.",
     },
     {
       title: "Direct Overview",
       text: "Provides a balanced evaluation framework highlighting strengths and growth areas.",
     },
   ],
   highlights: [
     "Performance intelligence",
     "AI-driven insights",
     "Root-cause analysis",
     "Prescriptive coaching",
   ],
   access:
     "https://e360-uat-dot-digital-sme.uc.r.appspot.com/e360-home/login",
 },
 sme: {
   shortName: "Digital SME",
   name: "Digital SME",
   tagline: "24/7 Virtual AI Engineering Tier",
   overview:
     "Digital SME is an on-demand AI specialist grounded in approved technical documentation and customer-validated historical resolutions.",
   purpose:
     "Give Tier-1 and Tier-2 engineers immediate access to reliable technical expertise.",
   problem:
     "Tier-1 and Tier-2 engineers frequently bottleneck behind a limited number of senior subject matter experts, causing resolution times to vary depending on SME availability.",
   solution:
     "An on-demand AI specialist that assists front-line agents with architectural reviews, automated root-cause analysis, troubleshooting guidance and ticket summarization.",
   benefits: [
     {
       title: "Compressed MTTR",
       text: "Helps junior engineers resolve complex issues without waiting for senior intervention.",
     },
     {
       title: "Consistent Guidance",
       text: "Provides uniform and verified troubleshooting procedures across shifts.",
     },
     {
       title: "Expert Offloading",
       text: "Reduces repetitive operational questions directed to senior engineers.",
     },
     {
       title: "24/7 Availability",
       text: "Makes technical guidance continuously available to global support teams.",
     },
   ],
   highlights: [
     "AI technical specialist",
     "Automated RCA",
     "Ticket summarization",
     "24/7 engineering assistance",
   ],
   access: "https://34.120.137.34.nip.io/",
 },
 accelerate: {
   shortName: "Project Accelerate",
   name: "Project Accelerate",
   tagline: "Early-Warning Sentiment & Escalation Radar",
   overview:
     "Project Accelerate is an agentic AI layer that monitors case interactions in real time to identify rising customer anxiety and potential escalation risk.",
   purpose:
     "Identify escalation risks before they become critical customer-impacting events.",
   problem:
     "Static priority labels assigned at ticket creation may fail to reflect worsening business impact, allowing critical cases to remain unnoticed until an executive escalation occurs.",
   solution:
     "An agentic AI layer that analyzes customer tone, detects rising anxiety, dynamically adjusts operational priority and coordinates seamless Follow-the-Sun handoffs.",
   benefits: [
     {
       title: "Proactive Risk Mitigation",
       text: "Identifies customer frustration early enough to trigger intervention.",
     },
     {
       title: "Dynamic Case Prioritization",
       text: "Continuously re-indexes tickets based on live sentiment and business risk.",
     },
     {
       title: "Operational Continuity",
       text: "Supports automated cascading alerts and seamless global handoffs.",
     },
     {
       title: "Customer Experience",
       text: "Helps reduce escalation rates and improve customer experience.",
     },
   ],
   highlights: [
     "Sentiment intelligence",
     "Early-warning detection",
     "Dynamic prioritization",
     "Follow-the-Sun handoffs",
   ],
   access: "Configure the Project Accelerate application link here.",
 },
};
const sectionItems = [
 { id: "overview", label: "Overview", icon: Home },
 { id: "problem", label: "Problem", icon: FileText },
 { id: "solution", label: "Solution", icon: Lightbulb },
 { id: "benefits", label: "Key Benefits", icon: Star },
 { id: "usage", label: "Usage & Adoption", icon: BarChart3 },
 { id: "performers", label: "Top Performers", icon: Trophy },
 { id: "access", label: "Access Details", icon: LinkIcon },
 { id: "feedback", label: "Feedback", icon: MessageSquare },
 { id: "demo", label: "Demo", icon: PlayCircle },
];
function App() {
 const [selectedSolution, setSelectedSolution] = useState(null);
 const [activeSection, setActiveSection] = useState("overview");
 const [sidebarOpen, setSidebarOpen] = useState(true);
 const [search, setSearch] = useState("");
 const selectSolution = (id) => {
   setSelectedSolution(id);
   setActiveSection("overview");
 };
 const closeSolution = () => {
   setSelectedSolution(null);
   setActiveSection("overview");
 };
 const filteredSolutions = solutions.filter((solution) =>
   `${solution.name} ${solution.subtitle}`
     .toLowerCase()
     .includes(search.toLowerCase())
 );
 return (
<div className="app">
<aside className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>
<div className="brand">
<div className="brand-logo">
<span className="logo-blue"></span>
<span className="logo-red"></span>
<span className="logo-yellow"></span>
<span className="logo-green"></span>
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
             selectedSolution === null ? "active" : ""
           }`}
           onClick={closeSolution}
>
<Home size={21} />
           {sidebarOpen && <span>Innovation Wiki</span>}
</button>
         {solutions.map((item) => {
           const Icon = item.icon;
           return (
<button
               key={item.id}
               className={`sidebar-item ${
                 selectedSolution === item.id ? "active-solution" : ""
               }`}
               onClick={() => selectSolution(item.id)}
>
<Icon size={21} />
               {sidebarOpen && <span>{item.name}</span>}
</button>
           );
         })}
</nav>
<button className="sidebar-help">
<HelpCircle size={21} />
         {sidebarOpen && <span>Help</span>}
</button>
</aside>
<main
       className={`main ${
         sidebarOpen ? "sidebar-expanded" : "sidebar-minimized"
       }`}
>
<header className="topbar">
<button
           className="menu-button"
           onClick={() => setSidebarOpen((value) => !value)}
           aria-label="Toggle navigation"
>
<Menu size={25} />
</button>
<div className="search-container">
<Search size={20} />
<input
             value={search}
             onChange={(event) => setSearch(event.target.value)}
             placeholder="Search for solutions, keywords, or topics..."
           />
</div>
<div className="header-actions">
<button className="notification-button">
<Bell size={22} />
<span className="notification-dot"></span>
</button>
<div className="user-profile">
<div className="avatar">CG</div>
<div className="user-details">
<strong>CGN User</strong>
<span>GCP Transformation</span>
</div>
</div>
</div>
</header>
<section className="hero">
<div className="hero-content">
<span className="hero-label">INNOVATION WIKI</span>
<h1>GCP Tech Transformation Solutions</h1>
<p>
             Smarter People
<span>|</span>
             Stronger Operations
<span>|</span>
             Better Customer Experiences
</p>
</div>
<div className="hero-quote">
<strong>“Ideas to Impact”</strong>
<span></span>
</div>
<div className="hero-circle circle-one"></div>
<div className="hero-circle circle-two"></div>
</section>
<div className="page-content">
<section className="solutions-grid">
           {filteredSolutions.map((solution) => {
             const Icon = solution.icon;
             return (
<button
                 key={solution.id}
                 className={`solution-card ${
                   selectedSolution === solution.id ? "selected" : ""
                 }`}
                 onClick={() => selectSolution(solution.id)}
>
<div
                   className="solution-icon"
                   style={{
                     color: solution.color,
                     background: `${solution.color}12`,
                   }}
>
<Icon size={43} strokeWidth={2.2} />
</div>
<div className="solution-card-text">
<h3>{solution.name}</h3>
<p>{solution.subtitle}</p>
</div>
<ChevronRight size={23} className="card-arrow" />
</button>
             );
           })}
</section>
         {filteredSolutions.length === 0 && (
<div className="empty-search">
             No solutions found for "{search}".
</div>
         )}
         {selectedSolution ? (
<SolutionDetails
             solutionId={selectedSolution}
             activeSection={activeSection}
             setActiveSection={setActiveSection}
             onClose={closeSolution}
           />
         ) : (
<WelcomePanel />
         )}
</div>
<footer className="footer">
<span>GCP Tech Transformation Solutions | Innovation Wiki</span>
<span className="footer-message">
<i></i>
           Ideas to Impact.
</span>
</footer>
</main>
</div>
 );
}
function WelcomePanel() {
 return (
<section className="welcome-panel">
<div className="welcome-icon">
<Lightbulb size={38} />
</div>
<h2>Explore CGN Innovations</h2>
<p>
       Select a solution above or from the navigation menu to explore its
       problem statement, solution, benefits, usage, access details and demo.
</p>
<div className="welcome-hint">
<ChevronRight size={18} />
       Information remains hidden until you select a solution.
</div>
</section>
 );
}
function SolutionDetails({
 solutionId,
 activeSection,
 setActiveSection,
 onClose,
}) {
 const content = solutionContent[solutionId];
 const solution = solutions.find((item) => item.id === solutionId);
 const HeaderIcon = solution.icon;
 return (
<section className="details-panel">
<div className="details-header">
<div className="details-heading">
<div
           className="details-main-icon"
           style={{
             color: solution.color,
             background: `${solution.color}12`,
           }}
>
<HeaderIcon size={42} />
</div>
<div>
<h2>{content.name}</h2>
<p>{content.tagline}</p>
</div>
</div>
<button
         className="close-button"
         onClick={onClose}
         aria-label="Close details"
>
<X size={24} />
</button>
</div>
<div className="details-layout">
<aside className="details-navigation">
         {sectionItems.map((item) => {
           const Icon = item.icon;
           return (
<button
               key={item.id}
               className={activeSection === item.id ? "active" : ""}
               onClick={() => setActiveSection(item.id)}
>
<Icon size={19} />
<span>{item.label}</span>
</button>
           );
         })}
</aside>
<div className="details-content">
         {activeSection === "overview" && (
<Overview content={content} solution={solution} />
         )}
         {activeSection === "problem" && (
<InformationSection
             icon={<FileText size={25} />}
             title="The Problem"
             text={content.problem}
           />
         )}
         {activeSection === "solution" && (
<InformationSection
             icon={<Lightbulb size={25} />}
             title="The Solution"
             text={content.solution}
           />
         )}
         {activeSection === "benefits" && (
<Benefits benefits={content.benefits} />
         )}
         {activeSection === "usage" && <Usage />}
         {activeSection === "performers" && <TopPerformers />}
         {activeSection === "access" && (
<AccessDetails content={content} />
         )}
         {activeSection === "feedback" && <Feedback />}
         {activeSection === "demo" && (
<Demo solutionName={content.shortName} />
         )}
</div>
</div>
</section>
 );
}
function Overview({ content, solution }) {
 const icons = [Users, ShieldCheck, Settings, MessageSquare];
 return (
<div className="section-animation">
<h2 className="content-title">Overview</h2>
<p className="overview-description">{content.overview}</p>
<div className="purpose-card">
<div
         className="purpose-icon"
         style={{ color: solution.color }}
>
<Target size={31} />
</div>
<div>
<strong>Purpose</strong>
<p>{content.purpose}</p>
</div>
</div>
<h3 className="content-subtitle">Key Highlights</h3>
<div className="highlight-grid">
       {content.highlights.map((highlight, index) => {
         const Icon = icons[index];
         return (
<div className="highlight-card" key={highlight}>
<Icon
               size={29}
               style={{ color: solution.color }}
             />
<span>{highlight}</span>
</div>
         );
       })}
</div>
<div className="innovation-quote">
<span className="quote-mark">“</span>
<p>
         From insight to action, from gaps to growth — building stronger
         technical talent and smarter operations.
</p>
</div>
</div>
 );
}
function InformationSection({ icon, title, text }) {
 return (
<div className="section-animation information-section">
<div className="information-heading">
<div className="information-icon">{icon}</div>
<h2>{title}</h2>
</div>
<div className="information-card">
<p>{text}</p>
</div>
</div>
 );
}
function Benefits({ benefits }) {
 return (
<div className="section-animation">
<h2 className="content-title">Key Benefits</h2>
<p className="section-intro">
       Key business and operational outcomes delivered by this solution.
</p>
<div className="benefits-grid">
       {benefits.map((benefit, index) => (
<div className="benefit-card" key={benefit.title}>
<div className="benefit-number">
             {String(index + 1).padStart(2, "0")}
</div>
<div>
<h3>{benefit.title}</h3>
<p>{benefit.text}</p>
</div>
</div>
       ))}
</div>
</div>
 );
}
function Usage() {
 const metrics = [
   { title: "Active Users", value: "—", icon: Users },
   { title: "Total Sessions", value: "—", icon: BarChart3 },
   { title: "Adoption Rate", value: "—%", icon: Target },
   { title: "Monthly Growth", value: "—%", icon: Zap },
 ];
 return (
<div className="section-animation">
<h2 className="content-title">Usage & Adoption</h2>
<p className="section-intro">
       Usage metrics can be connected to the application's analytics source.
</p>
<div className="metrics-grid">
       {metrics.map((metric) => {
         const Icon = metric.icon;
         return (
<div className="metric-card" key={metric.title}>
<div className="metric-icon">
<Icon size={24} />
</div>
<span>{metric.title}</span>
<strong>{metric.value}</strong>
</div>
         );
       })}
</div>
<div className="analytics-placeholder">
<BarChart3 size={38} />
<div>
<strong>Usage Analytics</strong>
<p>
           Connect the required data source/API to display live weekly and
           monthly adoption trends here.
</p>
</div>
</div>
</div>
 );
}
function TopPerformers() {
 return (
<div className="section-animation">
<h2 className="content-title">Top Performers</h2>
<p className="section-intro">
       Top performers can be populated dynamically from usage data.
</p>
<div className="performer-table-wrapper">
<table className="performer-table">
<thead>
<tr>
<th>Rank</th>
<th>User / Team</th>
<th>Usage</th>
<th>Impact</th>
</tr>
</thead>
<tbody>
           {[1, 2, 3].map((rank) => (
<tr key={rank}>
<td>
<span className="rank-badge">{rank}</span>
</td>
<td>To be connected</td>
<td>—</td>
<td>—</td>
</tr>
           ))}
</tbody>
</table>
</div>
</div>
 );
}
function AccessDetails({ content }) {
 const isUrl = content.access.startsWith("http");
 return (
<div className="section-animation">
<h2 className="content-title">Access Details</h2>
<p className="section-intro">
       Use the application link or contact the designated POC for access.
</p>
<div className="access-card">
<div className="access-icon">
<LinkIcon size={28} />
</div>
<div className="access-info">
<span>Application Access</span>
<strong>{content.access}</strong>
</div>
       {isUrl && (
<a
           href={content.access}
           target="_blank"
           rel="noreferrer"
           className="access-button"
>
           Open Tool
<ExternalLink size={17} />
</a>
       )}
</div>
<div className="poc-card">
<strong>Point of Contact</strong>
<p>Add the respective tool owner / POC details here.</p>
</div>
</div>
 );
}
function Feedback() {
 const [rating, setRating] = useState(0);
 const [message, setMessage] = useState("");
 const [submitted, setSubmitted] = useState(false);
 const submitFeedback = (event) => {
   event.preventDefault();
   if (!message.trim()) return;
   setSubmitted(true);
   setMessage("");
 };
 return (
<div className="section-animation">
<h2 className="content-title">Feedback</h2>
     {submitted && (
<div className="success-message">
         Thank you. Your feedback has been captured in this demo.
</div>
     )}
<form className="feedback-form" onSubmit={submitFeedback}>
<label>How would you rate this solution?</label>
<div className="rating">
         {[1, 2, 3, 4, 5].map((value) => (
<button
             type="button"
             key={value}
             className={value <= rating ? "selected" : ""}
             onClick={() => setRating(value)}
>
<Star size={26} />
</button>
         ))}
</div>
<label htmlFor="feedback">Share your feedback</label>
<textarea
         id="feedback"
         value={message}
         onChange={(event) => setMessage(event.target.value)}
         placeholder="Tell us what worked well and what can be improved..."
       />
<button className="submit-button" type="submit">
         Submit Feedback
</button>
</form>
</div>
 );
}
function Demo({ solutionName }) {
 return (
<div className="section-animation">
<h2 className="content-title">Demo</h2>
<p className="section-intro">
       Watch a short demonstration to understand the solution workflow.
</p>
<div className="demo-card">
<button className="play-button">
<PlayCircle size={70} />
</button>
<h3>{solutionName} Demo</h3>
<p>1-minute demonstration video</p>
<span>
         Demo content can be connected when the approved video is available.
</span>
</div>
</div>
 );
}
export default App;
