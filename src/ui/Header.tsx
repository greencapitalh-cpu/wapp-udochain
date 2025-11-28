// =======================================================
// 🧭 UDoChain WAPP Header — Records Integrated (Final v2)
// =======================================================
import logo from "../assets/logo-udochain.png";

export default function Header({ user }: { user: any }) {
  const token = localStorage.getItem("token")?.trim() || "";
  const email = encodeURIComponent(user?.email || "");

  const base = (url: string) => `${url}?token=${token}&email=${email}`;

  const links = [
    { name: "Validate", url: base("https://validate.udochain.com/") },
    { name: "Sign", url: base("https://sign.udochain.com/") },
    { name: "Trace", url: base("https://trace.udochain.com/") },
    { name: "Vote", url: base("https://vote.udochain.com/") },
    { name: "Verify", url: base("https://verify.udochain.com/") },
    { name: "Records", url: base("https://verify.udochain.com/records") },
    { name: "Pay", url: base("https://pay.udochain.com/") },
    { name: "BioID", url: base("https://bioid.udochain.com/profile?from=dashboard") },
  ];

  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-40 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-3 px-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="UDoChain" className="h-8 w-auto" />
          <span className="font-semibold text-udo-primary text-lg">UDoChain</span>
        </div>
        <nav className="hidden md:flex items-center gap-5 text-sm">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.url}
              className="text-udo-steel hover:text-udo-primary transition"
            >
              {l.name}
            </a>
          ))}
        </nav>
        <div className="text-sm text-gray-500 hidden sm:block truncate max-w-[180px]">
          {user?.email}
        </div>
      </div>
    </header>
  );
}
