const AboutItem = ({ imgPath, imgAlt, headText, paraText, index = 0 }) => {
  return (
    <div
      className={`fade-up-${
        index + 1
      } group relative p-7 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(17,17,20,0.6)] hover:border-[rgba(245,158,11,0.2)] hover:bg-[rgba(245,158,11,0.02)] transition-all duration-300 overflow-hidden`}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(245,158,11,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl overflow-hidden mb-5 border border-[rgba(255,255,255,0.08)]">
          <img
            src={imgPath}
            alt={imgAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <h3 className="font-syne font-bold text-neutral-100 mb-3 leading-snug">
          {headText}
        </h3>
        <p className="text-sm font-mono text-[#a8a89e] leading-relaxed">
          {paraText}
        </p>
      </div>
    </div>
  );
};

export default AboutItem;
