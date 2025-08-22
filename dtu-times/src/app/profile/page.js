"use client";


import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen px-6 pt-24 pb-12" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-light mb-4 tracking-wide" style={{ color: 'var(--text-primary)' }}>
              Profile
            </h1>
            <div className="w-16 h-px mx-auto" style={{ backgroundColor: 'var(--bg-primary)' }}></div>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-white dark:bg-gray-900/80 rounded-2xl shadow-lg p-10 w-full max-w-lg text-center border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">You must be logged in to view your profile.</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
<>
  <div
    className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-12"
    style={{ backgroundColor: "var(--bg-primary)" }}
  >
    <div className="flex-1 flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1
            className="text-3xl md:text-4xl font-light mb-4 tracking-wide"
            style={{ color: "var(--text-primary)" }}
          >
            Profile
          </h1>
          <div
            className="w-16 h-px mx-auto"
            style={{ backgroundColor: "var(--accent)" }}
          ></div>
        </div>

        {/* Centered Profile Layout */}
        <div className="flex justify-center">
          <div className="space-y-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <img
                src={user.profilePic || "/default-profile.png"}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-gray-200 dark:border-gray-700 shadow-md object-cover mb-2"
              />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {user.name}
              </h2>
              <span className="text-sm px-3 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300 font-semibold tracking-wide shadow">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3 justify-center">
                <span className="font-medium text-gray-700 dark:text-gray-300 w-24">
                  Email:
                </span>
                <span className="text-gray-900 dark:text-gray-100 break-all">
                  {user.email}
                </span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <span className="font-medium text-gray-700 dark:text-gray-300 w-24">
                  Status:
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold shadow transition-colors duration-300 ${
                    user.status === "verified"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      : user.status === "pending"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                  }`}
                >
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <span className="font-medium text-gray-700 dark:text-gray-300 w-24">
                  Joined:
                </span>
                <span className="text-gray-900 dark:text-gray-100">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            {/* Editorial Note */}
            <div
              className="pt-8 border-t"
              style={{ borderColor: "var(--border-color)" }}
            >
              <p
                className="text-sm leading-relaxed opacity-70"
                style={{ color: "var(--text-secondary)" }}
              >
                This is your DTU Times profile. For any issues or to update your
                details, contact the editorial team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

)}