'use client';

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FaLinkedin, FaInstagram, FaGithub, FaGoodreads, FaEnvelope } from "react-icons/fa";
import WebsitePreview from './components/WebsitePreview';

const menuItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "blog", label: "Blog" },
];

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState("about");

  // Section refs
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const blogRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const sectionRefs = [
      { id: "about", ref: aboutRef },
      { id: "experience", ref: experienceRef },
      { id: "projects", ref: projectsRef },
      { id: "blog", ref: blogRef },
    ];
    const observer = new window.IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -40% 0px",
        threshold: 0.1,
      }
    );
    sectionRefs.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, []);

  const handleMenuClick = (id: string) => {
    setActive(id);
    if (id === "about") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
      {/* Glow Effect */}
      <div
        className="pointer-events-none fixed top-0 left-0 w-full h-full z-0"
        style={{
          background: `radial-gradient(600px at ${mouse.x}px ${mouse.y}px, rgba(80, 120, 255, 0.10), transparent 80%)`,
          transition: "background 0.1s",
        }}
      />
      
      {/* Mobile Header */}
      <header className="lg:hidden block w-full bg-[#0F172A]">
        <div className="px-6 py-12">
          <h1 className="text-4xl font-bold text-white mb-2">Lux Yoga</h1>
          <p className="text-xl text-white mb-4">UX Designer & Software Engineer</p>
          <p className="text-m text-[#94A3B8] mb-6">I build accessible, pixel-perfect digital experiences for the web and mobile platforms.</p>
          <div className="flex gap-4 text-2xl text-[#94A3B8]">
            <a href="https://www.linkedin.com/in/luxyoga/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="https://www.instagram.com/lux.productdesign/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://github.com/luxyoga" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href="https://www.goodreads.com/user/show/192467159-lux-yogasegaran" target="_blank" rel="noopener noreferrer" aria-label="Goodreads"><FaGoodreads /></a>
            <a href="mailto:luxman.yoga@gmail.com" aria-label="Email"><FaEnvelope /></a>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-[40vw] max-w-[700px] px-32 z-10 backdrop-blur-md bg-transparent">
          <div className="flex flex-col h-full ml-4" style={{ paddingTop: '6rem' }}>
            <h1 className="text-5xl font-bold mb-2">Lux Yoga</h1>
            <h2 className="text-xl font-medium text-white mb-8">UX Designer & Software Engineer</h2>
            <p className="mb-14 text-m text-[#94A3B8]">I build accessible, pixel-perfect digital experiences for the web and mobile platforms.</p>
            <nav className="flex flex-col gap-8 mt-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className="flex items-center group focus:outline-none"
                >
                  <span
                    className={
                      active === item.id
                        ? "h-0.5 w-12 mr-6 bg-white rounded transition-all duration-300"
                        : "h-0.5 w-6 mr-6 bg-white/40 rounded transition-all duration-300"
                    }
                  ></span>
                  <span
                    className={
                      `text-xs tracking-wide uppercase transition-all duration-300 ` +
                      (active === item.id
                        ? "font-bold text-white"
                        : "font-medium text-white/60")
                    }
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>
            
            {/* Social Links */}
            <div className="flex gap-4 text-xl text-[#94A3B8] mt-12">
              <a href="https://www.linkedin.com/in/luxyoga/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#5DE7D4] transition-colors duration-300"><FaLinkedin /></a>
              <a href="https://www.instagram.com/lux.productdesign/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#5DE7D4] transition-colors duration-300"><FaInstagram /></a>
              <a href="https://github.com/luxyoga" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-[#5DE7D4] transition-colors duration-300"><FaGithub /></a>
              <a href="https://www.goodreads.com/user/show/192467159-lux-yogasegaran" target="_blank" rel="noopener noreferrer" aria-label="Goodreads" className="hover:text-[#5DE7D4] transition-colors duration-300"><FaGoodreads /></a>
              <a href="mailto:luxman.yoga@gmail.com" aria-label="Email" className="hover:text-[#5DE7D4] transition-colors duration-300"><FaEnvelope /></a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 z-10 relative pt-0 lg:pt-0 lg:ml-[50vw]" style={{ paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '2rem' }}>
          <div className="lg:pl-8 lg:pr-24 pt-4 lg:pt-24">
            <section id="about" ref={aboutRef} className="mb-16">
              <h2 className="lg:hidden sticky top-0 z-30 py-2 text-sm font-bold text-white mb-2 tracking-widest">ABOUT</h2>
              <p className="text-m text-[#94A3B8] mb-4">
              I'm a multidisciplinary designer, developer, and certified project manager with 7+
              years of experience creating accessible digital experiences across diverse
              industries. I am skilled at translating user research into performant web and mobile solutions
              using WordPress, Shopify, and fully custom development. My experience spans
              healthcare regulatory compliance, fundraising platforms, and e-commerce
              systems. I blend technical expertise with user-centered design principles to
              deliver meaningful digital products. 
              </p>
              <p className="text-m text-[#94A3B8] mb-4">
                Looking ahead, I'm passionate about applying my skills to the EV and sustainability sectors, where thoughtful design can drive meaningful environmental impact.
              </p>
              <p className="text-m text-[#94A3B8] mb-4">
                In my spare time - I'm usually painting miniatures, playing TCGs, or reading.
              </p>
              <p className="text-m text-[#94A3B8] mb-4">
                Now based in Copenhagen, originally from Toronto.
                <br></br>Native English speaker, currently learning Danish.
              </p>
              <p className="text-m text-[#94A3B8] mb-4">
                Tak for besøget!
              </p>
            </section>
          <section id="experience" ref={experienceRef} className="mb-16">
            <h2 className="lg:hidden sticky top-0 z-30 py-2 text-sm font-bold text-white mb-2 tracking-widest">EXPERIENCE</h2>
            <div className="space-y-0">
              <div className="-mb-4">

            
              {/* Experience Entry 1 */}
              <a href="https://www.ascendfs.com/" target="_blank" rel="noopener noreferrer" className="block">
                <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start">
                    <div className="w-full lg:w-24 flex-shrink-0">
                      <p className="text-xs text-[#94A3B8] lg:whitespace-nowrap lg:pt-1">2024 — PRESENT</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2 mb-2">
                        <h3 className="text-m font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300 lg:whitespace-nowrap">
                          Project Manager
                        </h3>
                        <span className="hidden lg:inline text-[#94A3B8]">·</span>
                        <span className="text-m font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300 flex items-center gap-1 lg:whitespace-nowrap">
                          Ascend Fundraising Solutions
                          <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </span>
                      </div>
                      <p className="text-m text-[#94A3B8] lg:-mt-2 mb-2">Web Developer</p>
                      <p className="text-[#94A3B8] text-sm mb-3">
                      Lead web development projects from conception to delivery while managing cross-functional teams and timelines. Build accessible, SEO-optimized solutions and coordinate with designers and product managers to ensure research findings drive development priorities. Analyze user data to inform project scope and measure success metrics.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">JavaScript</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Next.js</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">React</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">WordPress</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Shopify</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">HTML & SCSS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Experience Entry 2 */}
              <a href="https://tankww.com/en/" target="_blank" rel="noopener noreferrer" className="block">
                <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start">
                    <div className="w-full lg:w-24 flex-shrink-0">
                      <p className="text-xs text-[#94A3B8] lg:pt-1">2022 — 2023</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2 mb-2">
                        <h3 className="text-m font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300">
                          UX Designer
                        </h3>
                        <span className="hidden lg:inline text-[#94A3B8]">·</span>
                        <span className="text-m font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300 flex items-center gap-1">
                          Tank Worldwide
                          <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </span>
                      </div>
                      <div className="text-sm text-[#94A3B8] mb-2">
                      </div>
                      <p className="text-[#94A3B8] text-sm mb-3">
                      Develop user-centered healthcare digital products within complex regulatory frameworks for major pharmaceutical clients. Collaborate across disciplines to deliver FDA and Health Canada compliant solutions while maintaining optimal user experiences. Contribute innovative feature concepts through structured ideation and data-driven design processes.                  </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Figma</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">UserTesting</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Adobe XD</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">UXCam</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Axure RP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Experience Entry 3 */}
              <a href="https://luxdesign.studio/" target="_blank" rel="noopener noreferrer" className="block">
                <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start">
                    <div className="w-full lg:w-24 flex-shrink-0">
                      <p className="text-xs text-[#94A3B8] lg:whitespace-nowrap lg:pt-1">2017 — PRESENT</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2 mb-2">
                        <h3 className="text-m font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300 lg:whitespace-nowrap">
                          Freelance Web Designer, Web Developer
                        </h3>
                        <span className="hidden lg:inline text-[#94A3B8]">·</span>
                        <span className="text-m font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300 flex items-center gap-1 lg:whitespace-nowrap">
                          Lux Design
                          <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </span>
                      </div>
                      <p className="text-[#94A3B8] text-sm mb-3">
                        Build custom digital solutions across WordPress, Elementor, Shopify, and fully custom platforms based on client requirements and project scope. Conduct user research, usability testing, and competitive analysis to guide platform selection and design decisions. Provide ongoing support through feature development and technical support.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">WordPress</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Elementor</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Shopify</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">HTML & CSS</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Javascript</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">jQuery</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Next.js</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">React</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Tailwind CSS</span>
                      </div>
                    </div>
                  </div>
                </div>
          </a>
        </div>
          </div>
          </section>

          {/* Resume Link */}
          <section className="mb-16">
            <a 
              href="/resume.html" 
          target="_blank"
          rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-m font-semibold text-[#94A3B8] hover:text-[#5DE7D4] transition-colors duration-300"
            >
              View Full Resume
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            </a>
          </section>

          {/* Projects Section */}
          <section id="projects" ref={projectsRef} className="mb-16">
            <h2 className="lg:hidden sticky top-0 z-30 py-2 text-sm font-bold text-white mb-2 tracking-widest">WORK</h2>
            <div className="space-y-0">
              <div className="-mb-4">
              
              {/* Project Entry 1 */}
              <a href="https://onegreatlottery.ca/" target="_blank" rel="noopener noreferrer" className="block">
                <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                    {/* Preview Window */}
                    <div className="w-full lg:w-48 flex-shrink-0">
                      <WebsitePreview 
                        imagePath="/oglhome.png" 
                        fallbackGradient="from-[#5DE7D4] to-[#8B5CF6]"
                        alt="One Great Lottery website preview"
                      />
                    </div>
                    
                    {/* Project Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-l font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300">
                          One Great Lottery
                        </h3>
                        <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <p className="text-[#94A3B8] text-sm mb-4">
                      Designed and developed a comprehensive digital lottery platform for charities across Canada, creating an engaging user experience that combines charitable giving with interactive gaming. The platform features real-time jackpot tracking, countdown timers, and a responsive design that encourages participation while maintaining transparency in fundraising goals.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Wordpress</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Shopify</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Next.js</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">HTML & Tailwind CSS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Project Entry 2 */}
              <a href="https://tenniscanadasweeps.ca/" target="_blank" rel="noopener noreferrer" className="block">
                <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start">
                    {/* Preview Window */}
                    <div className="w-full lg:w-48 flex-shrink-0">
                      <WebsitePreview 
                        imagePath="/tennis1.jpg" 
                        fallbackGradient="from-[#3B82F6] to-[#8B5CF6]"
                        alt="Tennis Canada Sweepstakes website preview"
                      />
                    </div>
                    
                    {/* Project Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-l font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300">
                          Tennis Canada Sweepstakes
                        </h3>
                        <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <p className="text-[#94A3B8] text-sm mb-4">
                        Designed and developed a fully responsive sweepstakes platform for Tennis Canada to drive nationwide fan engagement and email list growth. The site features a branded, mobile-optimized interface and a custom-built ticketing system that automatically generates unique entries and sends confirmation emails. Integrated countdown functionality and a clear entry flow enhance urgency and usability while ensuring compliance with sweepstakes regulations.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Wordpress</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Shopify</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Next.js</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">HTML & Tailwind CSS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Project Entry 3 */}
              <a href="https://www.talzennaxtandi.com/" target="_blank" rel="noopener noreferrer" className="block">
                <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start">
                    {/* Preview Window */}
                    <div className="w-full lg:w-48 flex-shrink-0">
                      <WebsitePreview 
                        imagePath="/talzenna.jpg " 
                        fallbackGradient="from-[#10B981] to-[#3B82F6]"
                        alt="Talzennaxtandi website preview"
                      />
                    </div>
                    
                    {/* Project Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-l font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300">
                          Pfizer
                        </h3>
                        <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <p className="text-[#94A3B8] text-sm mb-4">
                      Designed a responsive website for Pfizer's oncology co-therapy, Talzenna + Xtandi, aimed at healthcare professionals and patients. The site delivers complex medical information in a clear, accessible format while fully complying with FDA regulations and pharmaceutical industry standards. Built with accessibility best practices and regulatory constraints in mind, the design balances medical accuracy with user-friendly interaction across all devices.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Figma</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">UXCam</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Axure RP</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">User Testing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Project Entry 4 */}
              <a href="https://www.gaylea.com/" target="_blank" rel="noopener noreferrer" className="block">
                <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                    {/* Preview Window */}
                    <div className="w-full lg:w-48 flex-shrink-0">
                      <WebsitePreview 
                        imagePath="/gaylea.png" 
                        fallbackGradient="from-[#F59E0B] to-[#EF4444]"
                        alt="Gay Lea Foods website preview"
                      />
                    </div>
                    
                    {/* Project Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-l font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300">
                          Gay Lea Foods
                        </h3>
                        <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <p className="text-[#94A3B8] text-sm mb-4">
                      Redesigned and developed the official website for Gay Lea Foods, one of Canada's leading dairy cooperatives. The site delivers a modern, accessible digital experience for consumers, retailers, and cooperative members. With full bilingual support (English and French), the website reflects the brand's national reach, showcasing its diverse product range, recipes, and community values in a clean, responsive interface.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Figma</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">React</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Next.js</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Bilingual Implementation</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">Responsive Design</span>
                        <span className="px-3 py-1 text-xs bg-[#132D47]/60 text-[#59DDD5] rounded-full font-medium tracking-wide">CMS Customisation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

            </div>
          </div>
          </section>

          {/* Blog Section */}
          <section id="blog" ref={blogRef} className="mb-16">
            <h2 className="lg:hidden sticky top-0 z-30 py-2 text-sm font-bold text-white mb-2 tracking-widest">BLOG</h2>
            <div className="space-y-0">
              <div className="-mb-4">
              
              {/* Blog Post 1 */}
              <a href="https://luxdesign.studio/topbooks/" target="_blank" rel="noopener noreferrer" className="block">
                <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start">
                    {/* Blog Preview */}
                    <div className="w-full lg:w-48 flex-shrink-0">
                      <WebsitePreview 
                        imagePath="/blog1.png" 
                        fallbackGradient="from-[#8B5CF6] to-[#EC4899]"
                        alt="Top 5 Books Every UX Designer and Web Developer Should Read"
                      />
                    </div>
                    
                    {/* Blog Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-l font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300">
                        Top 5 Books Every UX Designer and Web Developer Should Read
                        </h3>
                        <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <p className="text-[#94A3B8] text-sm mb-4">
                      A curated list of must-read books that helped shape my journey as a UX designer and front-end developer. From design thinking to coding best practices, these picks offer practical insights, inspiration, and foundational knowledge for anyone building digital products. 
                      </p>
                      <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
                        <span>July 20, 2024</span>
                        <span>•</span>
                        <span>5 min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Blog Post 2 */}
              <a href="https://luxdesign.studio/top-5-ux-mistakes/" target="_blank" rel="noopener noreferrer" className="block">
                <div className="group relative p-6 rounded-lg border border-transparent transition-all duration-300 hover:bg-white/[0.02] hover:backdrop-blur-sm hover:border-white/[0.08] hover:shadow-md hover:shadow-black/10">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-start">
                    {/* Blog Preview */}
                    <div className="w-full lg:w-48 flex-shrink-0">
                      <WebsitePreview 
                        imagePath="/top5blog.png" 
                        fallbackGradient="from-[#10B981] to-[#3B82F6]"
                        alt="Top 5 Common UX Mistakes and How to Fix Them"
                      />
                    </div>
                    
                    {/* Blog Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-l font-semibold group-hover:text-[#5DE7D4] transition-colors duration-300">
                        Top 5 Common UX Mistakes and How to Fix Them
                        </h3>
                        <svg className="w-4 h-4 group-hover:text-[#5DE7D4] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <p className="text-[#94A3B8] text-sm mb-4">
                      A quick, practical guide to the most common UX design pitfalls — from neglecting user research to overcomplicating interfaces. This post outlines real-world mistakes and how to fix them, helping designers build more intuitive, user-focused products.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
                        <span>August 25, 2024</span>
                        <span>•</span>
                        <span>4 min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

            </div>
          </div>
          </section>
          </div>
        </main>
      </div>
    </div>
  );
}
