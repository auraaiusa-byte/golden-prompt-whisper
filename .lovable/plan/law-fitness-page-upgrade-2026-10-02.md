# Law & Fitness Page Upgrade

## What will change
- Bring `/law` and `/gym` into closer structural alignment with the Med Spa page while preserving their distinctive legal and fitness palettes, content, existing links, and route behavior.
- Add clear three-part problem-to-solution comparisons, industry-specific interactive ROI calculators, and a concise live intake-to-booking/CRM flow showcase to both pages.
- Add a reusable floating agent widget for Med Spa, Gym, and Law with route-specific identity, accent, online status, and quick prompts.
- Connect widget prompts to the existing AuraChat experience and its calendar action, rather than creating a second chat or booking system.

## Technical approach
- Build shared presentation components for the industry flow and floating widget; calculate ROI locally from accessible controls without changing backend data.
- Extend AuraChat only to accept a quick prompt or existing booking action from the widget and to suppress its duplicate launcher on industry pages.
- Keep all existing Supabase, Make.com, Calendly, forms, and routes unchanged; verify build diagnostics and the three industry pages at desktop and mobile sizes.
