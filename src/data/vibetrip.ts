export type City = "Alger" | "Béjaïa" | "Oran" | "Annaba" | "Jijel";
export type Activity = "Plage" | "Paddle" | "Randonnée" | "Plongée" | "Pique-nique" | "Détente";

export const CITIES: City[] = ["Alger", "Béjaïa", "Oran", "Annaba", "Jijel"];
export const ACTIVITIES: Activity[] = [
  "Plage",
  "Paddle",
  "Randonnée",
  "Plongée",
  "Pique-nique",
  "Détente",
];

export type Destination = {
  id: string;
  name: string;
  city: City;
  summary: string;
  details: string;
  tags: Activity[];
  image: string;
};

export const DESTINATIONS: Destination[] = [
  {
    id: "sidi-fredj",
    name: "Plage de Sidi Fredj",
    city: "Alger",
    summary:
      "Une plage animée aux eaux calmes, idéale pour une première sortie balnéaire entre amis.",
    details:
      "À deux pas du port de Sidi Fredj, la plage offre une eau calme et peu profonde. Idéal pour une après-midi détente, suivie d'un dîner face aux bateaux.",
    tags: ["Plage", "Détente"],
    image: "https://files.cdn-files-a.com/uploads/12465420/800_6aea2a834207d.png",
  },
  {
    id: "aiguades",
    name: "Les Aiguades",
    city: "Béjaïa",
    summary: "Une crique turquoise protégée par des falaises, parfaite pour nager et pagayer.",
    details:
      "Nichée au pied du parc de Gouraya, cette crique aux eaux limpides se découvre à la nage, en paddle ou masque sur le nez. Viens tôt : elle se remplit vite en été.",
    tags: ["Plage", "Paddle", "Plongée"],
    image: "https://files.cdn-files-a.com/uploads/12465420/800_6aea2c750916e.jpg",
  },
  {
    id: "cap-de-garde",
    name: "Cap de Garde",
    city: "Annaba",
    summary: "Un sentier côtier panoramique qui surplombe une mer cristalline.",
    details:
      "Le sentier longe la falaise jusqu'au phare, avec des points de vue spectaculaires sur la baie. Prévois de bonnes chaussures et de l'eau.",
    tags: ["Randonnée", "Plage", "Détente"],
    image: "https://files.cdn-files-a.com/uploads/12465420/800_6aea2d1987819.jpg",
  },
  {
    id: "madagh",
    name: "Plage de Madagh",
    city: "Oran",
    summary:
      "Des eaux transparentes et des fonds rocheux : un spot apprécié des amateurs de snorkeling.",
    details:
      "Entourée de collines boisées, Madagh garde un caractère sauvage. Les rochers de chaque côté de la baie abritent une vie sous-marine étonnante.",
    tags: ["Plage", "Plongée", "Détente"],
    image: "https://files.cdn-files-a.com/uploads/12465420/800_6aea2bf8682b3.png",
  },
  {
    id: "ziama",
    name: "Plage de Ziama Mansouriah",
    city: "Jijel",
    summary: "Une longue plage sauvage bordée de montagnes, entre baignade et balade.",
    details:
      "Entre la Corniche jijelienne et les montagnes, Ziama offre une longue étendue de sable, idéale pour une sortie à la journée avec baignade et marche.",
    tags: ["Plage", "Paddle", "Randonnée"],
    image: "https://files.cdn-files-a.com/uploads/12465420/800_6aea2da7bf06d.jpg",
  },
  {
    id: "boulimat",
    name: "Crique de Boulimat",
    city: "Béjaïa",
    summary: "Une crique confidentielle accessible par un sentier : la récompense est garantie.",
    details:
      "Quelques minutes de marche suffisent pour rejoindre ce coin préservé. Une eau claire, des rochers pour se poser et beaucoup de calme.",
    tags: ["Randonnée", "Plage", "Détente"],
    image: "https://files.cdn-files-a.com/admin/system_photos_stock/800_6960ae347425f.jpg",
  },
  {
    id: "tichy",
    name: "Plage de Tichy",
    city: "Béjaïa",
    summary: "Sable fin, eaux peu profondes et ambiance conviviale : parfait pour un pique-nique.",
    details:
      "Une grande plage familiale avec du sable fin à perte de vue. Parfaite pour un pique-nique entre amis et une session de paddle au coucher du soleil.",
    tags: ["Plage", "Paddle", "Pique-nique"],
    image: "https://files.cdn-files-a.com/admin/system_photos_stock/800_69607cf900aed.jpg",
  },
  {
    id: "ain-el-turk",
    name: "Plage d'Aïn El Turk",
    city: "Oran",
    summary: "Une baie familiale avec des cafés en bord de mer et des eaux calmes.",
    details:
      "Cafés, glaciers et promenade en bord de mer : Aïn El Turk est le spot parfait pour une journée tranquille qui se termine en terrasse.",
    tags: ["Plage", "Détente", "Pique-nique"],
    image: "https://files.cdn-files-a.com/uploads/12465420/800_6aea2e8dbcd53.png",
  },
];

export type QuestionCategory =
  "Psychologie" | "Sciences" | "Voyages" | "Société" | "Philosophie" | "Loisirs";
export const QUESTION_CATEGORIES: QuestionCategory[] = [
  "Psychologie",
  "Sciences",
  "Voyages",
  "Société",
  "Philosophie",
  "Loisirs",
];

export type Question = { id: string; category: QuestionCategory; text: string };

const q = (category: QuestionCategory, texts: string[]): Question[] =>
  texts.map((text, i) => ({ id: `${category}-${i}`, category, text }));

export const QUESTIONS: Question[] = [
  ...q("Psychologie", [
    "Qu'est-ce qui te fait te sentir vraiment toi-même ?",
    "Quelle peur aimerais-tu dépasser cette année ?",
    "Quand as-tu ressenti la plus grande fierté récemment ?",
  ]),
  ...q("Sciences", [
    "Si tu pouvais explorer une planète, laquelle choisirais-tu ?",
    "Quelle découverte scientifique a le plus changé notre quotidien ?",
    "Crois-tu que l'intelligence artificielle nous rendra plus créatifs ?",
  ]),
  ...q("Voyages", [
    "Quel endroit t'a le plus marqué, et pourquoi ?",
    "Tu préfères une plage isolée ou une ville animée ?",
    "Quel voyage rêves-tu de faire un jour ?",
  ]),
  ...q("Société", [
    "Que changerais-tu en priorité dans ta ville ?",
    "Le téléphone rapproche-t-il ou éloigne-t-il les gens ?",
    "Quelle cause te tient le plus à cœur ?",
  ]),
  ...q("Philosophie", [
    "Peut-on être heureux sans rien posséder ?",
    "Le temps passe-t-il plus vite quand on est heureux ?",
    "Qu'est-ce qui donne du sens à une vie, selon toi ?",
  ]),
  ...q("Loisirs", [
    "Quelle activité te détend immédiatement ?",
    "Tu préfères un film au cinéma ou une soirée jeux ?",
    "Quel talent aimerais-tu maîtriser ?",
  ]),
];

export type OutingKind = "Simple" | "Nautique" | "Aventure" | "Randonnée";

export type Outing = {
  id: string;
  name: string;
  kind: OutingKind;
  pricePerPerson: number;
  place?: string;
  region?: string;
  description?: string;
  duration?: string;
  level?: "Facile" | "Modérée" | "Soutenue";
  image?: string;
};

export const QUICK_OUTINGS: Outing[] = [
  { id: "plage", name: "Journée à la plage", kind: "Simple", pricePerPerson: 1500 },
  { id: "paddle", name: "Paddle", kind: "Simple", pricePerPerson: 2500 },
  { id: "pique-nique", name: "Pique-nique", kind: "Simple", pricePerPerson: 1200 },
  { id: "cafe", name: "Café entre amis", kind: "Simple", pricePerPerson: 800 },
  { id: "promenade", name: "Promenade", kind: "Simple", pricePerPerson: 500 },
  { id: "randonnee", name: "Randonnée", kind: "Simple", pricePerPerson: 1000 },
];

export const EXPERIENCES: Outing[] = [
  {
    id: "kayak",
    name: "Kayak Adventure",
    kind: "Nautique",
    place: "Côte de Béjaïa",
    region: "Béjaïa",
    description:
      "Pagaie le long des criques et des falaises : une sortie encadrée idéale pour découvrir la côte méditerranéenne autrement.",
    duration: "2 à 3 h",
    pricePerPerson: 2500,
    image: "https://cdn-cms.f-static.net/ready_uploads/media/3124838/800_5e46ea75b0e7d.jpg",
  },
  {
    id: "plongee",
    name: "Plongée sous-marine",
    kind: "Nautique",
    place: "Côte algérienne",
    region: "Sites à confirmer",
    description:
      "Baptême ou plongée encadrée pour explorer les fonds méditerranéens. Matériel et sorties à vérifier auprès des prestataires.",
    duration: "2 à 4 h",
    pricePerPerson: 4500,
    image: "https://cdn-cms.f-static.com/ready_uploads/media/3013585/800_5e2a303b1ec53.jpg",
  },
  {
    id: "quad",
    name: "Quad",
    kind: "Aventure",
    place: "Pistes et dunes",
    region: "Sites à confirmer",
    description:
      "Excursion en quad sur les pistes et les dunes : sensations garanties et panoramas à couper le souffle, en groupe et encadré.",
    duration: "1 à 2 h",
    pricePerPerson: 4000,
    image: "https://cdn-cms.f-static.com/ready_uploads/media/2699042/800_5e110ed38b7ae.jpg",
  },
  {
    id: "akfadou",
    name: "Lac Noir d'Akfadou",
    kind: "Randonnée",
    level: "Modérée",
    place: "Massif d'Akfadou",
    region: "Béjaïa",
    description:
      "Randonnée au milieu de la forêt jusqu'au Lac Noir, un écrin de verdure et d'eau calme au cœur du massif d'Akfadou.",
    duration: "3 à 4 h",
    pricePerPerson: 1500,
    image: "https://cdn-cms.f-static.net/ready_uploads/media/6602670/800_5f6d27c4bb390.jpg",
  },
  {
    id: "tikjda",
    name: "Tikjda",
    kind: "Randonnée",
    level: "Modérée",
    place: "Tikjda",
    region: "Bouira",
    description:
      "Randonnée en montagne au départ de Tikjda, avec des vues spectaculaires sur les paysages du massif du Djurdjura.",
    duration: "3 à 5 h",
    pricePerPerson: 2000,
    image: "https://files.cdn-files-a.com/admin/system_photos_stock/800_695fe1194b9f3.jpg",
  },
  {
    id: "djurdjura",
    name: "Parc national du Djurdjura",
    kind: "Randonnée",
    level: "Soutenue",
    place: "Parc national du Djurdjura",
    region: "Bouira / Tizi Ouzou",
    description: "Crêtes, forêts et paysages montagneux à perte de vue pour les marcheurs motivés.",
    duration: "4 à 6 h",
    pricePerPerson: 1800,
    image: "https://cdn-cms.f-static.net/ready_uploads/media/3375974/800_5ebfa62d56f29.jpg",
  },
  {
    id: "chrea",
    name: "Chréa",
    kind: "Randonnée",
    level: "Facile",
    place: "Parc national de Chréa",
    region: "Blida",
    description: "Randonnée entre cédraies et air pur, à deux pas de Blida.",
    duration: "2 à 4 h",
    pricePerPerson: 1200,
    image: "https://files.cdn-files-a.com/uploads/12465420/800_un-6aea3581b87f0.jpg",
  },
  {
    id: "gouraya",
    name: "Parc national de Gouraya",
    kind: "Randonnée",
    level: "Facile",
    place: "Parc national de Gouraya",
    region: "Béjaïa",
    description: "Entre mer et montagne, avec un panorama remarquable au-dessus de Béjaïa.",
    duration: "2 à 3 h",
    pricePerPerson: 1000,
    image: "https://static.s123-cdn-static-d.com/ready_uploads/media/8990020/800_6386ed52bad60.jpg",
  },
];

export const ALL_OUTINGS: Outing[] = [...QUICK_OUTINGS, ...EXPERIENCES];

export const UNIVERSE_IMAGES = {
  discover: "https://files.cdn-files-a.com/admin/system_photos_stock/800_6960da88d62d0.jpg",
  talk: "https://files.cdn-files-a.com/admin/system_photos_stock/800_695ccdf584746.jpg",
  go: "https://files.cdn-files-a.com/admin/system_photos_stock/800_69748a8353ff9.jpg",
};
