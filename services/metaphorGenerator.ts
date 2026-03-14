import { themeSeeds } from '@/data/mockMetaphors';
import type { GeneratorOptions, MetaphorCardData } from '@/types/metaphor';

const toneLens: Record<GeneratorOptions['tone'], string> = {
  editorial: 'Use clear strategic language.',
  poetic: 'Lean into evocative image language.',
  corporate: 'Keep framing pragmatic and outcomes-focused.',
  dark: 'Increase tension and consequence in tone.',
  playful: 'Introduce energetic contrast and wit.',
  'public-sector': 'Emphasize civic value and inclusion.',
  luxury: 'Prioritize materiality, craft, and restraint.',
};

const mediumExecution: Record<GeneratorOptions['medium'], string> = {
  campaign: 'Could scale across OOH, digital, and launch films.',
  poster: 'Composes cleanly as one striking hero frame.',
  film: 'Supports motion, pacing, and narrative reveal.',
  social: 'Works as short-loop storytelling and carousels.',
  'brand identity': 'Can become a repeatable visual system.',
  presentation: 'Communicates quickly in keynote-style slides.',
};

const modifiers = [
  'with exposed wiring',
  'under emergency lighting',
  'with mirrored reflections',
  'at the threshold of collapse',
  'captured as a before-and-after diptych',
  'with subtle human traces but no faces',
  'in a weathered material palette',
  'with precise geometric framing',
];

const hashString = (value: string): number => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const pick = <T,>(list: T[], indexSeed: number): T => list[indexSeed % list.length];

const normalizeTheme = (theme: string): string => theme.trim().toLowerCase();

const makeCardId = (theme: string, title: string, index: number) =>
  `${normalizeTheme(theme).replace(/\s+/g, '-')}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`;

const createVariantCard = (
  baseCard: Omit<MetaphorCardData, 'id'>,
  theme: string,
  options: GeneratorOptions,
  index: number,
): MetaphorCardData => {
  const seed = hashString(`${theme}-${baseCard.title}-${options.tone}-${options.medium}-${index}`);
  const modifier = pick(modifiers, seed);
  const tags = Array.from(new Set([...baseCard.tags, options.tone, options.medium]));

  return {
    id: makeCardId(theme, baseCard.title, index),
    title: baseCard.title,
    concept: `${baseCard.concept} ${modifier}.`,
    whyItWorks: `${baseCard.whyItWorks} ${toneLens[options.tone]}`,
    visualExecution: `${baseCard.visualExecution} ${mediumExecution[options.medium]}`,
    headlineAngle: baseCard.headlineAngle,
    tags,
  };
};

const buildFallbackCards = (theme: string): Omit<MetaphorCardData, 'id'>[] => {
  const cleanTheme = theme.trim();
  return [
    {
      title: `${cleanTheme} as Fault Line`,
      concept: `A stable surface split by a fresh fault line that keeps spreading through the scene.`,
      whyItWorks: 'Conveys hidden tension becoming visible and impossible to ignore.',
      visualExecution: 'Architectural concrete plane with precise fracture, dust, and directional side-light.',
      headlineAngle: `When ${cleanTheme} shifts, every layer above it must respond.`,
      tags: [cleanTheme.toLowerCase(), 'fracture', 'tension', 'systems'],
    },
    {
      title: `${cleanTheme} in Counterweight`,
      concept: `Two suspended masses balancing at the edge of movement, one labeled with ${cleanTheme}.`,
      whyItWorks: 'Frames the concept as dynamic equilibrium instead of static certainty.',
      visualExecution: 'Minimal rigging setup with steel cables, textured weights, and shallow depth of field.',
      headlineAngle: 'Stability is not stillness; it is constant adjustment.',
      tags: [cleanTheme.toLowerCase(), 'balance', 'weight', 'adjustment'],
    },
    {
      title: `${cleanTheme} as Signal Interference`,
      concept: 'A clean transmission repeatedly interrupted by bands of analog noise.',
      whyItWorks: 'Useful for messaging contexts where clarity and distortion are in conflict.',
      visualExecution: 'Broadcast monitor wall with one channel degrading while another stays sharp.',
      headlineAngle: 'The message is only as strong as the channel carrying it.',
      tags: [cleanTheme.toLowerCase(), 'signal', 'clarity', 'noise'],
    },
  ];
};

export const generateMetaphors = async (
  theme: string,
  options: GeneratorOptions,
): Promise<MetaphorCardData[]> => {
  const cleanTheme = normalizeTheme(theme);
  if (!cleanTheme) {
    throw new Error('Theme is required to generate visual metaphors.');
  }

  await new Promise((resolve) => setTimeout(resolve, 550));

  const matchingSeed = Object.entries(themeSeeds).find(([seedTheme, seedData]) => {
    return seedTheme === cleanTheme || seedData.keywords.some((word) => cleanTheme.includes(word));
  });

  const source = matchingSeed ? matchingSeed[1].cards : buildFallbackCards(theme);
  const cards: MetaphorCardData[] = [];

  for (let i = 0; i < options.count; i += 1) {
    const baseCard = source[i % source.length];
    cards.push(createVariantCard(baseCard, theme, options, i + 1));
  }

  return cards;
};
