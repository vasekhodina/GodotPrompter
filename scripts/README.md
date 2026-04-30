# scripts/

Local helpers for the GodotPrompter repo. All scripts are Node.js 20+ ES modules with no external dependencies (stdlib only).

## validate-skills.mjs

Validates `skills/*/SKILL.md` and `agents/*.md` for required structure and resolvable cross-references.

```bash
node scripts/validate-skills.mjs            # human-readable report
node scripts/validate-skills.mjs --json     # machine-readable for CI
```

Exit code: 1 if any errors, 0 otherwise (warnings do not fail).

## bump-version.mjs

Bumps the version string across all in-repo files that track it:
- `package.json`
- `.claude-plugin/plugin.json`
- `.claude-plugin/marketplace.json`

If sibling marketplace repos are present at `../skillsmith` and `../godot-prompter-marketplace`, also bumps their `.claude-plugin/marketplace.json`. Otherwise prints manual instructions.

```bash
node scripts/bump-version.mjs 1.5.0
```

Verifies current versions match before bumping; errors out on drift.
