const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = {window: {}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'seed.js'), 'utf8'), context);
const data = context.window.ATLAS_DATA;
const ids = new Set(data.nodes.map(n => n.id));
const sourceIds = new Set(data.sources.map(s => s.id));
const claimIds = new Set(data.claims.map(c => c.id));
function assert(ok, message) { if (!ok) throw Error(message); }
assert(ids.size === data.nodes.length, 'Duplicate node ID');
assert(sourceIds.size === data.sources.length, 'Duplicate source ID');
assert(claimIds.size === data.claims.length, 'Duplicate claim ID');
for (const n of data.nodes) {
  assert(n.id && n.title, `Missing required node field: ${n.id}`);
  assert(!n.summary?.startsWith('A curated index of ') && !n.summary?.startsWith('A reference category for '), `Generic index filler: ${n.id}`);
  assert(n.mechanism !== 'Select a child topic for its definition, risk analysis, and evidence.', `Generic mechanism filler: ${n.id}`);
  assert(n.risk?.severity && n.risk?.severityBasis, `Incomplete risk record: ${n.id}`);
  if (['foundation', 'attack', 'defense'].includes(n.kind) && n.taxonomyStatus !== 'index') assert(n.summary, `Missing substantive summary: ${n.id}`);
  assert(!n.deepDive, `Unsourced applied dossier remains: ${n.id}`);
  for (const finding of n.appliedFindings || []) {
    const source = data.sources.find(s => s.id === finding.sourceId);
    assert(source && ['paper', 'preprint', 'framework', 'advisory'].includes(source.type), `Unqualified applied source: ${n.id}`);
    assert(finding.text && finding.locator, `Incomplete applied finding: ${n.id}`);
  }
  assert(n.claims?.length, `Missing evidence card: ${n.id}`);
  assert(!n.parent || ids.has(n.parent), `Missing parent: ${n.id}`);
  const seen = new Set([n.id]);
  let parent = n.parent;
  while (parent) {
    assert(!seen.has(parent), `Parent cycle: ${n.id}`);
    seen.add(parent);
    parent = data.nodes.find(x => x.id === parent)?.parent;
  }
  for (const id of n.sources || []) assert(sourceIds.has(id), `Broken source: ${n.id} → ${id}`);
  for (const id of n.claims || []) assert(claimIds.has(id), `Broken claim: ${n.id} → ${id}`);
}
assert(!ids.has('research-workspace'), 'Research Workspace should not be published');
for (const s of data.sources) {
  assert(/^https:\/\//.test(s.url || ''), `Missing source URL: ${s.id}`);
  for (const id of s.relatedConcepts || []) assert(ids.has(id), `Broken source concept: ${s.id} → ${id}`);
  if (s.cveId) {
    assert(s.type === 'advisory' && s.url === `https://nvd.nist.gov/vuln/detail/${s.cveId}`, `Invalid CVE record: ${s.id}`);
    for (const id of Object.keys(s.cveRelevance || {})) assert(ids.has(id), `Broken CVE concept: ${s.id} → ${id}`);
  }
}
for (const e of data.edges) {
  assert(ids.has(e.from) && ids.has(e.to), `Broken relationship: ${e.from} → ${e.to}`);
  for (const id of e.evidenceIds || []) assert(sourceIds.has(id), `Broken edge evidence: ${id}`);
}
for (const c of data.claims) {
  assert(ids.has(c.nodeId), `Broken claim node: ${c.id}`);
  if (c.status === 'reviewed') assert(c.evidence.length, `Reviewed claim lacks evidence: ${c.id}`);
  for (const e of c.evidence) assert(sourceIds.has(e.sourceId) && e.locator, `Broken claim evidence: ${c.id}`);
}
for (const signal of data.recentSignals || []) {
  assert(/^\d{4}-\d{2}(?:-\d{2})?$/.test(signal.date), `Invalid signal date: ${signal.id}`);
  for (const id of signal.nodeIds || []) assert(ids.has(id), `Broken signal node: ${signal.id} → ${id}`);
  for (const id of signal.sourceIds || []) assert(sourceIds.has(id), `Broken signal source: ${signal.id} → ${id}`);
}
assert(/^\d{4}-\d{2}-\d{2}$/.test(data.updatedAt), 'Invalid content update date');
assert(Number.isInteger(data.recentWindowMonths) && data.recentWindowMonths > 0, 'Missing recent-signal window');
const cutoff = new Date(`${data.updatedAt}T00:00:00Z`);
cutoff.setUTCMonth(cutoff.getUTCMonth() - data.recentWindowMonths);
const cutoffText = cutoff.toISOString().slice(0, 10);
for (const signal of data.recentSignals || []) {
  assert(signal.date >= cutoffText.slice(0, signal.date.length), `Signal outside recent window: ${signal.id}`);
  assert(signal.date <= data.updatedAt.slice(0, signal.date.length), `Future signal: ${signal.id}`);
}
console.log(`Validated ${data.nodes.length} nodes, ${data.edges.length} relationships, ${data.sources.length} sources, ${data.claims.length} claims.`);
