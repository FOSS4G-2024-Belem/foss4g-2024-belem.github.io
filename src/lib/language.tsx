import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";
import { US, BR, ES } from "country-flag-icons/react/3x2";

export const languages = {
  en: {
    name: "English",
    code: "en",
    icon: <US className="w-6 mr-2" />,
  },
  es: {
    name: "Español",
    code: "es",
    icon: <ES className="w-6 mr-2" />,
  },
  pt: {
    name: "Português",
    code: "pt",
    icon: <BR className="w-6 mr-2" />,
  },
};

export const intlHrefs = {
  "/": {
    en: "/",
    es: "/",
    pt: "/",
  },
  "/about": {
    en: "/about",
    es: "/acerca-de",
    pt: "/sobre",
  },
  "/conference-committees": {
    en: "/conference-committees",
    es: "/comite-organizador-local",
    pt: "/comite-organizador-local",
  },
  "/faq-frequently-asked-questions": {
    en: "/faq-frequently-asked-questions",
    es: "/preguntas-frecuentes-faq",
    pt: "/perguntas-frequentes-faq",
  },
  "/branding": {
    en: "/branding",
    es: "/marca",
    pt: "/marca",
  },
  "/code-of-conduct": {
    en: "/code-of-conduct",
    es: "/codigo-de-conducta",
    pt: "/codigo-de-conduta",
  },
  "/privacy-policy": {
    en: "/privacy-policy",
    es: "/politica-de-privacidad",
    pt: "/politica-de-privacidade",
  },
  "/map": {
    en: "/map",
    es: "/mapa",
    pt: "/mapa",
  },
  "/registration": {
    en: "/registration",
    es: "/inscripcion",
    pt: "/inscricao",
  },
  "/visa-info": {
    en: "/visa-info",
    es: "/info-sobre-visa",
    pt: "/info-sobre-visto",
  },
  "/travel-grant-program": {
    en: "/travel-grant-program",
    es: "/programa-de-becas",
    pt: "/programa-de-bolsas",
  },
  "/schedule": {
    en: "/schedule",
    es: "/programa",
    pt: "/programa",
  },
  "/additional-events": {
    en: "/additional-events",
    es: "/eventos-adicionales",
    pt: "/eventos-adicionais",
  },
  "/social-events": {
    en: "/social-events",
    es: "/eventos-sociales",
    pt: "/eventos-sociais",
  },
  "/sponsors": {
    en: "/sponsors",
    es: "/patrocinadores",
    pt: "/patrocinadores",
  },
  "/venue": {
    en: "/venue",
    es: "/lugar",
    pt: "/lugar",
  },
  "/visiting-belem": {
    en: "/visiting-belem",
    es: "/visitando-belem",
    pt: "/visitando-belem",
  },
  "/contact": {
    en: "/contact",
    es: "/contacto",
    pt: "/contactar-nos",
  },
  "/call-for-papers": {
    en: "/call-for-papers",
    es: "/llamado-de-ponencias",
    pt: "/chamada-para-trabalhos",
  },
  "/cfp/academic-track": {
    en: "/cfp/academic-track",
    es: "/cfp/track-academico",
    pt: "/cfp/trilha-academica",
  },
  "/cfp/general-talks": {
    en: "/cfp/general-talks",
    es: "/cfp/charlas-generales",
    pt: "/cfp/palestras-gerais",
  },
  "/cfp/workshops": {
    en: "/cfp/workshops",
    es: "/cfp/talleres",
    pt: "/cfp/oficinas",
  },
  "/foss4g-in-belem": {
    en: "/foss4g-in-belem",
    es: "/foss4g-en-belem",
    pt: "/foss4g-em-belem",
  },
  "/cancellation-policy": {
    en: "/cancellation-policy",
    es: "/politicas-de-cancelacion",
    pt: "/politica-de-cancelamento",
  },
  "/buy-tickets": {
    en: "/buy-tickets",
    es: "/comprar-entrada",
    pt: "/comprar-ingresso",
  },
  "/academic-committee": {
    en: "/academic-committee",
    es: "/comite-academico",
    pt: "/comite-academico",
  },
  "/keynotes": {
    en: "/keynotes",
    es: "/keynotes",
    pt: "/keynotes",
  },
  "/general-schedule": {
    en: "/general-schedule",
    es: "/programa-general",
    pt: "/programa-geral",
  },
  "/academic-schedule": {
    en: "/academic-schedule",
    es: "/programa-academico",
    pt: "/programa-academico",
  },
  "/workshop-schedule": {
    en: "/workshop-schedule",
    es: "/programa-workshops",
    pt: "/programa-oficinas",
  },
  "/schedule-app": {
    en: "/schedule-app",
    es: "/programa-app",
    pt: "/programa-app"
  }
};

export const LanguageContext = createContext<{
  language: "en" | "es" | "pt";
  setLanguage: Dispatch<SetStateAction<"en" | "es" | "pt">>;
}>({
  language: "en",
  setLanguage: () => {},
});
