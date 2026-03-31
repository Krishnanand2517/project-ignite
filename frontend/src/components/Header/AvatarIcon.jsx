import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AvatarIcon = ({ image }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  return (
    <button
      onClick={() => navigate("/")}
      className="w-8 h-8 rounded-full overflow-hidden border border-[rgba(255,255,255,0.12)] hover:border-amber-500 transition-all duration-200 flex-shrink-0"
    >
      {image ? (
        <img src={image} alt="avatar" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-[rgba(245,158,11,0.15)] flex items-center justify-center text-accent text-xs font-syne font-bold">
          {userData?.fullName?.[0]?.toUpperCase() || "U"}
        </div>
      )}
    </button>
  );
};

export default AvatarIcon;
