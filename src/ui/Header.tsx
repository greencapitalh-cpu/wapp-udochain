// =======================================================
// 🧭 UDoChain WAPP Header — Hub v3.2 (UI Polished)
// =======================================================
import logo from "../assets/logo-udochain.png";

export default function Header({ user }: { user: any }) {
  const token = localStorage.getItem("token")?.trim() || "";
  const email = encodeURIComponent(user?.email || "");

  const base = (url: string) => `${url}?token=${token}&email=${email}`;

  const links = [
    { name: "Evidence", url: base("https://validate.udochain.com/") },
    { name: "NFT", url: base("https://nft.udochain.com/") },
    { name: "Smart Contract", url: base("https://smart.udochain.com/") },
    { name: "Records", url: base("https://records.udochain.com/") },
    { name: "Verify", url: base("https://verify.udochain.com/") },
    { name: "BioID", url: base("https://bioid.udochain.com/profile") },
    { name: "Credits", url: base("https://pay.udochain.com/") },
  ];

  return (
    <header className="backdrop-blur-md bg-white/70 sticky top-0 z-40 border-b border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-3 px-6">
        {/* 🔹 Logo + Branding */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="UDoChain" className="h-8 w-auto" />
          <span
            className="font-semibold text-udo-primary text-lg notranslate select-none"
            translate="no"
          >
            UDoChain
          </span>
        </div>

        {/* 🔹 Navegación principal (desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.url}
              className="text-udo-steel hover:text-udo-primary transition-colors duration-200"
            >
              {l.name}
            </a>
          ))}
        </nav>

        {/* 🔹 Usuario + botón Back */}
        <div className="hidden md:flex items-center gap-4">
          <span className="text-sm text-gray-500 truncate max-w-[200px]">
            {user?.email}
          </span>
          <a
            href="https://app.udochain.com/"
            className="text-sm font-medium text-udo-primary hover:text-blue-800 hover:underline transition-colors duration-200"
          >
            ← Back to Login
          </a>
        </div>
      </div>
    </header>
  );
}
