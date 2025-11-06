import { useAuth } from "../context/AuthContext";
import Loader from "../ui/Loader";
import Button from "../ui/Button";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-semibold text-red-600">Access denied</h1>
        <p className="text-udo-steel mt-2">Invalid or expired token.</p>
        <a
          href="https://app.udochain.com/login"
          className="mt-4 text-blue-600 underline"
        >
          Go to login
        </a>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-udo-primary mb-4">
        Welcome, {user.fullName || user.email}
      </h1>
      <p className="text-udo-steel mb-8">
        Select one of the modules below to continue:
      </p>
      <div className="grid grid-cols-2 gap-4">
        <Button href="https://validate.udochain.com">Validate</Button>
        <Button href="https://sign.udochain.com">Sign</Button>
        <Button href="https://trace.udochain.com">Trace</Button>
        <Button href="https://vote.udochain.com">Vote</Button>
      </div>
    </div>
  );
}
