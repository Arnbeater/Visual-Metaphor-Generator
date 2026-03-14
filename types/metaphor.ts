export type ToneOption =
  | 'editorial'
  | 'poetic'
  | 'corporate'
  | 'dark'
  | 'playful'
  | 'public-sector'
  | 'luxury';

export type MediumOption =
  | 'campaign'
  | 'poster'
  | 'film'
  | 'social'
  | 'brand identity'
  | 'presentation';

export type OutputCount = 6 | 12 | 20;

export interface GeneratorOptions {
  tone: ToneOption;
  medium: MediumOption;
  count: OutputCount;
}

export interface MetaphorCardData {
  id: string;
  title: string;
  concept: string;
  whyItWorks: string;
  visualExecution: string;
  headlineAngle: string;
  tags: string[];
}
