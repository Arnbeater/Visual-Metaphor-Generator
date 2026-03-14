import type { MetaphorCardData } from '@/types/metaphor';

export type ThemeSeed = {
  keywords: string[];
  cards: Omit<MetaphorCardData, 'id'>[];
};

export const themeSeeds: Record<string, ThemeSeed> = {
  stress: {
    keywords: ['stress', 'pressure', 'overload', 'tension'],
    cards: [
      {
        title: 'Overtightened Valve',
        concept: 'An industrial pressure valve rattling at maximum redline.',
        whyItWorks: 'Turns emotional overload into a mechanical failure risk that feels immediate.',
        visualExecution: 'Macro shot of a vibrating valve with warning paint peeling from heat.',
        headlineAngle: 'Pressure is productive until the system starts to shake.',
        tags: ['pressure', 'system', 'fragility', 'burnout'],
      },
      {
        title: 'Inbox Floodgate',
        concept: 'A floodgate unable to contain a wall of stamped envelopes.',
        whyItWorks: 'Captures digital overwhelm with a physical force people can instantly read.',
        visualExecution: 'Concrete spillway with mail and notifications pouring through broken gates.',
        headlineAngle: 'When everything is urgent, nothing gets through cleanly.',
        tags: ['overload', 'work', 'urgency', 'information'],
      },
      {
        title: 'Shrinking Ceiling',
        concept: 'An office ceiling mechanically descending toward a single desk.',
        whyItWorks: 'Spatial compression communicates anxiety without showing a person directly.',
        visualExecution: 'Wide interior shot with ruler marks on walls and low fluorescent glare.',
        headlineAngle: 'Some days the room gets smaller before your tasks do.',
        tags: ['anxiety', 'space', 'work', 'constraint'],
      },
    ],
  },
  hope: {
    keywords: ['hope', 'optimism', 'renewal', 'future'],
    cards: [
      {
        title: 'Signal Through Fog',
        concept: 'A distant lighthouse beam cutting a dense harbor fog.',
        whyItWorks: 'Hope is framed as directional clarity rather than naive positivity.',
        visualExecution: 'Muted monochrome fog with a precise warm beam tracing the waterline.',
        headlineAngle: 'You do not need the whole map—only one reliable signal.',
        tags: ['guidance', 'future', 'clarity', 'navigation'],
      },
      {
        title: 'Repaired Porcelain',
        concept: 'Cracked porcelain joined with visible gold seams.',
        whyItWorks: 'Shows recovery as transformed strength, not restoration to a perfect past.',
        visualExecution: 'Editorial tabletop with ceramic fragments reconstructed in deliberate lines.',
        headlineAngle: 'What broke can become the strongest line in the story.',
        tags: ['repair', 'resilience', 'transformation', 'craft'],
      },
      {
        title: 'Unsealed Window',
        concept: 'A painted-over window reopened to morning air and dust motes.',
        whyItWorks: 'Suggests possibility through access, light, and circulation.',
        visualExecution: 'Interior wall scraped open with light banding across rough plaster.',
        headlineAngle: 'Hope is often just a closed surface made permeable again.',
        tags: ['opening', 'light', 'renewal', 'access'],
      },
    ],
  },
  'public transport': {
    keywords: ['public transport', 'mobility', 'city', 'infrastructure'],
    cards: [
      {
        title: 'City Pulse Grid',
        concept: 'Transit lines mapped as an illuminated heartbeat monitor.',
        whyItWorks: 'Frames transit as the living rhythm of collective movement.',
        visualExecution: 'Night aerial city graphic where rail lines flicker like ECG traces.',
        headlineAngle: 'When transit slows, the city loses its pulse.',
        tags: ['urban', 'network', 'mobility', 'system'],
      },
      {
        title: 'Shared Umbrella Chassis',
        concept: 'Commuters beneath a giant umbrella shaped like a tram frame.',
        whyItWorks: 'Turns public transport into a symbol of social shelter and shared reliability.',
        visualExecution: 'Rain-soaked platform with reflective ground and steel umbrella ribs.',
        headlineAngle: 'Good transit is weather protection for daily life.',
        tags: ['public', 'care', 'infrastructure', 'equity'],
      },
      {
        title: 'Platform Relay Baton',
        concept: 'A glowing baton passed from train to bus to bike lane.',
        whyItWorks: 'Conveys multimodal handoff as coordinated teamwork.',
        visualExecution: 'Sequential frames with one object transferring across transit modes.',
        headlineAngle: 'A connected journey is a relay, not a sequence of waits.',
        tags: ['multimodal', 'connection', 'flow', 'coordination'],
      },
    ],
  },
  change: {
    keywords: ['change', 'transition', 'adaptation', 'shift'],
    cards: [
      {
        title: 'Scaffolded Facade',
        concept: 'A familiar building half-covered in active scaffolding.',
        whyItWorks: 'Change is shown as visible work-in-progress rather than sudden replacement.',
        visualExecution: 'Split-view architecture shot with old stone and new steel mesh.',
        headlineAngle: 'Transformation is what happens while the structure is still standing.',
        tags: ['transition', 'architecture', 'process', 'rebuild'],
      },
      {
        title: 'Molten Typography',
        concept: 'Solid metal letters softening and recast into new words.',
        whyItWorks: 'Signals identity shift without losing material continuity.',
        visualExecution: 'Foundry scene with glowing type blocks being remolded.',
        headlineAngle: 'The message evolves when the material is allowed to move.',
        tags: ['identity', 'language', 'adaptation', 'material'],
      },
      {
        title: 'Tidal Staircase',
        concept: 'A staircase alternately revealed and submerged by tide.',
        whyItWorks: 'Captures cyclical progress and retreat common in real transitions.',
        visualExecution: 'Long exposure coastal steps with tide marks and wet stone.',
        headlineAngle: 'Change is not linear; it is negotiated in waves.',
        tags: ['rhythm', 'progress', 'uncertainty', 'environment'],
      },
    ],
  },
  control: {
    keywords: ['control', 'power', 'governance', 'precision'],
    cards: [
      {
        title: 'Glass Control Room',
        concept: 'A command room with every switch visible from outside.',
        whyItWorks: 'Balances authority with accountability through transparent design.',
        visualExecution: 'High-contrast interior with labeled levers behind clear glass walls.',
        headlineAngle: 'Real control can withstand full visibility.',
        tags: ['power', 'transparency', 'systems', 'trust'],
      },
      {
        title: 'Magnetic Orbit',
        concept: 'Objects circling a magnet at different stable distances.',
        whyItWorks: 'Shows control as calibrated influence, not forceful grabbing.',
        visualExecution: 'Top-down studio setup with filings, metal forms, and measured rings.',
        headlineAngle: 'Control is strongest when it shapes motion without collision.',
        tags: ['precision', 'influence', 'balance', 'field'],
      },
      {
        title: 'Threaded Marionette Cut',
        concept: 'A puppet with half its strings intentionally severed.',
        whyItWorks: 'Highlights the tension between guidance and autonomy.',
        visualExecution: 'Theatrical stage scene with dramatic sidelight and visible thread remnants.',
        headlineAngle: 'Leadership is knowing which strings to release.',
        tags: ['autonomy', 'leadership', 'constraint', 'agency'],
      },
    ],
  },
};
