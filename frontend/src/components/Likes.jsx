const Likes = ({
  likesCount,
  isLiked,
  className = "",
  handleLike,
  ...props
}) => {
  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={isLiked}
      className={`flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-200 font-mono text-sm ${
        isLiked
          ? "border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.08)] text-accent cursor-default"
          : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[#a8a89e] hover:border-[rgba(245,158,11,0.25)] hover:text-accent hover:bg-[rgba(245,158,11,0.05)]"
      } ${className}`}
      {...props}
    >
      <span className="text-base">{isLiked ? "💛" : "🤍"}</span>
      <span>{likesCount}</span>
    </button>
  );
};
export default Likes;
