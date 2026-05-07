# Changelog

All notable changes to GodotPrompter will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.7.3] - 2026-05-07

### Changed

- **v1.7.x token-budget initiative complete.** Final 4 over-budget skills restructured to **Pattern X** (core SKILL.md + `references/<topic>.md`):
  - `state-machine` (17.9 → 13.4 KB) — 1 reference: hierarchical-and-parallel
  - `export-pipeline` (17.7 → 13.9 KB) — 2 references: ci-cd-github-actions, distribution-itch-steam
  - `godot-brainstorming` (17.6 → 14.1 KB) — 1 reference: example-chest (worked Chest example + Design Output Format)
  - `event-bus` (16.8 → 14.7 KB) — 1 reference: testing
- 5 new reference files created across the 4 restructured skills
- `docs/superpowers/notes/2026-05-06-token-budget-debt.md` — 4 → 0 deferred skills; v1.7.3 progress block added; initiative marked complete

> **Release notes:** Validator baseline at release: 0 errors, 17 warnings (8 deferred C# parity + 9 accepted GDScript-only + 0 token-budget). Down from 22 in v1.7.2. **Token-budget warnings closed: 4 → 0.** Every SKILL.md in the repo is now ≤ 16 KB; the v1.7.0 token-budget initiative spanning v1.7.0–v1.7.3 is complete (35 skills restructured, 0 over budget). No new agents, no new skills — pure token-budget patch release closing the queue. Repo-wide minimum stays at Godot 4.3+.

## [1.7.2] - 2026-05-07

### Changed

- 10 more skills restructured to **Pattern X** (core SKILL.md + `references/<topic>.md`) — the next 10 heaviest from the v1.7.1 token-budget debt list:
  - `gdscript-patterns` (23 → 14.8 KB) — 5 references: export-annotations, common-idioms, variadic-functions, abstract-classes, super-in-virtual-methods
  - `tween-animation` (22 → 13.2 KB) — 4 references: property-tweener-modifiers, looping-and-signals, lifecycle, common-recipes
  - `save-load` (22 → 4.6 KB) — 4 references: configfile, json-saves, save-architecture, version-migration
  - `dependency-injection` (20 → 9.1 KB) — 5 references: autoloads, export-injection, service-locator, scene-injection, testing-with-di
  - `godot-testing` (20 → 9.3 KB) — 3 references: tdd-workflow, running-tests, testing-patterns
  - `camera-system` (20 → 10.8 KB) — 4 references: camera-zones, camera3d-patterns, transitions, split-screen
  - `resource-pattern` (19 → 9.3 KB) — 5 references: editor-integration, configuration-pattern, collections, sharing-vs-unique, saving-resources (v1.6.0 C# parity preserved in collections + sharing-vs-unique)
  - `csharp-signals` (19 → 9.4 KB) — 4 references: disconnecting, awaiting-signals, custom-signal-patterns, connecting-gdscript-signals
  - `responsive-ui` (18 → 8.6 KB) — 4 references: pixel-art-setup, dpi-scaling, mobile, adaptive-layouts
  - `math-essentials` (18 → 12.4 KB) — 3 references: curves-and-paths, random-numbers, game-math-recipes
- 41 new reference files created across the 10 restructured skills
- `docs/superpowers/notes/2026-05-06-token-budget-debt.md` — 14 → 4 deferred skills; v1.7.2 progress block added
- `docs/token-budget.md` — regenerated to reflect post-restructure state

> **Release notes:** Validator baseline at release: 0 errors, 22 warnings (8 deferred C# parity + 10 accepted GDScript-only + 4 token-budget). Down from 42 in v1.7.1. Token-budget warnings closed: 14 → 4 (10 restructures). Deferred parity warnings closed: 14 → 8 (6 incidental closures as sections moved to references with their already-paired C# blocks). Accepted GDScript-only: 14 → 10 (4 gdscript-patterns sections moved into references). Repo-wide minimum stays at Godot 4.3+. Only 4 skills remain over the 16 KB SKILL.md budget — the v1.7.0 token-budget initiative is 86% complete after this release.

## [1.7.1] - 2026-05-07

### Changed

- 10 more skills restructured to **Pattern X** (core SKILL.md + `references/<topic>.md`) — the next 10 heaviest from the v1.7.0 token-budget debt list:
  - `input-handling` (27 → 14.5 KB) — 4 references: mouse, gamepad, touch, action-rebinding
  - `dialogue-system` (26 → 10.6 KB) — 5 references: dialogue-manager, branching-and-conditions, ui-presentation, external-formats, variable-interpolation
  - `multiplayer-sync` (26 → 10.4 KB) — 4 references: interpolation, client-prediction, lag-compensation, bandwidth-optimization
  - `shader-basics` (26 → 15.5 KB) — 5 references: 2d-shader-recipes, 3d-shader-recipes, post-processing, compositor-effects, stencil-buffer
  - `godot-debugging` (26 → 12.0 KB) — 4 references: signal-tracing, performance-debugging, scene-tree-debugging, systematic-method
  - `particles-vfx` (25 → 14.2 KB) — 5 references: vfx-recipes, trails, subemitters, attractors-and-collision, flipbook-animation (v1.6.0 C# parity preserved in references)
  - `procedural-generation` (24 → 4.9 KB) — 4 references: noise-generation, bsp-dungeons, cellular-automata, wave-function-collapse
  - `multiplayer-basics` (24 → 15.6 KB) — 3 references: spawning-networked-objects, player-join-flow, disconnect-handling
  - `xr-development` (24 → 15.0 KB) — 5 references: controllers-and-input, hand-tracking, grabbing-objects, xr-ui, passthrough
  - `2d-essentials` (24 → 8.6 KB) — 5 references: tilemap, parallax, lights-and-shadows, 2d-particles, custom-drawing (v1.6.0 C# parity preserved inline for 2D Antialiasing)
- 44 new reference files created across the 10 restructured skills
- `docs/superpowers/notes/2026-05-06-token-budget-debt.md` — 24 → 14 deferred skills; v1.7.1 progress block added
- `docs/token-budget.md` — regenerated to reflect post-restructure state

> **Release notes:** Validator baseline at release: 0 errors, 42 warnings (14 deferred C# parity + 14 accepted GDScript-only + 14 token-budget). Down from 56 in v1.7.0. Token-budget warnings closed: 24 → 14 (10 restructures). Deferred C# parity warnings closed: 18 → 14 (4 incidental closures as sections moved to references along with their already-paired C# blocks). The 10 restructured skills now load 50-80% lighter into agent context. No new agents, no new skills — pure token-budget patch release. Repo-wide minimum stays at Godot 4.3+.

## [1.7.0] - 2026-05-06

### Added

- `scripts/count-tokens.mjs` — byte-count + tokenizer-mode token measurement for skills, references, and agents
- `docs/token-budget.md` — per-skill / per-agent token costs across Claude / GPT (cl100k_base)
- **gdscript-advanced** skill — production-grade GDScript depth (8 sections: performance idioms, metaprogramming, `@tool` lifecycle, async pitfalls, signal/Callable trade-offs, profiler-driven idioms, common pitfalls); GDScript-only by design via the new validator allowlist
- **godot-tools-engineer** agent — editor-plugin specialist (custom inspectors, gizmos, `@tool` scripts, plugin distribution); GDExtension explicitly out of scope (deferred to v1.8)
- `docs/superpowers/notes/2026-05-06-token-budget-debt.md` — debt-tracking note for the 24 over-budget skills not restructured this release
- **addon-development** — full C# parity for sections 4 / 6 / 7 / 8 (Custom Inspector Plugin, Custom Resource Editors, Gizmos, Testing Plugins); first skill in the repo with fully closed C# parity

### Changed

- `validate-skills.mjs` — three additions:
  - `[token-budget-exceeded]` warning at 16 KB SKILL.md ceiling
  - `[orphan-reference]` warning when a `references/*.md` file is not linked from its parent SKILL.md
  - `GDSCRIPT_ONLY_BY_DESIGN` allowlist re-categorizes parity warnings for `gdscript-patterns` / `gdscript-advanced` from `csharp-parity-missing` (deferred debt) to `csharp-parity-accepted` (intentional)
- 11 skills restructured using **Pattern X** (core SKILL.md + `references/<topic>.md`):
  - Top 10 ≥ 28 KB: `godot-optimization` (37 → 11.5 KB), `ai-navigation` (37 → 15.6), `animation-system` (35 → 16.0), `3d-essentials` (35 → 15.9), `physics-system` (34 → 15.9), `dedicated-server` (31 → 11.4), `hud-system` (28 → 11.2), `inventory-system` (28 → 13.5), `audio-system` (28 → 13.6), `godot-ui` (27 → 13.7)
  - `addon-development` (20 → 12.0 KB), restructured as part of the `godot-tools-engineer` dogfood
- `godot-game-dev`, `godot-game-architect` — extended routing notes to cover `godot-tools-engineer`
- `using-godot-prompter` — added explicit per-platform reference links (codex, copilot, cursor, gemini) to close orphan-reference warnings the new rule surfaces
- 50 new reference files created across 11 restructured skills + the new `gdscript-advanced` skill
- CONTRIBUTING.md release checklist now includes the `count-tokens.mjs --tokenizer --markdown` regeneration step before tagging

> **Release notes:** Validator baseline at release: 0 errors, 56 warnings (18 deferred C# parity + 14 accepted GDScript-only + 24 token-budget). Up from 32 in v1.6.0 because the new budget rule surfaces existing debt that was previously invisible. Deferred parity dropped one beyond the planned 19 because Pattern X moved at least one previously-flagged section into a `references/` file alongside its existing C# block, incidentally closing the gap. The 11 restructured skills now load 50-60% lighter into agent context. Repo-wide minimum stays at Godot 4.3+. Agent count: 8 → 9. Skill count: 44 → 45. addon-development becomes the first skill in the repo with fully closed C# parity.

## [1.6.0] - 2026-05-02

### Added

- **godot-animator** agent — animation graph specialist (AnimationPlayer vs AnimationTree decisions, blend trees, IKModifier3D family, BoneConstraint3D, retargeting); distinguishes animation FSM from gameplay FSM
- **godot-csharp-engineer** agent — C#-first specialist with two modes: user-code mode (idiomatic C#, `[Signal]` delegates, GC-light, Variant-light) and parity mode for closing this repo's own C# parity debt
- **godot-ui-designer** agent — Control-tree UI specialist (container-driven layout, Theme resources, responsive design, `TranslationServer` / RTL hooks, Godot 4.5+ FoldableContainer / Stacked Label Effects)
- **animation-system** — IKModifier3D solver comparison (cost / joint count / notes per solver), two-bone arm reach recipe with influence blending (CCDIK3D), foot placement on terrain recipe (FABRIK3D + raycast); GDScript and C# parity for both recipes (Godot 4.6+)

### Changed

- **godot-game-dev** and **godot-game-architect** agent descriptions — added routing notes deferring to `godot-csharp-engineer`, `godot-animator`, and `godot-ui-designer` for matching specialties
- C# parity sweep — closed 10 short / trivial deferred sections via `godot-csharp-engineer` in parity mode:
  - `2d-essentials` — 2D Antialiasing
  - `audio-system` — Spatial Audio (2D & 3D)
  - `component-system` — Wiring Components
  - `dedicated-server` — Headless Export
  - `dependency-injection` — The Problem
  - `localization` — Right-to-Left (RTL) Support
  - `particles-vfx` — Subemitters; Flipbook Animation (2D)
  - `resource-pattern` — Resource Collections; Sharing vs Unique

### Fixed

- `scripts/bump-version.mjs` — find the `godot-prompter` plugin in sibling marketplaces by name instead of by array index. Previously bumped the wrong plugin in multi-plugin marketplaces (e.g. skillsmith, where `logseq-brain` is at index 0).

> **Release notes:** Validator baseline at release: 0 errors, 32 warnings (down from 42 in v1.5.0). Agent count: 5 → 8. Skill count unchanged at 44. Repo-wide minimum stays at Godot 4.3+; new IK content is annotated `(Godot 4.6+)` since IKModifier3D requires 4.6.

## [1.5.0] - 2026-04-30

### Added

- **godot-shader-author** agent — shader specialist for canvas_item / spatial / particles / sky / fog shaders, post-processing, and Compositor effects
- **godot-performance-profiler** agent — profiler-driven bottleneck diagnosis with prescriptive fixes from godot-optimization
- `scripts/validate-skills.mjs` — validates SKILL.md frontmatter, cross-references, GDScript/C# parity, and implementation checklists; 0 errors at release (42 C# parity warnings documented as deferred debt)
- `scripts/bump-version.mjs` — bumps version across `package.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, and sibling marketplace repos
- `.github/workflows/release.yml` — tag-triggered release workflow with marketplace PR automation
- **gdscript-patterns** — added Variadic Functions and Abstract Classes (Godot 4.5+)
- **physics-system** — added SoftBody3D Forces and Impulses; updated Jolt note for 4.6 stable; updated Physics Interpolation for 4.5 SceneTree restructure
- **shader-basics** — added Stencil Buffer Effects, SMAA Antialiasing, Shader Baker (Godot 4.5+)
- **3d-essentials** — added Specular Occlusion, Bent Normal Maps (4.5+); SSR overhaul, Glow/AgX controls (4.6+)
- **animation-system** — added BoneConstraint3D Modifiers (4.5+); IKModifier3D family (4.6+)
- **xr-development** — added 4.5+ features (D3D12 backend, foveated rendering, Render Models, SpaceWarp, visionOS export); 4.6+ features (OpenXR 1.1, Spatial Entities)
- **ai-navigation** — added Dedicated 2D Navigation Server (Godot 4.5+)
- **export-pipeline** — added Shader Baker and Windows Native Resource Editing (Godot 4.5+)
- **godot-ui** — added FoldableContainer and Stacked Label Effects (Godot 4.5+)
- **localization** — added Editor Locale Preview (4.5+); CSV Plural and Context Support (4.6+)

### Changed

- **gdscript-patterns** — added intent note (skill is GDScript-only by design)
- **godot-debugging** — added Implementation Checklist
- **using-godot-prompter** — added Related skills line and Implementation Checklist
- **multiplayer-sync** — standardized Related skills line to canonical form; added ai-navigation reciprocal cross-reference
- **camera-system** — added cross-references to math-essentials and tween-animation
- **player-controller** — added cross-references to 3d-essentials, animation-system, input-handling, and ai-navigation
- **state-machine** — added cross-references to animation-system and dialogue-system
- **input-handling** — added cross-reference to xr-development
- **responsive-ui** — added cross-references to input-handling and localization
- **tween-animation** — added cross-references to math-essentials and particles-vfx
- Cross-references audited across all 44 skills — added 21 reciprocal entries; standardized cross-reference formatting repo-wide

> **Release notes:** Validator baseline at release: 0 errors, 42 warnings (all C# parity — documented in `docs/superpowers/notes/2026-04-30-csharp-parity-debt.md`). Repo-wide minimum stays at Godot 4.3+; new content for 4.5/4.6 is additive with explicit version annotations.

## [1.4.1] - 2026-04-09

### Fixed

- **using-godot-prompter** — added coexistence section ensuring GodotPrompter skills are invoked even when another workflow plugin (e.g., Superpowers) drives the session
- **godot-brainstorming** — rewrote Step 4 to inject a `## GodotPrompter` section into project CLAUDE.md and annotate plan tasks with required skill references
- **godot-project-setup** — added CLAUDE.md GodotPrompter section to project setup checklist

## [1.4.0] - 2026-04-09

### Added

- **localization** skill — TranslationServer, CSV/PO translation files, locale switching, RTL support, pluralization
- **procedural-generation** skill — seeded randomness, FastNoiseLite, BSP dungeons, cellular automata caves, wave function collapse
- **xr-development** skill — OpenXR setup, XR controllers, hand tracking, physics grabbing, XR UI, passthrough, Meta Quest export
- 3 new skills bringing total from 41 to 44

### Changed

- **gdscript-patterns** — added `super()` in virtual methods section (Godot 4 breaking change from 3.x)
- **audio-system** — added interactive music streams (AudioStreamPlaylist, AudioStreamSynchronized, AudioStreamInteractive) and runtime WAV loading (Godot 4.3/4.4+)
- **ai-navigation** — added async navigation baking on background threads (Godot 4.4+)
- **animation-system** — added Animation Markers, LookAtModifier3D, SpringBoneSimulator3D, animation retargeting (Godot 4.3/4.4+)
- **shader-basics** — added Compositor effects and custom render passes (Godot 4.3+)
- **state-machine** — added hierarchical and parallel FSM patterns for complex characters
- **2d-essentials** — added TileMap node deprecation notice (use TileMapLayer instead)
- **physics-system** — added Jolt Physics as default recommendation for new 3D projects (Godot 4.4+)

## [1.3.0] - 2026-04-08

### Added

- **input-handling** skill — InputEvent system, Input Map actions, controllers/gamepads, mouse/touch, action rebinding, input architecture
- **3d-essentials** skill — materials, lighting, shadows, environment, global illumination, fog, LOD, occlusion culling, decals, MultiMesh, renderer comparison
- **tween-animation** skill — Tween class, easing/transitions, chaining/parallel, property/method/callback tweeners, common UI and gameplay motion recipes
- **particles-vfx** skill — GPUParticles2D/3D, ParticleProcessMaterial, emission shapes, subemitters, trails, attractors, collision, turbulence, flipbook animation, VFX recipes
- **gdscript-patterns** skill — static typing, await/coroutines, lambdas, match/pattern matching, export annotations, inner classes, common GDScript idioms
- **math-essentials** skill — vectors, transforms, interpolation (lerp/slerp/move_toward/smoothstep), curves/paths, random number generation, common game math recipes
- **assets-pipeline** skill — image import/compression, 3D scene import with naming conventions, audio formats, resource formats (.tres/.res), threaded loading
- 7 new skills bringing total from 34 to 41

## [1.2.0] - 2026-04-07

### Added

- **physics-system** skill — RigidBody2D/3D, StaticBody, Area2D/3D, raycasting, collision shapes/layers, Jolt physics, physics interpolation, ragdolls, SoftBody3D, and troubleshooting
- **2d-essentials** skill — TileMaps, parallax scrolling, 2D lights and shadows, 2D particles, custom drawing, 2D meshes, antialiasing, and pixel-perfect snapping
- Superpowers plugin attribution in README
- Author and support section in README
- Bidirectional cross-references across all related skills

## [1.1.0] - 2026-04-06

### Added

- **animation-system** skill — AnimationPlayer, AnimationTree, blend trees, state machines, sprite animation, and code-driven animation
- **shader-basics** skill — Godot shader language, visual shaders, common visual recipes, and post-processing effects
- **audio-system** skill — audio buses, AudioStreamPlayer, spatial audio, music management, SFX pooling, and dynamic mixing
- Release process documentation in CONTRIBUTING.md
- GitHub Sponsors and Buy Me a Coffee funding configuration

### Removed

- Trial project test files (replaced by real Godot project validation)

## [1.0.0] - 2026-04-06

### Added

- 32 skills covering Godot 4.3+ development (GDScript + C#)
- **Core/Process:** godot-project-setup, godot-brainstorming, godot-code-review, godot-debugging, godot-testing, using-godot-prompter
- **Architecture:** scene-organization, state-machine, event-bus, component-system, resource-pattern, dependency-injection
- **Gameplay:** player-controller, animation-system, audio-system, inventory-system, dialogue-system, save-load, ai-navigation, camera-system
- **Rendering/Visual:** shader-basics
- **UI/UX:** godot-ui, responsive-ui, hud-system
- **Multiplayer:** multiplayer-basics, multiplayer-sync, dedicated-server
- **Build/Deploy:** export-pipeline, godot-optimization, addon-development
- **C#:** csharp-godot, csharp-signals
- Cross-references between related skills
- 3 specialized agents: godot-game-architect, godot-game-dev, godot-code-reviewer
- Claude Code plugin structure (.claude-plugin/plugin.json)
- Platform support: Claude Code, Copilot CLI, Gemini CLI, Codex, Cursor, OpenCode
- Trial project validation (13/15 PASS, 2/15 PARTIAL)
- Agent integration test plan
