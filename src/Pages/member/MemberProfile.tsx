import { useState, type FormEvent } from "react";
import { ArrowRight, X } from "lucide-react";
import { useDashboardData } from "../../context/DashboardDataContext";

export default function MemberProfile() {
  const { memberUser, editProfile, changePassword } = useDashboardData();

  const [isEditing, setIsEditing] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileFeedback, setProfileFeedback] = useState("");
  const [formState, setFormState] = useState({
    firstName: memberUser.firstName,
    lastName: memberUser.lastName,
    email: memberUser.email,
    phone: memberUser.phone,
    country: memberUser.country,
  });

  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleStartEdit = () => {
    setFormState({
      firstName: memberUser.firstName,
      lastName: memberUser.lastName,
      email: memberUser.email,
      phone: memberUser.phone,
      country: memberUser.country,
    });
    setProfileFeedback("");
    setIsEditing(true);
  };

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileFeedback("");
    try {
      await editProfile(formState);
      setIsEditing(false);
      setProfileFeedback("Profile updated successfully.");
    } catch (err) {
      setProfileFeedback(
        err instanceof Error ? err.message : "Failed to update profile."
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);
    if (newPassword.length < 8) {
      setPasswordStatus({
        type: "error",
        text: "New password must be at least 8 characters.",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordStatus({
        type: "error",
        text: "New passwords do not match.",
      });
      return;
    }

    setSavingPassword(true);
    try {
      const msg = await changePassword({ currentPassword, newPassword });
      setPasswordStatus({ type: "success", text: msg });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setPasswordModalOpen(false);
        setPasswordStatus(null);
      }, 900);
    } catch (err) {
      setPasswordStatus({
        type: "error",
        text:
          err instanceof Error ? err.message : "Failed to update password.",
      });
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-['Manrope'] text-[11px] font-bold uppercase tracking-[0.08em] text-[#E06B43]">
            ACCOUNT
          </p>
          <h1 className="mt-1 font-['Manrope'] text-2xl font-bold tracking-tight text-[#142820] sm:text-[28px]">
            My profile
          </h1>
          <p className="mt-1 text-[13px] text-[#6E7C76]">
            Manage your personal information and account security.
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={handleStartEdit}
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg border border-[#E2E7E4] bg-white px-5 font-['Manrope'] text-xs font-bold text-[#142820] transition hover:bg-[#F5F7F6]"
          >
            Edit profile
          </button>
        )}
      </div>

      {profileFeedback && (
        <div className="rounded-lg bg-[#E8F4ED] px-4 py-2.5 text-xs font-medium text-[#144533]">
          {profileFeedback}
        </div>
      )}

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
        {/* Left summary card */}
        <section className="rounded-xl border border-[#E8ECEA] bg-white px-6 py-8 text-center lg:col-span-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F3D3C1] font-['Manrope'] text-lg font-bold text-[#144533]">
            {memberUser.avatarInitials}
          </div>
          <h2 className="mt-4 font-['Manrope'] text-base font-bold text-[#142820]">
            {memberUser.fullName}
          </h2>
          <p className="mt-1 text-xs text-[#7D8A85]">
            Member since {memberUser.memberSince || "March 2026"}
          </p>

          <div className="mt-6 rounded-lg bg-[#EDF4F0] px-4 py-2.5 text-xs font-bold text-[#144533]">
            {memberUser.memberId || "NGO-2026-000124"}
          </div>
        </section>

        {/* Right details card */}
        <section className="rounded-xl border border-[#E8ECEA] bg-white p-6 lg:col-span-8">
          <h2 className="font-['Manrope'] text-base font-bold text-[#142820]">
            Personal information
          </h2>
          <p className="mt-0.5 text-xs text-[#7D8A85]">
            Your contact and account details
          </p>

          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-[#7D8A85]">
                    First name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.firstName}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, firstName: e.target.value }))
                    }
                    className="h-10 w-full rounded-lg border border-[#E2E7E4] px-3 text-xs font-semibold text-[#182B23] outline-none focus:border-[#E86D43]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-[#7D8A85]">
                    Last name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.lastName}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, lastName: e.target.value }))
                    }
                    className="h-10 w-full rounded-lg border border-[#E2E7E4] px-3 text-xs font-semibold text-[#182B23] outline-none focus:border-[#E86D43]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-[#7D8A85]">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
                    className="h-10 w-full rounded-lg border border-[#E2E7E4] px-3 text-xs font-semibold text-[#182B23] outline-none focus:border-[#E86D43]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-[#7D8A85]">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, phone: e.target.value }))
                    }
                    className="h-10 w-full rounded-lg border border-[#E2E7E4] px-3 text-xs font-semibold text-[#182B23] outline-none focus:border-[#E86D43]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-[#7D8A85]">
                    Country
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.country}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, country: e.target.value }))
                    }
                    className="h-10 w-full rounded-lg border border-[#E2E7E4] px-3 text-xs font-semibold text-[#182B23] outline-none focus:border-[#E86D43]"
                  />
                </div>
                <div>
                  <p className="mb-1.5 text-[11px] font-medium text-[#7D8A85]">
                    Account created
                  </p>
                  <p className="flex h-10 items-center text-xs font-semibold text-[#182B23]">
                    {memberUser.accountCreated || "14 March 2026"}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="inline-flex h-9 items-center rounded-lg border border-[#E2E7E4] px-4 text-xs font-semibold text-[#182B23] hover:bg-[#F5F7F6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="inline-flex h-9 items-center rounded-lg bg-[#E86D43] px-4 font-['Manrope'] text-xs font-bold text-white hover:bg-[#D55C33] disabled:opacity-60"
                >
                  {savingProfile ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-y-5 gap-x-8 sm:grid-cols-2">
              <div>
                <p className="text-[11px] text-[#88948F]">First name</p>
                <p className="mt-1 text-xs font-semibold text-[#182B23]">
                  {memberUser.firstName}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-[#88948F]">Last name</p>
                <p className="mt-1 text-xs font-semibold text-[#182B23]">
                  {memberUser.lastName}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-[#88948F]">Email address</p>
                <p className="mt-1 text-xs font-semibold text-[#182B23]">
                  {memberUser.email}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-[#88948F]">Phone number</p>
                <p className="mt-1 text-xs font-semibold text-[#182B23]">
                  {memberUser.phone}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-[#88948F]">Country</p>
                <p className="mt-1 text-xs font-semibold text-[#182B23]">
                  {memberUser.country}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-[#88948F]">Account created</p>
                <p className="mt-1 text-xs font-semibold text-[#182B23]">
                  {memberUser.accountCreated || "14 March 2026"}
                </p>
              </div>
            </div>
          )}

          {/* Password & security */}
          <div className="mt-8 flex flex-col justify-between gap-3 rounded-xl border border-[#E8ECEA] px-5 py-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold text-[#182B23]">
                Password & security
              </p>
              <p className="mt-0.5 text-[11px] text-[#88948F]">
                {memberUser.passwordLastUpdated || "Last updated 3 months ago"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setPasswordStatus(null);
                setPasswordModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 font-['Manrope'] text-xs font-bold text-[#144533] transition hover:text-[#E86D43]"
            >
              <span>Change password</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </section>
      </div>

      {/* Change Password Modal */}
      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl border border-[#E8ECEA] bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-['Manrope'] text-base font-bold text-[#142820]">
                Change password
              </h3>
              <button
                type="button"
                onClick={() => setPasswordModalOpen(false)}
                aria-label="Close modal"
                className="rounded-lg p-1 text-[#7D8A85] hover:bg-[#F2F5F3]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="mt-4 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#182B23]">
                  Current password
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="h-10 w-full rounded-lg border border-[#E2E7E4] px-3 text-xs outline-none focus:border-[#E86D43]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#182B23]">
                  New password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="h-10 w-full rounded-lg border border-[#E2E7E4] px-3 text-xs outline-none focus:border-[#E86D43]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#182B23]">
                  Confirm new password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-10 w-full rounded-lg border border-[#E2E7E4] px-3 text-xs outline-none focus:border-[#E86D43]"
                />
              </div>

              {passwordStatus && (
                <p
                  className={`rounded-lg px-3 py-2 text-xs ${
                    passwordStatus.type === "success"
                      ? "bg-[#E8F4ED] text-[#144533]"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {passwordStatus.text}
                </p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  className="h-9 rounded-lg border border-[#E2E7E4] px-4 text-xs font-semibold text-[#182B23] hover:bg-[#F5F7F6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="h-9 rounded-lg bg-[#E86D43] px-4 font-['Manrope'] text-xs font-bold text-white hover:bg-[#D55C33] disabled:opacity-60"
                >
                  {savingPassword ? "Updating..." : "Update password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
