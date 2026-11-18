import { useState } from "react";
import { Link } from "react-router-dom";

function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);


  function LandingBrand({ light = false }: { light?: boolean }) {
    return (
      <Link
        to="/"
        className="flex items-center gap-3 no-underline"
        aria-label="Nafiu Community home"
      >
        <svg
          className="size-11 shrink-0"
          viewBox="0 0 48 48"
          role="img"
          aria-label="Heart-shaped community logo"
        >
          <g
            fill="none"
            stroke="#e96f48"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M24 41C18.2 36.5 7 29.1 7 18.7 7 12.1 12.1 8.7 16.9 10.2 20.1 11.2 22.2 14.2 24 17.2 25.8 14.2 27.9 11.2 31.1 10.2 35.9 8.7 41 12.1 41 18.7 41 29.1 29.8 36.5 24 41Z" />
            <path d="m9.2 20.4 7.5 5.6 4.6-3.8c1.5-1.2 3.6-1.2 5.1 0l3.7 3 8.7-5.1M16.7 26l3.7 3.5c.9.9 2.2.9 3.1 0l1.1-1.1 1.5 1.3c.9.8 2.2.7 3-.1l1-1.1 1.1.7c1 .7 2.4.4 3-.6l.9-1.4" />
          </g>
        </svg>

        <span className={light ? "text-white" : "text-[#174f43]"}>
          <strong className="block font-[Manrope] text-lg leading-none tracking-tight">
            NAFIU
          </strong>
          <small className="mt-1 block text-[8px] font-bold tracking-[0.22em] opacity-65">
            COMMUNITY COOL BASE
          </small>
        </span>
      </Link>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5ebe7] bg-white/95 backdrop-blur">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center gap-3 px-4 sm:gap-8 sm:px-5 lg:px-8">
        {/* Brand */}
        <div className="min-w-0">
          <LandingBrand />
        </div>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden items-center gap-6 text-sm font-semibold text-[#40554f] lg:flex">
          <a href="/#about">About</a>
          <a href="/#leadership">Leadership</a>
          <a href="/#programs">Programs</a>
          <Link to="/donate">Donate</Link>
          <Link to="/pay-dues">Pay dues</Link>
        </nav>

        {/* Desktop Actions */}
        <div className="ml-auto hidden shrink-0 gap-2 lg:flex">
          <Link
            to="/login"
            className="rounded-lg border border-[#d8e1dc] px-4 py-2.5 text-xs font-bold text-[#174f43]"
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-[#e96f48] px-4 py-2.5 text-xs font-bold text-white"
          >
            Join community
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg border border-[#d8e1dc] text-[#174f43] transition-colors hover:bg-[#f3f7f5] lg:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 6-12 12M6 6l12 12" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="border-t border-[#e5ebe7] bg-white px-4 py-5 shadow-lg lg:hidden">
          <nav className="flex flex-col gap-1 text-sm font-semibold text-[#40554f]">
            <a
              href="/#about"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 hover:bg-[#f3f7f5]"
            >
              About
            </a>

            <a
              href="/#leadership"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 hover:bg-[#f3f7f5]"
            >
              Leadership
            </a>

            <a
              href="/#programs"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 hover:bg-[#f3f7f5]"
            >
              Programs
            </a>

            <Link
              to="/donate"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 hover:bg-[#f3f7f5]"
            >
              Donate
            </Link>

            <Link
              to="/pay-dues"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 hover:bg-[#f3f7f5]"
            >
              Pay dues
            </Link>

            <div className="mt-3 flex flex-col gap-3 border-t border-[#e5ebe7] pt-4">
              <Link
                to="/login"
                onClick={closeMenu}
                className="rounded-lg border border-[#d8e1dc] px-4 py-3 text-center font-bold text-[#174f43]"
              >
                Log in
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="rounded-lg bg-[#e96f48] px-4 py-3 text-center font-bold text-white"
              >
                Join community
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default LandingNavbar;
