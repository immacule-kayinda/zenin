import type { CategoryId } from "./constants";

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductImage = {
  src: string;
  alt: string;
  aspect?: "4/5" | "16/9" | "1/1";
};

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  tagline: string;
  description: string;
  specs: ProductSpec[];
  images: ProductImage[];
  featured: boolean;
  priceLabel?: string;
};

export const products: Product[] = [
  {
    slug: "zenin-10kg",
    name: "Zenin 10 kg",
    category: "haltères",
    tagline: "Paire compacte pour travail technique.",
    description:
      "Haltère monobloc en béton fibré, finition brute satinée. Conçue pour les séries contrôlées et les intérieurs où chaque objet compte.",
    specs: [
      { label: "Poids", value: "10 kg (paire)" },
      { label: "Matériau", value: "Béton fibré haute densité" },
      { label: "Finition", value: "Brut satiné" },
      { label: "Dimensions", value: "32 × 18 × 14 cm" },
    ],
    images: [
      {
        src: "/images/zenin-10kg.svg",
        alt: "Haltère Zenin 10 kg en béton sur fond clair",
        aspect: "4/5",
      },
      {
        src: "/images/zenin-detail.svg",
        alt: "Détail de la texture béton Zenin",
        aspect: "16/9",
      },
    ],
    featured: true,
    priceLabel: "Sur devis",
  },
  {
    slug: "zenin-15kg",
    name: "Zenin 15 kg",
    category: "haltères",
    tagline: "L'équilibre quotidien entre volume et place.",
    description:
      "Le format le plus demandé pour un home gym complet. Même exigence de coulage et de contrôle dimensionnel que toute la ligne Zenin.",
    specs: [
      { label: "Poids", value: "15 kg (paire)" },
      { label: "Matériau", value: "Béton fibré haute densité" },
      { label: "Finition", value: "Brut satiné" },
      { label: "Dimensions", value: "36 × 20 × 15 cm" },
    ],
    images: [
      {
        src: "/images/zenin-15kg.svg",
        alt: "Haltère Zenin 15 kg en béton",
        aspect: "4/5",
      },
      {
        src: "/images/zenin-detail.svg",
        alt: "Détail de la texture béton Zenin",
        aspect: "16/9",
      },
    ],
    featured: true,
    priceLabel: "Sur devis",
  },
  {
    slug: "zenin-20kg",
    name: "Zenin 20 kg",
    category: "haltères",
    tagline: "Charge lourde, silhouette tenue.",
    description:
      "Pour la force fondamentale sans compromettre la ligne visuelle. Poignée ergonomique intégrée au coulage, prise sûre même mains humides.",
    specs: [
      { label: "Poids", value: "20 kg (paire)" },
      { label: "Matériau", value: "Béton fibré haute densité" },
      { label: "Finition", value: "Brut satiné" },
      { label: "Dimensions", value: "40 × 22 × 16 cm" },
    ],
    images: [
      {
        src: "/images/zenin-20kg.svg",
        alt: "Haltère Zenin 20 kg en béton",
        aspect: "4/5",
      },
      {
        src: "/images/zenin-detail.svg",
        alt: "Détail de la texture béton Zenin",
        aspect: "16/9",
      },
    ],
    featured: true,
    priceLabel: "Sur devis",
  },
  {
    slug: "zenin-25kg",
    name: "Zenin 25 kg",
    category: "haltères",
    tagline: "Le plafond de la gamme haltères.",
    description:
      "Réservée aux espaces qui acceptent la masse. Structure interne renforcée, même esthétique monolithique que le reste de la collection.",
    specs: [
      { label: "Poids", value: "25 kg (paire)" },
      { label: "Matériau", value: "Béton fibré haute densité" },
      { label: "Finition", value: "Brut satiné" },
      { label: "Dimensions", value: "44 × 24 × 17 cm" },
    ],
    images: [
      {
        src: "/images/zenin-25kg.svg",
        alt: "Haltère Zenin 25 kg en béton",
        aspect: "4/5",
      },
    ],
    featured: false,
    priceLabel: "Sur devis",
  },
  {
    slug: "banc-zenin",
    name: "Banc Zenin",
    category: "équipement",
    tagline: "Structure acier, assise sobre.",
    description:
      "Banc plat pour compléter la ligne haltères. Cadre thermolaqué anthracite, plan de travail compatible sols sensibles.",
    specs: [
      { label: "Charge max", value: "280 kg" },
      { label: "Cadre", value: "Acier thermolaqué" },
      { label: "Dimensions", value: "120 × 35 × 45 cm" },
    ],
    images: [
      {
        src: "/images/banc-zenin.svg",
        alt: "Banc d'entraînement Zenin",
        aspect: "16/9",
      },
    ],
    featured: false,
    priceLabel: "Sur devis",
  },
  {
    slug: "rack-zenin",
    name: "Rack Zenin",
    category: "équipement",
    tagline: "Rangement vertical pour paires et accessoires.",
    description:
      "Organise l'espace sans masquer le béton. Montage mural ou au sol selon configuration.",
    specs: [
      { label: "Capacité", value: "4 paires + accessoires" },
      { label: "Matériau", value: "Acier et caoutchouc" },
      { label: "Fixation", value: "Mur ou sol" },
    ],
    images: [
      {
        src: "/images/rack-zenin.svg",
        alt: "Rack de rangement Zenin",
        aspect: "4/5",
      },
    ],
    featured: false,
    priceLabel: "Sur devis",
  },
  {
    slug: "tapis-zenin",
    name: "Tapis Zenin",
    category: "équipement",
    tagline: "Protège le sol, discret sous les haltères.",
    description:
      "Caoutchouc recyclé, épaisseur calibrée pour amortir les micro-chocs sans masquer la palette monochrome du lieu.",
    specs: [
      { label: "Dimensions", value: "180 × 90 cm" },
      { label: "Épaisseur", value: "8 mm" },
      { label: "Matériau", value: "Caoutchouc recyclé" },
    ],
    images: [
      {
        src: "/images/tapis-zenin.svg",
        alt: "Tapis de protection Zenin",
        aspect: "16/9",
      },
    ],
    featured: false,
    priceLabel: "Sur devis",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: CategoryId): Product[] {
  return products.filter((p) => p.category === category);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
