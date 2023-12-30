import { useState } from "react";

import { Button, Input } from "./index";
import accountService from "../services/accounts";

const ProfileCard = ({ userData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateImageClicked, setIsUpdateImageClicked] = useState(false);
  const [isUpdatePasswordClicked, setIsUpdatePasswordClicked] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  const updatePassword = async (event) => {
    event.preventDefault();

    const passwordObject = {
      oldPassword,
      newPassword,
    };

    setIsLoading(true);

    const response = await accountService.updatePassword(passwordObject);

    setIsLoading(false);

    if (response.statusCode === 200) {
      setIsUpdatePasswordClicked(false);
    }
  };

  return (
    <div
      className={`w-4/5 mx-auto px-12 py-8 flex flex-col bg-slate-800 font-inconsolata text-secondary border border-white rounded-md transition-height ease-linear ${
        isUpdateImageClicked
          ? "h-44 2xl:h-52"
          : isUpdatePasswordClicked
          ? "h-72 2xl:h-80"
          : "h-32 2xl:h-40"
      }`}
    >
      <div className="flex justify-between">
        <div>
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
        <div className="flex gap-x-4 w-80 2xl:w-96">
          {/* UPDATE PASSWORD */}
          {isUpdatePasswordClicked ? (
            <form
              onSubmit={updatePassword}
              className="flex flex-col gap-y-2 w-full"
            >
              <div>
                <Input
                  type="password"
                  label="Old password"
                  className="text-black text-sm 2xl:text-lg 2xl:py-2 2xl:px-4"
                  value={oldPassword}
                  onChange={({ target }) => setOldPassword(target.value)}
                />
              </div>
              <div>
                <Input
                  type="password"
                  label="New password"
                  className="text-black text-sm 2xl:text-lg 2xl:py-2 2xl:px-4"
                  value={newPassword}
                  onChange={({ target }) => setNewPassword(target.value)}
                />
              </div>
              <div>
                <Input
                  type="password"
                  label="Confirm new password"
                  className="text-black text-sm 2xl:text-lg 2xl:py-2 2xl:px-4"
                  value={newConfirmPassword}
                  onChange={({ target }) => setNewConfirmPassword(target.value)}
                />
              </div>

              <Button
                textSize="text-sm 2xl:text-lg"
                className={`my-1 py-1 font-bold rounded-2xl ${
                  (!oldPassword ||
                    !newPassword ||
                    isLoading ||
                    newPassword !== newConfirmPassword) &&
                  "bg-green-800 hover:bg-green-800"
                }`}
                type="submit"
                disabled={
                  !oldPassword ||
                  !newPassword ||
                  isLoading ||
                  newPassword !== newConfirmPassword
                }
              >
                {isLoading ? "Updating..." : "Update"}
              </Button>

              <div
                className="text-center cursor-pointer hover:text-orange-400 hover:bg-black/30 mt-1 rounded-md"
                onClick={() => setIsUpdatePasswordClicked(false)}
              >
                Cancel
              </div>
            </form>
          ) : (
            <Button
              textSize="text-sm 2xl:text-lg"
              className={`py-1 px-2 font-bold rounded-2xl ${
                isUpdateImageClicked && "hidden"
              }`}
              onClick={() => setIsUpdatePasswordClicked(true)}
            >
              Update Password
            </Button>
          )}

          {/* UPDATE IMAGE */}
          {isUpdateImageClicked ? (
            <div className="flex flex-col gap-y-2 w-full">
              <div>
                <img
                  className="h-20 w-20 2xl:h-24 2xl:w-24 rounded-full border-2 border-solid border-white hover:border-orange-500"
                  src={userData.avatarImage}
                  alt="profile picture"
                />
              </div>
              <div
                className="text-center cursor-pointer hover:text-orange-400 hover:bg-black/30 mt-4 rounded-md"
                onClick={() => setIsUpdateImageClicked(false)}
              >
                Cancel
              </div>
            </div>
          ) : (
            <Button
              bgColor="bg-orange-400"
              hoverBgColor="hover:bg-orange-500"
              textSize="text-sm 2xl:text-lg"
              className={`py-1 px-2 font-bold rounded-2xl ${
                isUpdatePasswordClicked && "hidden"
              }`}
              onClick={() => setIsUpdateImageClicked(true)}
            >
              Update Image
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
