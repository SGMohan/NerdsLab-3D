import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative bg-[#05070B] border-t border-cyber-border pt-16 pb-12 overflow-hidden">
      {/* Background cyber grid accents */}
      <div className="absolute inset-0 cyber-grid-bg opacity-15 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyber-neonGreen/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-cyber-surface/90 border border-cyber-neonGreen/40 group-hover:border-cyber-neonGreen transition-all shadow-[0_0_15px_rgba(0,245,160,0.25)] group-hover:shadow-[0_0_25px_rgba(0,245,160,0.5)] group-hover:scale-105 duration-300">
                <img
                  src="/nerdslab-logo.png"
                  alt="NERDS LAB Logo"
                  className="h-9 sm:h-10 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-2xl tracking-wider text-cyber-text group-hover:text-cyber-neonGreen transition-colors">
                  NERDS<span className="text-cyber-neonGreen ml-1.5">LAB</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-cyber-dim uppercase">
                  Cyber Defense Academy
                </span>
              </div>
            </Link>

            <p className="text-sm text-cyber-muted leading-relaxed max-w-sm">
              Fueling the next generation of cybersecurity leaders through innovative training and building resilience in a digital world.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.facebook.com/profile.php?id=100093530416923"
                target="_blank"
                rel="noreferrer noopener"
                className="w-9 h-9 rounded-lg bg-cyber-surface/80 border border-cyber-border hover:border-cyber-neonGreen text-cyber-muted hover:text-cyber-neonGreen flex items-center justify-center transition-colors"
                title="Follow NERDS LAB on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/nerdslab.in/"
                target="_blank"
                rel="noreferrer noopener"
                className="w-9 h-9 rounded-lg bg-cyber-surface/80 border border-cyber-border hover:border-cyber-neonGreen text-cyber-muted hover:text-cyber-neonGreen flex items-center justify-center transition-colors"
                title="Follow NERDS LAB on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Training Tracks */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest text-cyber-neonGreen uppercase mb-4">
              Training Programmes
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/courses/ethical-hacking-nerd" className="text-cyber-muted hover:text-cyber-text transition-colors">
                  Ethical Hacking Nerd
                </Link>
              </li>
              <li>
                <Link to="/courses/penetration-testing-nerd" className="text-cyber-muted hover:text-cyber-text transition-colors">
                  Penetration Testing Nerd
                </Link>
              </li>
              <li>
                <Link to="/courses/web-application-security-nerd" className="text-cyber-muted hover:text-cyber-text transition-colors">
                  Web App Security Nerd
                </Link>
              </li>
              <li>
                <Link to="/courses/cloud-security-nerd" className="text-cyber-muted hover:text-cyber-text transition-colors">
                  Cloud Security Nerd
                </Link>
              </li>
              <li>
                <Link to="/courses/soc-analysis-nerd" className="text-cyber-muted hover:text-cyber-text transition-colors">
                  SOC Analysis Nerd
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/trainings" className="text-xs font-mono text-cyber-teal hover:underline flex items-center">
                  View Full Catalogue <ArrowUpRight className="w-3 h-3 ml-0.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest text-cyber-neonGreen uppercase mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-cyber-muted hover:text-cyber-text transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-cyber-muted hover:text-cyber-text transition-colors">
                  About NERDS LAB
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-cyber-muted hover:text-cyber-text transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cyber-muted hover:text-cyber-text transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Contact Details */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest text-cyber-neonGreen uppercase mb-4">
              HQ Office & Inquiries
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-cyber-neonGreen shrink-0 mt-0.5" />
                <span className="text-cyber-muted text-xs leading-relaxed">
                  Ground Floor, Nerds Hive, VETRI E-SQUARE,<br />
                  New Bus Stand back side, next to Omnibus Stand,<br />
                  Thanjavur, Tamil Nadu 613005
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-cyber-neonGreen shrink-0" />
                <a href="tel:+918939531337" className="text-cyber-muted hover:text-cyber-neonGreen text-xs font-mono">
                  +91 89395 31337
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-cyber-neonGreen shrink-0" />
                <a href="mailto:enroll@nerdslab.in" className="text-cyber-muted hover:text-cyber-neonGreen text-xs font-mono">
                  enroll@nerdslab.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-cyber-border/60 flex flex-col sm:flex-row items-center justify-center text-xs text-cyber-dim font-mono">
          <p>© 2026 NERDS LAB. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
