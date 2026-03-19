import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Code2, Video, Coffee, Rocket, ChevronDown } from "lucide-react";

export default function AboutSection() {

  const [open, setOpen] = useState<number | null>(0);

  const stats = [
    { icon: Code2, value: "50+", label: "Projects Selesai" },
    { icon: Video, value: "100+", label: "Video Konten" },
    // { icon: Coffee, value: "1000+", label: "Cangkir Kopi" },
    // { icon: Rocket, value: "5+", label: "Tahun Pengalaman" },
  ];

  const accordion = [
    {
      title: "Siapa Saya",
      content:
        "Saya adalah developer yang memiliki minat besar dalam dunia teknologi dan pengembangan web. Saya senang membuat aplikasi yang tidak hanya berfungsi tetapi juga memiliki desain modern dan interaktif.",
    },
    {
      title: "Pengalaman",
      content:
        "Saya telah membuat berbagai project seperti website portfolio, dashboard admin, dan aplikasi web interaktif menggunakan React dan teknologi modern lainnya.",
    },
    {
      title: "Tujuan Saya",
      content:
        "Saya ingin terus berkembang dalam dunia teknologi dan menciptakan solusi digital yang bermanfaat bagi banyak orang.",
    },
  ];

  /* 3D Card Motion */
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  function handleMouseMove(e: any) {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">
            Tentang Saya
          </span>

          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Mengenal Lebih Dekat
          </h2>

          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

          {/* 3D PROFILE CARD */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden glass shadow-xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
              <span className="text-8xl">👨‍💻</span>
            </div>

            <div className="absolute -bottom-6 -right-6 p-4 glass rounded-xl shadow-card">
              <p className="font-display font-bold text-2xl text-gradient">
                5+ Tahun
              </p>
              <p className="text-sm text-muted-foreground">
                Pengalaman
              </p>
            </div>
          </motion.div>

          {/* TEXT + ACCORDION */}
          <div className="space-y-6">

            <h3 className="font-display text-2xl md:text-3xl font-bold">
              Passionate Developer & Creator
            </h3>

            {/* ACCORDION */}
            <div className="space-y-4">

              {accordion.map((item, index) => (
                <div
                  key={index}
                  className="border border-white/10 rounded-xl overflow-hidden glass"
                >
                  <button
                    onClick={() => setOpen(open === index ? null : index)}
                    className="w-full flex items-center justify-between p-4"
                  >
                    <span className="font-semibold">
                      {item.title}
                    </span>

                    <ChevronDown
                      className={`transition-transform ${
                        open === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {open === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="px-4 pb-4 text-muted-foreground"
                      >
                        {item.content}
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              ))}

            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 pt-6">

              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 glass rounded-xl text-center hover:shadow-xl transition"
                >
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />

                  <p className="font-display text-2xl font-bold">
                    {stat.value}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {stat.label}
                  </p>

                </motion.div>
              ))}

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}