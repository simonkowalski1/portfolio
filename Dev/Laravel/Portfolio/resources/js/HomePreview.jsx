import React, { useEffect, useRef, useState } from 'react'
import coffeeIcon from '../images/icons/coffee.png' // <-- your PNG

// Tech stack brand colors
const TECH_COLORS = {
  Laravel: { bg: '#FF2D20', text: '#FFFFFF' },
  React: { bg: '#61DAFB', text: '#000000' },
  Blade: { bg: '#FF2D20', text: '#FFFFFF' },
  Tailwind: { bg: '#06B6D4', text: '#FFFFFF' },
  MySQL: { bg: '#4479A1', text: '#FFFFFF' },
  Vite: { bg: '#646CFF', text: '#FFFFFF' },
}

function Badge({ children, color }) {
  const techColor = color || TECH_COLORS[children]
  const style = techColor
    ? {
        backgroundColor: techColor.bg,
        color: techColor.text,
        borderColor: '#000000',
        borderWidth: '2px'
      }
    : { borderColor: '#000000', borderWidth: '2px' }

  return (
    <span
      className="inline-flex items-center rounded-md border px-3 py-1 text-xs uppercase font-medium"
      style={style}
    >
      {children}
    </span>
  )
}

function SectionHeader({ eyebrow, title }) {
  return (
    <header className="mb-8 text-center">
      <p className="text-xs tracking-[0.2em] text-zinc-500">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
    </header>
  )
}  

// Simple, lightweight icons (inline SVG)
const Icon = {
  cart: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <path strokeWidth="2" d="M6 6h15l-1.5 9h-12zM6 6l-2-2H2m6 16a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
    </svg>
  ),
  credit: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" />
      <path strokeWidth="2" d="M2 10h20" />
    </svg>
  ),
  lock: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <rect x="4" y="10" width="16" height="10" rx="2" strokeWidth="2" />
      <path strokeWidth="2" d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  ),
  shield: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <path strokeWidth="2" d="M12 2l7 3v6c0 5-3.4 9.4-7 10-3.6-.6-7-5-7-10V5l7-3z" />
    </svg>
  ),
  megaphone: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <path strokeWidth="2" d="M3 11l14-5v12L3 13v-2z" />
      <path strokeWidth="2" d="M7 14v4a2 2 0 0 0 2 2h1" />
    </svg>
  ),
  mail: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="2" />
      <path strokeWidth="2" d="M3 7l9 6 9-6" />
    </svg>
  ),
  chart: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <path strokeWidth="2" d="M3 3v18h18" />
      <path strokeWidth="2" d="M7 15v-4M12 15V7M17 15v-2" />
    </svg>
  ),
  bolt: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <path strokeWidth="2" d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  ),
}

function FeatureChip({ icon: IconEl, title, desc }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="mt-0.5 grid h-8 w-8 place-items-center rounded-md border text-zinc-900">
        <IconEl width="18" height="18" />
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <p className="text-sm text-zinc-600">{desc}</p>
      </div>
    </div>
  )
}

function SolutionGroup({ title, accent = '#0a0a0a', items, leadTime, onBookCall, onViewPricing }) {
  return (
    <section className="rounded-2xl border bg-white p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        {leadTime ? (
          <span className="rounded-full border px-2.5 py-1 text-xs text-zinc-700 bg-white">
            Lead time: {leadTime}
          </span>
        ) : null}
      </div>

      <div className="grid gap-3">
        {items.map((it) => (
          <FeatureChip key={it.title} icon={it.icon} title={it.title} desc={it.desc} />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onViewPricing}
          className="rounded-md border px-3 py-1.5 text-xs hover:bg-zinc-50"
        >
          View pricing/estimates
        </button>
        <button
          type="button"
          onClick={onBookCall}
          className="rounded-md bg-black px-3 py-1.5 text-xs text-white hover:bg-zinc-800"
        >
          Book a call
        </button>
      </div>
    </section>
  )
}

export default function HomePreview() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const projects = [
    {
      title: "Heir Luxury",
      blurb: "E-commerce / Catalog",
      tags: ["Laravel", "Blade", "Tailwind", "MySQL"],
      github: "https://github.com/simonkowalski1/HeirLuxury",
      description: "Full-featured e-commerce platform for luxury goods with product catalog, search, and inquiry system.",
      features: [
        "Dynamic product catalog with category filtering",
        "Advanced search and filtering system",
        "Admin dashboard for product management",
        "Responsive design with Tailwind CSS",
        "MySQL database with optimized queries"
      ],
      image: "/images/projects/home.png",
      gallery: [
        "/images/projects/home.png",
        "/images/projects/catalog.png",
        "/images/projects/product.png",
        "/images/projects/mega.png",
        "/images/projects/contact.png"
      ]
    },
    {
      title: "Portfolio Website",
      blurb: "Personal Dev Showcase",
      tags: ["React", "Vite", "Tailwind"],
      github: "https://github.com/simonkowalski1/portfolio",
      description: "Modern portfolio website showcasing projects and skills.",
      features: [
        "React with Vite for fast development",
        "Responsive design",
        "Smooth animations and interactions"
      ]
    },
    {
      title: "Sales Tracking App",
      blurb: "Client Pipeline Tool",
      tags: ["Laravel", "MySQL"],
      description: "Internal tool for tracking sales pipeline and client relationships.",
      features: [
        "Client relationship management",
        "Sales pipeline tracking",
        "Reporting and analytics"
      ]
    },
  ]

  const testimonials = [
    { name: "A. Rivera", handle: "Product Lead", quote: "Delivered ahead of schedule with excellent code quality." },
    { name: "M. Patel", handle: "Founder", quote: "Fantastic communicator with a sharp eye for UX details." },
    { name: "Lam’aan", handle: "@lamaandesign", quote: "Love the work on this one. Signed up!" },
    { name: "Brett", handle: "@thebtjackson", quote: "I like this a lot." },
    { name: "Alex Prokhorov", handle: "@alex_pro_dsg", quote: "Stunning. Exactly what I needed." },
    { name: "Brian", handle: "@iambrianoconnor", quote: "It’s sooo good." },
  ]

  const GITHUB_URL = 'https://github.com/simonkowalski1'
  const RESUME_URL = '/resume.pdf'

  // Header hide/show on scroll
  const [showHeader, setShowHeader] = useState(true)
  const lastY = useRef(0)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0
      if (y < 24) { setShowHeader(true); lastY.current = y; return }
      if (y > lastY.current + 10) setShowHeader(false) // down
      else if (y < lastY.current - 10) setShowHeader(true) // up
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scrolling testimonial columns
  const MarqueeColumn = ({ items, reverse }) => (
    <div className="relative h-[400px] overflow-hidden">
      <div className={`animate-marquee ${reverse ? 'reverse' : ''}`}>
        {items.concat(items).map((item, i) => (
          <div key={i} className="p-4 bg-white rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full border bg-zinc-50 text-xs font-semibold">
                {item.name ? item.name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase() : '??'}
              </div>
              <div>
                <div className="font-medium">{item.name}</div>
                {item.handle ? <div className="text-xs text-zinc-500">{item.handle}</div> : null}
              </div>
            </div>
            <p className="mt-2 text-sm text-zinc-700">{item.quote}</p>
          </div>
        ))}
      </div>
    </div>
  )

  // Modals / contact
  const [donateOpen, setDonateOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)
  const MAX_CHARS = 1500

  const onMessageChange = (e) => {
    const text = e.target.value
    setMessage(text)
    setCharCount(text.length)
  }

  const openBookCall = (context) => {
    setMessage(`Hi Simon — I'd like to book a call about ${context}. \n\nDetails:\n`)
    setCharCount(
      (`Hi Simon — I'd like to book a call about ${context}. \n\nDetails:\n`).length
    )
    setContactOpen(true)
  }

  const handleSend = (e) => {
    e?.preventDefault?.()
    if (charCount === 0 || sending) return
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setContactOpen(false)
      setMessage('')
      setCharCount(0)
      setTimeout(() => setSent(false), 2500)
    }, 600)
  }

  useEffect(() => {
    const handler = (e) => {
      if (contactOpen && e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        handleSend(e)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [contactOpen, charCount, sending])

  const handleCopy = async () => {
    try {
      const text = `Contact: Simon Kowalski
Phone: 551-266-1335
Email: simonkowalski@yahoo.com

Message:
${message}`
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (_) {}
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' }}>
      <style>{`
        @keyframes marqueeY { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
        .animate-marquee { display: flex; flex-direction: column; gap: 1.5rem; will-change: transform; animation: marqueeY 28s linear infinite; }
        .animate-marquee.reverse { animation-direction: reverse; }
      `}</style>

      {/* Header */}
      <header className={`sticky top-0 z-50 bg-white/90 backdrop-blur border-b-4 border-black transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#" className="font-semibold tracking-tight">Simon Kowalski</a>
          <nav className="hidden sm:flex items-center gap-6 text-xs tracking-[0.25em] text-zinc-600">
            <div className="flex gap-6 mx-auto">
              <a href="#projects" className="hover:text-zinc-900">Projects</a>
              <a href="#solutions" className="hover:text-zinc-900">Solutions</a>
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                 className="rounded-md bg-black px-3 py-1.5 text-xs text-white hover:bg-zinc-800"
              >
                Contact
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,_rgba(0,0,0,0.035)_1px,_transparent_1px)] [background-size:24px_24px]"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs tracking-[0.25em] text-zinc-600">Frontend Engineer</p>
            <h1 className="mt-2 text-[40px] sm:text-[48px] font-extrabold leading-tight uppercase">Crafting fast, accessible web apps</h1>
            <p className="mt-4 max-w-xl text-zinc-700">React + Laravel developer focused on UX, DX, and performance.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="rounded-md border border-black px-4 py-2 text-sm bg-white hover:bg-zinc-100"
              >
                View Projects
              </a>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 grid gap-4">
            <div className="aspect-[4/3] w-full rounded-lg border bg-zinc-50 grid place-items-center">
              <span className="text-sm text-zinc-500">Hero Image / Headshot</span>
            </div>
            <div id="resume" className="aspect-[8.5/11] w-full overflow-hidden rounded-lg border bg-zinc-50">
              <iframe className="h-full w-full" src={RESUME_URL} title="Resume PDF" />
            </div>

            {/* Download button with 3D effect */}
            <div className="flex justify-center">
              <a
                href={RESUME_URL}
                download
                aria-label="Download resume PDF"
                className="relative inline-block w-[180px] h-[50px]"
                style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}
              >
                <div className="absolute w-full h-full bg-zinc-900 rounded-[7mm] top-[14px] left-0" style={{ outline: '2px solid rgb(36, 38, 34)', zIndex: -1 }}>
                  <div className="absolute w-[2px] h-[9px] bg-[rgb(36,38,34)] bottom-0 left-[15%]" />
                  <div className="absolute w-[2px] h-[9px] bg-[rgb(36,38,34)] bottom-0 left-[85%]" />
                </div>
                <div
                  className="w-full h-full bg-[rgb(255,255,238)] flex items-center justify-center rounded-[7mm] relative overflow-hidden transition-transform duration-200 active:translate-y-[10px]"
                  style={{ outline: '2px solid rgb(36, 38, 34)', fontFamily: 'Poppins, ui-sans-serif', fontSize: '16px', color: 'rgb(36, 38, 34)' }}
                >
                  <div className="absolute w-[15px] h-full bg-black/10 -left-5 transition-all duration-250" style={{ transform: 'skewX(30deg)' }} />
                  Download Resume
                </div>
                <div className="absolute w-full h-full bg-[rgb(229,229,199)] top-[10px] left-0 rounded-[7mm]" style={{ outline: '2px solid rgb(36, 38, 34)', zIndex: -1 }}>
                  <div className="absolute w-[2px] h-[9px] bg-[rgb(36,38,34)] bottom-0 left-[15%]" />
                  <div className="absolute w-[2px] h-[9px] bg-[rgb(36,38,34)] bottom-0 left-[85%]" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t-4 border-black" />

      {/* Projects Section */}
      <section id="projects" className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionHeader eyebrow="Featured" title="Projects" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <article key={p.title} className="group rounded-2xl border p-4 bg-white transition hover:-translate-y-0.5 hover:shadow-lg">
                <div className="aspect-video w-full rounded-md border bg-zinc-50 grid place-items-center overflow-hidden">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-zinc-500">Project thumbnail</span>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="text-sm text-zinc-600">{p.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (<Badge key={t}>{t}</Badge>))}
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setSelectedProject(p)}
                    className="rounded-md border px-3 py-1.5 text-xs hover:bg-zinc-50"
                  >
                    View Details
                  </button>
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border px-3 py-1.5 text-xs hover:bg-zinc-50"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t-4 border-black" />

      {/* Solutions */}
      <section id="solutions" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionHeader eyebrow="What I deliver" title="Solutions" />

          <div className="grid gap-6 md:grid-cols-2">
            <SolutionGroup
              title="Commerce & Payments"
              leadTime="2–4 weeks"
              accent="#0a0a0a"
              items={[
                { icon: Icon.cart,  title: "Product Catalog + Cart", desc: "Clean, high-conversion shopping flows." },
                { icon: Icon.credit, title: "Checkout / Subscriptions", desc: "Stripe / PayPal integrations with receipts & taxes." },
              ]}
              onViewPricing={() => { location.hash = '#pricing' }}
              onBookCall={() => openBookCall('Commerce & Payments')}
            />

            <SolutionGroup
              title="Content & Engagement"
              leadTime="1–3 weeks"
              accent="#D4AF37"
              items={[
                { icon: Icon.megaphone, title: "Blog / SEO Setup", desc: "SEO-friendly pages, sitemaps, social previews." },
                { icon: Icon.mail, title: "Email Capture & Broadcast", desc: "Plausible/GA, Resend/Mailchimp, segment audiences." },
              ]}
              onViewPricing={() => { location.hash = '#pricing' }}
              onBookCall={() => openBookCall('Content & Engagement')}
            />

            <SolutionGroup
              title="Security & Access"
              leadTime="1–2 weeks"
              accent="#111111"
              items={[
                { icon: Icon.lock, title: "Auth with Roles", desc: "Email/OAuth login, RBAC, 2FA, sessions." },
                { icon: Icon.shield, title: "A11y & Best Practices", desc: "WCAG-minded UI, secure defaults, rate-limits." },
              ]}
              onViewPricing={() => { location.hash = '#pricing' }}
              onBookCall={() => openBookCall('Security & Access')}
            />

            <SolutionGroup
              title="Analytics & Automation"
              leadTime="1–2 weeks"
              accent="#222222"
              items={[
                { icon: Icon.chart, title: "Dashboards & KPIs", desc: "Track sales, signups, funnels, retention." },
                { icon: Icon.bolt, title: "Integrations & Webhooks", desc: "Stripe, GA4, Zapier/n8n for hands-off ops." },
              ]}
              onViewPricing={() => { location.hash = '#pricing' }}
              onBookCall={() => openBookCall('Analytics & Automation')}
            />
          </div>
        </div>
      </section>

      <div className="border-t-4 border-black" />

      {/* Pricing / Estimates anchor */}
      <section id="pricing" className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionHeader eyebrow="Estimates" title="Pricing & Lead Times" />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border bg-white p-5">
              <h3 className="text-lg font-semibold">Typical ranges</h3>
              <ul className="mt-3 list-disc pl-5 text-sm text-zinc-700 space-y-1">
                <li>Marketing site (3–5 pages): 1–2 weeks</li>
                <li>Blog + SEO + analytics: 1–2 weeks</li>
                <li>E-commerce MVP (catalog + checkout): 2–4 weeks</li>
                <li>Dashboard + auth + roles: 2–3 weeks</li>
              </ul>
            </div>
            <div className="rounded-2xl border bg-white p-5">
              <h3 className="text-lg font-semibold">Engagement</h3>
              <p className="mt-2 text-sm text-zinc-700">
                Fixed-scope quotes on request. Hourly available for audits, refactors, or integrations.
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => { openBookCall('Pricing / Estimates') }}
                  className="rounded-md bg-black px-3 py-1.5 text-xs text-white hover:bg-zinc-800"
                >
                  Book a call
                </button>
                <button
                  type="button"
                  onClick={() => { openBookCall('Project Scoping') }}
                  className="rounded-md border px-3 py-1.5 text-xs hover:bg-zinc-50"
                >
                  Ask about scope
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t-4 border-black" />

      {/* Testimonials */}
      <section id="testimonials" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionHeader eyebrow="Social Proof" title="Testimonials" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <MarqueeColumn items={testimonials} />
            <MarqueeColumn items={testimonials} reverse />
            <MarqueeColumn items={testimonials} />
          </div>
        </div>
      </section>

      <div className="border-t-4 border-black" />

      {/* Footer (custom tooltips only — no native title= to avoid duplicates) */}
      <footer className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm flex items-center justify-between">
          <span>© {new Date().getFullYear()} Simon Kowalski</span>
          <div className="flex items-center gap-4">
            {/* GitHub icon: brand circle #24292f with white mark */}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="tooltip-group p-2 rounded-full hover:bg-zinc-100"
            >
              <span className="tooltip">GitHub</span>
              <span className="tooltip__arrow" />
              <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="12" fill="#24292f" />
                <path
                  fill="#fff"
                  d="M12 3.2c-5 0-9 4-9 9 0 3.98 2.58 7.35 6.16 8.54.45.08.62-.2.62-.44 0-.22-.01-.96-.01-1.74-2.51.46-3.16-.61-3.36-1.17-.1-.25-.54-1.17-.92-1.41-.31-.2-.75-.7-.01-.71.7-.01 1.2.64 1.37.9.8 1.35 2.08.97 2.59.74.08-.58.31-.97.56-1.19-2-.23-4.09-1-4.09-4.46 0-.98.35-1.78.92-2.41-.09-.23-.4-1.16.09-2.41 0 0 .75-.24 2.46.92a8.54 8.54 0 0 1 4.48 0c1.71-1.16 2.46-.92 2.46-.92.49 1.25.18 2.18.09 2.41.57.63.92 1.43.92 2.41 0 3.47-2.1 4.23-4.1 4.46.32.27.6.8.6 1.62 0 1.17-.01 2.11-.01 2.39 0 .24.17.53.62.44A9.01 9.01 0 0 0 21 12.2c0-5-4-9-9-9z"
                />
              </svg>
            </a>

            {/* Coffee/support PNG with tooltip */}
            <button
              onClick={() => setDonateOpen(true)}
              aria-label="Support"
              className="tooltip-group p-2 rounded-full hover:bg-zinc-100"
            >
              <span className="tooltip">Support</span>
              <span className="tooltip__arrow" />
              <img
                src={coffeeIcon}
                alt=""
                width={24}
                height={24}
                className="block"
              />
            </button>
          </div>
        </div>
      </footer>

      {/* Toasts */}
      {sent && (
        <div className="fixed inset-x-0 bottom-4 z-[70] grid place-items-center">
          <div className="rounded-full border bg-white px-4 py-2 text-sm shadow">Message sent — thank you!</div>
        </div>
      )}
      {copied && (
        <div className="fixed inset-x-0 bottom-4 z-[70] grid place-items-center">
          <div className="rounded-full border bg-white px-4 py-2 text-sm shadow">Copied to clipboard</div>
        </div>
      )}

      {/* Contact modal */}
      {contactOpen && (
        <div role="dialog" aria-modal="true" aria-label="Contact" className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4" onClick={() => setContactOpen(false)}>
          <div className="relative w-full max-w-lg rounded-xl border bg-white p-4" onClick={(e) => e.stopPropagation()}>
            <button aria-label="Close" className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border text-zinc-700 hover:bg-zinc-50 transition-transform hover:rotate-90" onClick={() => setContactOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
            <h3 className="text-lg font-semibold">Get in touch</h3>
            <p className="mt-1 text-sm text-zinc-600">Simon Kowalski · 551-266-1335 · simonkowalski@yahoo.com</p>
            <form className="mt-4 space-y-3" onSubmit={handleSend}>
              <textarea
                rows={6}
                value={message}
                onChange={onMessageChange}
                maxLength={1500}
                className="w-full rounded-md border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Write your message (Ctrl/Cmd + Enter to send)"
              />
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>{charCount} / {1500}</span>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={handleCopy} className="rounded-md border px-3 py-1 hover:bg-zinc-50">Copy</button>
                  <button type="submit" disabled={sending || charCount === 0} className="rounded-md bg-black px-3 py-1 text-white disabled:opacity-40">
                    {sending ? 'Sending…' : 'Send'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Donate modal */}
      {donateOpen && (
        <div role="dialog" aria-modal="true" aria-label="Donate" className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4" onClick={() => setDonateOpen(false)}>
          <div className="relative w-full max-w-sm rounded-xl border bg-white p-4" onClick={(e) => e.stopPropagation()}>
            <button aria-label="Close" className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border text-zinc-700 hover:bg-zinc-50 transition-transform hover:rotate-90" onClick={() => setDonateOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
            <h3 className="text-lg font-semibold">Support</h3>
            <p className="mt-1 text-sm text-zinc-600">Thanks for considering a coffee!</p>
            <div className="mt-4 flex gap-2">
              <a className="rounded-md border px-3 py-1 text-sm hover:bg-zinc-50" href="#">Buy Me a Coffee</a>
            </div>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project Details"
          className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4 overflow-y-auto"
          onClick={() => {
            setSelectedProject(null)
            setCurrentImageIndex(0)
          }}
        >
          <div
            className="relative w-full max-w-5xl rounded-xl border bg-white p-6 my-8 mt-20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close"
              className="absolute -right-2 -top-2 z-10 grid h-10 w-10 place-items-center rounded-full border-2 border-black text-zinc-700 bg-white hover:bg-zinc-50 transition-transform hover:rotate-90 shadow-lg"
              onClick={() => {
                setSelectedProject(null)
                setCurrentImageIndex(0)
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>

            <div className="grid gap-6">
              {/* Image Gallery / Carousel */}
              {selectedProject.gallery && selectedProject.gallery.length > 0 ? (
                <div className="relative">
                  <div className="aspect-video w-full rounded-lg border bg-zinc-50 overflow-hidden">
                    <img
                      src={selectedProject.gallery[currentImageIndex]}
                      alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Navigation arrows */}
                  {selectedProject.gallery.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((currentImageIndex - 1 + selectedProject.gallery.length) % selectedProject.gallery.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/90 border shadow-lg hover:bg-white transition"
                        aria-label="Previous image"
                      >
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((currentImageIndex + 1) % selectedProject.gallery.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/90 border shadow-lg hover:bg-white transition"
                        aria-label="Next image"
                      >
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Thumbnail navigation */}
                  {selectedProject.gallery.length > 1 && (
                    <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                      {selectedProject.gallery.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`flex-shrink-0 w-20 h-12 rounded border-2 overflow-hidden transition ${
                            idx === currentImageIndex ? 'border-black' : 'border-zinc-200 hover:border-zinc-400'
                          }`}
                        >
                          <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : selectedProject.image ? (
                <div className="aspect-video w-full rounded-lg border bg-zinc-50 grid place-items-center overflow-hidden">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="aspect-video w-full rounded-lg border bg-zinc-50 grid place-items-center">
                  <span className="text-sm text-zinc-500">No screenshots available</span>
                </div>
              )}

              {/* Project Details */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                  <p className="mt-2 text-zinc-600">{selectedProject.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedProject.tags.map((t) => (<Badge key={t}>{t}</Badge>))}
                  </div>

                  {selectedProject.github && (
                    <div className="mt-6 flex gap-3">
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md px-4 py-2 text-sm text-white hover:opacity-90 flex items-center gap-2"
                        style={{ backgroundColor: '#24292F' }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                        </svg>
                        View on GitHub
                      </a>
                    </div>
                  )}
                </div>

                {selectedProject.features && (
                  <div>
                    <h3 className="font-semibold mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-zinc-700">
                          <svg className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
