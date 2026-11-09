import { useState } from 'react';
import { useEffect } from 'react';
import { useLanguage, type Language } from '../i18n';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { language, setLanguage, t } = useLanguage();
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const sectionIds = ['home', 'products', 'about', 'team', 'contact'];
    const updateActiveSection = () => {
      const marker = window.scrollY + 150;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) current = id;
      }
      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, []);

  const navLink = (id: string, label: string) => (
    <a
      className={activeSection === id ? 'active' : undefined}
      href={`#${id}`}
      onClick={() => {
        setActiveSection(id);
        closeMenu();
      }}
    >
      {label}
    </a>
  );

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-contact">
            <a href="tel:+250783801966">↗ &nbsp;+250 783 801 966</a>
            <a href="mailto:info@kotwinya.rw">✉ &nbsp;info@kotwinya.rw</a>
            <span>◷ &nbsp;Mon–Sun: 9am–5pm</span>
          </div>
          <span className="location">⌖ &nbsp;Nyabiheke, Rwanda</span>
        </div>
      </div>
      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#home" aria-label="KOTWINYA home" onClick={() => setActiveSection('home')}>
            <span>KOTWINYA</span>
            <small>COOPERATIVE</small>
          </a>
          <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className={`main-nav${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
            {navLink('home', t('Home'))}
            {navLink('products', t('Products'))}
            {navLink('about', t('Our story'))}
            {navLink('team', t('Our team'))}
            {navLink('contact', t('Contact'))}
          </nav>
          <a className="nav-cta" href="#products" onClick={() => setActiveSection('products')}>
            {t('Shop our products')} <span>↗</span>
          </a>
          <label className="language-picker">
              <select aria-label={t('Language')} value={language} onChange={(event) => setLanguage(event.target.value as Language)}>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="rw">Kinyarwanda</option>
              </select>
           </label>
        </div>
      </header>
    </>
  );
}
