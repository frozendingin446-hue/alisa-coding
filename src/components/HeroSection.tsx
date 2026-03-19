import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Pastikan path shadcn sesuai
import ThreeScene from './ThreeScene';

export default function HeroSection() {
  // Fungsi helper untuk scroll yang lebih bersih
  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
    >
      {/* Background 3D */}
      <ThreeScene />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* --- SISI KIRI: FOTO --- */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            <div className="relative group">
              {/* Efek Cahaya di belakang foto */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              
              <div className="relative w-64 h-80 md:w-80 md:h-[450px] overflow-hidden rounded-2xl border border-white/10 glass shadow-2xl">
                <img 
                  src="/alisa-foto.jpg" // Ganti dengan path foto Anda di folder public
                  alt="Alisa Mahirah"
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                />
                
                {/* Overlay Dekoratif */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-4 left-4 right-4 glass p-3 rounded-lg border border-white/10"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">Based in Indonesia</p>
                  <p className="text-sm text-white/80">Available for freelance</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* --- SISI KANAN: KONTEN TEKS --- */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6 border border-primary/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                👋 Selamat datang di portofolio
              </motion.span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight"
            >
              Hello World!
              <br />
              <span className="text-gradient">I'm Alisa Mahirah</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Kenalin aku adalah seorang pelajar dari Aceh. Ini first time aku membangun 
              aplikasi web yang menarik dan interaktif
               </motion.p>
              
              
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
            >
              <Button 
                size="lg" 
                className="rounded-full px-8 shadow-glow bg-primary hover:bg-primary/90 transition-all"
                onClick={() => scrollToSection('#projects')}
              >
                Lihat Projects
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 border-white/10 hover:bg-white/5"
                onClick={() => scrollToSection('#contact')}
              >
                Hubungi Saya 
              </Button>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex items-center justify-center lg:justify-start gap-6"
            >
              {[
                { icon: Github, href: 'https://github.com/frozendingin446-hue/alisa-coding.git', label: 'GitHub' },
                { icon: Instagram, href: 'https://www.instagram.com/alisamahirahh', label: 'Instagram' },
                // Tambahkan sosmed lain di sini
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 rounded-full glass border border-white/5 hover:border-primary/50 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={() => scrollToSection('#about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full glass border border-white/10 animate-float cursor-pointer z-20"
        whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,0.1)" }}
        aria-label="Scroll to About"
      >
        <ArrowDown className="h-5 w-5 text-primary" />
      </motion.button>
    </section>
  );
}