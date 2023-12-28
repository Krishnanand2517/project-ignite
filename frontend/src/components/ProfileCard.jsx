const ProfileCard = ({ userData }) => {
  return (
    <div className="w-4/5 mx-auto px-12 py-8 flex flex-col justify-center bg-slate-800 font-inconsolata text-secondary border border-white rounded-md">
      <div className="flex gap-x-4 items-center">
        <h3 className="font-fira font-bold text-2xl 2xl:text-4xl">
          {userData.fullName}
        </h3>
        <div className="px-2 py-1 bg-black/40">
          <p className="text-xs 2xl:text-base opacity-80">
            @{userData.username}
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm 2xl:text-base opacity-70">
          {userData.accountType}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
