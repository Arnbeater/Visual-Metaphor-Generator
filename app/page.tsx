'use client';

import { useMemo, useState } from 'react';
import { FavoritesSection } from '@/components/FavoritesSection';
import { GeneratorForm } from '@/components/GeneratorForm';
import { ResultsGrid } from '@/components/ResultsGrid';
import { generateMetaphors } from '@/services/metaphorGenerator';
import type { GeneratorOptions, MetaphorCardData } from '@/types/metaphor';

const initialOptions: GeneratorOptions = {
  tone: 'editorial',
  medium: 'campaign',
  count: 6,
};

const serializeCard = (card: MetaphorCardData): string => {
  return [
    `Title: ${card.title}`,
    `Concept: ${card.concept}`,
    `Why it works: ${card.whyItWorks}`,
    `Visual execution: ${card.visualExecution}`,
    `Headline angle: ${card.headlineAngle}`,
    `Tags: ${card.tags.join(', ')}`,
  ].join('\n');
};

export default function HomePage() {
  const [theme, setTheme] = useState('');
  const [options, setOptions] = useState<GeneratorOptions>(initialOptions);
  const [results, setResults] = useState<MetaphorCardData[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>();

  const favoriteCards = useMemo(
    () => favorites.map((id) => results.find((item) => item.id === id)).filter(Boolean) as MetaphorCardData[],
    [favorites, results],
  );

  const showMessage = (value: string) => {
    setMessage(value);
    setTimeout(() => setMessage(undefined), 2200);
  };

  const copyText = async (value: string) => {
    await navigator.clipboard.writeText(value);
  };

  const handleGenerate = async () => {
    if (!theme.trim()) {
      setError('Please enter a theme or concept before generating.');
      return;
    }

    setLoading(true);
    setError(undefined);

    try {
      const generated = await generateMetaphors(theme, options);
      setResults(generated);
      setFavorites((prev) => prev.filter((id) => generated.some((item) => item.id === id)));
      showMessage(`Generated ${generated.length} visual metaphors.`);
    } catch (generationError) {
      setError(generationError instanceof Error ? generationError.message : 'Something went wrong while generating.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id],
    );
  };

  const handleCopyCard = async (card: MetaphorCardData) => {
    await copyText(serializeCard(card));
    showMessage(`Copied: ${card.title}`);
  };

  const handleCopyAllResults = async () => {
    if (!results.length) return;
    await copyText(results.map((card) => serializeCard(card)).join('\n\n---\n\n'));
    showMessage('Copied all generated metaphors.');
  };

  const handleCopyAllFavorites = async () => {
    if (!favoriteCards.length) return;
    await copyText(favoriteCards.map((card) => serializeCard(card)).join('\n\n---\n\n'));
    showMessage('Copied favorite metaphors.');
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      <header className="mb-8 grid gap-6 lg:grid-cols-[1.2fr,1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/55">Creative ideation tool</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Visual Metaphor Generator</h1>
          <p className="mt-4 max-w-xl text-base text-black/75">
            Generate practical, high-quality visual metaphor directions for campaigns, branding, editorial, film,
            and social storytelling.
          </p>
        </div>
        <GeneratorForm
          theme={theme}
          options={options}
          onThemeChange={setTheme}
          onOptionsChange={setOptions}
          onGenerate={handleGenerate}
          loading={loading}
          error={error}
        />
      </header>

      <section className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-black/65">
          {results.length ? `Showing ${results.length} generated ideas` : 'No results yet'}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyAllResults}
            disabled={!results.length}
            className="rounded-lg border border-black/10 px-3 py-2 text-sm font-medium hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Copy all results
          </button>
          {message ? <p className="text-xs text-accent">{message}</p> : null}
        </div>
      </section>

      {!results.length && !loading ? (
        <section className="rounded-xl border border-dashed border-black/20 bg-white/40 p-10 text-center">
          <h2 className="text-lg font-medium">Ready to generate</h2>
          <p className="mt-2 text-sm text-black/65">
            Start with a theme like “hope”, “public transport”, or “control” and generate structured metaphor cards.
          </p>
        </section>
      ) : null}

      {loading ? (
        <section className="rounded-xl border border-black/10 bg-white p-8 text-center text-sm text-black/70">
          Building concept directions and shaping them to your selected tone and medium…
        </section>
      ) : null}

      {!!results.length && !loading ? (
        <div className="space-y-8">
          <ResultsGrid
            cards={results}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onCopyCard={handleCopyCard}
          />
          <FavoritesSection favorites={favoriteCards} onCopyAllFavorites={handleCopyAllFavorites} />
        </div>
      ) : null}
    </main>
  );
}
