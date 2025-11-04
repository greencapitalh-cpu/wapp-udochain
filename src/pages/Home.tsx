// src/pages/Home.tsx
import { motion } from "framer-motion";
import Button from "../ui/Button";
import DashboardLayout from "../shared/DashboardLayout";

export default function Home() {
  return (
    <DashboardLayout>
      <motion.div
        className="text-center flex flex-col items-center justify-center py-16 space-y-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src="/src/assets/logo-udochain.png"
          alt="UDoChain Logo"
          className="w-24 h-24 mb-6 drop-shadow-lg"
        />

        <div>
          <h1 className="text-3xl font-bold text-udo-primary mb-3">
            Welcome to UDoChain Hub
          </h1>
          <p className="text-udo-steel max-w-md mx-auto">
            Access all your blockchain-powered modules in one place.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <a
            href="https://app.udochain.com/validate"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full py-4 text-lg">Validate</Button>
          </a>

          <a
            href="https://app.udochain.com/sign"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full py-4 text-lg">Sign</Button>
          </a>

          <a
            href="https://app.udochain.com/vote"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full py-4 text-lg">Vote</Button>
          </a>

          <a
            href="https://app.udochain.com/trace"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full py-4 text-lg">Trace</Button>
          </a>
        </div>

        <div className="mt-12 text-sm text-udo-steel">
          Already have an account?{" "}
          <a
            href="https://app.udochain.com/login"
            target="_blank"
            rel="noopener noreferrer"
            className="text-udo-primary hover:underline"
          >
            Log in at app.udochain.com
          </a>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
