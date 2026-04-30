# Changelog

All notable changes to GodotPrompter will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
