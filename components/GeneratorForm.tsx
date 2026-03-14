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
    <section className="editorial-shell p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Direction Inputs</h2>
        <span className="rounded-full border border-black/15 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-black/55">
          live
        </span>
      </div>
      <p className="text-sm text-black/65">Set your concept parameters and generate a clean batch of creative territory.</p>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Theme / concept</span>
          <input
            value={theme}
            onChange={(event) => onThemeChange(event.target.value)}
            placeholder="e.g. trust, migration, stress, electric mobility"
            className="w-full rounded-2xl border border-black/15 bg-[#f7f6f1] px-4 py-3 text-sm"
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-3">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-black/55">Tone</span>
            <select
              value={options.tone}
              onChange={(event) => onOptionsChange({ ...options, tone: event.target.value as ToneOption })}
              className="w-full rounded-2xl border border-black/15 bg-[#f7f6f1] px-3 py-2 text-sm"
            >
              {tones.map((tone) => (
                <option key={tone} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-black/55">Medium</span>
            <select
              value={options.medium}
              onChange={(event) => onOptionsChange({ ...options, medium: event.target.value as MediumOption })}
              className="w-full rounded-2xl border border-black/15 bg-[#f7f6f1] px-3 py-2 text-sm"
            >
              {media.map((medium) => (
                <option key={medium} value={medium}>
                  {medium}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-black/55">Outputs</span>
            <select
              value={options.count}
              onChange={(event) => onOptionsChange({ ...options, count: Number(event.target.value) as OutputCount })}
              className="w-full rounded-2xl border border-black/15 bg-[#f7f6f1] px-3 py-2 text-sm"
            >
              {counts.map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </label>
        </div>

        {error ? <p className="rounded-xl bg-red-100 px-3 py-2 text-sm text-red-700">{error}</p> : null}

        <button
          onClick={onGenerate}
          disabled={loading}
          className="w-full rounded-2xl bg-[#ff5938] px-4 py-3 text-sm font-semibold text-white hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Generating…' : 'Generate visual metaphors'}
        </button>
      </div>
    </section>
  );
}
