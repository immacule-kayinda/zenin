export const SITE_NAME = "Zenin";

export const SITE_DESCRIPTION =
  "Haltères en béton coulées pour l'entraînement à la maison.";

export const NAV_LINKS = [
  { href: "/produits", label: "Produits" },
  { href: "/a-propos", label: "À propos" },
  { href: "/commander", label: "Commander" },
] as const;

export const CATEGORIES = [
  { id: "haltères", label: "Haltères" },
  { id: "équipement", label: "Équipement" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];
