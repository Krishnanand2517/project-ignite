import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login as storeLogin, logout as storeLogout } from "../store/authSlice";
import { Button, Input, ImageInput } from "./index";
import accountService from "../services/accounts";
import studentService from "../services/students";
import instructorService from "../services/instructors";

const ProfileCard = ({ userData }) => {
  const dispatch = useDispatch();

  const [studentData, setStudentData] = useState(null);
  const [instructorData, setInstructorData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateImageClicked, setIsUpdateImageClicked] = useState(false);
  const [isUpdatePasswordClicked, setIsUpdatePasswordClicked] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userData.accountType === "student") {
          const response = await studentService.getCurrent();

          if (response.statusCode === 200) {
            setStudentData(response.data);
          }
        } else if (userData.accountType === "instructor") {
          const response = await instructorService.getCurrent();

          if (response.statusCode === 200) {
            setInstructorData(response.data);
          }
        }
      } catch {
        dispatch(storeLogout());
      }
    };

    fetchData();
  }, [userData, dispatch]);

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

  const updateAvatar = async (event) => {
    event.preventDefault();

    const avatarFormData = new FormData();
    avatarFormData.append("avatar", avatar);

    setIsLoading(true);

    const response = await accountService.updateAvatar(avatarFormData);

    setIsLoading(false);

    if (response.statusCode === 200) {
      const getUserResponse = await accountService.getCurrent();

      if (getUserResponse.data.statusCode === 200) {
        dispatch(storeLogin(getUserResponse.data.data));
        setIsUpdateImageClicked(false);
      }
    }
  };

  const renderStudentDetails = () => {
    if (!studentData) return null;

    return (
      <>
        <p className="2xl:text-xl">
          {studentData.collegeProgramme} (Year {studentData.year})
        </p>
        <p className="text-lg 2xl:text-2xl font-bold">
          {studentData.collegeName}
        </p>
      </>
    );
  };

  const renderInstructorDetails = () => {
    if (!instructorData) return null;

    return (
      <>
        <p className="text-lg 2xl:text-2xl font-bold">Your Courses</p>
        <div className="flex gap-x-4 mt-2 overflow-x-auto scrollbar-hide">
          {instructorData.courses.map((course) => (
            <Link key={course._id} to={`/courses/${course.courseSlug}`}>
              <div className="w-40 h-20 2xl:w-48 2xl:h-28 flex justify-center items-center bg-opacity-60 bg-slate-700 hover:bg-slate-900 rounded-md">
                <p className="text-center 2xl:text-xl font-bold">
                  {course.courseName}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div
      className={`w-4/5 mx-auto px-12 py-8 flex flex-col bg-slate-800 font-inconsolata text-secondary border border-white rounded-md transition-height ease-linear ${
        isUpdateImageClicked
          ? "h-64 2xl:h-72"
          : isUpdatePasswordClicked
          ? "h-72 2xl:h-96"
          : userData.accountType === "instructor"
          ? "h-64 2xl:h-72"
          : "h-48 2xl:h-56"
      }`}
    >
      <div className="flex justify-between items-start">
        {/* TOP SECTION */}
        <div className="w-1/2">
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

          {/* BOTTOM SECTION */}
          <div className="mt-4">
            {userData.accountType === "student"
              ? renderStudentDetails()
              : renderInstructorDetails()}
          </div>
        </div>

        {/* UPDATE BUTTONS */}
        <div className="flex justify-end gap-x-4 w-1/2">
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
            <form
              onSubmit={updateAvatar}
              className="flex flex-col gap-y-2 w-full items-center"
            >
              <div>
                <ImageInput
                  defaultSrc={userData.avatarImage}
                  label="Profile Picture"
                  className="text-primary"
                  setOutputImage={setAvatar}
                />
              </div>

              <Button
                bgColor="bg-orange-400"
                hoverBgColor="hover:bg-orange-500"
                textSize="text-sm 2xl:text-lg"
                className={`my-1 2xl:my-2 py-1 2xl:py-[2] 2xl:px-14 font-bold rounded-2xl ${
                  (isLoading || !avatar) && "bg-orange-800 hover:bg-orange-800"
                }`}
                type="submit"
                disabled={isLoading || !avatar}
              >
                {isLoading ? "Updating..." : "Update"}
              </Button>

              <div
                className="text-center cursor-pointer hover:text-orange-400 hover:bg-black/30 rounded-md"
                onClick={() => setIsUpdateImageClicked(false)}
              >
                Cancel
              </div>
            </form>
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
