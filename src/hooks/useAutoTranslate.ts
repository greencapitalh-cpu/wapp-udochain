// =======================================================
// 🌍 useAutoTranslate.ts — Traducción automática ligera
// =======================================================
import { useEffect } from "react";

export default function useAutoTranslate() {
  useEffect(() => {
    // Detectar idioma del navegador
    const lang = navigator.language.split("-")[0];
    if (lang === "en") return; // No traducir si ya está en inglés

    // Excluir branding (no traducir)
    const notranslate = ["UDoChain Hub", "You do. We validate."];

    // Agregar script de Google Translate
    if (!document.querySelector("#google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);

      const div = document.createElement("div");
      div.id = "google_translate_element";
      div.style.display = "none";
      document.body.appendChild(div);

      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "es,pt,fr,it,de,zh,ja",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };
    }

    // Aplicar clase notranslate a textos fijos
    notranslate.forEach((t) => {
      document.querySelectorAll("*").forEach((el) => {
        if (el.textContent?.includes(t)) {
          el.classList.add("notranslate");
          el.setAttribute("translate", "no");
        }
      });
    });
  }, []);
}
