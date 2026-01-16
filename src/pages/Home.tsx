// =======================================================
// 🏠 WAPP — Home.tsx (UDoChain Hub actualizado 2026)
// =======================================================
import { useAuth } from "../context/AuthContext";
import Loader from "../ui/Loader";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import useAutoTranslate from "../hooks/useAutoTranslate";

export default function Home() {
  useAutoTranslate();
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (!user) return null;

  const token = localStorage.getItem("token")?.trim() || "";
  const email = encodeURIComponent(user?.email || "");

  const buildUrl = (base: string) => `${base}?token=${token}&email=${email}`;

  const creations = [
    {
      name: "Evidence",
      url: buildUrl("https://validate.udochain.com/"),
      desc: "Create and validate your digital evidences on blockchain.",
    },
    {
      name: "NFT",
      url: buildUrl("https://nft.udochain.com/"),
      desc: "Mint an NFT identity for your verified evidence.",
    },
    {
      name: "Smart Contract",
      url: buildUrl("https://smart.udochain.com/"),
      desc: "Create traceable smart contracts for your projects.",
    },
  ];

  const tools = [
    {
      name: "Records",
      url: buildUrl("https://records.udochain.com/"),
      desc: "View all your blockchain validations and activities.",
    },
    {
      name: "Verify",
      url: buildUrl("https://verify.udochain.com/"),
      desc: "Check authenticity of any file or certificate.",
    },
    {
      name: "BioID",
      url: buildUrl("https://bioid.udochain.com/profile"),
      desc: "Manage your biometric identity and authentication.",
    },
    {
      name: "Credits",
      url: buildUrl("https://pay.udochain.com/"),
      desc: "Manage your credits and subscriptions.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-udo-bg text-gray-900">
      <Header user={user} />

      <main className="flex-1 container mx-auto px-6 py-12">
        {/* 🧭 Título principal */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl font-bold text-udo-primary mb-2 notranslate"
            translate="no"
          >
            UDoChain Hub
          </h1>
          <p className="text-udo-steel mb-2">Welcome, <strong>{user.email}</strong></p>
          <p className="text-sm text-gray-500 italic notranslate" translate="no">
            You do. We validate.
          </p>
        </div>

        {/* 🧩 MY CREATIONS */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          My Creations
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto mb-12">
          {creations.map((m) => (
            <a
              key={m.name}
              href={m.url}
              className="p-6 rounded-2xl shadow-md bg-slate-800 hover:bg-slate-700 text-white transition-all text-center flex flex-col justify-between hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold mb-2">{m.name}</h2>
              <p className="text-sm opacity-80">{m.desc}</p>
            </a>
          ))}
        </div>

        {/* 🧰 MY TOOLS */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          My Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {tools.map((m) => (
            <a
              key={m.name}
              href={m.url}
              className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 hover:border-udo-primary transition text-center flex flex-col justify-between hover:-translate-y-1"
            >
              <h3 className="text-lg font-medium text-udo-primary mb-1">
                {m.name}
              </h3>
              <p className="text-sm text-gray-600">{m.desc}</p>
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
