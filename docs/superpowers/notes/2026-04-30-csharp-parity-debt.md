# C# Parity Debt — v1.5.0 baseline

The validator (added in v1.5.0) flags these GDScript-only sections. They are intentional gaps for now — adding correct C# requires per-section authorship that exceeded v1.5.0 scope. Future minor releases should pick this up.

---

## Deferred (count: 32)

These sections have GDScript code but no C# block. Each entry notes what kind of C# would belong so a future author can pick up any single item in isolation.

- `skills/2d-essentials/SKILL.md` — Section "8. 2D Antialiasing" — short GDScript `draw_line()` call; C# equivalent is a `DrawLine()` call in a `_Draw()` override, plus a note that `Line2D.Antialiased` is a property set in the Inspector (no code needed)
- `skills/addon-development/SKILL.md` — Section "4. Custom Inspector Plugin" — medium complexity; needs `EditorInspectorPlugin` subclass in C# with `#if TOOLS` guard, `_CanHandle`, `_ParseBegin`, `_ParseProperty` overrides, and the registration boilerplate in the `EditorPlugin` subclass
- `skills/addon-development/SKILL.md` — Section "6. Custom Resource Editors" — needs C# for `EditorResourcePicker` embedded in a dock tool control, and a `EditorResourcePreviewGenerator` subclass with `_Handles` and `_Generate` overrides; `#if TOOLS` guards throughout
- `skills/addon-development/SKILL.md` — Section "7. Gizmos" — needs C# `EditorNode3DGizmoPlugin` subclass with `_Init`, `_GetGizmoName`, `_HasGizmo`, `_Redraw`, `_GetHandleValue`, `_SetHandle`, `_CommitHandle`; complex undo/redo wiring; all under `#if TOOLS`
- `skills/addon-development/SKILL.md` — Section "8. Testing Plugins" — needs C# equivalent of the plugin reload snippet and `print()` → `GD.Print()` logging guidance; the lifecycle gotcha table should note C# compilation failures specifically
- `skills/audio-system/SKILL.md` — Section "4. Spatial Audio (2D & 3D)" — short C# note: `AudioStreamPlayer2D` / `AudioStreamPlayer3D` properties are identical in C#; `AudioListener2D`/`AudioListener3D.MakeCurrent()` pattern; medium length
- `skills/camera-system/SKILL.md` — Section "Scene: Player (CharacterBody3D) > CameraPivot (Node3D) > SpringArm3D > Camera3D" — substantial: C# `SpringArm3D` subclass with `_UnhandledInput` and `_Process`, mouse delta accumulation, `TopLevel = true`; plus Orbit Camera variant
- `skills/camera-system/SKILL.md` — Section "Transition between two Camera3D nodes (blends position and FOV)" — medium: C# `CameraTransitionManager` class with async `Transition2D` / `Transition3D` methods using `Tween` and `await ToSignal`
- `skills/component-system/SKILL.md` — Section "7. Wiring Components" — short: C# `[Export]` property wiring, `[Export] public HealthComponent HealthComponent`, `GetNode<HealthComponent>()` patterns; straightforward translation
- `skills/dedicated-server/SKILL.md` — Section "1. Headless Export" — short: C# `GodotObject.HasFeature("dedicated_server")` boot check, `RenderingServer.SetRenderLoopEnabled(false)`; export preset guidance is language-agnostic
- `skills/dedicated-server/SKILL.md` — Section "6. Deployment" — Dockerfile and shell commands are language-agnostic; the only C# addition needed is a note that `.NET` runtime must be bundled in the server export and the C# `DisplayServer.GetName()` equivalent of the headless detection
- `skills/dependency-injection/SKILL.md` — Section "1. The Problem" — anti-pattern GDScript blocks showing tight coupling; C# equivalents are direct translations (`GetNode<>()` calls, field assignments) — short
- `skills/dependency-injection/SKILL.md` — Section "7. Testing with Dependency Injection" — needs C# GdUnit4 or similar test class with mock injection; medium complexity requiring knowledge of the test framework conventions used in the project
- `skills/dependency-injection/SKILL.md` — Section "9. Anti-patterns" — comment-only GDScript (no executable code); C# equivalents would be equivalent inline comments, not real code blocks — arguably acceptable without C#, but validator fires because the section contains `gdscript` fenced blocks
- `skills/dialogue-system/SKILL.md` — Section "5. Branching and Conditions" — needs C# for condition evaluation logic (dictionary key checks, callable branching); medium
- `skills/dialogue-system/SKILL.md` — Section "6. Dialogue UI" — needs C# `RichTextLabel` + `Label` control wiring in a `Control` subclass; medium
- `skills/dialogue-system/SKILL.md` — Section "7. External Formats" — needs C# JSON parsing with `System.Text.Json` or `Godot.Collections.Dictionary` from `Json.ParseString`; medium
- `skills/event-bus/SKILL.md` — Section "6. Typed Signal Parameters" — needs C# `[Signal]` delegate with a `Resource`-based payload class and the emit/connect patterns; medium; the Dictionary option is also translatable
- `skills/event-bus/SKILL.md` — Section "8. Testing" — needs C# GdUnit4 signal assertion patterns; short, but requires knowledge of how gdUnit4 C# bindings expose signal tracking
- `skills/localization/SKILL.md` — Section "5. Right-to-Left (RTL) Support" — needs C# `RichTextLabel` with `IsRtl()` check, `LayoutDirection` enum assignment, and `TextServer.IsLocaleRtl()`; short to medium
- `skills/localization/SKILL.md` — Section "6. Locale-Aware Formatting" — needs C# `string.Format` / `CultureInfo` patterns plus `Time.GetDatetimeDictFromSystem()` → `System.DateTime` equivalents; medium
- `skills/particles-vfx/SKILL.md` — Section "6. Subemitters" — `SubEmitter2D`/`SubEmitter3D` node properties; C# equivalent is setting `SubEmitterMode` and `SubEmitterMaterial` as Inspector properties; no runtime code needed beyond a short note
- `skills/particles-vfx/SKILL.md` — Section "9. Flipbook Animation (2D)" — `AnimatedTexture` and `GPUParticles2D` process material properties; C# equivalent is direct property assignment on `ParticleProcessMaterial`; short
- `skills/player-controller/SKILL.md` — Section "5. Common Movement Recipes" — Dash and WallJump examples labeled "(GDScript)" in subsection headings; C# translation is direct (`CharacterBody2D` subclass, `_PhysicsProcess`, `IsOnFloor()`, `GetWallNormal()`); medium
- `skills/resource-pattern/SKILL.md` — Section "6. Resource Collections" — typed array of `Resource` subclasses; C# `[Export] public Godot.Collections.Array<MyResource>` pattern; short
- `skills/resource-pattern/SKILL.md` — Section "8. Sharing vs Unique" — `.Duplicate()` and resource instancing concepts; C# `.Duplicate()` call is identical API; short
- `skills/resource-pattern/SKILL.md` — Section "10. Anti-patterns" — comment-only GDScript blocks showing bad patterns; C# equivalents are structural translations of the anti-pattern comments; short but low value
- `skills/save-load/SKILL.md` — Section "Assign a Callable that accepts a Dictionary to restore state" — `SaveableComponent` with `Callable` fields; C# equivalent uses `Callable.From()` or a delegate approach; medium — the `Callable` API differs meaningfully between GDScript and C#
- `skills/save-load/SKILL.md` — Section "6. Version Migration" — incremental migration function; C# translation is a direct `switch` on `version` integer; short to medium
- `skills/scene-organization/SKILL.md` — Section "4. Node Communication Patterns" — signal bus and direct reference patterns; C# equivalents are `[Signal]` delegates and `GetNode<>()` calls; medium
- `skills/shader-basics/SKILL.md` — Section "7. Compositor Effects (Godot 4.3+)" — `CompositorEffect` subclass with `@tool`; C# equivalent is a `[Tool]` class extending `CompositorEffect` with `_RenderCallback` override and `RenderingDevice` access; medium complexity, render pipeline knowledge required
- `skills/state-machine/SKILL.md` — Section "4. Approach 3: Resource-Based (Data-Driven)" — `Resource`-based state data pattern; C# uses `[Export]` on a `Resource` subclass with `GodotObject` method dispatch; medium

---

## Accepted (intentional GDScript-only — not debt)

- `skills/gdscript-patterns/SKILL.md` — all sections (7 warnings) — this skill is GDScript-by-design and explicitly documents GDScript-specific language features (`@export`, `await`, `match`, `class_name`, lambdas, annotations). Adding C# to this skill would undermine its purpose. Documented in the skill itself with an intent note added in v1.5.0.
