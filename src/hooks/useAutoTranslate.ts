// =======================================================
// 🌍 useAutoTranslate.ts — Traducción automática SPA UDoChain
// Compatible con React + Vite + Render + Google Translate
// =======================================================
import { useEffect } from "react";

export default function useAutoTranslate() {
  useEffect(() => {
    const lang = navigator.language.split("-")[0];
    if (lang === "en") return; // no traducir si el idioma ya es inglés

    // Evitar duplicar el script
    if (document.getElementById("google-translate-script")) return;

    // Crear contenedor persistente
    let div = document.getElementById("google_translate_element");
    if (!div) {
      div = document.createElement("div");
      div.id = "google_translate_element";
      div.style.display = "none";
      document.body.appendChild(div);
    }

    // Agregar script seguro
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    // Excluir branding y lema
    const exclude = ["UDoChain", "You do. We validate."];

    // Inicializar cuando cargue el script
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "es,pt,fr,it,de,zh,ja",
          autoDisplay: false,
        },
        "google_translate_element"
      );

      // Aplicar clase notranslate a textos fijos
      exclude.forEach((t) => {
        document.querySelectorAll("*").forEach((el) => {
          if (el.textContent?.includes(t)) {
            el.classList.add("notranslate");
            el.setAttribute("translate", "no");
          }
        });
      });
    };
  }, []);
}
