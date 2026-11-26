export function NafiuLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center">
        <svg
          viewBox="0 0 36 36"
          className="h-8 w-8"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M18 30.5C18 30.5 6.5 23.2 6.5 14.3C6.5 10.2 9.7 7.2 13.5 7.2C15.8 7.2 17.3 8.4 18 9.8C18.7 8.4 20.2 7.2 22.5 7.2C26.3 7.2 29.5 10.2 29.5 14.3C29.5 23.2 18 30.5 18 30.5Z"
            stroke="#EA6E45"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path
            d="M12.2 16.5C13.8 18.6 15.8 20.2 18 21.8C20.2 20.2 22.2 18.6 23.8 16.5"
            stroke="#EA6E45"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="13.8" cy="13.2" r="1.4" fill="#EA6E45" />
          <circle cx="22.2" cy="13.2" r="1.4" fill="#EA6E45" />
        </svg>
      </div>
      <div>
        <div className="font-['Manrope'] text-[17px] font-bold leading-5 tracking-wide text-white">
          NAFIU
        </div>
        <div className="font-['DM_Sans'] text-[8px] font-medium tracking-[0.22em] text-white/60">
          COMMUNITY
        </div>
      </div>
    </div>
  );
}
