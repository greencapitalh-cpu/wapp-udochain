// =======================================================
// 🧭 Header.tsx — Navegación global actualizada
// =======================================================
import logo from "../assets/logo-udochain.png";

export default function Header({ user }: { user: any }) {
  const token = localStorage.getItem("token") || "";

  const links = [
    { name: "Validate", url: `https://validate.udochain.com/?token=${token}` },
    { name: "Sign", url: `https://sign.udochain.com/?token=${token}` },
    { name: "Trace", url: `https://trace.udochain.com/?token=${token}` },
    { name: "Vote", url: `https://vote.udochain.com/?token=${token}` },
    // ✅ verify apunta al módulo verify dentro de validate
    { name: "Verify", url: `https://validate.udochain.com/verify?token=${token}` },
    { name: "Pay", url: `https://pay.udochain.com/?token=${token}` },
    {
      name: "BioID",
      url: `https://bioid.udochain.com/profile?token=${token}&from=dashboard`,
    },
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

        <div className="text-sm text-gray-500 hidden sm:block">{user?.email}</div>
      </div>
    </header>
  );
}
