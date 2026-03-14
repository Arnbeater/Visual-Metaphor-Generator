import type { GeneratorOptions, MediumOption, OutputCount, ToneOption } from '@/types/metaphor';

type GeneratorFormProps = {
  theme: string;
  options: GeneratorOptions;
  onThemeChange: (value: string) => void;
  onOptionsChange: (options: GeneratorOptions) => void;
  onGenerate: () => void;
  loading: boolean;
  error?: string;
};

const tones: ToneOption[] = ['editorial', 'poetic', 'corporate', 'dark', 'playful', 'public-sector', 'luxury'];
const media: MediumOption[] = ['campaign', 'poster', 'film', 'social', 'brand identity', 'presentation'];
const counts: OutputCount[] = [6, 12, 20];

export function GeneratorForm({
  theme,
  options,
  onThemeChange,
  onOptionsChange,
  onGenerate,
  loading,
  error,
}: GeneratorFormProps) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-card sm:p-6">
      <h2 className="text-lg font-semibold">Generate Metaphors</h2>
      <p className="mt-2 text-sm text-black/70">
        Enter a theme and shape the output for tone, medium, and batch size.
      </p>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Theme or concept</span>
          <input
            value={theme}
            onChange={(event) => onThemeChange(event.target.value)}
            placeholder="e.g. stress, trust, migration, electric mobility"
            className="w-full rounded-lg border border-black/15 bg-stone px-4 py-3 text-sm"
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-3">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Tone</span>
            <select
              value={options.tone}
              onChange={(event) => onOptionsChange({ ...options, tone: event.target.value as ToneOption })}
              className="w-full rounded-lg border border-black/15 bg-stone px-3 py-2 text-sm"
            >
              {tones.map((tone) => (
                <option key={tone} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">Medium</span>
            <select
              value={options.medium}
              onChange={(event) => onOptionsChange({ ...options, medium: event.target.value as MediumOption })}
              className="w-full rounded-lg border border-black/15 bg-stone px-3 py-2 text-sm"
            >
              {media.map((medium) => (
                <option key={medium} value={medium}>
                  {medium}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">Outputs</span>
            <select
              value={options.count}
              onChange={(event) => onOptionsChange({ ...options, count: Number(event.target.value) as OutputCount })}
              className="w-full rounded-lg border border-black/15 bg-stone px-3 py-2 text-sm"
            >
              {counts.map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </label>
        </div>

        {error ? <p className="text-sm text-red-700">{error}</p> : null}

        <button
          onClick={onGenerate}
          disabled={loading}
          className="w-full rounded-lg bg-ink px-4 py-3 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Generating…' : 'Generate'}
        </button>
      </div>
    </section>
  );
}
