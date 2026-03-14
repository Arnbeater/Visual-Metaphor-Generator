import { NextResponse } from 'next/server';
import type { GeneratorOptions, MetaphorCardData } from '@/types/metaphor';
import { generateMockMetaphors } from '@/services/metaphorGenerator';

type RequestPayload = {
  theme?: string;
  options?: GeneratorOptions;
};

type ChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

const sanitizeCards = (theme: string, cards: Partial<MetaphorCardData>[], count: number): MetaphorCardData[] => {
  return cards.slice(0, count).map((card, index) => {
    const title = (card.title ?? `Metaphor ${index + 1}`).trim();
    return {
      id: `${theme.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`,
      title,
      concept: (card.concept ?? 'No concept provided.').trim(),
      whyItWorks: (card.whyItWorks ?? 'No rationale provided.').trim(),
      visualExecution: (card.visualExecution ?? 'No visual execution provided.').trim(),
      headlineAngle: (card.headlineAngle ?? 'No headline angle provided.').trim(),
      tags: Array.isArray(card.tags) ? card.tags.slice(0, 8).map((tag) => String(tag).trim()).filter(Boolean) : [],
    };
  });
};

const buildPrompt = (theme: string, options: GeneratorOptions) => `
You are a senior creative strategist and art director.
Generate exactly ${options.count} visual metaphor ideas for the theme: "${theme}".

Constraints:
- Tone: ${options.tone}
- Medium: ${options.medium}
- Avoid clichés unless strongly reframed.
- Prefer specific symbolic objects, systems, architecture, transit, weather, fracture, thresholds, concealment, ritual, body language, gravity, reflection.
- Keep outputs practical for campaigns, branding, editorial concepts, posters, films, or social content.

Return JSON only in this exact shape:
{
  "cards": [
    {
      "title": "...",
      "concept": "...",
      "whyItWorks": "...",
      "visualExecution": "...",
      "headlineAngle": "...",
      "tags": ["...", "..."]
    }
  ]
}
`.trim();

const withMockFallback = async (theme: string, options: GeneratorOptions) => {
  const cards = await generateMockMetaphors(theme, options);
  return NextResponse.json({ cards, source: 'mock' });
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestPayload;
    const theme = body.theme?.trim();
    const options = body.options;

    if (!theme || !options) {
      return NextResponse.json({ error: 'Theme and options are required.' }, { status: 400 });
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterApiKey) {
      return withMockFallback(theme, options);
    }

    const completion = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openRouterApiKey}`,
        'HTTP-Referer': process.env.OPENROUTER_SITE_URL ?? 'http://localhost:3000',
        'X-Title': process.env.OPENROUTER_SITE_NAME ?? 'Visual Metaphor Generator',
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL ?? 'openai/gpt-4o-mini',
        temperature: 0.85,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: 'You produce specific, concrete, and strategically useful visual metaphor concepts.',
          },
          {
            role: 'user',
            content: buildPrompt(theme, options),
          },
        ],
      }),
    });

    if (!completion.ok) {
      return withMockFallback(theme, options);
    }

    const data = (await completion.json()) as ChatCompletionResponse;
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return withMockFallback(theme, options);
    }

    const parsed = JSON.parse(content) as { cards?: Partial<MetaphorCardData>[] };
    if (!parsed.cards || !Array.isArray(parsed.cards) || !parsed.cards.length) {
      return withMockFallback(theme, options);
    }

    let cards = sanitizeCards(theme, parsed.cards, options.count);
    if (cards.length < options.count) {
      const mockCards = await generateMockMetaphors(theme, options);
      cards = [...cards, ...mockCards.slice(0, options.count - cards.length)];
    }

    return NextResponse.json({ cards, source: 'openrouter' });
  } catch {
    return NextResponse.json({ error: 'Unable to generate metaphors at this time.' }, { status: 500 });
  }
}
