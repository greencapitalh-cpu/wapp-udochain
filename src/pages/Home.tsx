// =======================================================
// 🌐 WAPP — Home.tsx (UDoChain Hub principal)
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

  const token = localStorage.getItem("token") || "";

  // 🧭 Lista de módulos activos del ecosistema
  const mainModules = [
    {
      name: "Validate",
      url: `https://validate.udochain.com/?token=${token}`,
      desc: "Validate and certify documents on blockchain",
    },
    {
      name: "Sign",
      url: `https://sign.udochain.com/?token=${token}`,
      desc: "Invite users to sign securely with BioID or e-signature",
    },
    {
      name: "Trace",
      url: `https://trace.udochain.com/?token=${token}`,
      desc: "Track and verify digital processes",
    },
    {
      name: "Vote",
      url: `https://vote.udochain.com/?token=${token}`,
      desc: "Create and manage blockchain voting events",
    },
  ];

  const extraModules = [
    {
      name: "Verify",
      url: `https://verify.udochain.com/?token=${token}`,
      desc: "Check authenticity of any certificate or proof",
    },
    {
      name: "Pay",
      url: `https://pay.udochain.com/?token=${token}`,
      desc: "Manage payments, credits, and subscription plans",
    },
    {
      name: "BioID",
      url: `https://bioid.udochain.com/?token=${token}`,
      desc: "Authenticate and manage biometric identities",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-udo-bg text-gray-900">
      <Header user={user} />
      <main className="flex-1 container mx-auto px-6 py-12">
        {/* 🔹 Encabezado */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-udo-primary mb-2">
            UDoChain Hub
          </h1>
          <p className="text-udo-steel mb-4">
            Welcome, <strong>{user.email}</strong>
          </p>
          <p className="text-sm text-gray-500 italic">
            You do. We validate.
          </p>
        </div>

        {/* 🧩 Tarjetas principales */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {mainModules.map((m) => (
            <a
              key={m.name}
              href={m.url}
              className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 hover:border-udo-primary hover:shadow-lg transition-all text-center flex flex-col justify-between hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold text-udo-primary mb-2">
                {m.name}
              </h2>
              <p className="text-sm text-gray-600">{m.desc}</p>
            </a>
          ))}
        </div>

        {/* 🧩 Tarjetas pequeñas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-5xl mx-auto">
          {extraModules.map((m) => (
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

        {/* 🔘 Botones CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <a
            href={`https://verify.udochain.com/?token=${token}`}
            className="bg-udo-primary text-white py-3 px-8 rounded-xl font-medium hover:bg-blue-700 transition"
          >
            Verify Certificates
          </a>
          <a
            href={`https://pay.udochain.com/?token=${token}`}
            className="bg-white text-udo-primary border border-udo-primary py-3 px-8 rounded-xl font-medium hover:bg-udo-primary hover:text-white transition"
          >
            Payment Plans
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
