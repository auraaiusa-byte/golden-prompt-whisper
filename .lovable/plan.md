# Homepage autonomous suite redesign

## Build
- Replace the desktop hero robot with a responsive live pipeline visualizer that shows trigger, Aura core processing, and verified booking/CRM actions.
- Add a three-option industry switcher that updates the hero message, metrics, channel details, qualification state, and integration tags without changing lead capture behavior.
- Use the existing premium dark tokens, adding only semantic cyan, violet, and success accents plus reduced-motion-safe grid and beam animations.
- Upgrade the shared floating agent launcher to a 64px mobile / 80px desktop avatar with dual glow rings, 24/7 status, high-contrast preview copy, and two quick actions while preserving its chat and calendar events.

## Validation
- Check desktop and mobile layouts, industry switching, assistant opening, quick prompts, calendar handoff, viewport containment, and the preview build.

## Technical details
- Keep industry content in the shared hero data model and retain the existing `aura:open` event contract, lead storage, webhook, and booking flow.
- Record the shared visualizer architecture in the project guidance file.
