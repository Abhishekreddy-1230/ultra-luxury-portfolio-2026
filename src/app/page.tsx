import MagneticCursor from "@/components/MagneticCursor";
import Navigation from "@/components/Navigation";
import ThreeBackground from "@/components/ThreeBackground";
import RevealText from "@/components/RevealText";

export default function Home() {
  return (
    <main className="min-h-screen font-sans text-white selection:bg-white selection:text-black">
      <MagneticCursor />
      <Navigation />
      <ThreeBackground />

      {/* Main Content Area */}
      <div className="relative z-10 w-full min-h-screen px-8 pt-40 pb-8 flex flex-col justify-between pointer-events-none">

        {/* Hero Section */}
        <div className="w-full pointer-events-auto">
          <RevealText
            element="h1"
            className="text-[12vw] font-bold tracking-tighter leading-none mix-blend-difference"
            text={"DIGITAL\nEXPERIENCE\nSTUDIO"}
            delay={0.2}
          />
          <div className="mt-8 max-w-xl">
            <RevealText
              element="div"
              className="text-xl font-light text-gray-300 mix-blend-difference"
              text={"We craft high-performance, immersive web experiences using math-heavy shaders and buttery-smooth motion physics."}
              delay={0.8}
            />
          </div>
        </div>

        {/* Bento Box Layout */}
        <div className="w-full mt-24 grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[60vh] pointer-events-auto">

          {/* Bento Item 1 - Large feature */}
          <div className="col-span-1 md:col-span-2 md:row-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col justify-end group overflow-hidden relative cursor-none" data-magnetic>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0 transition-opacity group-hover:opacity-100 opacity-60"></div>
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-widest text-gray-400 mb-2 block">Latest Project</span>
              <h2 className="text-3xl font-medium tracking-tight group-hover:translate-x-2 transition-transform duration-500">Immersive WebGL Portals</h2>
            </div>
          </div>

          {/* Bento Item 2 - Medium top */}
          <div className="col-span-1 md:col-span-2 md:row-span-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col justify-end group overflow-hidden relative cursor-none" data-magnetic>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent z-0"></div>
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-widest text-gray-400 mb-2 block">Capabilities</span>
              <h2 className="text-2xl font-medium tracking-tight group-hover:translate-x-2 transition-transform duration-500">60FPS Motion Physics</h2>
            </div>
          </div>

          {/* Bento Item 3 - Small bottom left */}
          <div className="col-span-1 md:col-span-1 md:row-span-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center group overflow-hidden cursor-none" data-magnetic>
            <h2 className="text-4xl font-bold mb-1 group-hover:scale-110 transition-transform duration-500">12+</h2>
            <span className="text-xs uppercase tracking-widest text-gray-400 text-center">Awards Won</span>
          </div>

          {/* Bento Item 4 - Small bottom right */}
          <div className="col-span-1 md:col-span-1 md:row-span-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center group overflow-hidden cursor-none" data-magnetic>
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xs uppercase tracking-widest text-gray-400 mt-4 block">Let&apos;s Talk</span>
          </div>

        </div>

      </div>
    </main>
  );
}
