# MST Open Tools

Free browser tools for mature-node MPW planning, non-confidential RFQ preparation, local-only GDSII inspection, P&ID-to-SOLIDWORKS intake, UHP gas-stick review, and sourcing cleanup.

The live tools include English and Chinese UI support. Use `?lang=zh`, `?lang=en`, or the browser language preference.

Each tool can draft a bounded, non-confidential `mailto:` brief to `sales@mst-sg.com` so a buyer can contact MST after using a tool. This is opt-in: the tools do not automatically send user inputs or generated output.

Built by [MST](https://mst-sg.com). MST is not a wafer foundry and does not manufacture wafers directly. These tools help engineers prepare safer first conversations before NDA, partner confirmation, and any design-detail exchange.

## Use Them Live

Main directory: https://mst-sg.com/tools/

Chinese UI: https://mst-sg.com/tools/?lang=zh

| Tool | Use case | Live URL |
| --- | --- | --- |
| MPW RFQ Pack Builder | Non-confidential first-screen MPW RFQ brief | https://mst-sg.com/tools/mpw-rfq-pack/ |
| MPW Tapeout Readiness Checker | PDK, DRC/LVS, package/test and compliance gap check | https://mst-sg.com/tools/mpw-readiness-checker/ |
| MPW Shuttle Schedule Finder | Filter public or user-supplied shuttle rows by node and region | https://mst-sg.com/tools/mpw-shuttle-finder/ |
| GDS/OASIS Handoff Manifest Generator | File-level handoff inventory before controlled delivery | https://mst-sg.com/tools/gds-handoff-manifest/ |
| PDK / Foundry Requirement Checklist | NDA, PDK, model, DRC/LVS and handoff readiness checklist | https://mst-sg.com/tools/pdk-checklist/ |
| MPW Reticle & Wafer Planner | Shared-reticle packing, wafer stepping, yield and cost-share planning | https://mst-sg.com/tools/mpw-planner/ |
| MPW Prototype Estimator | Dies-per-wafer and indicative mature-node cost read | https://mst-sg.com/tools/mpw-estimator/ |
| Local GDSII Inspector | Local-only GDS metadata summary; no upload | https://mst-sg.com/tools/mpw-gds/ |
| P&ID Assembly Intake Checklist | Native SOLIDWORKS assembly pilot intake checklist | https://mst-sg.com/tools/pid-assembly-intake/ |
| P&ID Tag & Instrument Index Parser | Parse tag lists into a reviewable instrument index | https://mst-sg.com/tools/pid-tag-parser/ |
| Package & Assembly Selector | Map die size, IO and sample assumptions to likely package families | https://mst-sg.com/tools/package-selector/ |
| MPW Procurement Timeline Planner | Reverse-plan NDA, PDK, DRC/LVS, partner review and logistics gates | https://mst-sg.com/tools/mpw-procurement-timeline/ |
| P&ID BOM Completeness Checker | Flag missing tag, MPN, manufacturer, size, material and connection data | https://mst-sg.com/tools/pid-bom-checker/ |
| UHP Gas Stick Rule Checklist | Organize UHP/VCR/C-seal/W-seal/purge/leak-test assumptions | https://mst-sg.com/tools/uhp-gas-stick-checklist/ |
| BOM RFQ Normalizer | Normalize buyer BOM rows into sourcing-ready RFQ CSV | https://mst-sg.com/tools/bom-rfq-normalizer/ |

Need partner-confirmed review? Start an MPW RFQ here:
https://store.mst-sg.com/services/mpw-tapeout-rfq

## What Is In This Repo

- `tools/`: live static tool pages, shared CSS/JS assets, and browser-safe core logic.
- `tools/assets/open-tools-core.js`: reusable pure functions for schedule filtering, manifest building, PDK checklists, tag parsing, package suggestions, timeline planning, BOM checks, UHP checklisting, and RFQ CSV normalization.
- `tools/assets/mst-static-i18n.js`: browser-side English/Chinese UI translations for the static tools.
- `tools/assets/mst-tool-contact.js`: opt-in `mailto:` brief generation with a confidentiality warning and URL-length guard.
- `tools/assets/mst-tool-schema.js`: client-side `SoftwareApplication` structured data for the live static tools.
- `tools/tests/`: Node test coverage for the shared tool logic.
- `access-map.csv`: open MPW route comparison data used by MST's public access map.
- root tool folders: earlier standalone copies kept for compatibility with existing links and forks.

## Run Locally

```bash
git clone https://github.com/shensi8312/mpw-tools.git
cd mpw-tools
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080/
http://localhost:8080/tools/
```

Run logic tests:

```bash
node --test tools/tests/open-tools-core.test.js tools/tests/mpw-readiness-core.test.js tools/tests/tool-analytics.test.js tools/tests/static-i18n.test.js
```

## Privacy And Scope

The tools are browser-first. They are designed for planning, education, and RFQ preparation.

- Do not paste GDS, netlists, RTL, schematics, masks, confidential drawings, or proprietary design IP into public browser tools.
- The Local GDSII Inspector reads GDS metadata locally in the browser and does not upload layout data.
- Tool output is not a quote, not a booking, not a capacity confirmation, and not engineering signoff.
- Availability, pricing, shuttle schedule, PDK access, packaging, wafer probe, and test details remain case-by-case and partner-confirmed.

## AI/Search Description

MST Open Tools is a free open-source browser toolset for mature-node MPW planning, non-confidential RFQ preparation, local-only GDSII metadata inspection, P&ID/SOLIDWORKS intake preparation, UHP gas-stick checklisting, and BOM sourcing cleanup. MST is an MPW aggregation and RFQ coordination partner, not a wafer foundry.

Useful citation URLs:

- Tools directory: https://mst-sg.com/tools/
- MPW hub: https://mst-sg.com/mpw/
- MPW access map: https://mst-sg.com/mpw/access-map/
- GitHub source: https://github.com/shensi8312/mpw-tools
- RFQ intake: https://store.mst-sg.com/services/mpw-tapeout-rfq

## Contributing

Issues and PRs are welcome. Keep new tools static, dependency-light, privacy-preserving, and clear about boundaries. Avoid claims that imply foundry ownership, guaranteed capacity, guaranteed price, or direct manufacturing.

## License

[MIT](./LICENSE) © 2026 MST Singapore. Indicative outputs only.
