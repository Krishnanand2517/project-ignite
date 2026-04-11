// import { Button } from "./index";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen mesh-bg flex items-center relative overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orb */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="space-y-8">
            <div className="fade-up-2 space-y-3">
              <h1
                className="font-syne font-bold leading-[1.05] tracking-tight text-neutral-100"
                style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
              >
                Project
                <br />
                <span
                  className="text-accent"
                  style={{ textShadow: "0 0 60px rgba(245,158,11,0.25)" }}
                >
                  IGNITE
                </span>
              </h1>
              <p className="text-lg font-mono text-neutral-500 tracking-tight">
                Of the coders.{" "}
                <span className="text-[#a8a89e]">By the coders.</span> For the
                coders.
              </p>
            </div>

            <p className="fade-up-3 text-base font-mono text-neutral-400 max-w-md leading-relaxed">
              DSA. Courses. Articles.
              <br />
              By the community.
            </p>

            <div className="fade-up-4 flex items-center gap-4">
              <button
                onClick={() => navigate("/register")}
                className="font-syne font-semibold px-7 py-3 rounded-lg bg-accent text-black hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.35)] transition-all duration-200 active:scale-[0.98] text-sm"
              >
                Start learning free →
              </button>
              <button
                onClick={() => navigate("/courses")}
                className="font-mono text-sm text-[#a8a89e] hover:text-neutral-100 transition-colors duration-200 underline-link"
              >
                Browse courses
              </button>
            </div>

            {/* Stats */}
            {/* <div className="fade-up-4 flex gap-8 pt-4 border-t border-[rgba(255,255,255,0.06)]">
              {[
                ["Articles", "50+"],
                ["Courses", "20+"],
                ["DSA Problems", "200+"],
              ].map(([label, val]) => (
                <div key={label}>
                  <p className="font-syne font-bold text-xl text-neutral-100">
                    {val}
                  </p>
                  <p className="text-xs font-mono text-neutral-500">{label}</p>
                </div>
              ))}
            </div> */}
          </div>

          {/* Right — code card */}
          <div className="fade-up-2 hidden lg:block">
            <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,20,0.8)] backdrop-blur-xl overflow-hidden shadow-2xl">
              {/* Terminal bar */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
                <span className="w-3 h-3 rounded-full bg-[#ef4444] opacity-70" />
                <span className="w-3 h-3 rounded-full bg-[#f59e0b] opacity-70" />
                <span className="w-3 h-3 rounded-full bg-[#10b981] opacity-70" />
                <span className="ml-3 text-xs font-mono text-neutral-500">
                  ignite — main.js
                </span>
              </div>

              {/* Code block */}
              <div className="p-7 text-sm font-mono leading-relaxed text-[#e5e5e5]">
                <pre className="whitespace-pre-wrap">
                  <span className="text-yellow-400">const</span>{" "}
                  <span className="text-orange-400">ignitePassion</span> = ()
                  =&gt; {"{"}
                  {"\n  "}
                  <span className="text-yellow-400">const</span> vision ={" "}
                  <span className="text-blue-400">createVision</span>();
                  {"\n  "}
                  <span className="text-yellow-400">const</span> determination ={" "}
                  <span className="text-blue-400">gatherDetermination</span>();
                  {"\n\n  "}
                  <span className="text-yellow-400">if</span> (vision &amp;&amp;
                  determination) {"{"}
                  {"\n    "}
                  <span className="text-blue-400">pursueDreams</span>();
                  {"\n    "}
                  <span className="text-green-400">
                    return &quot;Set your soul on fire! 🔥&quot;;
                  </span>
                  {"\n  } else {"}
                  {"\n    "}
                  <span className="text-blue-400">seekInspiration</span>();
                  {"\n    "}
                  <span className="text-green-400">
                    return &quot;Every setback is a setup for a comeback!
                    🌟&quot;;
                  </span>
                  {"\n  }"}
                  {"\n};\n\nignitePassion();"}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
