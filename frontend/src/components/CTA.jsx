import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl border border-[rgba(245,158,11,0.15)] bg-[rgba(245,158,11,0.03)] p-12 lg:p-16 overflow-hidden">
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 70% at 50% 100%, rgba(245,158,11,0.07) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 text-center mb-12">
            <span className="section-line mb-5 mx-auto block" />
            <h2
              className="font-syne font-bold text-neutral-100 mb-3"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              Ready to <span className="text-accent">ignite</span> your journey?
            </h2>
            <p className="text-sm font-mono text-neutral-500 max-w-lg mx-auto">
              Join thousands of coders learning together. It&apos;s free.
            </p>
          </div>

          <div className="relative z-10 grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="p-6 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,11,0.6)] flex flex-col gap-5">
              <p className="text-sm font-mono text-[#a8a89e] leading-relaxed">
                New here? Create an account and start learning for free.
              </p>
              <button
                onClick={() => navigate("/register")}
                className="font-syne font-semibold text-sm px-6 py-3 rounded-xl bg-accent text-black hover:bg-amber-400 hover:shadow-[0_0_24px_rgba(245,158,11,0.3)] transition-all duration-200 active:scale-[0.98]"
              >
                Create free account →
              </button>
            </div>

            <div className="p-6 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,11,0.6)] flex flex-col gap-5">
              <p className="text-sm font-mono text-[#a8a89e] leading-relaxed">
                Already have an account? Pick up right where you left off.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="font-syne font-semibold text-sm px-6 py-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] text-neutral-100 hover:bg-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.18)] transition-all duration-200 active:scale-[0.98]"
              >
                Sign in →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
