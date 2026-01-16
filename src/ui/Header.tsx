// =======================================================
// 🧭 UDoChain WAPP Header — Hub v3.1 (Creations + Tools)
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
    <header className="bg-white/80 backdrop-blur sticky top-0 z-40 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-3 px-6">
        {/* 🔹 Logo + Brand */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="UDoChain" className="h-8 w-auto" />
          <span className="font-semibold text-udo-primary text-lg notranslate" translate="no">
            UDoChain
          </span>
        </div>

        {/* 🔹 Navegación (solo visible en desktop) */}
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

        {/* 🔹 Usuario + Logout */}
        <div className="hidden md:flex items-center gap-4">
          <span className="text-sm text-gray-500 truncate max-w-[180px]">
            {user?.email}
          </span>
          <a
            href="https://app.udochain.com/"
            className="text-sm text-udo-primary font-medium hover:underline"
          >
            ← Back to Login
          </a>
        </div>
      </div>
    </header>
  );
}
