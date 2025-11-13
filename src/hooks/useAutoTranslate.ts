import { useEffect } from "react";

export default function useAutoTranslate() {
  useEffect(() => {
    const lang = navigator.language;
    const html = document.documentElement;
    if (lang.startsWith("es")) html.lang = "es";
    else if (lang.startsWith("pt")) html.lang = "pt";
    else html.lang = "en";
  }, []);
}
