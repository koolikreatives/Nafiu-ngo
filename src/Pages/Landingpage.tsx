import Navbar from "../component/Navbar";

function Link({ to, ...props }: { to: string; [key: string]: any }) {
  return <a href={to} {...props} />;
}

// -----------------------------------------------------------------------------
// LANDING PAGE DATA
// All landing page content is kept in this file.
// Replace the placeholder image URLs with your actual image links.
// -----------------------------------------------------------------------------

const landingPageData = {
  organization: {
    name: "Nafiu Community Cool Base",
    background:
      "Nafiu Community Cool Base is a membership-based Muslim community organization that brings people together through faith, fellowship, mutual support, and service. We create a dependable network where members and supporters can contribute to the wellbeing and progress of the wider community.",
    mission:
      "To unite members in faith and service, provide practical support in times of need, and create opportunities for education, welfare, and sustainable community development.",
    vision:
      "A connected, compassionate, and empowered Muslim community where every member belongs and every contribution creates lasting benefit.",
    history:
      "Nafiu Community Cool Base began as an informal circle of friends and families committed to fellowship and mutual assistance. As participation grew, the group developed a clear leadership structure, regular meetings, monthly dues, welfare support, Ramadan outreach, funeral assistance, and education programs. Today, the organization continues to preserve that spirit of brotherhood and sisterhood while building transparent systems for members at home and abroad.",
    heroImage:
      "https://res.cloudinary.com/exstf7ai/image/upload/v1794904195/mu.jpg",
  },

  executives: [
    {
      id: 1,
      name: "Sheikh Abdul-Rahman Osman",
      position: "Community President",
      bio: "Provides strategic and spiritual leadership, strengthening unity and service across the community.",
    },
    {
      id: 2,
      name: "Amina Abdullahi",
      position: "Vice President",
      bio: "Coordinates member welfare, women's participation, and community partnerships.",
    },
    {
      id: 3,
      name: "Issah Mohammed",
      position: "General Secretary",
      bio: "Oversees member records, organizational communication, and program coordination.",
    },
    {
      id: 4,
      name: "Zainab Ibrahim",
      position: "Financial Secretary",
      bio: "Supports transparent dues administration and community fundraising activities.",
    },
  ],

  programs: [
    {
      id: 1,
      title: "Education & Mentorship",
      schedule: "Quarterly sessions",
      description:
        "Scholarship assistance, career guidance, and mentorship for students and young members.",
      image:
        "https://res.cloudinary.com/exstf7ai/image/upload/v1794904195/mu.jpg",
    },
    {
      id: 2,
      title: "Ramadan Care Drive",
      schedule: "Throughout Ramadan",
      description:
        "Food, iftar, and essential support for families and vulnerable community members throughout Ramadan.",
      image:
        "https://res.cloudinary.com/exstf7ai/image/upload/v1794904195/mu.jpg",
    },
    {
      id: 3,
      title: "Monthly Community Forum",
      schedule: "First Sunday of every month",
      description:
        "A welcoming gathering for learning, member updates, welfare discussions, and collective decision-making.",
      image:
        "https://res.cloudinary.com/exstf7ai/image/upload/v1794904195/mu.jpg",
    },
  ],

  donationCategories: [
    {
      id: 1,
      title: "Scholarship Support",
      description:
        "Help promising students continue their education and pursue brighter futures.",
      image:
        "https://res.cloudinary.com/exstf7ai/image/upload/v1794904195/mu.jpg",
    },
    {
      id: 2,
      title: "Funeral Support",
      description:
        "Stand with bereaved families through compassionate, timely community assistance.",
      image: "https://placehold.co/700x500?text=Funeral+Support",
    },
    {
      id: 3,
      title: "Ramadan Support",
      description:
        "Provide iftar meals, food packs, and essential support to families during the blessed month.",
      image: "https://placehold.co/700x500?text=Ramadan+Support",
    },
  ],
};

// -----------------------------------------------------------------------------
// REUSABLE BRAND
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// NAVBAR
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// FOOTER
// -----------------------------------------------------------------------------

function LandingFooter() {
  return (
    <footer className="bg-[#123f36] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <LandingBrand light />
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
            Faith, fellowship, mutual support, and service for members and
            friends of Nafiu Community Cool Base.
          </p>
        </div>

        <div>
          <h3 className="font-[Manrope] font-bold">Quick access</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/65">
            <Link to="/register">Membership registration</Link>
            <Link to="/login">Member login</Link>
            <Link to="/pay-dues">Monthly dues</Link>
            <Link to="/donate">Donations</Link>
          </div>
        </div>

        <div>
          <h3 className="font-[Manrope] font-bold">Administration</h3>
          <p className="mt-4 text-sm leading-6 text-white/65">
            Authorized executives can access the Nafiu Community administration
            workspace.
          </p>
          <Link
            to="/workspace"
            className="mt-4 inline-block text-sm font-bold text-[#f2aa89]"
          >
            Open admin dashboard →
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs leading-5 text-white/45">
        © 2026 Nafiu Community Cool Base. Powered payments by DaaruPay (D-Pay).
      </div>
    </footer>
  );
}

// -----------------------------------------------------------------------------
// LANDING PAGE
// -----------------------------------------------------------------------------

export default function LandingPage() {
  const { organization, executives, programs, donationCategories } =
    landingPageData;

  return (
    <>
     <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-[680px] overflow-hidden bg-[#123f36]">
          <img
            src={organization.heroImage}
            alt="Nafiu Community"
            className="absolute inset-0 h-full w-full object-cover bg-center"
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,42,34,.97)_0%,rgba(9,42,34,.82)_45%,rgba(9,42,34,.3)_100%)]" />

          <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-end px-5 pb-20 pt-32 lg:items-center lg:px-8 lg:py-24">
            <div className="max-w-3xl text-white">
              <p className="mb-5 text-xs font-bold tracking-[.22em] text-[#f2aa89]">
                FAITH · FELLOWSHIP · SERVICE
              </p>

              <h1 className="font-[Manrope] text-5xl leading-[1.02] font-bold tracking-[-.045em] sm:text-6xl lg:text-7xl">
                {organization.name}
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                {organization.background}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="rounded-lg bg-[#e96f48] px-6 py-3.5 text-sm font-bold text-white shadow-xl"
                >
                  Become a member
                </Link>

                <Link
                  to="/donate"
                  className="rounded-lg border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur"
                >
                  Support our work
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT / MISSION / VISION / VALUES */}
        <section id="about" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            <article className="rounded-2xl bg-[#174f43] p-8 text-white lg:p-10">
              <span className="text-xs font-bold tracking-[.18em] text-[#f2aa89]">
                OUR MISSION
              </span>
              <h2 className="mt-5 font-[Manrope] text-2xl font-bold">
                Service with purpose.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/70">
                {organization.mission}
              </p>
            </article>

            <article className="rounded-2xl bg-[#e8f2ee] p-8 lg:p-10">
              <span className="text-xs font-bold tracking-[.18em] text-[#20695a]">
                OUR VISION
              </span>
              <h2 className="mt-5 font-[Manrope] text-2xl font-bold text-[#18332d]">
                One connected community.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#57706a]">
                {organization.vision}
              </p>
            </article>

            <article className="rounded-2xl bg-[#fdf0eb] p-8 lg:p-10">
              <span className="text-xs font-bold tracking-[.18em] text-[#d85f3b]">
                OUR VALUES
              </span>
              <h2 className="mt-5 font-[Manrope] text-2xl font-bold text-[#18332d]">
                Belong. Care. Contribute.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#57706a]">
                We are guided by Islamic values, transparent stewardship, mutual
                respect, and a commitment to leave every person and place better
                than we found it.
              </p>
            </article>
          </div>
        </section>

        {/* HISTORY */}
        <section className="bg-[#f5f7f4]">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
            <div>
              <p className="text-xs font-bold tracking-[.18em] text-[#d85f3b]">
                OUR HISTORY
              </p>
              <h2 className="font-[Inter] lg:text-5xl md:text-4xl text-3xl font-bold tracking-tight text-[#18332d] mt-5 lg:leading-13 ">
                From a circle of care to a growing community.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-9 text-[#526860]">
                {organization.history}
              </p>

              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[#dce5e0] pt-8">
                <div>
                  <p className="text-2xl font-bold text-[#18332d]">428+</p>
                  <span className="text-sm text-[#526860]">members</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#18332d]">3</p>
                  <span className="text-sm text-[#526860]">
                    core support funds
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#18332d]">12</p>
                  <span className="text-sm text-[#526860]">monthly forums</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LEADERSHIP */}
        <section
          id="leadership"
          className="mx-auto max-w-7xl px-5 py-24 lg:px-8"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[.18em] text-[#d85f3b]">
              CURRENT EXECUTIVES
            </p>
            <h2 className="font-[Inter] lg:text-5xl md:text-4xl text-3xl font-bold tracking-tight text-[#18332d] mt-5 lg:leading-13 ">
              Leadership rooted in service.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#526860]">
              Meet the executives entrusted with guiding the organization and
              serving its members.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {executives.map((person, index) => (
              <article
                key={person.id}
                className="rounded-2xl border border-[#e5ebe7] bg-white p-6 shadow-[0_12px_35px_rgba(24,51,45,.06)]"
              >
                <div className="flex size-14 items-center justify-center rounded-full bg-[#e8f2ee] font-[Manrope] text-lg font-bold text-[#174f43]">
                  {person.name
                    .split(" ")
                    .slice(-2)
                    .map((word) => word[0])
                    .join("")}
                </div>

                <p className="mt-6 text-xs font-bold tracking-wider text-[#e96f48]">
                  {person.position.toUpperCase()}
                </p>

                <h3 className="mt-2 font-[Manrope] text-lg font-bold text-[#18332d]">
                  {person.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#71817c]">
                  {person.bio}
                </p>

                <span className="mt-5 block text-xs font-bold text-[#b8c5c0]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </article>
            ))}
          </div>
        </section>

        {/* PROGRAMS */}
        <section id="programs" className="bg-[#123f36] text-white">
          <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
            <div className="max-w-2xl">
              <p className="section-kicker !text-[#f2aa89]">
                PROGRAMS & ACTIVITIES
              </p>
              <h2 className="text-white font-[Inter] lg:text-5xl md:text-4xl text-3xl font-bold tracking-tight mt-5 lg:leading-13 ">
                Growing together through action.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/60">
                Regular activities that strengthen faith, welfare, learning, and
                community connection.
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {programs.map((program) => (
                <article
                  key={program.id}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                >
                  <div className="relative aspect-[16/10]">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-7">
                    <span className="text-xs font-bold text-[#f2aa89]">
                      {program.schedule}
                    </span>
                    <h3 className="mt-3 font-[Manrope] text-xl font-bold">
                      {program.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/60">
                      {program.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* DONATIONS */}
        <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold tracking-[.18em] text-[#d85f3b]">
                GIVING
              </p>
              <h2 className="font-[Inter] lg:text-5xl md:text-4xl text-3xl font-bold tracking-tight text-[#18332d] mt-5 lg:leading-13 ">
                Support that reaches people when it matters.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#526860]">
                Members and friends can donate without logging in. Choose a
                cause and complete a simple D-Pay contribution.
              </p>
              <Link
                to="/donate"
                className="mt-7 inline-block rounded-lg bg-[#e96f48] px-5 py-3 text-sm font-bold text-white"
              >
                View donation options
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {donationCategories.map((category) => (
                <Link
                  to="/donate"
                  key={category.id}
                  className="group overflow-hidden rounded-2xl border border-[#e5ebe7] bg-white no-underline"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="font-[Manrope] font-bold text-[#18332d]">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-[#71817c]">
                      {category.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* MEMBERSHIP CTA */}
        <section className="bg-[#fdf0eb]">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-16 md:flex-row md:items-center lg:px-8">
            <div>
              <p className="text-xs font-bold tracking-[.18em] text-[#d85f3b]">
                MEMBERSHIP
              </p>
              <h2 className="font-[Manrope] text-3xl font-bold tracking-tight text-[#18332d]">
                Already a member—or ready to become one?
              </h2>
              <p className="mt-3 text-sm text-[#71817c]">
                Create your profile, receive your Member ID, view notifications,
                and track monthly dues.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/login"
                className="rounded-lg border border-[#d8cfc9] bg-white px-5 py-3 text-sm font-bold text-[#174f43]"
              >
                Member login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-[#174f43] px-5 py-3 text-sm font-bold text-white"
              >
                Register now
              </Link>

              <Link
                to="/pay-dues"
                className="rounded-lg bg-[#e96f48] px-5 py-3 text-sm font-bold text-white"
              >
                Pay monthly dues
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </>
  );
}
