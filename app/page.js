"use client";

import { useEffect, useRef, useState } from "react";

const emailAddress = "imaayushpaneru@gmail.com";

/* Static media showcase. Published images are source-controlled assets. */
function MediaShowcaseSlot({
  label,
  aspect = "landscape",
  imageSrc = null,
  imageFit = "cover",
  visualTheme = "hero",
  visualIcon = "✦",
  visualTitle,
  visualDesc,
  visualTag,
  visualMeta,
}) {
  const aspectClass =
    aspect === "portrait"
      ? "aspect-portrait"
      : aspect === "large-landscape"
      ? "aspect-large-landscape"
      : "aspect-landscape";

  return (
    <div className={`media-showcase-box ${aspectClass}`} aria-label={label}>
      {imageSrc ? (
        <div
          className={`media-image-view ${imageFit === "contain" ? "media-image-contain" : ""}`}
          role="img"
          aria-label={label}
          style={{ backgroundImage: `url("${imageSrc}")` }}
        />
      ) : (
        /* Themed Graphic Mockup Visual */
        <div className={`mockup-visual mockup-theme-${visualTheme}`}>
          <div className="mockup-bg-pattern" />
          <div className="mockup-top-row">
            <span className="mockup-icon-badge">{visualIcon}</span>
            {visualTag && <span className="mockup-tag-pill">{visualTag}</span>}
          </div>

          {visualTheme === "hero" ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "auto 0" }}>
              <div className="mockup-hero-avatar">AP</div>
              <div className="mockup-title" style={{ fontSize: 18, marginTop: 4 }}>Aayush Paneru</div>
              <div className="mockup-desc" style={{ color: "#1e3a8a", fontWeight: 600 }}>
                Full Stack &amp; AI Systems Engineer
              </div>
              <span className="mockup-meta-pill" style={{ marginTop: 8 }}>
                Kathmandu, Nepal · Available
              </span>
            </div>
          ) : (
            <div className="mockup-content">
              <div className="mockup-title">{visualTitle}</div>
              {visualDesc && <div className="mockup-desc">{visualDesc}</div>}
              {visualMeta && <span className="mockup-meta-pill">{visualMeta}</span>}
            </div>
          )}

        </div>
      )}
    </div>
  );
}

function SocialIcon({ name }) {
  if (name === "instagram") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.6 21v-8h2.75l.42-3H13.6V8.1c0-.87.25-1.46 1.5-1.46h1.8V3.96A23.7 23.7 0 0 0 14.3 3C11.55 3 9.7 4.62 9.7 7.62V10H7v3h2.7v8h3.9Z" />
      </svg>
    );
  }

  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="5.5" cy="5.5" r="1.75" />
      <rect x="4" y="9" width="3" height="11" rx="0.5" />
      <path d="M10 9h3v1.5h.05A3.35 3.35 0 0 1 16.1 8.8c3.1 0 3.9 2.05 3.9 4.72V20h-3v-5.75c0-1.37-.03-3.13-1.9-3.13-1.9 0-2.2 1.48-2.2 3.03V20h-3V9Z" />
    </svg>
  );
}

export default function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState("2026");
  const [copyStatus, setCopyStatus] = useState("Copy");
  const [formFeedback, setFormFeedback] = useState("");
  const revealObserver = useRef(null);

  useEffect(() => {
    setCurrentYear(String(new Date().getFullYear()));

    revealObserver.current = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((item) => {
      revealObserver.current.observe(item);
    });

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll('.desktop-nav a[href^="#"]');
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    return () => {
      revealObserver.current?.disconnect();
      navObserver.disconnect();
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus("Copy"), 2200);
    } catch {
      window.location.href = `mailto:${emailAddress}`;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const topic = data.get("topic") || "General Inquiry";
    const message = data.get("message") || "";

    const subject = encodeURIComponent(`[Portfolio Inquiry] ${topic} — from ${name}`);
    const body = encodeURIComponent(
      `Hello Aayush,\n\n${message}\n\nWarm regards,\n${name}\nEmail: ${email}`
    );

    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    setFormFeedback("Your email draft has been prepared and opened in your email app!");
  };

  return (
    <>
      <div className="ambient-bg" aria-hidden="true" />
      <div className="ambient-grid" aria-hidden="true" />

      {/* HEADER / NAVIGATION */}
      <header className="site-header">
        <div className="container nav-inner">
          <a href="#top" className="brand-link" aria-label="Aayush Paneru Home">
            <span className="brand-badge">AP</span>
            <div className="brand-info">
              <span className="brand-title">Aayush Paneru</span>
              <span className="brand-subtitle">Full Stack &amp; AI Facilitator</span>
            </div>
          </a>

          <nav className="desktop-nav" aria-label="Main Navigation">
            <a href="#about" className="nav-link">About</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#sessions" className="nav-link">Sessions</a>
            <a href="#work" className="nav-link">Projects</a>
            <a href="#organizations" className="nav-link">Ventures</a>
            <a href="#contact" className="nav-cta-btn">
              Let’s Talk
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </nav>

          <button
            className={`mobile-menu-btn ${menuOpen ? "open" : ""}`}
            type="button"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer ${menuOpen ? "open" : ""}`}>
          <a href="#about" className="nav-link" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#experience" className="nav-link" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#sessions" className="nav-link" onClick={() => setMenuOpen(false)}>Sessions</a>
          <a href="#work" className="nav-link" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#organizations" className="nav-link" onClick={() => setMenuOpen(false)}>Ventures</a>
          <a href="#contact" className="nav-cta-btn" onClick={() => setMenuOpen(false)}>Let’s Talk ↗</a>
        </div>
      </header>

      <main id="top">
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-left-column">
            <div className="hero-content reveal">
              <div className="badge-pill badge-live">
                <span className="pulse-dot" />
                Open for selected projects &amp; tech sessions
              </div>

              <div className="hero-kicker">
                <span className="hero-kicker-number">01</span>
                <span>Digital builder / facilitator</span>
                <span className="hero-kicker-line" />
              </div>

              <div className="hero-roles">
                <span className="hero-role-chip">Web</span>
                <span className="hero-role-chip">AI</span>
                <span className="hero-role-chip">Cloud</span>
                <span className="hero-role-chip">Cybersecurity</span>
              </div>

              <h1 className="hero-headline">
                I turn big ideas into <em>digital momentum.</em>
              </h1>

              <p className="hero-bio">
                I’m <strong>Aayush Paneru</strong> — a full stack builder and technology facilitator from Nepal.
                I ship web platforms, explore AI systems, and make cloud computing and cybersecurity easier to understand
                through practical sessions.
              </p>

              <div className="hero-actions">
                <a href="#work" className="btn btn-primary">
                  Explore Selected Work
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                </a>
                <a href="#contact" className="btn btn-secondary">
                  Get in Touch
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>

              <div className="hero-meta-bar">
                <div className="meta-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span><strong>Nepal</strong></span>
                </div>
                <div className="meta-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>Quick response within 24 hours</span>
                </div>
              </div>
            </div>

            <div className="impact-card hero-impact-card reveal">
              <div className="impact-item">
                <div className="impact-number">3<span>+</span></div>
                <div className="impact-label">Years of Experience</div>
                <div className="impact-desc">In web architecture &amp; digital growth</div>
              </div>
              <div className="impact-item">
                <div className="impact-number">8<span>-Day</span></div>
                <div className="impact-label">Intensive Bootcamps</div>
                <div className="impact-desc">Municipal-level AI &amp; cyber programmes</div>
              </div>
              <div className="impact-item">
                <div className="impact-number">1000<span>+</span></div>
                <div className="impact-label">Students Mentored</div>
                <div className="impact-desc">Across schools, colleges &amp; workshops</div>
              </div>
              <div className="impact-item">
                <div className="impact-number">5<span>+</span></div>
                <div className="impact-label">Organizations Advised</div>
                <div className="impact-desc">News platforms, startups &amp; councils</div>
              </div>
            </div>
            </div>

            {/* Hero Visual Card */}
            <div className="portrait-showcase reveal reveal-delay-1">
              <div className="portrait-card">
                <div className="portrait-card-header">
                  <span className="portrait-kicker">Formal portrait</span>
                </div>

                <div className="portrait-frame">
                <MediaShowcaseSlot
                  label="Formal Portrait of Aayush Paneru"
                  aspect="portrait"
                  imageSrc="/images/Aayush-Professional-Photograph.png"
                  visualTheme="hero"
                  visualIcon="👨‍💻"
                  visualTitle="Aayush Paneru"
                  visualTag="Executive"
                />
                  <span className="portrait-float-tag">build · teach · secure</span>
                </div>

                <div className="portrait-card-footer">
                  <div className="portrait-author">
                    <strong>Aayush Paneru</strong>
                    <span>Web · AI · Cloud · Cybersecurity</span>
                  </div>
                  <span className="portrait-arrow" aria-hidden="true">↗</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: ABOUT & CORE PILLARS */}
        <section id="about" className="section-wrapper section-about">
          <div className="container">
            <div className="section-header reveal">
              <span className="section-tag">01 · About &amp; Capabilities</span>
              <h2 className="section-title">
                Bridging software engineering, artificial intelligence &amp; <em>education.</em>
              </h2>
              <p className="section-desc">
                My work centers on building dependable web systems, making modern technologies like AI and cloud computing
                approachable, and empowering learners and organizations to adopt technology with confidence.
              </p>
            </div>

            <div className="about-grid">
              <div className="pillar-card reveal">
                <div className="pillar-header">
                  <div className="pillar-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <span className="pillar-index">01</span>
                </div>
                <h3 className="pillar-title">Full Stack Web Development</h3>
                <p className="pillar-desc">
                  Building responsive, accessible, and performant web interfaces backed by clean, maintainable
                  APIs and database integrations. Focused on user experience and robust component architecture.
                </p>
                <div className="pillar-tags">
                  <span className="pill-tag">Next.js</span>
                  <span className="pill-tag">React</span>
                  <span className="pill-tag">JavaScript / ES6+</span>
                  <span className="pill-tag">Modern CSS</span>
                  <span className="pill-tag">REST APIs</span>
                </div>
              </div>

              <div className="pillar-card reveal reveal-delay-1">
                <div className="pillar-header">
                  <div className="pillar-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
                      <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6z" />
                      <path d="M12 10a2 2 0 1 0 2 2 2 2 0 0 0-2-2z" />
                    </svg>
                  </div>
                  <span className="pillar-index">02</span>
                </div>
                <h3 className="pillar-title">AI &amp; Deep Learning Research</h3>
                <p className="pillar-desc">
                  Exploring practical machine learning implementations, computer vision, and synthetic image
                  detection systems like YatharthaPix to evaluate real versus AI generated media.
                </p>
                <div className="pillar-tags">
                  <span className="pill-tag">Deep Learning</span>
                  <span className="pill-tag">Computer Vision</span>
                  <span className="pill-tag">Synthetic Detection</span>
                  <span className="pill-tag">AI Literacy</span>
                </div>
              </div>

              <div className="pillar-card reveal">
                <div className="pillar-header">
                  <div className="pillar-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                    </svg>
                  </div>
                  <span className="pillar-index">03</span>
                </div>
                <h3 className="pillar-title">Cloud Computing Architecture</h3>
                <p className="pillar-desc">
                  Facilitating cloud fundamentals, hosting infrastructure, virtual machines, and cloud-native
                  services for student cohorts and organizations transitioning into modern cloud environments.
                </p>
                <div className="pillar-tags">
                  <span className="pill-tag">Cloud Foundations</span>
                  <span className="pill-tag">Deployments</span>
                  <span className="pill-tag">Scalability</span>
                  <span className="pill-tag">Infrastructure</span>
                </div>
              </div>

              <div className="pillar-card reveal reveal-delay-1">
                <div className="pillar-header">
                  <div className="pillar-icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <span className="pillar-index">04</span>
                </div>
                <h3 className="pillar-title">Cybersecurity &amp; Training</h3>
                <p className="pillar-desc">
                  Conducting extensive, interactive workshops across schools and colleges on cyber hygiene,
                  digital safety, social engineering defense, and technical awareness.
                </p>
                <div className="pillar-tags">
                  <span className="pill-tag">Cyber Hygiene</span>
                  <span className="pill-tag">School Bootcamps</span>
                  <span className="pill-tag">Threat Awareness</span>
                  <span className="pill-tag">Pedagogy</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: EXPERIENCE & EDUCATION */}
        <section id="experience" className="section-wrapper section-experience">
          <div className="container">
            <div className="section-header reveal">
              <span className="section-tag">02 · Career &amp; Academic Journey</span>
              <h2 className="section-title">
                Experience shaped by <em>curiosity &amp; execution.</em>
              </h2>
              <p className="section-desc">
                From frontend engineering to digital marketing strategy and technical leadership, every chapter has reinforced
                the commitment to delivering clear, dependable outcomes.
              </p>
            </div>

            <div className="experience-layout">
              {/* Professional Timeline */}
              <div className="timeline-list">
                <article className="timeline-card active reveal">
                  <div className="timeline-dot">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-badge-row">
                      <span className="timeline-period current">APR 2025 — PRESENT</span>
                      <span className="timeline-company">Agni Hospitality</span>
                    </div>
                    <h3 className="timeline-role">Business Development Executive</h3>
                    <p className="timeline-desc">
                      Leading relationship building, strategic opportunity identification, and market positioning to turn
                      hospitality initiatives into tangible, sustainable commercial growth.
                    </p>
                    <div className="timeline-skills">
                      <span className="pill-tag">Strategic Partnerships</span>
                      <span className="pill-tag">Business Growth</span>
                      <span className="pill-tag">Client Engagement</span>
                    </div>
                  </div>
                </article>

                <article className="timeline-card reveal reveal-delay-1">
                  <div className="timeline-dot">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-badge-row">
                      <span className="timeline-period">NOV 2022 — DEC 2024</span>
                      <span className="timeline-company">MyuNepal Pvt. Ltd.</span>
                    </div>
                    <h3 className="timeline-role">Digital Marketing Executive</h3>
                    <p className="timeline-desc">
                      Generated digital momentum across online channels through data-backed campaigns, strategic audience
                      segmentation, and conversion rate optimization.
                    </p>
                    <div className="timeline-skills">
                      <span className="pill-tag">Digital Strategy</span>
                      <span className="pill-tag">Content Direction</span>
                      <span className="pill-tag">Analytics</span>
                    </div>
                  </div>
                </article>

                <article className="timeline-card reveal reveal-delay-2">
                  <div className="timeline-dot">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-badge-row">
                      <span className="timeline-period">FEB 2022 — AUG 2022</span>
                      <span className="timeline-company">AB Tech Venture</span>
                    </div>
                    <h3 className="timeline-role">Frontend Web Developer</h3>
                    <p className="timeline-desc">
                      Engineered modern, responsive web interfaces, implemented UI specifications with pixel perfection,
                      and optimized web assets for fast loading times across client projects.
                    </p>
                    <div className="timeline-skills">
                      <span className="pill-tag">Responsive UI</span>
                      <span className="pill-tag">Web Development</span>
                      <span className="pill-tag">Interface Design</span>
                    </div>
                  </div>
                </article>
              </div>

              {/* Education Cards */}
              <div className="education-column">
                <div className="education-card reveal">
                  <div className="edu-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <div className="edu-info">
                    <h4>B.Sc (Hons) Information Technology</h4>
                    <p>Lord Buddha Education Foundation<br />Maitidevi, Kathmandu</p>
                    <span className="edu-status">Completed</span>
                  </div>
                </div>

                <div className="education-card reveal reveal-delay-1">
                  <div className="edu-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  </div>
                  <div className="edu-info">
                    <h4>Higher Secondary Education (+2) – Science</h4>
                    <p>Aishwarya Vidya Niketan<br />Hasanpur, Dhangadhi</p>
                    <span className="edu-status">Completed</span>
                  </div>
                </div>

                <div className="education-card reveal reveal-delay-2">
                  <div className="edu-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div className="edu-info">
                    <h4>Secondary Education Examination (SEE)</h4>
                    <p>Kanchanjunga English Secondary School<br />Gulariya, Kanchanpur<br />Nursery to Grade 10</p>
                    <span className="edu-status">Completed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SESSIONS & WORKSHOPS (Both feature boxes prominent & large) */}
        <section id="sessions" className="section-wrapper section-sessions">
          <div className="container">
            <div className="section-header reveal">
              <span className="section-tag">03 · Tech Facilitation &amp; Training</span>
              <h2 className="section-title">
                Hands on learning that inspires <em>practical confidence.</em>
              </h2>
              <p className="section-desc">
                Leading impactful learning initiatives across municipal schools and colleges — demystifying
                AI, digital safety, and cloud infrastructure for thousands of learners.
              </p>
            </div>

            <div className="sessions-grid">
              {/* Feature Session 1: Krishnapur Municipality */}
              <article className="session-feature-card reveal">
                <div className="session-pill">Featured Municipal Programme</div>
                <h3 className="session-title">
                  8 Day Cybersecurity Awareness Campaign
                </h3>
                <p className="session-desc">
                  An 8 day campaign conducted across schools and colleges in Krishnapur Municipality Ward 5 from Baisakh 30 to Jestha 8.
                  The sessions covered cybersecurity, digital awareness, safe internet use, cybercrime prevention, and the responsible use of AI
                  through interactive and practical learning.
                </p>

                <div className="session-stats-row">
                  <div className="session-stat">
                      <strong>8 Days</strong>
                    <span>Duration</span>
                  </div>
                  <div className="session-stat">
                    <strong>Ward 5 Schools</strong>
                    <span>Coverage</span>
                  </div>
                  <div className="session-stat">
                    <strong>750+ Students</strong>
                    <span>In these 8 days</span>
                  </div>
                </div>

                <MediaShowcaseSlot
                  label="Krishnapur Municipality 8 Day Bootcamp"
                  aspect="large-landscape"
                  imageSrc="/images/Cybersecurity-Session.png"
                  visualTheme="krishnapur"
                  visualIcon="🛡️"
                  visualTitle="Cybersecurity Awareness Campaign"
                    visualDesc="8 day practical sessions across schools and colleges in Krishnapur Ward 5"
                  visualTag="Cybersecurity Session"
                  visualMeta="750+ Students Trained"
                />
              </article>

              {/* Feature Session 2: AWS Fundamentals Workshop */}
              <article className="session-feature-card reveal reveal-delay-1">
                <div className="session-pill" style={{ background: "#ecfdf5", color: "#065f46" }}>
                  AWS Cloud Workshop
                </div>
                <h3 className="session-title">
                  AWS Fundamentals Workshop
                </h3>
                <p className="session-desc">
                  An engaging introduction to cloud computing with Amazon Web Services, taking learners from core cloud concepts
                  to hands on experience hosting a static website on Amazon S3. The workshop encouraged curiosity, collaboration,
                  and practical confidence for students beginning their cloud journey.
                </p>

                <div className="session-stats-row">
                  <div className="session-stat">
                    <strong>AWS</strong>
                    <span>Platform</span>
                  </div>
                  <div className="session-stat">
                    <strong>Amazon S3</strong>
                    <span>Hands on Hosting</span>
                  </div>
                  <div className="session-stat">
                    <strong>Practical</strong>
                    <span>Learning</span>
                  </div>
                </div>

                <MediaShowcaseSlot
                  label="AWS Fundamentals Workshop"
                  aspect="large-landscape"
                  imageSrc="/images/AWS-Cloud-Session.png"
                  visualTheme="cloud"
                  visualIcon="☁️"
                  visualTitle="AWS Fundamentals Workshop"
                    visualDesc="Cloud foundations with hands on static website hosting on Amazon S3"
                  visualTag="AWS Cloud Session"
                  visualMeta="Amazon S3 · Static Website Hosting"
                />
              </article>

              {/* Full Width Philosophy Banner */}
              <div className="philosophy-banner reveal">
                <div className="philosophy-icon">“</div>
                <p className="philosophy-text">
                  Teach technology in a way that empowers learners to keep asking better questions long after the room goes quiet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: SELECTED WORK & CLIENT PROJECTS */}
        <section id="work" className="section-wrapper section-work">
          <div className="container">
            <div className="section-header reveal">
              <span className="section-tag">04 · Client Projects &amp; Independent Work</span>
              <h2 className="section-title">
                Digital platforms &amp; systems <em>I engineered.</em>
              </h2>
              <p className="section-desc">
                A snapshot of shipped client platforms, digital ventures, and an independent AI research direction.
              </p>
            </div>

            <div className="projects-grid">
              {/* Project 1: Sarwanam Theatre Platform */}
              <article className="project-card reveal">
                <div className="project-upload-wrap">
                  <MediaShowcaseSlot
                    label="Sarwanam Theatre Platform"
                    aspect="landscape"
                    imageSrc="/images/Sarwanam-Landing.png"
                    visualTheme="sarwanam"
                    visualIcon="🎭"
                    visualTitle="Sarwanam Theatre Platform"
                    visualDesc="Nepal's pioneer theatre group official web system"
                    visualTag="Client Platform"
                    visualMeta="sarwanam.org.np"
                  />
                </div>
                <div className="project-body">
                  <span className="project-role-badge">Client project · Web development</span>
                  <h3 className="project-title">Sarwanam Theatre Platform</h3>
                  <p className="project-summary">
                    Built for Sarwanam, Nepal’s legendary pioneer theatre group and cultural institution. I contributed to the
                    architecture and development of their official web platform for stage productions, theatre archives, news, and creative community initiatives.
                  </p>
                  <div className="project-footer">
                    <span className="project-tech">React · Next.js · Culture &amp; Arts</span>
                    <a
                      href="https://sarwanam.org.np/"
                      target="_blank"
                      rel="noreferrer"
                      className="project-link-btn"
                    >
                      Visit Website ↗
                    </a>
                  </div>
                </div>
              </article>

              {/* Project 2: Leo District Council 325 I */}
              <article className="project-card reveal reveal-delay-1">
                <div className="project-upload-wrap">
                  <MediaShowcaseSlot
                    label="Leo District Council 325 I Nepal Portal"
                    aspect="landscape"
                    imageSrc="/images/LDC325I-Landing.png"
                    visualTheme="leo"
                    visualIcon="🦁"
                    visualTitle="Leo District Council 325 I Nepal"
                    visualDesc="Official leadership, event directory &amp; administration portal"
                    visualTag="Client Portal"
                    visualMeta="ldc325inepal.org"
                  />
                </div>
                <div className="project-body">
                  <span className="project-role-badge">Client project · Web development</span>
                  <h3 className="project-title">Leo District Council 325 I Nepal</h3>
                  <p className="project-summary">
                    Built for Leo District Council 325 I Nepal, a prominent youth leadership and community service network. I developed
                    the portal to manage leadership directories, district events, news, and nationwide humanitarian initiatives.
                  </p>
                  <div className="project-footer">
                    <span className="project-tech">Community Portal · Web Engineering</span>
                    <a
                      href="https://ldc325inepal.org/"
                      target="_blank"
                      rel="noreferrer"
                      className="project-link-btn"
                    >
                      Visit Website ↗
                    </a>
                  </div>
                </div>
              </article>

              {/* Project 3: YatharthaPix */}
              <article className="project-card reveal reveal-delay-2">
                <div className="project-upload-wrap">
                  <MediaShowcaseSlot
                    label="YatharthaPix AI Detection Engine"
                    aspect="landscape"
                    imageSrc="/images/YatharthaPix-Logo.png"
                    imageFit="contain"
                    visualTheme="yathartha"
                    visualIcon="🧠"
                    visualTitle="YatharthaPix AI Detection System"
                    visualDesc="Deep learning and computer vision for identifying synthetic imagery"
                    visualTag="AI Research Project"
                    visualMeta="Synthetic Media"
                  />
                </div>
                <div className="project-body">
                  <span className="project-role-badge sole">Independent AI Research</span>
                  <h3 className="project-title">YatharthaPix AI Detection System</h3>
                  <p className="project-summary">
                    An independent AI research project exploring deep learning and computer vision techniques for identifying synthetic and AI generated imagery.
                    YatharthaPix is designed to help distinguish authentic photographs from machine-generated visuals.
                  </p>
                  <div className="project-footer">
                    <span className="project-tech">Synthetic media detection</span>
                    <span className="pill-tag">Independent Project</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION 5: VENTURES & DIGITAL PLATFORMS (SajhaKhabar & OrbitSkincare) */}
        <section id="organizations" className="section-wrapper section-ventures">
          <div className="container">
            <div className="section-header reveal">
              <span className="section-tag">05 · Digital Ventures &amp; Platforms</span>
              <h2 className="section-title">
                Digital ventures &amp; platforms <em>with meaningful impact.</em>
              </h2>
              <p className="section-desc">
                Digital platforms and consumer ventures in Nepal where I contribute to technical infrastructure, digital presence, and technology strategy.
              </p>
            </div>

            <div className="organizations-grid">
              {/* SajhaKhabar */}
              <article className="org-card reveal">
                <MediaShowcaseSlot
                  label="SajhaKhabar Digital News Media"
                  aspect="landscape"
                  imageSrc="/images/SajhaKhabar-Landing.png"
                  imageFit="contain"
                  visualTheme="sajhakhabar"
                  visualIcon="📰"
                  visualTitle="SajhaKhabar Digital Media"
                  visualDesc="National news reporting &amp; investigative digital journalism"
                  visualTag="News Platform"
                  visualMeta="sajhakhabar.com · IT Advisory"
                />
                <div className="org-body">
                  <div className="org-badge-row">
                    <span className="org-ownership-badge">Digital venture</span>
                    <span className="org-role-tag">IT &amp; Tech Advisor</span>
                  </div>
                  <h3 className="org-name">SajhaKhabar</h3>
                  <p className="org-desc">
                    A digital news media portal covering timely reporting, public affairs, and journalism in Nepal.
                    Leading the technology architecture, portal uptime, hosting infrastructure, and digital strategy.
                  </p>
                  <div className="org-footer">
                    <span className="pill-tag">sajhakhabar.com</span>
                    <a
                      href="https://www.sajhakhabar.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="project-link-btn"
                    >
                      Visit SajhaKhabar ↗
                    </a>
                  </div>
                </div>
              </article>

              {/* OrbitSkincare */}
              <article className="org-card reveal reveal-delay-1">
                <MediaShowcaseSlot
                  label="OrbitSkincare E-Commerce Platform"
                  aspect="landscape"
                  imageSrc="/images/OrbitSkincare-Landing.png"
                  imageFit="contain"
                  visualTheme="orbitskincare"
                  visualIcon="✨"
                  visualTitle="OrbitSkincare Brand &amp; Store"
                  visualDesc="Dedicated beauty &amp; skincare e-commerce platform in Nepal"
                  visualTag="Skincare Venture"
                  visualMeta="orbitskincare.com · Web Lead"
                />
                <div className="org-body">
                  <div className="org-badge-row">
                    <span className="org-ownership-badge" style={{ background: "#fdf2f8", color: "#9d174d", borderColor: "#fbcfe8" }}>
                      Skincare Venture
                    </span>
                    <span className="org-role-tag">Technology &amp; Web Presence</span>
                  </div>
                  <h3 className="org-name">OrbitSkincare</h3>
                  <p className="org-desc">
                    A dedicated skincare brand and e-commerce platform in Nepal. Engineered to deliver a modern shopping experience,
                    product authenticity, and reliable digital presence.
                  </p>
                  <div className="org-footer">
                    <span className="pill-tag">orbitskincare.com</span>
                    <a
                      href="https://orbitskincare.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="project-link-btn"
                    >
                      Visit OrbitSkincare ↗
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION 6: SOCIAL REDIRECTS */}
        <section id="socials" className="social-section section-social">
          <div className="container">
            <div className="social-banner reveal">
              <div className="social-header">
                <div>
                  <h3 className="social-title">Connect with Aayush Paneru</h3>
                  <p className="social-subtitle">LinkedIn, Facebook, and Instagram profiles</p>
                </div>
                <span className="badge-pill badge-live">Official Profiles</span>
              </div>

              <div className="social-links-grid">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/aayush-paneru"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link-card"
                >
                  <span className="social-icon-bubble" style={{ color: "#0a66c2" }}><SocialIcon name="linkedin" /></span>
                  <span>LinkedIn Profile ↗</span>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/aayush.paneru.938602/"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link-card"
                >
                  <span className="social-icon-bubble" style={{ color: "#1877f2" }}><SocialIcon name="facebook" /></span>
                  <span>Facebook Profile ↗</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/paneruaayush"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link-card"
                >
                  <span className="social-icon-bubble" style={{ color: "#e1306c" }}><SocialIcon name="instagram" /></span>
                  <span>Instagram Profile ↗</span>
                </a>

              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: CONTACT & INQUIRY */}
        <section id="contact" className="section-wrapper section-contact">
          <div className="container">
            <div className="contact-section-inner reveal">
              <div className="contact-left">
                <div className="section-tag">06 · Get in Touch</div>
                <div className="contact-identity">
                  <strong>Aayush Paneru</strong>
                  <span>Full Stack Developer · AI &amp; Cloud Facilitator</span>
                </div>
                <div className="contact-copy">
                  <h2>Have an idea, project, or session in mind?</h2>
                  <p>
                    Whether you are seeking full stack web engineering, technology advisory, or want to organize a hands on
                    AI / cybersecurity training session, I would love to connect.
                  </p>
                </div>

                {/* Instant Email Copy Widget */}
                <div
                  className="copy-email-box"
                  onClick={handleCopyEmail}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleCopyEmail()}
                >
                  <span className="email-address-text">{emailAddress}</span>
                  <span className={`copy-pill-btn ${copyStatus === "Copied!" ? "copied" : ""}`}>
                    {copyStatus === "Copied!" ? (
                      <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        Copy
                      </>
                    )}
                  </span>
                </div>

                <div className="contact-direct-links">
                  <a href={`mailto:${emailAddress}`} className="contact-link-item">
                    <span className="contact-link-icon">✉</span>
                    <span>Email: {emailAddress}</span>
                  </a>
                  <div className="contact-link-item">
                    <span className="contact-link-icon">📍</span>
                    <span>Kathmandu, Nepal (Available Worldwide)</span>
                  </div>
                </div>
              </div>

              {/* Interactive Contact Form */}
              <form className="contact-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" placeholder="Aayush Paneru" required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" name="email" type="email" placeholder="imaayushpaneru@gmail.com" required />
                </div>

                <div className="form-group">
                  <label htmlFor="topic">Topic / Purpose</label>
                  <input id="topic" name="topic" type="text" placeholder="e.g. Workshop Session / Web Project" />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea id="message" name="message" rows="4" placeholder="Tell me a little about your project or timeline..." required />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  Open Email Draft
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>

                {formFeedback && <p className="form-note" style={{ color: "var(--accent-primary)", fontWeight: 600 }}>{formFeedback}</p>}
                {!formFeedback && (
                  <p className="form-note">
                    Submitting opens your email app with the details pre-filled and ready to send.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <span className="brand-badge" style={{ width: 32, height: 32, fontSize: 12 }}>AP</span>
            <span className="footer-copy">
              © {currentYear} Aayush Paneru · Building, explaining &amp; moving technology forward.
            </span>
          </div>

          <div>
            <a href="#top" className="back-to-top-btn" aria-label="Back to top of page">
              Back to Top
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

    </>
  );
}

