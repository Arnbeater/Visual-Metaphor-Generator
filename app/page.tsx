'use client';

import { useEffect, useMemo, useState } from 'react';
import { FavoritesSection } from '@/components/FavoritesSection';
import { GeneratorForm } from '@/components/GeneratorForm';
import { ResultsGrid } from '@/components/ResultsGrid';
import { SavedConceptsSection, type SavedConcept } from '@/components/SavedConceptsSection';
import { generateMetaphors } from '@/services/metaphorGenerator';
import type { GeneratorOptions, MetaphorCardData } from '@/types/metaphor';

const initialOptions: GeneratorOptions = {
  tone: 'editorial',
  medium: 'campaign',
  count: 6,
};

const SAVED_CONCEPTS_KEY = 'vmg_saved_concepts_v1';

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
  const [savedConcepts, setSavedConcepts] = useState<SavedConcept[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>();

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SAVED_CONCEPTS_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as SavedConcept[];
      if (Array.isArray(parsed)) {
        setSavedConcepts(parsed);
      }
    } catch {
      // ignore invalid localStorage payload
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(SAVED_CONCEPTS_KEY, JSON.stringify(savedConcepts));
  }, [savedConcepts]);

  const favoriteCards = useMemo(
    () => favorites.map((id) => results.find((item) => item.id === id)).filter(Boolean) as MetaphorCardData[],
    [favorites, results],
  );

  const showMessage = (value: string) => {
    setMessage(value);
    setTimeout(() => setMessage(undefined), 2400);
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

  const handleSaveCurrentConcept = () => {
    if (!results.length || !theme.trim()) return;

    const conceptName = `${theme.trim()} • ${options.tone}`;
    const conceptId = `${theme.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;

    const nextConcept: SavedConcept = {
      id: conceptId,
      name: conceptName,
      theme: theme.trim(),
      options,
      cards: results,
      savedAt: new Date().toISOString(),
    };

    setSavedConcepts((prev) => [nextConcept, ...prev].slice(0, 20));
    showMessage(`Saved concept: ${conceptName}`);
  };

  const handleLoadConcept = (conceptId: string) => {
    const concept = savedConcepts.find((item) => item.id === conceptId);
    if (!concept) return;

    setTheme(concept.theme);
    setOptions(concept.options);
    setResults(concept.cards);
    setFavorites([]);
    showMessage(`Loaded concept: ${concept.name}`);
  };

  const handleDeleteConcept = (conceptId: string) => {
    setSavedConcepts((prev) => prev.filter((item) => item.id !== conceptId));
    showMessage('Saved concept deleted.');
  };

  const handleCopyConcept = async (conceptId: string) => {
    const concept = savedConcepts.find((item) => item.id === conceptId);
    if (!concept) return;

    const payload = [
      `Concept: ${concept.name}`,
      `Theme: ${concept.theme}`,
      `Tone: ${concept.options.tone}`,
      `Medium: ${concept.options.medium}`,
      '',
      concept.cards.map((card) => serializeCard(card)).join('\n\n---\n\n'),
    ].join('\n');

    await copyText(payload);
    showMessage(`Copied concept: ${concept.name}`);
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
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <section className="editorial-shell relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute right-[-70px] top-[-70px] h-56 w-56 rounded-full bg-[#ff5938]/90" />
        <div className="pointer-events-none absolute right-24 top-20 h-28 w-28 rounded-full border-[20px] border-[#f0ab5a]" />

        <div className="relative grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">Creative ideation tool</p>
            <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl">
              Visual Metaphor Generator
            </h1>
            <p className="mt-4 max-w-lg text-base text-black/70">
              Build visual metaphor directions that feel like art-direction territory, not generic prompts.
              Designed for campaign, brand identity, editorial and social concept development.
            </p>

            <div className="mt-8 grid max-w-md grid-cols-3 gap-3">
              <div className="soft-panel px-3 py-3 text-center">
                <p className="text-2xl font-semibold">{results.length || 0}</p>
                <p className="text-xs uppercase tracking-[0.08em] text-black/55">Cards</p>
              </div>
              <div className="soft-panel px-3 py-3 text-center">
                <p className="text-2xl font-semibold">{favorites.length}</p>
                <p className="text-xs uppercase tracking-[0.08em] text-black/55">Saved</p>
              </div>
              <div className="soft-panel px-3 py-3 text-center">
                <p className="text-2xl font-semibold">{savedConcepts.length}</p>
                <p className="text-xs uppercase tracking-[0.08em] text-black/55">Concepts</p>
              </div>
            </div>
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
        </div>
      </section>

      <section className="my-6 flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="rounded-full border border-black/10 bg-white/55 px-3 py-1.5 text-sm text-black/65">
          {results.length ? `Showing ${results.length} generated ideas` : 'No results yet'}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveCurrentConcept}
            disabled={!results.length}
            className="rounded-2xl border border-black/15 bg-white px-3 py-2 text-sm font-medium hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save concept
          </button>
          <button
            onClick={handleCopyAllResults}
            disabled={!results.length}
            className="rounded-2xl border border-black/15 bg-white px-3 py-2 text-sm font-medium hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Copy all results
          </button>
          {message ? <p className="text-xs font-medium text-[#8f2c18]">{message}</p> : null}
        </div>
      </section>

      {!results.length && !loading ? (
        <section className="editorial-shell p-10 text-center">
          <h2 className="text-xl font-semibold tracking-tight">Ready to generate</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-black/65">
            Start with a theme like “hope”, “public transport”, or “control” to produce structured metaphor cards.
          </p>
        </section>
      ) : null}

      {loading ? (
        <section className="editorial-shell p-8 text-center text-sm text-black/70">
          Building concept directions and shaping them to your selected tone and medium…
        </section>
      ) : null}

      <div className="space-y-6">
        <SavedConceptsSection
          savedConcepts={savedConcepts}
          onLoadConcept={handleLoadConcept}
          onDeleteConcept={handleDeleteConcept}
          onCopyConcept={handleCopyConcept}
        />

        {!!results.length && !loading ? (
          <>
            <ResultsGrid
              cards={results}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onCopyCard={handleCopyCard}
            />
            <FavoritesSection favorites={favoriteCards} onCopyAllFavorites={handleCopyAllFavorites} />
          </>
        ) : null}
      </div>
    </main>
  );
}
