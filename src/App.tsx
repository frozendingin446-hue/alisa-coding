import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Komponen Loading Screen - Tema Hitam (Dark Edition)
const LoadingScreen = () => (
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-all duration-500">
    {/* Container Animasi dengan efek Bayangan Halus */}
    <div className="relative w-72 h-72 md:w-96 md:h-96 drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
      <DotLottieReact
        src="https://lottie.host/2745008d-5c63-4893-834d-2c26bc98530f/4yImyOIuV4.lottie"
        loop
        autoplay
      />
    </div>

    {/* Indikator Teks */}
    <div className="mt-8 flex flex-col items-center gap-4">
      <p className="text-xl font-light tracking-[0.2em] text-white uppercase animate-pulse">
        Loading
      </p>
      {/* Garis Loading Keren */}
      <div className="h-[2px] w-24 bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full bg-white w-1/3 animate-[loading_1.5s_infinite_ease-in-out]"></div>
      </div>
    </div>
  </div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Memberi waktu 2.5 detik agar animasi Lottie terlihat dulu
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <div className="animate-in fade-in duration-700">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;