import { useAuth } from "../context/AuthContext";
import Loader from "../ui/Loader";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;
  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto text-center py-10">
      <h1 className="text-3xl font-bold mb-4 text-udo-primary">
        Welcome to UDoChain WAPP
      </h1>
      <p className="text-udo-steel mb-6">
        Hello <strong>{user.email}</strong> 👋 You are successfully authenticated.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 mt-8">
        <a
          href="https://wapp.udochain.com/validate"
          className="p-4 border rounded-xl shadow hover:shadow-md transition bg-white"
        >
          Validate Documents
        </a>
        <a
          href="https://wapp.udochain.com/sign"
          className="p-4 border rounded-xl shadow hover:shadow-md transition bg-white"
        >
          Sign Documents
        </a>
      </div>
    </div>
  );
}
