import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Globe,
  Search,
  Target,
  MessageSquare,
  Building2,
  Sparkles,
  Copy,
  Check,
  Link as LinkIcon,
} from 'lucide-react';

type Competitor = {
  name: string;
  offer: string;
  audience: string;
  strengths: string;
  difference: string;
};

const defaultCompetitors: Competitor[] = [
  { name: 'Competitor 1', offer: '', audience: '', strengths: '', difference: '' },
  { name: 'Competitor 2', offer: '', audience: '', strengths: '', difference: '' },
  { name: 'Competitor 3', offer: '', audience: '', strengths: '', difference: '' },
];

const websiteChecklist = [
  'Clarity of offer',
  'Clear CTA',
  'Trust signals',
  'Social proof',
  'Service explanation',
  'Mobile-friendly structure',
  'Lead capture flow',
  'Brand positioning',
];

function scoreLabel(score: number) {
  if (score >= 85) return 'Strong';
  if (score >= 70) return 'Good';
  if (score >= 55) return 'Average';
  return 'Needs work';
}

function scoreFromChecklist(map: Record<string, boolean>) {
  const values = Object.values(map);
  if (!values.length) return 0;
  const checked = values.filter(Boolean).length;
  return Math.round((checked / values.length) * 100);
}

function exportText(filename: string, text: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function buildInsights({
  clientName,
  niche,
  brief,
  website,
  socials,
  checklist,
  offerSummary,
  competitors,
  recommendations,
  ownerName,
}: {
  clientName: string;
  niche: string;
  brief: string;
  website: string;
  socials: string;
  checklist: Record<string, boolean>;
  offerSummary: string;
  competitors: Competitor[];
  recommendations: string;
  ownerName: string;
}) {
  const websiteScore = scoreFromChecklist(checklist);
  const checked = websiteChecklist.filter((item) => checklist[item]);
  const unchecked = websiteChecklist.filter((item) => !checklist[item]);

  return `AGENCY INTELLIGENCE REPORT

Client Name: ${clientName || '-'}
Industry / Niche: ${niche || '-'}
Owner / Founder: ${ownerName || '-'}
Website: ${website || '-'}
Social Links: ${socials || '-'}

1) QUICK BRIEF
${brief || '-'}

2) BUSINESS SUMMARY
${offerSummary || '-'}

3) WEBSITE ANALYSIS
Website Score: ${websiteScore}/100 (${scoreLabel(websiteScore)})
What looks strong:
${checked.length ? checked.map((x) => `- ${x}`).join('\n') : '- No strengths selected yet'}

What needs attention:
${unchecked.length ? unchecked.map((x) => `- ${x}`).join('\n') : '- No gaps selected'}

4) COMPETITOR SNAPSHOT
${competitors.map((c, i) => `${i + 1}. ${c.name || `Competitor ${i + 1}`}
   Offer: ${c.offer || '-'}
   Audience: ${c.audience || '-'}
   Strengths: ${c.strengths || '-'}
   Difference vs client: ${c.difference || '-'}
`).join('\n')}

5) STRATEGIC RECOMMENDATIONS
${recommendations || '-'}
`;
}

function buildSalesScript({
  clientName,
  niche,
  recommendations,
}: {
  clientName: string;
  niche: string;
  recommendations: string;
}) {
  return `سكريبت بيعي - عامية مصرية

بص يا ${clientName || 'أستاذنا'}،
واضح جدًا إن عندك أصل كويس في ${niche || 'النشاط بتاعك'}، لكن المشكلة مش دايمًا في الخدمة نفسها… المشكلة في إزاي السوق شايفها وبيفهمها.

اللي إحنا شايفينه إن عندك فرصة أكبر بكتير من اللي طالع دلوقتي، بس محتاجين نشتغل على 3 حاجات بسرعة:
${(recommendations || '1) توضيح الرسالة البيعية\n2) إبراز الفرق الحقيقي عن المنافسين\n3) تحويل المحتوى والموقع لأدوات بيع')
  .split('\n')
  .map((r) => r.trim() ? `- ${r.trim().replace(/^-\s*/, '')}` : '')
  .filter(Boolean)
  .join('\n')}

الفكرة ببساطة:
إحنا مش جايين نعملك شوية بوستات أو شكل أحلى وخلاص.
إحنا جايين نمسك الحتة اللي منها تؤكل الفريسة:
فين العميل بيتشد؟
فين المنافس سابقك؟
وفين الفجوة اللي لو قفلناها، الناس تختارك إنت مش غيرك.

لو اشتغلنا مع بعض، هنطلعلك صورة أوضح، رسالة أقوى، ومحتوى وعرض يخلوا العميل يحس إنك الاختيار الصح من أول نظرة.

وده بالضبط اللي بنشتغل عليه: نحول مجهودك التسويقي من حضور عادي… لسبب مقنع يخلي السوق يشتري منك.
`;
}

export default function AgencyIntelligenceMVP() {
  const [clientName, setClientName] = useState('');
  const [niche, setNiche] = useState('');
  const [brief, setBrief] = useState('');
  const [website, setWebsite] = useState('');
  const [socials, setSocials] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [offerSummary, setOfferSummary] = useState('');
  const [recommendations, setRecommendations] = useState(
    'Clarify the main value proposition\nBuild stronger proof and trust signals\nDifferentiate clearly from competitors\nUse a sharper CTA and lead capture flow'
  );
  const [competitors, setCompetitors] = useState<Competitor[]>(defaultCompetitors);
  const [checklist, setChecklist] = useState<Record<string, boolean>>(
    Object.fromEntries(websiteChecklist.map((item) => [item, false]))
  );
  const [copied, setCopied] = useState(false);

  const websiteScore = useMemo(() => scoreFromChecklist(checklist), [checklist]);

  const reportText = useMemo(
    () =>
      buildInsights({
        clientName,
        niche,
        brief,
        website,
        socials,
        checklist,
        offerSummary,
        competitors,
        recommendations,
        ownerName,
      }),
    [clientName, niche, brief, website, socials, checklist, offerSummary, competitors, recommendations, ownerName]
  );

  const salesScript = useMemo(
    () => buildSalesScript({ clientName, niche, recommendations }),
    [clientName, niche, recommendations]
  );

  const analysisPrompt = useMemo(() => {
    return `Analyze this client for my agency.

Client name: ${clientName || '-'}
Industry/Niche: ${niche || '-'}
Brief: ${brief || '-'}
Website: ${website || '-'}
Social links: ${socials || '-'}
Known owner/founder name: ${ownerName || '-'}
Current offer summary: ${offerSummary || '-'}

I need:
1) Website analysis with clear insights
2) Direct and indirect competitors
3) What the client offers vs what competitors offer
4) Strategic recommendations
5) A strong Egyptian Arabic sales script to win this client
6) Mention publicly available info about the owner/company activities if found`;
  }, [clientName, niche, brief, website, socials, ownerName, offerSummary]);

  const updateCompetitor = (index: number, key: keyof Competitor, value: string) => {
    setCompetitors((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(analysisPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error(error);
    }
  };

  const cardClass = 'rounded-[24px] border border-slate-200 bg-white shadow-sm';

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="rounded-[28px] bg-gradient-to-r from-slate-950 to-slate-800 p-6 text-white shadow-xl md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm text-slate-300">
                  <Sparkles className="h-4 w-4" />
                  Internal tool for fast client discovery
                </div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Agency Intelligence MVP
                </h1>
                <p className="mt-2 max-w-3xl text-sm text-slate-300 md:text-base">
                  Enter a quick brief, score the website, map competitors, and generate an
                  internal report plus an Egyptian Arabic sales script.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:w-[320px]">
                <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-slate-300">Website Score</div>
                  <div className="mt-1 text-2xl font-bold">{websiteScore}/100</div>
                  <div className="mt-1 text-xs text-slate-300">{scoreLabel(websiteScore)}</div>
                </div>
                <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-slate-300">Competitors</div>
                  <div className="mt-1 text-2xl font-bold">
                    {competitors.filter((c) => c.name.trim()).length}
                  </div>
                  <div className="mt-1 text-xs text-slate-300">tracked in this brief</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-6">
            <div className={cardClass}>
              <div className="border-b border-slate-100 p-6">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                  <Building2 className="h-5 w-5" />
                  Client Input
                </h2>
              </div>
              <div className="grid gap-4 p-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Client name</label>
                  <input
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="MIG Academy"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Industry / niche</label>
                  <input
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    placeholder="Education / language courses"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Quick brief</label>
                  <textarea
                    className="min-h-[120px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="What do they do, who do they target, and what do you want to win?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Website link</label>
                  <input
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Owner / founder</label>
                  <input
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Optional"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Social links</label>
                  <textarea
                    className="min-h-[90px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                    value={socials}
                    onChange={(e) => setSocials(e.target.value)}
                    placeholder="Facebook, Instagram, LinkedIn, TikTok..."
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Offer summary</label>
                  <textarea
                    className="min-h-[110px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                    value={offerSummary}
                    onChange={(e) => setOfferSummary(e.target.value)}
                    placeholder="Summarize products/services in one concise block"
                  />
                </div>
              </div>
            </div>

            <div className={cardClass}>
              <div className="border-b border-slate-100 p-6">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                  <Globe className="h-5 w-5" />
                  Website Audit Checklist
                </h2>
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm text-slate-600">
                    Quick manual scoring while reviewing the website.
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800">
                    {websiteScore}/100
                  </span>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {websiteChecklist.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        setChecklist((prev) => ({
                          ...prev,
                          [item]: !prev[item],
                        }))
                      }
                      className={`rounded-2xl border p-4 text-left transition ${
                        checklist[item]
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="font-medium">{item}</div>
                      <div
                        className={`mt-1 text-sm ${
                          checklist[item] ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {checklist[item]
                          ? 'Checked as present / strong'
                          : 'Click to mark as present'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={cardClass}>
              <div className="border-b border-slate-100 p-6">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                  <Search className="h-5 w-5" />
                  Competitor Matrix
                </h2>
              </div>
              <div className="space-y-4 p-6">
                {competitors.map((c, i) => (
                  <div key={i} className="rounded-2xl border border-slate-200 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                        #{i + 1}
                      </span>
                      <input
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                        value={c.name}
                        onChange={(e) => updateCompetitor(i, 'name', e.target.value)}
                        placeholder={`Competitor ${i + 1} name`}
                      />
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <textarea
                        className="min-h-[100px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                        value={c.offer}
                        onChange={(e) => updateCompetitor(i, 'offer', e.target.value)}
                        placeholder="What do they offer?"
                      />
                      <textarea
                        className="min-h-[100px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                        value={c.audience}
                        onChange={(e) => updateCompetitor(i, 'audience', e.target.value)}
                        placeholder="Who do they target?"
                      />
                      <textarea
                        className="min-h-[100px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                        value={c.strengths}
                        onChange={(e) => updateCompetitor(i, 'strengths', e.target.value)}
                        placeholder="Strengths / why they win"
                      />
                      <textarea
                        className="min-h-[100px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                        value={c.difference}
                        onChange={(e) => updateCompetitor(i, 'difference', e.target.value)}
                        placeholder="Difference vs your client"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={cardClass}>
              <div className="border-b border-slate-100 p-6">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                  <Target className="h-5 w-5" />
                  Strategic Recommendations
                </h2>
              </div>
              <div className="p-6">
                <textarea
                  className="min-h-[170px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
                  value={recommendations}
                  onChange={(e) => setRecommendations(e.target.value)}
                  placeholder="Write the recommendations you want to present to the client"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={cardClass}>
              <div className="border-b border-slate-100 p-6">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                  <LinkIcon className="h-5 w-5" />
                  ChatGPT Analysis Prompt
                </h2>
              </div>
              <div className="space-y-4 p-6">
                <p className="text-sm text-slate-600">
                  Copy this structured prompt and use it with live links for a deeper research pass.
                </p>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm whitespace-pre-wrap">
                  {analysisPrompt}
                </div>

                <button
                  type="button"
                  onClick={copyPrompt}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {copied ? 'Copied' : 'Copy prompt'}
                </button>
              </div>
            </div>

            <div className={cardClass}>
              <div className="border-b border-slate-100 p-6">
                <h2 className="text-xl font-semibold text-slate-900">Internal Report Preview</h2>
              </div>
              <div className="space-y-4 p-6">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm whitespace-pre-wrap">
                  {reportText}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    exportText(`${(clientName || 'client').replace(/\s+/g, '_')}_report.txt`, reportText)
                  }
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export report
                </button>
              </div>
            </div>

            <div className={cardClass}>
              <div className="border-b border-slate-100 p-6">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                  <MessageSquare className="h-5 w-5" />
                  Egyptian Sales Script
                </h2>
              </div>
              <div className="space-y-4 p-6">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 whitespace-pre-wrap">
                  {salesScript}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    exportText(
                      `${(clientName || 'client').replace(/\s+/g, '_')}_sales_script.txt`,
                      salesScript
                    )
                  }
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export script
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
