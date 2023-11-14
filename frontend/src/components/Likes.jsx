const Likes = ({ likesCount, className = "", ...props }) => {
  return (
    <button
      type="button"
      className={`p-4 w-32 flex justify-evenly text-xl 2xl:text-3xl font-inconsolata font-bold border border-white rounded-full text-secondary hover:bg-black hover:bg-opacity-20 hover:backdrop-blur-3xl ${className}`}
      {...props}
    >
      <p>💖</p>
      <p>{likesCount}</p>
    </button>
  );
};

export default Likes;
