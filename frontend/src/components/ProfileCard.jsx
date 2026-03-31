import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as storeLogin, logout as storeLogout } from "../store/authSlice";
import { Input, ImageInput } from "./index";
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
          if (response.statusCode === 200) setStudentData(response.data);
        } else if (userData.accountType === "instructor") {
          const response = await instructorService.getCurrent();
          if (response.statusCode === 200) setInstructorData(response.data);
        }
      } catch {
        dispatch(storeLogout());
      }
    };
    fetchData();
  }, [userData, dispatch]);

  const updatePassword = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await accountService.updatePassword({
      oldPassword,
      newPassword,
    });
    setIsLoading(false);
    if (response.statusCode === 200) setIsUpdatePasswordClicked(false);
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

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
      <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,20,0.7)] backdrop-blur-xl p-7">
        <div className="flex flex-col lg:flex-row gap-8 justify-between">
          {/* Profile info */}
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[rgba(245,158,11,0.1)] flex items-center justify-center flex-shrink-0">
              {userData.avatarImage ? (
                <img
                  src={userData.avatarImage}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-syne font-bold text-xl text-accent">
                  {userData.fullName?.[0]?.toUpperCase()}
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="font-syne font-bold text-xl text-neutral-100">
                  {userData.fullName}
                </h3>
                <span className="text-xs font-mono text-neutral-500 px-2 py-0.5 rounded-md bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
                  @{userData.username}
                </span>
                <span className="tag">{userData.accountType}</span>
              </div>

              {studentData && (
                <div className="mt-2 space-y-0.5">
                  <p className="text-sm font-mono text-[#a8a89e]">
                    {studentData.collegeProgramme} · Year {studentData.year}
                  </p>
                  <p className="text-sm font-mono text-neutral-500">
                    {studentData.collegeName}
                  </p>
                </div>
              )}

              {instructorData && (
                <div className="mt-3">
                  <p className="text-xs font-mono text-neutral-500 mb-2">
                    Your courses
                  </p>
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {instructorData.courses.map((course) => (
                      <Link
                        key={course._id}
                        to={`/courses/${course.courseSlug}`}
                      >
                        <div className="px-3 py-2 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] hover:border-amber-500 hover:bg-[rgba(245,158,11,0.05)] transition-all duration-200 whitespace-nowrap">
                          <p className="text-xs font-mono text-[#a8a89e]">
                            {course.courseName}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Update actions */}
          <div className="flex gap-4 flex-wrap lg:flex-nowrap">
            {isUpdatePasswordClicked ? (
              <form
                onSubmit={updatePassword}
                className="flex flex-col gap-3 w-64"
              >
                <Input
                  type="password"
                  label="Old password"
                  value={oldPassword}
                  onChange={({ target }) => setOldPassword(target.value)}
                />
                <Input
                  type="password"
                  label="New password"
                  value={newPassword}
                  onChange={({ target }) => setNewPassword(target.value)}
                />
                <Input
                  type="password"
                  label="Confirm new password"
                  value={newConfirmPassword}
                  onChange={({ target }) => setNewConfirmPassword(target.value)}
                />
                <button
                  type="submit"
                  disabled={
                    !oldPassword ||
                    !newPassword ||
                    isLoading ||
                    newPassword !== newConfirmPassword
                  }
                  className="font-syne font-semibold text-xs px-4 py-2.5 rounded-xl bg-accent text-black hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsUpdatePasswordClicked(false)}
                  className="text-xs font-mono text-neutral-500 hover:text-[#a8a89e] transition-colors"
                >
                  Cancel
                </button>
              </form>
            ) : !isUpdateImageClicked ? (
              <button
                onClick={() => setIsUpdatePasswordClicked(true)}
                className="font-syne font-semibold text-xs px-4 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[#a8a89e] hover:border-[rgba(255,255,255,0.16)] hover:text-neutral-100 transition-all duration-200 h-fit"
              >
                Update Password
              </button>
            ) : null}

            {isUpdateImageClicked ? (
              <form
                onSubmit={updateAvatar}
                className="flex flex-col gap-3 items-center w-52"
              >
                <ImageInput
                  defaultSrc={userData.avatarImage}
                  label="Profile Picture"
                  className="text-primary"
                  setOutputImage={setAvatar}
                />
                <button
                  type="submit"
                  disabled={isLoading || !avatar}
                  className="font-syne font-semibold text-xs px-6 py-2.5 rounded-xl bg-accent text-black hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 w-full"
                >
                  {isLoading ? "Updating..." : "Update Image"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsUpdateImageClicked(false)}
                  className="text-xs font-mono text-neutral-500 hover:text-[#a8a89e] transition-colors"
                >
                  Cancel
                </button>
              </form>
            ) : !isUpdatePasswordClicked ? (
              <button
                onClick={() => setIsUpdateImageClicked(true)}
                className="font-syne font-semibold text-xs px-4 py-2.5 rounded-xl border border-[rgba(245,158,11,0.25)] bg-[rgba(245,158,11,0.06)] text-accent hover:bg-[rgba(245,158,11,0.12)] transition-all duration-200 h-fit"
              >
                Update Image
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
