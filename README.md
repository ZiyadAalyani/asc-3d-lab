# ASC Study Buddy

A responsive Next.js 14 + TypeScript learning website for interactive science and engineering experiments.

## Run locally
1. Install Node.js 18.17+.
2. Extract this folder and open it in VS Code.
3. Run `npm install`.
4. Run `npm run dev` and open http://localhost:3000.
5. Run `npm run build` before deployment.

## Included
- Clean, premium white/blue educational website inspired by the supplied reference.
- Responsive navigation, featured experiment cards, search and student identity.
- Topic-specific immersive dark 3D scenes with orbit/zoom controls (Bohr atom, prism dispersion, 8085 chip, network topology).
- Lesson explanation, numbered steps and formula panel for each experiment.
- Interactive multiple-choice quiz with immediate feedback, score and retry.
- Formula sheet, notebook contents gallery (all 83 uploaded scans), progress page and animated Buddy assistant.
- React Three Fiber, Three.js, Drei, Rapier foundation and Zustand state from the earlier starter.

## Notes
The 3D scenes are illustrative educational models, not engineering-grade physical simulations. The quiz currently includes a small starter set of objective questions. Expand the topic data and question bank to cover the full course syllabus. The AI Buddy is a front-end companion panel; connect a secured server-side AI API route to enable generated answers. The sign-in is a demo UI, not production authentication.

## Stack
Next.js 14 App Router · TypeScript · React Three Fiber · Three.js · Drei · Rapier · Zustand · Tailwind CSS · Lucide icons.
