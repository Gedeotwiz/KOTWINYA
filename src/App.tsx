import { useEffect, useRef, useState, type FormEvent } from 'react';
import Header from './components/Header';
import ProductCatalog from './components/ProductCatalog';
import { CHAT_UNAVAILABLE_EVENT, requestLiveChat } from './lib/liveChat';
import { KOTWINYA_WHATSAPP_GROUP, openLeaderWhatsApp } from './lib/whatsapp';

function LiveChatNotice({ onClose }: { onClose: () => void }) {
  return (
    <div className="chat-notice-backdrop" role="presentation" onClick={onClose}>
      <section className="chat-notice" role="dialog" aria-modal="true" aria-labelledby="chat-notice-title" onClick={(event) => event.stopPropagation()}>
        <button className="chat-notice-close" aria-label="Close notice" onClick={onClose}>
          ×
        </button>
        <span className="chat-notice-icon">✳</span>
        <h2 id="chat-notice-title">Live chat is being connected</h2>
        <p>Our online chat is not active yet. You can still reach the cooperative by phone or email while we finish setting up the chat inbox.</p>
        <a href="tel:+250783801966">Call +250 783 801 966</a>
        <a href="mailto:info@kotwinya.rw">Email info@kotwinya.rw</a>
      </section>
    </div>
  );
}

function StorySection() {
  return (
    <section className="story-section" id="about">
      <div className="container story-grid">
        <div className="story-photo">
          <div className="story-image" role="img" aria-label="KOTWINYA cooperative members at a community workshop"></div>
          <div className="photo-caption">
            <span>✳</span>
            <span>Small batches. Shared success.</span>
          </div>
        </div>
        <div className="story-copy">
          <span className="eyebrow">OUR STORY</span>
          <h2>
            A little care can
            <br />
            <em>change a lot.</em>
          </h2>
          <p className="story-lead">KOTWINYA is a community cooperative creating quality soaps and home care products while opening doors to skills, confidence, and income.</p>
          <p>Based in Nyabiheke, our members learn by making. Together we turn practical skills into products families can trust and opportunities that reach beyond our workshop.</p>
          <blockquote>“When our community grows, we all grow.”</blockquote>
          <a className="button button-dark" href="#contact">
            Meet the cooperative <span>→</span>
          </a>
          <div className="story-stats">
            <div>
              <strong>
                100<span>%</span>
              </strong>
              <small>community led</small>
            </div>
            <div>
              <strong>Made</strong>
              <small>with care in Rwanda</small>
            </div>
            <div>
              <strong>One</strong>
              <small>purchase makes a difference</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  return (
    <section className="values-section section-pad">
      <div className="container">
        <div className="center-heading">
          <span className="eyebrow">A BETTER KIND OF EVERYDAY</span>
          <h2>
            Care with a <em>purpose.</em>
          </h2>
        </div>
        <div className="values-grid">
          <article className="value-card">
            <span className="value-icon green">✺</span>
            <h3>Thoughtful ingredients</h3>
            <p>Made with care for the routines and spaces that matter to you.</p>
          </article>
          <article className="value-card">
            <span className="value-icon blue">✳</span>
            <h3>Shared opportunity</h3>
            <p>Your purchase helps local members build skills and steady income.</p>
          </article>
          <article className="value-card">
            <span className="value-icon yellow">✦</span>
            <h3>Made close to home</h3>
            <p>Produced in Nyabiheke and delivered across Rwanda.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const message = 'Hello KOTWINYA, I would like to speak with cooperative leader Twizerimana Gedeon. Could we arrange a convenient time?';
  const leaders = [
    { id: 'gedeon', name: 'Twizerimana Gedeon',phone:"+250783801966",image:"/images/gedeon.jpeg", role: 'Head of digital market', isKnown: true },
    { id: 'leader-2', name: 'Leader profile to add', phone:"", image:"", role: 'Add leader role and details', isKnown: false },
    { id: 'leader-3', name: 'Leader profile to add', phone:"", image:"", role: 'Add leader role and details', isKnown: false },
    { id: 'leader-4', name: 'Leader profile to add', phone:"", image:"", role: 'Add leader role and details', isKnown: false },
    { id: 'leader-5', name: 'Leader profile to add', phone:"", image:"", role: 'Add leader role and details', isKnown: false },
  ];
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollLeaders = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const card = carousel.querySelector<HTMLElement>('.team-card');
    const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap) || 22;
    carousel.scrollBy({ left: (card ? card.offsetWidth + gap : carousel.clientWidth) * direction, behavior: 'smooth' });
  };

  return (
    <section className="team-section section-pad" id="team">
      <div className="container relative">
        <div className="center-heading">
          <span className="eyebrow">MEET THE PEOPLE BEHIND KOTWINYA</span>
          <h2>
            Talk with our <em>team.</em>
          </h2>
          <p className="team-intro">Reach out to our cooperative lead with questions, ideas, or to arrange a time to talk.</p>
        </div>
        <div className="team-carousel-controls absolute left-1/2 top-3/3" aria-label="Team carousel controls">
          <button type="button" onClick={() => scrollLeaders(-1)} aria-label="Scroll team leaders left">←</button>
          <button type="button" onClick={() => scrollLeaders(1)} aria-label="Scroll team leaders right">→</button>
        </div>
        <div className="team-grid" id="team-leader-list" ref={carouselRef} role="region" aria-roledescription="carousel" aria-label="Cooperative leaders" tabIndex={0}>
          {leaders.map((leader) => (
            <article className="team-card" key={leader.id}>
              {leader.isKnown ? <img className="team-avatar" src={leader.image} alt={leader.name} /> : <div className="team-avatar team-avatar-placeholder" aria-hidden="true">+</div>}
              <div className="team-info">
                <span className="team-role">COOPERATIVE LEADER</span>
                <h3>{leader.name}</h3>
                <p>{leader.role}</p>
                {leader.isKnown && <div className="flex flex-col gap-2 justify-center items-center">
                  <button className="button button-dark w-2/4 team-contact" onClick={() => openLeaderWhatsApp(message)}>Chat on WhatsApp <span>↗</span></button>
                  <a className="team-phone" href={`tel:${leader.phone}`}>{leader.phone}</a>
                </div>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Hello KOTWINYA, my name is ${data.get('name')} (${data.get('email')}).\n\n${data.get('message')}`;
    openLeaderWhatsApp(message);
  };

  return (
    <section className="contact-section section-pad" id="contact">
      <div className="container contact-grid">
        <div className="contact-copy">
          <span className="eyebrow">WE'D LOVE TO HEAR FROM YOU</span>
          <h2>
            Let's talk
            <br />
            <em>good things.</em>
          </h2>
          <p>Questions about an order, wholesale, or the cooperative? Send us a message and our team will get back to you.</p>
          <div className="contact-detail">
            <span className="detail-icon">↗</span>
            <div>
              <small>CALL OR WHATSAPP</small>
              <a href="tel:+250783801966">+250 783 801 966</a>
            </div>
          </div>
          <div className="contact-detail">
            <span className="detail-icon">✉</span>
            <div>
              <small>EMAIL US</small>
              <a href="mailto:info@kotwinya.rw">info@kotwinya.rw</a>
            </div>
          </div>
          <div className="contact-detail">
            <span className="detail-icon">⌖</span>
            <div>
              <small>FIND US</small>
              <span>Nyabiheke, Rwanda</span>
            </div>
          </div>
        </div>
        <form className="contact-form" onSubmit={submitContact}>
          <span className="eyebrow">SEND A MESSAGE</span>
          <h3>Message our team</h3>
          <div className="form-row">
            <label>
              Your name
              <input name="name" autoComplete="name" required placeholder="e.g. Aline Mukamana" />
            </label>
            <label>
              Email address
              <input type="email" name="email" autoComplete="email" required placeholder="you@example.com" />
            </label>
          </div>
          <label>
            Your message
            <textarea name="message" required rows={4} placeholder="Tell us what you're looking for..." />
          </label>
          <button className="button button-primary" type="submit">
            Continue in WhatsApp <span>↗</span>
          </button>
          <button className="contact-web-chat" type="button" onClick={() => requestLiveChat('Hello KOTWINYA, I would like help with an order or have a question.')}>
            I don’t use WhatsApp — chat here
          </button>
          <small className="form-note">WhatsApp opens a direct message to the cooperative lead. Website chat is also available.</small>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-about">
          <a className="brand brand-light" href="#home">
            <span>KOTWINYA</span>
            <small>COOPERATIVE</small>
          </a>
          <p>
            Everyday care, made with purpose.
            <br />A cooperative rooted in community.
          </p>
        </div>
        <div className="footer-links">
          <strong>Explore</strong>
          <a href="#about">Our story</a>
          <a href="#products">Products</a>
          <a href="#contact">Contact us</a>
        </div>
        <div className="footer-links">
          <strong>Say hello</strong>
          <a href="tel:+250783801966">+250 783 801 966</a>
          <a href="mailto:info@kotwinya.rw">info@kotwinya.rw</a>
          <button onClick={() => requestLiveChat('Hello KOTWINYA, I have a question.')}>Website live chat</button>
          <a href={`https://wa.me/250783801966?text=${encodeURIComponent('Hello KOTWINYA, I have a question.')}`} target="_blank" rel="noreferrer">
            WhatsApp the leader ↗
          </a>
        </div>
        <a className="back-top" href="#home" aria-label="Back to top">
          ↑
        </a>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} KOTWINYA Cooperative. Made with care in Rwanda.</span>
        <span>Community is at the heart of everything.</span>
      </div>
    </footer>
  );
}

export default function App() {
  const [showChatNotice, setShowChatNotice] = useState(false);

  useEffect(() => {
    const showNotice = () => setShowChatNotice(true);
    window.addEventListener(CHAT_UNAVAILABLE_EVENT, showNotice);
    return () => window.removeEventListener(CHAT_UNAVAILABLE_EVENT, showNotice);
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">
                <i></i> GOOD FOR YOU. GOOD FOR COMMUNITY.
              </span>
              <h1>
                Everyday care,
                <br />
                <em>made with purpose.</em>
              </h1>
              <p>Thoughtful soaps and home care, made by our cooperative in Rwanda. Every purchase helps local women and youth build a livelihood.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#products">
                  Explore products <span>→</span>
                </a>
                <a className="text-link" href="#about">
                  Get to know us <span>↗</span>
                </a>
              </div>
              <div className="hero-note">
                <div className="avatar-stack">
                  <span>✿</span>
                  <span>♡</span>
                  <span>✦</span>
                </div>
                <span>
                  <strong>Locally made, community led</strong>
                  <small>Care that goes beyond clean</small>
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-image" role="img" aria-label="Natural soap and skincare products"></div>
              <div className="image-tag">

                <span className="tag-icon">✳</span>
                <span>
                  <strong>Made in Rwanda</strong>
                  <small>with care, by hand</small>
                </span>
              </div>
              <div className="hero-stamp">
                <span>
                  CARE
                  <br />
                  THAT
                  <br />
                  MATTERS
                </span>
                <b>✳</b>
              </div>
            </div>
          </div>
          <div className="hero-bottom container">
            <span>
              <b>01</b> Nature inspired
            </span>
            <span>
              <b>02</b> Community powered
            </span>
            <span>
              <b>03</b> Proudly Rwandan
            </span>
          </div>
        </section>
        <section className="ticker" aria-label="Our values">
          <div className="container ticker-inner">
            <span>✳ &nbsp;NATURAL INGREDIENTS</span>
            <i>•</i>
            <span>COMMUNITY EMPOWERMENT</span>
            <i>•</i>
            <span>PROUDLY MADE IN RWANDA</span>
            <i>•</i>
            <span>DELIVERY ACROSS RWANDA</span>
          </div>
        </section>
        <ProductCatalog />
        <StorySection />
        <ValuesSection />
        <TeamSection />
        <section className="community-cta">
          <div className="container community-inner">
            <div>
              <span className="eyebrow">LET'S STAY CONNECTED</span>
              <h2>
                Good things grow
                <br />
                when we <em>share.</em>
              </h2>
            </div>
            <div>
              <p>Join our cooperative WhatsApp group for product updates and community news.</p>
              <a className="button button-light" href={KOTWINYA_WHATSAPP_GROUP} target="_blank" rel="noreferrer">
                Join WhatsApp group <span>↗</span>
              </a>
            </div>
            <span className="community-flower" aria-hidden="true">
              ✳
            </span>
          </div>
        </section>
        <ContactSection />
      </main>
      <Footer />
      {showChatNotice && <LiveChatNotice onClose={() => setShowChatNotice(false)} />}
    </>
  );
}
