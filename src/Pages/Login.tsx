import { useState, type FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const LOGIN_API_URL = "https://nafiu.onrender.com/api/v1/auth/login";
const LOGIN_IMAGE_URL =
  "https://res.cloudinary.com/exstf7ai/image/upload/v1794904195/mu.jpg";

type AccountType = "member" | "administrator";

interface LoginLocationState {
  registered?: boolean;
  email?: string;
  message?: string;
}

export default function Login() {
  const location = useLocation();
  const registrationState = location.state as LoginLocationState | null;
  const [accountType, setAccountType] = useState<AccountType>("member");
  const [email, setEmail] = useState(registrationState?.email || "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    registrationState?.registered
      ? registrationState.message || "Registration successful. Please log in."
      : ""
  );
  const [messageType, setMessageType] = useState<"success" | "error">(
    registrationState?.registered ? "success" : "error"
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(LOGIN_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
          role: accountType,
          rememberMe,
        }),
      });

      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(
          data.error || data.message || "Login failed. Please try again."
        );
      }

      setMessage(data.message || "Login successful.");
      setMessageType("success");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const isAdministrator = accountType === "administrator";

  return (
    <main className="flex min-h-screen w-full flex-col bg-neutral-50 min-[850px]:h-dvh min-[850px]:min-h-0 min-[850px]:flex-row min-[850px]:overflow-hidden">
      <section
        className="relative h-[430px] w-full shrink-0 overflow-hidden bg-cover bg-center text-white min-[850px]:h-dvh min-[850px]:min-h-0 min-[850px]:w-[44%]"
        style={{ backgroundImage: `url("${LOGIN_IMAGE_URL}")` }}
      >
        <div className="absolute inset-0 bg-teal-900/60" />

        <div className="absolute left-6 top-8 z-10 flex items-center gap-3 min-[850px]:left-[8.5%] min-[850px]:top-[3.9vh]">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50">
            <svg viewBox="0 0 36 36" className="h-6 w-6" fill="none" stroke="#fb923c" strokeWidth="2.8">
              <path d="M6 8h24v20H6z" />
              <path d="M9 18h18" />
            </svg>
          </div>
          <div>
            <h1 className="font-['Manrope'] text-base font-bold leading-5 sm:text-lg">NAFIU</h1>
            <p className="font-['DM_Sans'] text-[7px] tracking-[0.22em] text-neutral-300 sm:text-[8px]">
              COMMUNITY
            </p>
          </div>
        </div>

        <div className="absolute bottom-[54px] left-6 right-6 z-10 min-[850px]:bottom-auto min-[850px]:left-[8.5%] min-[850px]:right-auto min-[850px]:top-[52.3vh] min-[850px]:w-[83%]">
          <p className="mb-5 font-['Manrope'] text-[10px] font-bold leading-4 text-orange-300">
            BELONG. CONNECT. CONTRIBUTE.
          </p>
          <h2 className="font-['Manrope'] text-3xl font-bold leading-[1.02] sm:text-4xl min-[850px]:text-[clamp(32px,3.75vw,48px)]">
            A stronger community starts with every member.
          </h2>
          <p className="mt-7 max-w-[460px] font-['DM_Sans'] text-xs leading-5 text-gray-300 min-[850px]:mt-[clamp(24px,5vh,54px)] min-[850px]:text-[clamp(10px,1.1vw,14px)]">
            NAFIU COMMUNITY brings people together to build lasting connections,
            support one another, and create shared opportunities.
          </p>
        </div>

        <div className="absolute bottom-6 left-6 z-10 hidden items-start gap-6 min-[850px]:left-[8.5%] min-[850px]:top-[88.7vh] min-[850px]:flex">
          <p className="font-['Manrope'] text-2xl font-bold leading-8 text-red-300 sm:text-3xl min-[850px]:w-[clamp(56px,6.25vw,80px)]">428</p>
          <p className="w-[180px] font-['DM_Sans'] text-[10px] leading-4 text-gray-300 sm:w-[256px] sm:text-xs">
            active members growing together as one community
          </p>
        </div>
      </section>

      <section className="relative mt-20 min-h-screen flex-1 px-5 py-5 min-[850px]:mt-0 min-[850px]:min-h-0 min-[850px]:px-0 min-[850px]:py-0">
        <div className="mx-auto lg:mt-20 md:mt-10 mt-5 w-full max-w-[584px] px-5 min-[850px]:mx-0 min-[850px]:ml-[19%] min-[850px] min-[850px]: min-[850px]:px-0">
          <p className="mb-[13px] font-['Manrope'] text-[10px] font-bold leading-4 tracking-wide text-orange-400">
            {isAdministrator ? "ADMIN WORKSPACE" : "MEMBER PORTAL"}
          </p>
          <h2 className="font-['Manrope'] text-3xl font-bold leading-10 text-gray-800 min-[850px]:text-[clamp(24px,2.35vw,30px)] min-[850px]:leading-[1.25]">
            {isAdministrator ? "Admin sign in" : "Welcome back"}
          </h2>
          <p className="mt-4 font-['DM_Sans'] text-xs leading-5 text-zinc-500 min-[850px]:mt-[clamp(8px,1.48vh,16px)] min-[850px]:text-[clamp(9px,0.94vw,12px)] min-[850px]:leading-[clamp(12px,1.56vw,20px)]">
            {isAdministrator
              ? "Sign in with your authorized administrator account."
              : "Sign in to manage your membership, dues, and community contributions."}
          </p>

          <div className="mt-[50px] grid h-11 grid-cols-2 rounded-lg bg-zinc-100 p-1 min-[850px]:mt-[clamp(28px,4.63vh,50px)] min-[850px]:h-[clamp(31px,3.44vw,44px)]">
            <button
              type="button"
              onClick={() => setAccountType("member")}
              className={`rounded-md text-xs font-bold transition min-[850px]:text-[clamp(8px,0.94vw,12px)] ${
                accountType === "member" ? "bg-white text-teal-900 shadow-sm" : "text-zinc-500"
              }`}
            >
              Member
            </button>
            <button
              type="button"
              onClick={() => setAccountType("administrator")}
              className={`rounded-md text-xs font-bold transition min-[850px]:text-[clamp(8px,0.94vw,12px)] ${
                accountType === "administrator" ? "bg-white text-teal-900 shadow-sm" : "text-zinc-500"
              }`}
            >
              Administrator
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-[27px] space-y-5 min-[850px]:mt-[clamp(16px,2.5vh,27px)] min-[850px]:space-y-[clamp(12px,1.85vh,20px)]">
            <div>
              <label htmlFor="loginEmail" className="mb-2 block font-['Manrope'] text-xs font-bold text-gray-800 min-[850px]:mb-[clamp(5px,0.74vh,8px)] min-[850px]:text-[clamp(8px,0.94vw,12px)]">
                {isAdministrator ? "Admin email" : "Email address"}
              </label>
              <input
                id="loginEmail"
                type="email"
                autoComplete="email"
                placeholder={isAdministrator ? "admin@nafiucommunity.org" : "member@example.com"}
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-800 outline-none transition focus:border-orange-400 min-[850px]:h-[clamp(31px,3.44vw,44px)] min-[850px]:px-[clamp(9px,0.94vw,12px)] min-[850px]:text-[clamp(8px,0.94vw,12px)]"
              />
            </div>

            <div>
              <label htmlFor="loginPassword" className="mb-2 block font-['Manrope'] text-xs font-bold text-gray-800 min-[850px]:mb-[clamp(5px,0.74vh,8px)] min-[850px]:text-[clamp(8px,0.94vw,12px)]">
                Password
              </label>
              <div className="relative">
                <input
                  id="loginPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 pr-11 text-xs text-gray-800 outline-none transition focus:border-orange-400 min-[850px]:h-[clamp(31px,3.44vw,44px)] min-[850px]:px-[clamp(9px,0.94vw,12px)] min-[850px]:pr-9 min-[850px]:text-[clamp(8px,0.94vw,12px)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-gray-500 hover:text-orange-500 min-[850px]:h-[clamp(31px,3.44vw,44px)] min-[850px]:w-[clamp(31px,3.44vw,44px)]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-3.5 w-3.5 accent-orange-400"
                />
                <span className="font-['DM_Sans'] text-[10px] text-zinc-500">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setMessage("Password recovery is currently handled by the organization.");
                  setMessageType("error");
                }}
                className="font-['Manrope'] text-[10px] font-bold text-teal-900 hover:text-orange-500 min-[850px]:text-[clamp(7px,0.78vw,10px)]"
              >
                Forgot password?
              </button>
            </div>

            {message && (
              <div
                role="status"
                className={`rounded-lg p-3 text-xs ${
                  messageType === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-orange-400 text-xs font-bold text-white transition hover:bg-orange-500 disabled:opacity-60 min-[850px]:h-[clamp(31px,3.44vw,44px)] min-[850px]:text-[clamp(8px,0.94vw,12px)]"
            >
              {loading ? "Signing in..." : isAdministrator ? "Sign in to admin" : "Sign in"}
            </button>
          </form>

          <p className="mt-[20px] text-center font-['DM_Sans'] text-[10px] leading-4 text-zinc-500 min-[850px]:mt-[clamp(12px,1.85vh,20px)]">
            or
          </p>
          <Link
            to="/register"
            className="mt-[17px] block text-center font-['Manrope'] text-xs font-bold leading-4 text-teal-900 hover:text-orange-500 min-[850px]:mt-[clamp(10px,1.57vh,17px)] min-[850px]:text-[clamp(8px,0.94vw,12px)]"
          >
            New to NAFIU COMMUNITY? Become a member
          </Link>
          <Link
            to="/"
            className="mt-6 block rounded-lg bg-gray-200 px-[18px] py-3 outline outline-1 outline-gray-200 min-[850px]:mt-[clamp(14px,2.22vh,24px)] min-[850px]:px-[clamp(12px,1.4vw,18px)] min-[850px]:py-[clamp(7px,1.1vh,12px)]"
          >
            <span className="block font-['Manrope'] text-xs font-bold text-teal-900">Continue as a supporter</span>
            <span className="mt-1 block font-['DM_Sans'] text-[10px] leading-4 text-zinc-500">
              No membership login required
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
