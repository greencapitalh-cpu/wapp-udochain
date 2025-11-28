// =======================================================
// 🌐 WAPP — Home.tsx (UDoChain Hub principal) v3.0 — Records Enabled
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
  const email = user?.email || "";

  const mainModules = [
    {
      name: "Validate",
      url: `https://validate.udochain.com/?token=${token}&email=${encodeURIComponent(email)}`,
      desc: "Validate and certify documents on blockchain.",
    },
    {
      name: "Sign",
      url: `https://sign.udochain.com/?token=${token}&email=${encodeURIComponent(email)}`,
      desc: "Invite users to sign securely with BioID or e-signature.",
    },
    {
      name: "Trace",
      url: `https://trace.udochain.com/?token=${token}&email=${encodeURIComponent(email)}`,
      desc: "Track and verify digital processes and records.",
    },
    {
      name: "Vote",
      url: `https://vote.udochain.com/?token=${token}&email=${encodeURIComponent(email)}`,
      desc: "Create and manage blockchain voting events.",
    },
  ];

  const extraModules = [
    {
      name: "Verify",
      url: `https://verify.udochain.com/?token=${token}&email=${encodeURIComponent(email)}`,
      desc: "Check authenticity of any certificate or proof.",
    },
    {
      name: "Records",
      url: `https://verify.udochain.com/records?token=${token}&email=${encodeURIComponent(email)}`,
      desc: "View and manage your blockchain validations.",
    },
    {
      name: "Pay",
      url: `https://pay.udochain.com/?token=${token}&email=${encodeURIComponent(email)}`,
      desc: "Manage payments, credits, and subscription plans.",
    },
    {
      name: "BioID",
      url: `https://bioid.udochain.com/profile?token=${token}&email=${encodeURIComponent(email)}&from=dashboard`,
      desc: "Manage and enroll your biometric identity profile.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-udo-bg text-gray-900">
      <Header user={user} />
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-udo-primary mb-2 notranslate" translate="no">
            UDoChain Hub
          </h1>
          <p className="text-udo-steel mb-4">
            Welcome, <strong>{user.email}</strong>
          </p>
          <p className="text-sm text-gray-500 italic notranslate" translate="no">
            You do. We validate.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {mainModules.map((m) => (
            <a
              key={m.name}
              href={m.url}
              className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 hover:border-udo-primary hover:shadow-lg transition-all text-center flex flex-col justify-between hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold text-udo-primary mb-2">{m.name}</h2>
              <p className="text-sm text-gray-600">{m.desc}</p>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-6xl mx-auto">
          {extraModules.map((m) => (
            <a
              key={m.name}
              href={m.url}
              className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 hover:border-udo-primary transition text-center flex flex-col justify-between hover:-translate-y-1"
            >
              <h3 className="text-lg font-medium text-udo-primary mb-1">{m.name}</h3>
              <p className="text-sm text-gray-600">{m.desc}</p>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
