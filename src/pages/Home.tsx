// =======================================================
// 🌐 WAPP — Home.tsx (UDoChain Hub principal)
// =======================================================
import { useAuth } from "../context/AuthContext";
import Loader from "../ui/Loader";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;
  if (!user) return null;

  const token = localStorage.getItem("token") || "";

  // 🧭 Lista de módulos activos del ecosistema
  const modules = [
    { name: "Validate", url: `https://validate.udochain.com/?token=${token}`, desc: "Validate and certify documents on blockchain" },
    { name: "Sign", url: `https://sign.udochain.com/?token=${token}`, desc: "Invite users to sign securely with BioID or e-signature" },
    { name: "Trace", url: `https://trace.udochain.com/?token=${token}`, desc: "Trace processes and generate certification logs" },
    { name: "Vote", url: `https://vote.udochain.com/?token=${token}`, desc: "Create and manage blockchain voting events" },
    { name: "Verify", url: `https://verify.udochain.com/?token=${token}`, desc: "Verify any certificate or digital proof instantly" },
    { name: "Pay", url: `https://pay.udochain.com/?token=${token}`, desc: "Manage payments, credits, and subscription plans" },
    { name: "BioID", url: `https://bioid.udochain.com/?token=${token}`, desc: "Manage biometric identification and KYC" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 p-6">
      {/* 🔹 Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-udo-primary mb-2">UDoChain Hub</h1>
        <p className="text-udo-steel mb-4">Welcome, <strong>{user.email}</strong></p>
        <p className="text-sm text-gray-500 italic">You do. We validate.</p>
      </div>

      {/* 🔹 Grid de módulos */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 max-w-5xl w-full">
        {modules.map((m) => (
          <a
            key={m.name}
            href={m.url}
            className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <h2 className="text-xl font-semibold text-udo-primary mb-2">{m.name}</h2>
            <p className="text-sm text-gray-600">{m.desc}</p>
          </a>
        ))}
      </div>

      {/* 🔹 Footer */}
      <footer className="mt-10 text-sm text-gray-500">
        © {new Date().getFullYear()} UDoChain — All rights reserved.
      </footer>
    </div>
  );
}
