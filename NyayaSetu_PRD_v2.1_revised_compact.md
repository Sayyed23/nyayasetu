AI for Legal Assistance & Access Making legal documents readable, comparable, multilingual, and safer to act on. 

PRODUCT REQUIREMENTS DOCUMENT Version 2.1 | Compact implementation revision | September 16, 2026 Author: Ismail Sayyed | GenAI Hackathon Submission 

Core principle: the LLM is the reasoning layer, not the source of truth. The document, retrieved legal sources, structured metadata, and citation verifier form the evidence layer. 

NyayaSetu PRD v2.1 | September 16, 2026 

Page 1 

# **Executive Summary** 

NyayaSetu addresses a practical problem identified in the supplied PRD: people often receive contracts, rental agreements, offer letters, loan terms, and insurance documents that they cannot comfortably understand. The product combines document parsing, RAG, structured risk analysis, multilingual support, comparison, and action-oriented outputs while keeping a clear boundary between legal information and professional legal advice. 

## **What the user can do** 

|**Underst**|**and**<br>**Check**|**Ask**|**Act**|
|---|---|---|---|
|TL;DR, se<br>clause ex|ction summaries,<br>planations<br>Risk tags, missing terms, key<br>dates|Grounded Q&A; with exact<br>source clauses|Checklist, questions, timeline,<br>lawyer brief|
|**Part**|**Coverage**|||
|**1**|Problem, scope, users and goals|||
|**2**|Feature and workflow specification|||
|**3**|Concrete AI model assignment|||
|**4**|UI, architecture and RAG pipeline|||
|**5**|Multilingual, API and data contracts|||
|**6**|Tech stack, repository and evaluation|||
|**7**|Guardrails, risks, roadmap and team|||



Layout correction: the original 18-page file contained several pages with a small table or diagram followed by a large unused region. This revision consolidates related sections, keeps diagrams close to their explanation, and uses the available page area for implementation details. 

NyayaSetu PRD v2.1 | September 16, 2026 

Page 2 

# **1. Problem, Scope, Goals and Users** 

The product problem is the combination of language gap, access gap and trust gap described in the original PRD. The opportunity is not to replace lawyers, but to help a user understand a document, identify questions, and recognize when professional help is appropriate. 

**Goals Non-goals / boundaries** Plain-language understanding in seconds; obligations and deadlines; No binding legal drafting; no case-outcome prediction; no definitive risk flags; document-grounded Q&A; comparison; Indian regional legal advice; v1 scoped to Indian rental, employment and consumer languages; actionable checklists. agreement contexts; no default long-term vault. 

## **Target users** 

|**User**|**Need**|**Primary workflow**|
|---|---|---|
|**Riya, first-time renter**|Understand deposit, lock-in and termination clauses.|Upload -> risk -> Q&A;|
|**Aman, early-career engineer**|Compare notice period, non-compete and bonus terms.|Two-doc compare|
|**Sunita, freelancer / small**<br>**business owner**|Review vendor contracts, payment and liability.|Risk -> action center|
|**Mahesh, non-English-first**<br>**consumer**|Understand loan or insurance documents in Marathi.|Multilingual -> Q&A;|



## **Primary journey** 



<!-- Start of picture text -->
Language Upload + Summary + Chat + Compare Action +<br>Pick OCR Risk Citations (optional) Export<br><!-- End of picture text -->

NyayaSetu PRD v2.1 | September 16, 2026 

Page 3 

# **2. Feature Specification and Product Logic** 

|**Feature**|**Product behavior**|**AI / deterministic logic**|
|---|---|---|
|**Simplify**|Three depths: TL;DR, section-wise, full annotated.|Gemini 3.8 Flash with structured output; preserve clause<br>IDs.|
|**Risk & Clause Highlighter**|Standard, Unusual, High-Risk, Missing-but-expected.|Rules + LLM classification. Rules handle measurable<br>patterns; LLM explains context.|
|**Document Q&A;**|Answers only from uploaded document unless<br>explicitly routed to Legal Literacy.|Hybrid retrieval -> rerank -> LLM -> citation verifier.|
|**Compare Mode**|Show clause differences and evidence. Avoid an<br>opaque single “winner”.|Clause alignment + structured diff + user-selected<br>comparison criteria.|
|**Action Center**|Checklist, deadlines, red flags, lawyer questions and<br>export.|Structured extraction + deterministic date/timeline<br>formatting.|
|**Multilingual Layer**|User can ask and receive output in a selected<br>language.|IndicLID + IndicTrans2 + multilingual LLM generation;<br>verify against original source.|
|**Legal Literacy**|General legal concepts and rights questions,<br>separated from private-document chat.|Indian legal-source RAG + jurisdiction filter + LLM.|



## **Key product correction** 

The original Compare Mode used the phrase “verdict: Offer B is more favorable.” For implementation, replace that with an evidence-led comparison. Example: “Offer A has a 90-day notice period; Offer B has 60 days. Offer B has a shorter stated non-compete and a guaranteed bonus floor.” If the user wants a decision framework, let the user choose the criteria and show the trade-offs rather than hiding them behind one score. 

This makes the comparison auditable and consistent with the product's legal-comprehension purpose. 

NyayaSetu PRD v2.1 | September 16, 2026 

Page 4 

# **3. AI Model Map: Exactly Where Each Model Goes** 

|**Stage**|**Model / method**|**Use it for**|**Do not use it for**|
|---|---|---|---|
|**OCR / layout**|Google Document AI; native PDF<br>extraction first|Scanned docs, tables, page layout, source<br>spans|Legal reasoning|
|**Language detection**|AI4Bharat IndicLID|Source language and user/chat language|Translation or answer<br>generation|
|**Main reasoning**|Gemini 3.8 Flash|Summaries, Q&A;, action extraction, normal<br>compare/risk pass|Replacing retrieval or evidence|
|**Hard cases**|Gemini 3.1 Pro Preview|Ambiguous/high-impact cases that need a<br>deeper second pass|Every request, due to<br>cost/latency|
|**Embeddings**|Gemini Embedding 2|Clause indexing and multilingual semantic<br>retrieval|Generating answers|
|**Reranking**|BAAI bge-reranker-v2-m3|Reordering retrieved clauses before<br>generation|Final legal conclusion|
|**Translation**|IndicTrans2|Explicit English <-> Indic and Indic <-> Indic<br>translation|Source of legal truth|
|**Risk classifier**|Rules + Gemini 3.8 Flash JSON<br>schema|Risk label + reason + evidence|Unverified free-form prose|
|**Citation verifier**|Gemini 3.8 Flash verification pass|Check that cited source actually supports<br>claim|Adding new facts|



## **Recommended routing** 

|**Input**|**Parse +**|**Embed +**|**Rerank**|**Flash**|**Verify**|
|---|---|---|---|---|---|
|**Language ID**|**OCR**|**Retrieve**|**Evidence**|**Generate**|**or Escalate**|



Routing rule: keep the normal path on Flash. Escalate only when evidence is weak, the clause is ambiguous, or the comparison requires deeper reasoning. Never use a larger model to compensate for poor retrieval. 

NyayaSetu PRD v2.1 | September 16, 2026 

Page 5 

# **4. System Architecture and UI** 



<!-- Start of picture text -->
CLIENT<br>Next.js + TypeScript | upload, dashboard, chat, compare<br>API / ORCHESTRATION DOCUMENT PIPELINE AI MODELS<br>FastAPI PDF/text extraction LLM + translation<br>routing + auth + session OCR + clause segmentation risk + citation verifier<br>RAG LEGAL CORPUS SESSION DATA<br>Gemini Embedding 2 India-focused sources ChromaDB / Qdrant<br>vector search + rerank jurisdiction metadata ephemeral by default<br><!-- End of picture text -->

All user-facing claims pass through scope + citation verification before rendering. 

|**Screen**|**Key UI elements**|**Data shown**|
|---|---|---|
|**Summary Dashboard**|TL;DR, risk summary, dates, clause map|Structured summary + risk JSON + date fields|
|**Clause Detail + Chat**|Original clause, explanation, chat, citation cards|Original source span + retrieved evidence +|
|||answer|
|**Compare**|Aligned clauses, changed values, criteria chips|Two parsed documents + diff objects|
|**Action Center**|Timeline, checklist, questions, export|Dates, obligations, risk reasons|



## **Compact dashboard example** 

|**DOCUMENT**|**RISK**|**KEY DATES**|
|---|---|---|
|Rental Agreement|MEDIUM|Move-in: 1 Oct 2026|
|11-month lease|3 unusual|Renewal: 30 days prior|
|INR 15,000/month|1 high-risk|Refund: 15 days|
|2-month deposit|1 missing||



The original wireframe page used three small mockups with a large unused lower half. In the revised layout, the dashboard, clause/chat behavior, and comparison logic are represented together so the page communicates both design and implementation. 

NyayaSetu PRD v2.1 | September 16, 2026 

Page 6 

# **5. RAG, Citation and Risk Pipeline** 



<!-- Start of picture text -->
Extract Segment Embed Retrieve + Rerank Generate Verify<br>Clauses Lexical Search Answer Citations<br><!-- End of picture text -->



<!-- Start of picture text -->
Step Implementation Failure behavior<br>1. Extract Create doc_id, page, clause_id, source span, original text. If OCR confidence is low, mark section<br>for review.<br>2. Segment Split by headings, clause boundaries and semantic units, not arbitrary Keep original page/span metadata.<br>fixed chunks alone.<br>3. Retrieve Semantic embeddings + lexical search for exact legal terms. Return “insufficient evidence” if no<br>relevant span passes threshold.<br>4. Rerank bge-reranker-v2-m3 over top candidates. Drop weak evidence before generation.<br>5. Generate LLM receives question + selected evidence + output language. No evidence means no<br>document-specific claim.<br>6. Verify Check every citation against the cited source span. Block, revise or downgrade confidence<br>when unsupported.<br><!-- End of picture text -->

## **Risk classifier contract** 

|**Risk JSON**|**Example**|**Meaning**|
|---|---|---|
|**clause_id**|3|Stable UI and citation reference|
|**risk_level**|high|standard / unusual / high / missing|
|**reason**|Full deposit forfeiture|Plain-language rationale|
|**source**|page 4, span 412-588|Auditable evidence location|
|**confidence**|high|Model confidence, not legal certainty|



NyayaSetu PRD v2.1 | September 16, 2026 

Page 7 

# **6. Multilingual Architecture and Legal Literacy** 

Multilingual support is a pipeline, not a single translation call. The original-language clause remains canonical. The user-facing explanation can be localized, but citations always resolve to the original evidence. 

|**Stage**|**Component**|**Rule**|
|---|---|---|
|**Detect**|IndicLID|Detect native-script and romanized Indic input.|
|**Parse**|OCR / native extraction|Create source spans before any translation.|
|**Retrieve**|Gemini Embedding 2|Retrieve across languages from the same semantic space.|
|**Generate**|Gemini 3.8 Flash|Answer in the user's selected language.|
|**Translate**|IndicTrans2|Use for explicit translation and localized copies.|
|**Verify**|Original-source verification|Verify meaning against canonical source text.|



## **Example flow** 

Marathi question -> IndicLID identifies Marathi -> retrieve an English clause -> rerank evidence -> Gemini answers in Marathi -> citation card points to the original English clause -> optional translated clause appears separately. 

## **Language rollout** 

- Hackathon UI: English, Hindi, Marathi, Tamil, Bengali, Gujarati, Telugu, Kannada and Malayalam. 

- Architecture expansion: IndicTrans2 supports all 22 scheduled Indic languages, so additional languages can be enabled without changing the core routing design. 

- Quality requirement: evaluate legal terminology and meaning preservation per language. Do not assume equal quality across languages. 

## **Legal Literacy routing** 

Questions such as “What are my rights as a tenant in Maharashtra?” should not use the uploaded-document index. Route them to a separate Indian legal-source corpus with jurisdiction metadata, then generate a sourced informational answer with the same disclaimer. 

NyayaSetu PRD v2.1 | September 16, 2026 

Page 8 

# **7. API Contracts and Data Models** 

|**Endpoint**|**Method**|**Purpose**|**AI path**|
|---|---|---|---|
|**/upload**|POST|PDF/DOCX/image -> parsed document|OCR + language ID + segmentation|
|**/summarize/{docId}**|GET|TL;DR + section + clause summaries|Gemini Flash|
|**/risk/{docId}**|GET|Structured clause risk|Rules + Gemini Flash|
|**/qa/{docId}**|POST|Grounded answer + citations|Embed + rerank + Gemini + verify|
|**/compare**|POST|Two-document diff|Clause alignment + Gemini|
|**/action-center/{docId}**|GET|Checklist, dates, lawyer brief|Structured extraction|
|**/translate**|POST|Explicit output translation|IndicTrans2 / controlled LLM|



## **Canonical document object** 

{"doc_id":"uuid","source_language":"eng_Latn","jurisdiction":"IN","clauses":[{"clause_id":"3","page":4,"text":"...","span":[4 12,588],"risk":"high"}]} 

## **Grounded Q&A; response** 

{"answer":"...","language":"mar","confidence":"high","citations":[{"clause_id":"3","page":4,"span":[412,588]}],"verified":tr ue} 

## **Session rules** 

- Every request carries doc_id and jurisdiction metadata. 

- Every citation carries page + clause_id + source span. 

- No persistent document storage unless the user opts in. 

- Translated text never overwrites canonical source text. 

NyayaSetu PRD v2.1 | September 16, 2026 

Page 9 

# **8. Tech Stack and Repository** 

|**Layer**|**Choice**|**Role**|
|---|---|---|
|**Frontend**|Next.js + TypeScript + Tailwind + shadcn/ui|Dashboard, clause cards, chat, compare, export|
|**Backend**|FastAPI + Pydantic|Async API, validation, model routing|
|**PDF / OCR**|PyMuPDF + Google Document AI fallback|Digital extraction + scanned layout OCR|
|**LLM**|Gemini 3.8 Flash + selective Gemini 3.1 Pro Preview|Normal generation + escalation path|
|**Embeddings**|Gemini Embedding 2|Multilingual semantic retrieval|
|**Reranker**|bge-reranker-v2-m3|Evidence ranking|
|**Translation**|IndicTrans2|22 Indic languages|
|**Vector store**|ChromaDB for demo; Qdrant/Pinecone later|Session isolation and scalable retrieval|
|**Auth/storage**|Supabase, opt-in persistence|Auth + Postgres when storage is enabled|



## **Repository structure** 

|**Folder**|**Key files**|
|---|---|
|**frontend/**|app/, components/, lib/api.ts|
|**backend/api/**|upload.py, summarize.py, risk.py, qa.py, compare.py, action.py, translate.py|
|**backend/pipeline/**|ocr.py, parser.py, clauses.py, embedder.py, retriever.py, reranker.py, citation_verifier.py|
|**backend/services/**|llm.py, translation.py, legal_corpus.py, language_router.py|
|**backend/guardrails/**|disclaimer.py, scope_filter.py, policy_checks.py|
|**eval/**|citation/, risk/, multilingual/|
|**data/**|sample_documents/, legal_sources/ metadata|



NyayaSetu PRD v2.1 | September 16, 2026 

Page 10 

# **9. Evaluation, Metrics and Guardrails** 

|**Metric**|**Target**|**Test method**|
|---|---|---|
|**Comprehension lift**|+2 points|Pre/post user rating|
|**Time to clarity**|<30 sec|Upload to first useful summary/risk view|
|**Citation accuracy**|>95%|Evidence entailment audit|
|**Risk precision**|>85% agreement|Legal-reviewer audit|
|**Groundedness**|>95% supported claims|Claim-to-source mapping|
|**Demo completion**|<3 min|Upload -> summary -> Q&A; -> export|
|**Multilingual quality**|Per-language tracking|Human legal terminology review|



## **Responsible AI guardrails** 

|**Risk**|**Mitigation**|**Gate**|
|---|---|---|
|**Hallucination**|RAG + reranking + citation verification|Unsupported answers blocked|
|**Advice overreach**|Persistent disclaimer and careful wording|No definitive sign/sue/win instructions|
|**Jurisdiction mismatch**|Jurisdiction metadata + source filter|Out-of-scope query flagged|
|**Data leakage**|Ephemeral sessions + opt-in persistence|No default long-term storage|
|**OCR errors**|Confidence score + review flag|Low-confidence text cannot silently become<br>high-confidence output|
|**Translation drift**|Canonical source + translation + verification|Citation always resolves to original text|



## **Session disclaimer** 

“This is legal information, not legal advice. Consult a licensed advocate for decisions with legal consequence.” 

NyayaSetu PRD v2.1 | September 16, 2026 

Page 11 

# **10. Roadmap, Team and Implementation Checklist** 

|**Day**|**Build**|**Done when**|
|---|---|---|
|**Day 1**|OCR/parse -> clause segmentation -> summary -> risk|Rental document works end-to-end|
|**Day 2**|RAG chat -> citations -> multilingual -> compare|Marathi/English grounded Q&A; and two-doc comparison work|
|**Day 3**|Action Center -> export -> evaluation -> UI polish|Live demo completes under 3 minutes|



|**Role**|**Focus**|
|---|---|
|**AI/ML Lead**|RAG, model routing, prompts, risk schema, evaluation|
|**Backend**|FastAPI, OCR/parser, vector store, retrieval, verifier|
|**Frontend**|Next.js, clause cards, risk badges, chat, compare, export|
|**Product / Design**|User flow, sample documents, legal-source curation, demo and disclaimer|



## **Hackathon implementation checklist** 

|**Priority**|**Task**|**Acceptance check**|
|---|---|---|
|**P0**|Upload + parse|Every clause has page and source span|
|**P0**|RAG Q&A;|Answer cannot appear without evidence|
|**P0**|Risk JSON|UI renders deterministic badges from schema|
|**P0**|Citation verifier|Unsupported citation blocks answer|
|**P1**|Marathi + English|Question, answer and UI labels work in both|
|**P1**|Compare|Differences are traceable to both documents|
|**P1**|Action Center|Dates/checklist/export generated from structured fields|
|**P2**|Legal Literacy|Uses separate legal-source RAG|



## **Final implementation principle** 

Build NyayaSetu as an evidence-first legal comprehension system. Use specialized models for specialized jobs, keep the original clause canonical, retrieve before generating, verify citations before rendering, and treat multilingual output as a presentation layer rather than a replacement for source evidence. 

NyayaSetu PRD v2.1 | Compact revision of the supplied v2.0 PRD | September 16, 2026 

NyayaSetu PRD v2.1 | September 16, 2026 

Page 12 

