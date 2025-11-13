import { Button } from "@/components/ui/button";
import portraitImage from "@/assets/portrait.jpg";
// 💡 1. Impor hook React
import { useState, useEffect } from "react";

// 💡 2. Tentukan props yang akan diterima (termasuk 'theme')
interface HeroProps {
  theme: "light" | "dark";
}

// 💡 3. Tentukan peran dan kecepatan mengetik
const ROLES = ["Blockchain Developer", "Frontend Developer", "Data Analyst"];
const TYPING_SPEED = 100; // Kecepatan mengetik (ms)
const DELETING_SPEED = 50; // Kecepatan menghapus (ms)
const PAUSE_DURATION = 2000; // Jeda setelah selesai mengetik (ms)

// 💡 4. Terima 'theme' sebagai prop
export const Hero = ({ theme }: HeroProps) => {
  // 💡 5. Tambahkan state untuk efek ketik
  const [roleIndex, setRoleIndex] = useState(0); // Peran mana yang sedang aktif
  const [typedText, setTypedText] = useState(""); // Teks yang sedang diketik
  const [isDeleting, setIsDeleting] = useState(false); // Status sedang mengetik/menghapus

  // 💡 6. Tambahkan useEffect untuk menjalankan logika ketik
  useEffect(() => {
    const currentRole = ROLES[roleIndex];

    const timeout = setTimeout(() => {
      if (isDeleting) {
        // --- Sedang Menghapus ---
        setTypedText(currentRole.substring(0, typedText.length - 1));
      } else {
        // --- Sedang Mengetik ---
        setTypedText(currentRole.substring(0, typedText.length + 1));
      }

      // --- Logika Transisi ---
      if (!isDeleting && typedText === currentRole) {
        // Selesai mengetik -> Jeda -> Mulai hapus
        setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
      } else if (isDeleting && typedText === "") {
        // Selesai menghapus -> Pindah ke peran berikutnya
        setIsDeleting(false);
        setRoleIndex((prevIndex) => (prevIndex + 1) % ROLES.length);
      }
    }, isDeleting ? DELETING_SPEED : TYPING_SPEED);

    // Cleanup timeout saat komponen unmount
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, roleIndex]);

  // 💡 7. Tentukan kelas warna dinamis berdasarkan tema
  const roleColorClass =
    theme === "dark" ? "text-yellow-500" : "text-violet-500"; // 'text-violet-500' untuk ungu

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 md:px-12"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <p className="text-muted-foreground text-lg">Hello, I'm</p>
              <h1 className="text-5xl md:text-7xl font-bold glow-text">Hosea</h1>
              <div className="flex items-center gap-3 text-2xl md:text-3xl text-primary">
                <span>A Passionate</span>

                {/* 💡 8. SPAN YANG DIPERBARUI */}
                <span
                  // Terapkan kelas warna dinamis
                  className={`font-semibold ${roleColorClass}`}
                  // Set tinggi minimum agar layout tidak 'loncat' saat teks kosong
                  style={{ minHeight: "2rem" }} 
                >
                  {typedText}
                  {/* Kursor mengetik yang berkedip */}
                  <span className="animate-pulse ml-1">|</span>
                </span>

              </div>
            </div>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Crafting beautiful, interactive web experiences with modern
              technologies. Specializing in React, Web3, and cutting-edge UI/UX
              design.
            </p>

            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
              >
                My Story
              </Button>
            </div>
          </div>

          {/* Right: Portrait Image (Tidak berubah) */}
          <div className="flex justify-center md:justify-end animate-fade-in">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-glow-secondary to-primary rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 animate-pulse-glow" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl animate-float">
                <img
                  src={portraitImage}
                  alt="Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};