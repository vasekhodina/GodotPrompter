#!/usr/bin/env node
// Bumps version across in-repo files and (if present) sibling marketplace repos.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const newVersion = process.argv[2];

if (!newVersion || !/^\d+\.\d+\.\d+$/.test(newVersion)) {
  console.error('Usage: node scripts/bump-version.mjs <major.minor.patch>');
  process.exit(1);
}

// In multi-plugin marketplaces (e.g. skillsmith), find the godot-prompter entry by name
// instead of relying on array position — sibling marketplaces may add other plugins.
const PLUGIN_NAME = 'godot-prompter';

const inRepoTargets = [
  { path: resolve(ROOT, 'package.json'), key: 'version' },
  { path: resolve(ROOT, '.claude-plugin/plugin.json'), key: 'version' },
  { path: resolve(ROOT, '.claude-plugin/marketplace.json'), key: `plugins[name=${PLUGIN_NAME}].version` },
];

const siblingTargets = [
  { path: resolve(ROOT, '..', 'skillsmith', '.claude-plugin', 'marketplace.json'), key: `plugins[name=${PLUGIN_NAME}].version`, label: 'skillsmith' },
  { path: resolve(ROOT, '..', 'godot-prompter-marketplace', '.claude-plugin', 'marketplace.json'), key: `plugins[name=${PLUGIN_NAME}].version`, label: 'godot-prompter-marketplace' },
];

// Path syntax: "a.b.c" walks objects; "a[name=X].b" finds the array element where .name === X.
function resolveStep(node, step) {
  const arrayMatch = step.match(/^(.+?)\[(\w+)=(.+)\]$/);
  if (arrayMatch) {
    const [, arrayKey, matchKey, matchVal] = arrayMatch;
    const arr = node?.[arrayKey];
    if (!Array.isArray(arr)) return undefined;
    return arr.find(item => item?.[matchKey] === matchVal);
  }
  if (/^\d+$/.test(step)) return node?.[Number(step)];
  return node?.[step];
}

function getByPath(obj, path) {
  return path.split('.').reduce((acc, k) => (acc == null ? acc : resolveStep(acc, k)), obj);
}

function setByPath(obj, path, value) {
  const parts = path.split('.');
  const last = parts.pop();
  const parent = parts.reduce((acc, k) => resolveStep(acc, k), obj);
  if (parent == null) throw new Error(`Path ${path} did not resolve to a parent`);
  // The leaf step is always a plain key on the resolved parent (no array selector at the end).
  parent[/^\d+$/.test(last) ? Number(last) : last] = value;
}

function bump(target) {
  const json = JSON.parse(readFileSync(target.path, 'utf8'));
  const current = getByPath(json, target.key);
  if (!current) throw new Error(`No version at ${target.key} in ${target.path}`);
  setByPath(json, target.key, newVersion);
  writeFileSync(target.path, JSON.stringify(json, null, 2) + '\n');
  return current;
}

// Verify in-repo versions are in sync before bumping
const inRepoCurrent = inRepoTargets.map(t => ({ ...t, current: getByPath(JSON.parse(readFileSync(t.path, 'utf8')), t.key) }));
const distinct = [...new Set(inRepoCurrent.map(t => t.current))];
if (distinct.length > 1) {
  console.error('In-repo version drift detected:');
  for (const t of inRepoCurrent) console.error(`  ${t.path}: ${t.current}`);
  console.error('Fix drift before bumping.');
  process.exit(1);
}

console.log(`Bumping ${distinct[0]} -> ${newVersion}`);

for (const t of inRepoTargets) {
  const prev = bump(t);
  console.log(`  ${t.path}: ${prev} -> ${newVersion}`);
}

for (const t of siblingTargets) {
  if (existsSync(t.path)) {
    const prev = bump(t);
    console.log(`  [${t.label}] ${t.path}: ${prev} -> ${newVersion}`);
  } else {
    console.log(`  [${t.label}] not found at ${t.path} — bump manually after the release tag`);
  }
}

console.log('\nDone. Update CHANGELOG.md, then commit and tag.');
