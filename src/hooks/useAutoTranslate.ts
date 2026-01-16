// =======================================================
// 🌍 useAutoTranslate.ts — versión segura y funcional 2026
// Traducción automática para UDoChain WAPP (compatible con CSP)
// =======================================================
import { useEffect } from "react";

export default function useAutoTranslate() {
  useEffect(() => {
    // Detectar idioma del sistema
    const lang = navigator.language.split("-")[0];
    if (lang === "en") return; // no traducir si ya está en inglés

    // Evitar cargas duplicadas
    if (document.getElementById("gt-frame")) return;

    // Crear iframe seguro e invisible
    const iframe = document.createElement("iframe");
    iframe.id = "gt-frame";
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    // Inyectar el script de Google Translate dentro del iframe
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <script id="gt-script" src="https://translate.google.com/translate_a/element.js?cb=initTranslate"></script>
        <script>
          window.initTranslate = function() {
            new google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: 'es,pt,fr,it,de,zh,ja',
              autoDisplay: false
            });
          };
        </script>
      </head>
      <body></body>
      </html>
    `);
    doc.close();

    // 🧩 Proteger el branding y el lema
    const exclude = ["UDoChain", "You do. We validate."];
    setTimeout(() => {
      exclude.forEach((t) => {
        document.querySelectorAll("*").forEach((el) => {
          if (el.textContent?.includes(t)) {
            el.classList.add("notranslate");
            el.setAttribute("translate", "no");
          }
        });
      });
    }, 2000);

    console.log("🌍 Google Translate initialized safely in sandbox.");
  }, []);
}
