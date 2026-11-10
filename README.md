# AI Security Atlas

A public, read-only AI security knowledge atlas. This is a static site prepared for GitHub Pages. All interface text and research content are in English. Visitors can browse, search, and follow citations; the site has no content editing controls.

## Open locally

Open `index.html` directly, or run `python3 -m http.server 8000` in this directory and visit `http://localhost:8000`. There is no build step or server dependency.

## Live site

[https://gogooma125732.github.io/Atlas/](https://gogooma125732.github.io/Atlas/)

## Publish with GitHub Pages

Place the files in this directory at the root of a GitHub repository. In **Settings → Pages**, select **Deploy from a branch**, `main`, and `/ (root)`. All asset paths are relative, so the site can also run at a GitHub Pages project URL.

## Included content

- Five top-level directories: Foundations, Attack Taxonomy, Defense Taxonomy, Case Studies, and Research Library. The private Research Workspace directory has been removed.
- 141 taxonomy nodes. Substantive topics retain summaries and risk context; empty category indexes and unverified records do not display generic filler text. Applied appears only for concepts with a source-located statement in a research paper or official record.
- 93 source records: 75 papers or preprints, 10 official frameworks or standards, four CTF writeups, and four official vulnerability records. The bibliography is curated and **not exhaustive**.
- 141 claim cards, 38 cross-topic relationships, 11 dated research or disclosure signals, a searchable source library with separate Papers, Frameworks, and Cases & advisories filters, and a literature-gap view.
- A recursive explorer, concept dossier, tree view, source-aware graph, and attack–defense matrix. The top-left logo and title open the Source library. Recent signals are also marked in the explorer and concept cards.

## Evidence and severity method

The Sources tab separates research papers, OWASP/MITRE/NIST frameworks, and vulnerability or case records. The site separates **directly linked sources** from **framework context**. All 99 substantive foundation, attack, and defense topics now have at least one topic-level paper link. These links show conceptual relevance, not proof of every claim. A paper or advisory is linked to a topic only when it is relevant to that topic; an OWASP, MITRE, or NIST mapping is labeled as atlas interpretation unless it is an explicit official classification. A substantive topic without a linked paper appears in Literature gaps. Category indexes and unverified CTF titles are excluded from that count. Editorial summaries and generic threat-model prompts are labeled as synthesis, not as empirical findings.

The framework context uses [OWASP Top 10 for LLM Applications 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/), [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/), [MITRE ATLAS](https://atlas.mitre.org/), [NIST AI RMF Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence), and [NIST adversarial ML terminology](https://www.nist.gov/publications/adversarial-machine-learning-taxonomy-and-terminology-attacks-and-mitigations). Risk language follows [NIST SP 800-30](https://csrc.nist.gov/pubs/sp/800/30/r1/final). Broad taxonomy concepts do not receive an invented universal severity score; severity depends on the deployment and observed impact. The one included CVE case presents the distinct NVD and Microsoft CNA CVSS scores from the [official NVD record](https://nvd.nist.gov/vuln/detail/CVE-2025-32711).

The site-wide last content update is **2026-11-10**. Recent signals use a rolling **18-month publication/disclosure window measured from that date** (2025-05-10 through 2026-11-10 for this release). Entries need a linked primary paper/preprint, official framework release, or official vulnerability record, and are manually chosen for relevance to the taxonomy. The list changes only when the static site is republished; it is not a live feed. Academic preprints, official frameworks, and official vulnerability records are labeled separately. Research summaries state the scope of the linked paper rather than treating a benchmark result as a universal attack success rate.

The six ACDC challenge names from the supplied specification are retained. Four have public community writeups. Judgeception and ORBIT lack independently verified public materials, so their entries say so explicitly. CTF demonstrations are not presented as real-world incidents.

## Applied statements and CVE mappings

Applied now contains **only** statements tied to a specific paper or official record, with a source link and locator. The earlier generated business scenarios, test recipes, and generic control suggestions were removed. If a concept lacks a qualifying statement, Applied is hidden for that concept. This is a deliberately sparse editorial standard; a source's mere topical relevance is insufficient.

The Semantic Cache Poisoning concept keeps source-located findings from [CacheAttack (ICML 2026)](https://arxiv.org/abs/2601.23088), [NDSS 2026 semantic-cache poisoning](https://www.ndss-symposium.org/ndss-paper/when-cache-poisoning-meets-llm-systems-semantic-cache-poisoning-and-its-countermeasures/), and [Similarity Is Not Validity](https://arxiv.org/abs/2609.35908). It distinguishes evaluated attack results from the defenses those papers tested or proposed.

Risk contains a separate **Related product CVEs** section only where an official NVD record documents a relevant mechanism or control failure. Four records are currently mapped: [CVE-2025-32711](https://nvd.nist.gov/vuln/detail/CVE-2025-32711), [CVE-2025-66032](https://nvd.nist.gov/vuln/detail/CVE-2025-66032), [CVE-2026-39861](https://nvd.nist.gov/vuln/detail/CVE-2026-39861), and [CVE-2026-78379](https://nvd.nist.gov/vuln/detail/CVE-2026-78379). The mapping note explains the link, and a CVSS score is explicitly labeled as product-specific. No absence-of-CVE claim is made for other concepts.

The Matrix puts the selected defense or defenses linked to the current concept first. It includes all leaf attack and defense topics, a visible horizontal column slider, an internal scroll area, and sticky row and column headers. A linked-column label describes a recorded relationship rather than proving mitigation.

Empty Summary, Threat, Evidence, Source, and Relation panels are hidden when they have no recorded content; generic placeholder prose is omitted.

The Graph displays the selected concept with distinct concept-relation, framework-mapping, evidence-claim, and source-record node styles. All relationships includes directly linked sources plus framework context, without truncating the source list. Selecting a typed relationship filters the concept nodes and shows only evidence and sources cited by those matching edges. When no edge matches, the board gives an explicit empty state. Framework codes are labeled as Atlas mappings and appear in All relationships.

The site footer reads: “© 2026 zeronamoni. Third-party research and trademarks remain with their respective owners.” Original code and editorial content are available under the MIT License; third-party logos, trademarks, linked papers, and cited source material are excluded. See [LICENSE](LICENSE) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Framework logo attribution

The source banner and framework cards use logos from the [OWASP website](https://owasp.org/about/), [MITRE ATLAS](https://atlas.mitre.org/), and [NIST website](https://www.nist.gov/). They identify the origin of cited framework material; they do not imply that those organizations reviewed or endorsed this independent Atlas. Logo artwork is stored in `assets/` so GitHub Pages does not depend on remote image hosts.

## Files and maintenance

- `index.html`: read-only page structure
- `styles.css`: responsive layout
- `assets/`: locally bundled official source-identification logos
- `seed.js`: taxonomy, sources, claims, threat models, relations, and recent signals
- `app.js`: navigation, search, graph, matrix, and source rendering
- `tests/validate-data.cjs`: referential integrity checks

Curators update `seed.js` in the repository and republish. Keep stable IDs when editing taxonomy nodes, distinguish direct evidence from framework context, and verify source metadata before adding a paper. Run `node tests/validate-data.cjs` before publishing content changes.

## Terminology note

The Atlas entry **Semantic Collision** describes a provisional Guard/Executor interpretation gap from one ACDC CTF. [Adversarial Semantic Collisions (EMNLP 2020)](https://aclanthology.org/2020.emnlp-main.344/) uses the same phrase for a different NLP similarity and retrieval failure. Its Source card explicitly flags this distinction. Other linked papers cover adjacent prompt-injection, policy, and runtime-authorization mechanisms, and do not validate the CTF label as a standard category.
