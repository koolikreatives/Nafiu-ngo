
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { API_ENDPOINTS } from "../config/apiEndpoints";
import { useToast } from "../context/ToastContext";

// =====================================================
// API CONFIGURATION
// Managed centrally in src/config/apiEndpoints.ts
// =====================================================

const REGISTER_API_URL: string = API_ENDPOINTS.auth.register;

interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  password: string;
  confirmPassword: string;
}

interface RegisterResponse {
  success?: boolean;
  message?: string;
  error?: string;
  memberId?: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<RegistrationForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "Ghana",
    password: "",
    confirmPassword: "",
  });

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  // Handle form input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Handle registration submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    if (formData.password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      setMessageType("error");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Your passwords do not match.");
      setMessageType("error");
      return;
    }

    if (!agreeToTerms) {
      setMessage("Please agree to the terms and privacy policy.");
      setMessageType("error");
      return;
    }

    if (
      !REGISTER_API_URL ||
      REGISTER_API_URL === "PASTE_YOUR_BACKEND_API_URL_HERE"
    ) {
      setMessage("Please configure your registration API endpoint first.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      // Do not send confirmPassword unless your backend specifically requires it.
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        country: formData.country.trim(),
        password: formData.password,
      };

      const response = await fetch(REGISTER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: RegisterResponse = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(
          data.error || data.message || "Registration failed. Please try again."
        );
      }

      setMessage(
        data.message ||
          (data.memberId
            ? `Registration successful! Your Member ID is ${data.memberId}.`
            : "Your account has been created successfully.")
      );

      setMessageType("success");

      const registeredEmail = formData.email.trim();

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "Ghana",
        password: "",
        confirmPassword: "",
      });

      setAgreeToTerms(false);
      toast.success(
        "Account created",
        data.memberId
          ? `Your Member ID is ${data.memberId}. Please sign in.`
          : "Registration successful. Please sign in."
      );
      navigate("/login", {
        replace: true,
        state: {
          registered: true,
          email: registeredEmail,
          message: data.message || "Registration successful. Please log in.",
        },
      });
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

  return (
    <div className="min-h-screen bg-neutral-50 lg:grid lg:grid-cols-[44%_56%]">

      {/* ==========================================
          LEFT BRANDING SECTION
      ========================================== */}

      <section className="relative flex min-h-[360px] flex-col justify-between overflow-hidden bg-[url('https://res.cloudinary.com/exstf7ai/image/upload/v1794904195/mu.jpg')] bg-no-repeat bg-cover  px-6 py-8 text-white sm:min-h-[430px] sm:px-10 sm:py-10 lg:min-h-screen lg:px-12 lg:py-11">

        {/* Background overlay */}
        <div className="absolute inset-0 bg-teal-900/70" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center">
            <svg
              viewBox="0 0 36 36"
              className="h-9 w-9"
              fill="none"
              stroke="#fb923c"
              strokeWidth="2.8"
            >
              <path d="M6 8h24v20H6z" />
              <path d="M9 18h18" />
            </svg>
          </div>

          <div>
            <h1 className="font-['Manrope'] text-lg font-bold leading-7">
              NAFIU
            </h1>
            <p className="font-['DM_Sans'] text-[8px] tracking-[0.2em] text-neutral-300">
              COMMUNITY
            </p>
          </div>
        </div>

        {/* Branding content */}
        <div className="relative z-10 mt-16 max-w-lg lg:mt-0">

          <p className="mb-6 font-['Manrope'] text-[10px] font-bold tracking-wide text-orange-300">
            BELONG. CONNECT. CONTRIBUTE.
          </p>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl lg:leading-[1.05] font-['Manrope']">
            A stronger community starts with every member.
          </h2>

          <p className="mt-7 max-w-md font-['DM_Sans'] text-sm leading-6 text-gray-300">
            NAFIU COMMUNITY brings people together to build lasting
            connections, support one another, and create shared
            opportunities.
          </p>
        </div>

        {/* Member statistics */}
        <div className="relative z-10 mt-12 flex items-center gap-6 lg:mt-0">
          <p className="font-['Manrope'] text-3xl font-bold text-red-300">
            428
          </p>

          <p className="max-w-48 font-['DM_Sans'] text-xs leading-5 text-gray-300">
            active members growing together as one community
          </p>
        </div>
      </section>

      {/* ==========================================
          RIGHT REGISTRATION SECTION
      ========================================== */}

      <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8 lg:px-12 xl:px-16">

        <div className="w-full max-w-[606px]">

          {/* Heading */}
          <div className="mb-10">
            <p className="mb-3 font-['Manrope'] text-[10px] font-bold tracking-wide text-orange-400">
              BECOME A MEMBER
            </p>

            <h2 className="font-['Manrope'] text-3xl font-bold leading-10 text-gray-800">
              Create your account
            </h2>

            <p className="mt-3 font-['DM_Sans'] text-xs leading-5 text-zinc-500">
              Join the community and receive your unique Member ID.
            </p>
          </div>

          {/* Registration form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* First name and Last name */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block font-['Manrope'] text-xs font-bold text-gray-800"
                >
                  First name
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Issah"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-800 outline-none transition focus:border-orange-400"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block font-['Manrope'] text-xs font-bold text-gray-800"
                >
                  Last name
                </label>

                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Mohammed"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-800 outline-none transition focus:border-orange-400"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-['Manrope'] text-xs font-bold text-gray-800"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="issah@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-800 outline-none transition focus:border-orange-400"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block font-['Manrope'] text-xs font-bold text-gray-800"
                >
                  Phone number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+233 24 000 0000"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-800 outline-none transition focus:border-orange-400"
                />
              </div>
            </div>

            {/* Country and Password */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div>
                <label
                  htmlFor="country"
                  className="mb-2 block font-['Manrope'] text-xs font-bold text-gray-800"
                >
                  Country
                </label>

                <input
                  id="country"
                  name="country"
                  type="text"
                  autoComplete="country-name"
                  placeholder="Ghana"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-800 outline-none transition focus:border-orange-400"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block font-['Manrope'] text-xs font-bold text-gray-800"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    minLength={8}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 pr-11 text-xs text-gray-800 outline-none transition focus:border-orange-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-gray-500 transition hover:text-orange-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block font-['Manrope'] text-xs font-bold text-gray-800"
              >
                Confirm password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 pr-11 text-xs text-gray-800 outline-none transition focus:border-orange-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  aria-label={showConfirmPassword ? "Hide confirmed password" : "Show confirmed password"}
                  aria-pressed={showConfirmPassword}
                  className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-gray-500 transition hover:text-orange-500"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms and conditions */}
            <label className="flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(event) => setAgreeToTerms(event.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 shrink-0 cursor-pointer rounded border-gray-200 accent-orange-400"
              />

              <span className="font-['DM_Sans'] text-xs leading-4 text-zinc-500">
                I agree to the terms and privacy policy.
              </span>
            </label>

            {/* API response message */}
            {message && (
              <div
                role="status"
                aria-live="polite"
                className={`rounded-lg p-3 text-xs ${
                  messageType === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {message}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center rounded-lg bg-orange-400 px-4 font-['Manrope'] text-xs font-bold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating your account..." : "Create member account"}
            </button>

          </form>

          {/* Sign in link */}
          <p className="mt-10 font-['Manrope'] text-xs font-bold text-teal-900 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="transition hover:text-orange-500"
            >
              Sign in
            </Link>
          </p>

        </div>
      </section>
    </div>
  );
}
