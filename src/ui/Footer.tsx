// =======================================================
// 🔒 WAPP-AUTH — Footer.tsx
// Pie de página coherente con el estilo UDoChain
// =======================================================

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="container-narrow py-6 text-center text-sm text-udo-steel">
        © {new Date().getFullYear()} UDoChain — Secure Validation Network
      </div>
    </footer>
  );
}
