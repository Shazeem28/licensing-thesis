'use client'

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ChevronRight, ChevronLeft, Lightbulb, FileCheck, Layers, Package, Truck, HelpCircle, Check } from 'lucide-react';

// Market growth data
const marketData = [
  { year: '2023', value: 357 },
  { year: '2024', value: 370 },
  { year: '2025', value: 385 },
  { year: '2026', value: 402 },
  { year: '2027', value: 419 },
  { year: '2028', value: 437 },
  { year: '2029', value: 456 },
  { year: '2030', value: 476 },
];

// Segment data
const segmentData = [
  { name: 'Character/Entertainment', value: 41.4, amount: 147.6, color: '#00D4AA' },
  { name: 'Corporate/Brand', value: 25.3, amount: 90.3, color: '#00A88A' },
  { name: 'Sports', value: 11.1, amount: 39.5, color: '#007D66' },
  { name: 'Other', value: 22.2, amount: 79.6, color: '#404040' },
];

// Geographic data
const geoData = [
  { region: 'US/Canada', value: 59, amount: 210.3 },
  { region: 'W. Europe', value: 18.4, amount: 65.5 },
  { region: 'North Asia', value: 9.7, amount: 34.7 },
  { region: 'Other', value: 12.9, amount: 46.5 },
];

// Licensing steps
const licensingSteps = [
  {
    id: 1,
    title: 'IP Creation & Ownership',
    icon: Lightbulb,
    description: 'Invent or acquire brand/character/patent. Lock-in legal protection (TM, ©, patents) and draft style guide. Engage agent/licensee or evaluate licensing offers.',
    color: '#00D4AA'
  },
  {
    id: 2,
    title: 'Rights Management',
    icon: FileCheck,
    description: 'Source and vet licensee partners, negotiate term/territory/royalty. Execute licensing agreement with quality, audit, and GMR clauses. Ongoing approvals and royalty tracking.',
    color: '#00C49A'
  },
  {
    id: 3,
    title: 'Product Development',
    icon: Layers,
    description: 'Licensee designs concepts to licensor specs with iterative approvals. Prototype & test for cost, safety, and brand fit. Final design sign-off triggers production PO.',
    color: '#00B48A'
  },
  {
    id: 4,
    title: 'Product Manufacturing',
    icon: Package,
    description: 'Secure compliant factory/materials with embedded brand QC checkpoints. Mass-produce and label per licensor guidelines. Batch inspections to protect IP and quality.',
    color: '#00A47A'
  },
  {
    id: 5,
    title: 'Distribution & Sales',
    icon: Truck,
    description: 'Ship finished goods to retail, e-com, or licensor DTC channels. Retailers merchandise & market. Net sales reported; owed royalties/marketing fees paid to licensor.',
    color: '#00946A'
  },
];

// Opportunity zones
const opportunityZones = [
  {
    id: 1,
    title: 'Tech-Enabled Agency',
    description: 'A productized service to pair emerging IP (influencers, mid-tier creators, niche media brands) with vetted manufacturers.',
    thesis: 'A software-led, productized licensing agency can unlock speed and transparency in a market still slowed by manual approvals and royalty reporting.',
    companies: ['Pietra ($37M)', 'Fourthwall ($23M)', 'Genflow ($13M)'],
    questions: [
      'Can proprietary data compound into a defensible advantage?',
      'Can we sustain 25-35% of royalties without scaring off mid-tier IP?',
      'Does our ICP skew too far down-market?'
    ]
  },
  {
    id: 2,
    title: 'Roll-Up of Agents',
    description: 'Acquire or JV with fragmented MM/SMB licensing agencies and plug them into a single tech stack.',
    thesis: 'A roll-up that preserves front-line principals but centralizes creative, approvals, legal, and royalty ops can expand EBITDA and compound a differentiated dataset.',
    companies: ['CAA ($7B acq)', 'Endeavor ($2.4B acq)', 'WildBrain CPLG'],
    questions: [
      'Are earn-outs and non-competes enough to prevent client flight?',
      'Can we move active programs onto a single stack?',
      'Does platform EBITDA expand beyond stand-alone margins?'
    ]
  },
  {
    id: 3,
    title: 'Rights Marketplace',
    description: 'A self-serve listing site where IP owners auction their IP and licensees can go direct to licensors.',
    thesis: 'A marketplace can compress discovery & negotiation into a transparent, software-driven flow. Network effects compound in long-tail verticals.',
    companies: ['Layer ($2.6M)', 'Roblox ($87B)', 'Catch+Release ($22.8M)'],
    questions: [
      'Which vertical has enough standardized rights and deal velocity?',
      'Can we encode complex multi-territory terms into self-serve?',
      'What take-rate clears relative to agency economics?'
    ]
  },
  {
    id: 4,
    title: 'Royalty OS SaaS',
    description: 'A platform for continuous royalty reconciliation, contract management, and leakage alerts for both licensors and licensees.',
    thesis: 'A modern OS that unifies contract terms with actuals, automates reconciliation and payments, and produces audit-ready data can unlock speed and trust.',
    companies: ['MetaComet', 'Vistex ($105M)', 'Rightsline', 'Flowhaven ($21.5M)'],
    questions: [
      'What features compel licensees to adopt a new OS?',
      'Is revenue leakage big enough to justify rip-and-replace?',
      'Can an API-first system handle multi-territory complexity?'
    ]
  },
  {
    id: 5,
    title: '"Threeflow" for Licensing',
    description: 'A shared, cloud-native workspace where licensors, licensees, and agents collaborate on deals, quoting, and contract negotiation.',
    thesis: 'A neutral workspace that standardizes intake, gathers structured quotes, enforces guardrails, and links approvals and e-sign compresses time-to-close.',
    companies: ['MyMediaBox (acq)', 'Octane5 ($3.3M)', 'Fabacus ($24M)'],
    questions: [
      'What incentives make all parties use a shared workspace?',
      'Can the system handle complex terms and approvals?',
      'What monetization supports software-grade margins?'
    ]
  },
];

// Key actors
const keyActors = [
  { name: 'Licensors', desc: 'IP owners monetizing assets via internal teams or agencies', royalty: '5-35%', examples: 'Disney, Pokemon, NFL' },
  { name: 'Licensees', desc: 'Manufacturers/CPG firms turning IP into products', margin: '5-15%', examples: 'LEGO, Mattel, Funko' },
  { name: 'Agents', desc: 'Intermediaries sourcing and negotiating deals', commission: '25-35%', examples: 'Beanstalk, CAA, IMG' },
  { name: 'Retailers', desc: 'Gatekeepers of distribution and shelf space', leverage: 'High', examples: 'Target, Walmart, Nike' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-emerald-500/30 px-4 py-2 rounded-lg shadow-xl">
        <p className="text-white font-semibold">{label}</p>
        <p className="text-emerald-400">${payload[0].value}B</p>
      </div>
    );
  }
  return null;
};

export default function LicensingPrototype() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStep, setSelectedStep] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const pages = ['landing', 'market', 'steps', 'opportunities', 'questions', 'conclusion'];

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, pages.length - 1));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 0));
  const goToPage = (index) => setCurrentPage(index);

  // Landing Page
  const LandingPage = () => (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-8">
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-3 bg-emerald-400 rounded-sm transform -skew-x-12"></div>
          <div className="w-10 h-3 bg-emerald-400 rounded-sm transform -skew-x-12"></div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Brand Licensing<br />
          <span className="text-emerald-400">Thesis</span>
        </h1>
      </div>
      <p className="text-gray-400 text-xl max-w-2xl mb-12">
        Explore the key insights of the $357B licensing landscape and discover where technology can unlock the next wave of value creation.
      </p>
      <button
        onClick={nextPage}
        className="group bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-4 rounded-lg transition-all flex items-center gap-2"
      >
        Start Exploring
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
      <div className="mt-16 grid grid-cols-3 gap-8 text-center">
        <div>
          <p className="text-3xl font-bold text-emerald-400">$357B</p>
          <p className="text-gray-500 text-sm">Global Market</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-emerald-400">4.2%</p>
          <p className="text-gray-500 text-sm">Annual Growth</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-emerald-400">$476B</p>
          <p className="text-gray-500 text-sm">By 2030</p>
        </div>
      </div>
    </div>
  );

  // Market Overview Page
  const MarketPage = () => (
    <div className="min-h-screen p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-2">Market Overview</h2>
        <p className="text-gray-400 mb-8">The global licensing market represents a ~$357B opportunity</p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Growth Chart */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-1">Global Brand Licensing Market</h3>
            <p className="text-emerald-400 text-sm mb-4">+4.2% CAGR through 2030</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketData}>
                  <XAxis dataKey="year" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => `$${v}B`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#00D4AA" 
                    strokeWidth={3}
                    dot={{ fill: '#00D4AA', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#00D4AA' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Segment Breakdown */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Top Properties by Segment</h3>
            <div className="space-y-4">
              {segmentData.map((segment, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{segment.name}</span>
                    <span className="text-emerald-400">{segment.value}% (${segment.amount}B)</span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500 group-hover:opacity-80"
                      style={{ width: `${segment.value}%`, backgroundColor: segment.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Geographic Distribution</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={geoData} layout="vertical">
                <XAxis type="number" stroke="#6b7280" fontSize={12} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="region" stroke="#6b7280" fontSize={12} width={80} />
                <Tooltip 
                  formatter={(value, name, props) => [`${value}% ($${props.payload.amount}B)`, 'Market Share']}
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #00D4AA30', borderRadius: '8px' }}
                />
                <Bar dataKey="value" fill="#00D4AA" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Actors */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">4 Key Actors in Licensing</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {keyActors.map((actor, i) => (
              <div key={i} className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 hover:border-emerald-500/40 transition-all">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-emerald-400 font-bold">{i + 1}</span>
                </div>
                <h4 className="text-white font-semibold mb-1">{actor.name}</h4>
                <p className="text-gray-400 text-sm mb-2">{actor.desc}</p>
                <p className="text-emerald-400 text-xs">{actor.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Licensing Steps Page
  const StepsPage = () => (
    <div className="min-h-screen p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-2">5 Core Licensing Steps</h2>
        <p className="text-gray-400 mb-8">Click each step to explore the licensing value chain</p>
        
        {/* Step Flow */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
          {licensingSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                  className={`relative group flex flex-col items-center p-4 md:p-6 rounded-xl transition-all ${
                    selectedStep === step.id 
                      ? 'bg-emerald-500/20 border-2 border-emerald-500' 
                      : 'bg-gray-900/50 border border-gray-800 hover:border-emerald-500/50'
                  }`}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-2"
                    style={{ backgroundColor: `${step.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>
                  <span className="text-white text-sm font-medium text-center max-w-24">{step.title}</span>
                  <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs text-gray-400">
                    {step.id}
                  </span>
                </button>
                {i < licensingSteps.length - 1 && (
                  <div className="hidden md:flex items-center">
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Selected Step Detail */}
        {selectedStep && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 md:p-8 animate-in">
            <div className="flex items-start gap-4">
              {(() => {
                const step = licensingSteps.find(s => s.id === selectedStep);
                const Icon = step.icon;
                return (
                  <>
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${step.color}30` }}
                    >
                      <Icon className="w-8 h-8" style={{ color: step.color }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{step.description}</p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {!selectedStep && (
          <div className="bg-gray-900/30 border border-gray-800 border-dashed rounded-2xl p-8 text-center">
            <p className="text-gray-500">Click a step above to see details</p>
          </div>
        )}
      </div>
    </div>
  );

  // Opportunity Zones Page
  const OpportunitiesPage = () => (
    <div className="min-h-screen p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-2">5 Opportunity Zones</h2>
        <p className="text-gray-400 mb-8">Strategic investment opportunities across the licensing value chain</p>
        
        <div className="grid md:grid-cols-5 gap-3 mb-8">
          {opportunityZones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
              className={`p-4 rounded-xl text-left transition-all ${
                selectedZone === zone.id
                  ? 'bg-emerald-500 text-black'
                  : 'bg-gray-900/50 border border-gray-800 hover:border-emerald-500/50 text-white'
              }`}
            >
              <span className={`text-xs font-medium ${selectedZone === zone.id ? 'text-black/60' : 'text-emerald-400'}`}>
                Zone {zone.id}
              </span>
              <h4 className="font-semibold text-sm mt-1">{zone.title}</h4>
            </button>
          ))}
        </div>

        {selectedZone && (
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
            {(() => {
              const zone = opportunityZones.find(z => z.id === selectedZone);
              return (
                <>
                  <div className="bg-emerald-500/10 border-b border-emerald-500/20 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-emerald-500 text-black text-sm font-semibold rounded-full">
                        Opportunity {zone.id}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{zone.title}</h3>
                    <p className="text-gray-400 mt-2">{zone.description}</p>
                  </div>
                  
                  <div className="p-6 grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-emerald-400 font-semibold mb-3">Investment Thesis</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{zone.thesis}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-emerald-400 font-semibold mb-3">Select Companies</h4>
                      <div className="flex flex-wrap gap-2">
                        {zone.companies.map((company, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-800 p-6">
                    <h4 className="text-emerald-400 font-semibold mb-3">Questions to Conviction</h4>
                    <ul className="space-y-2">
                      {zone.questions.map((q, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                          <HelpCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {!selectedZone && (
          <div className="bg-gray-900/30 border border-gray-800 border-dashed rounded-2xl p-12 text-center">
            <p className="text-gray-500">Select an opportunity zone above to explore the thesis</p>
          </div>
        )}
      </div>
    </div>
  );

  // Questions Page
  const QuestionsPage = () => {
    const keyQuestions = [
      {
        id: 1,
        question: 'Can proprietary data compound into a defensible advantage?',
        insight: 'Win rates by category/retailer, approval SLAs, and forecast accuracy could create moats—but relationships may keep the center of gravity.',
        zone: 'Tech-Enabled Agency'
      },
      {
        id: 2,
        question: 'Is revenue leakage significant enough to justify switching costs?',
        insight: 'Some operators report audits find errors but not large ones. The size of leakage by category determines willingness to rip-and-replace.',
        zone: 'Royalty OS SaaS'
      },
      {
        id: 3,
        question: 'Which vertical has enough standardized rights and deal velocity?',
        insight: 'Gaming/UGC, creator merch, and publishing offer different levels of standardization. The wedge needs both sides of the marketplace.',
        zone: 'Rights Marketplace'
      },
      {
        id: 4,
        question: 'Can we retain key principals post-acquisition?',
        insight: 'Earn-outs, equity, and non-competes must be compelling enough to prevent client flight when relationships drive revenue.',
        zone: 'Roll-Up of Agents'
      },
      {
        id: 5,
        question: 'What take-rate clears vs. agency economics (25-35%)?',
        insight: 'Marketplaces and platforms must price below agency commissions while funding trust/safety and supporting software margins.',
        zone: 'Threeflow for Licensing'
      },
    ];

    return (
      <div className="min-h-screen p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-2">Questions to Conviction</h2>
          <p className="text-gray-400 mb-8">Critical questions that determine investment viability</p>
          
          <div className="space-y-4">
            {keyQuestions.map((item) => (
              <div
                key={item.id}
                className={`bg-gray-900/50 border rounded-xl overflow-hidden transition-all cursor-pointer ${
                  expandedQuestion === item.id ? 'border-emerald-500' : 'border-gray-800 hover:border-gray-700'
                }`}
                onClick={() => setExpandedQuestion(expandedQuestion === item.id ? null : item.id)}
              >
                <div className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-emerald-400 font-medium">{item.zone}</span>
                    </div>
                    <h4 className="text-white font-semibold">{item.question}</h4>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-500 transition-transform ${expandedQuestion === item.id ? 'rotate-90' : ''}`} />
                </div>
                
                {expandedQuestion === item.id && (
                  <div className="px-5 pb-5 pt-0">
                    <div className="pl-14 border-l-2 border-emerald-500/30 ml-5">
                      <p className="text-gray-400 text-sm leading-relaxed">{item.insight}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Conclusion Page
  const ConclusionPage = () => (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-8">
      <div className="max-w-2xl">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Key Takeaways</h2>
        <div className="space-y-6 text-left mb-8">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-black text-xs font-bold">1</span>
            </div>
            <p className="text-gray-300">The $357B licensing market is growing at 4.2% CAGR—outpacing traditional retail—with ~$120B of new spend expected by 2030.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-black text-xs font-bold">2</span>
            </div>
            <p className="text-gray-300">Power pools at IP ownership and distribution edges. Premium IP accrues outsized value while mid-market remains fragmented.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-black text-xs font-bold">3</span>
            </div>
            <p className="text-gray-300">Technology adoption remains slow across the value chain, creating openings for tech-enabled disruption in approvals, royalties, and deal flow.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-black text-xs font-bold">4</span>
            </div>
            <p className="text-gray-300">50M+ creators and digital-first brands need monetization tools—the democratization of licensing extends beyond the premium IP oligopoly.</p>
          </div>
        </div>
        
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 mb-8">
          <p className="text-emerald-400 font-medium mb-2">The Opportunity</p>
          <p className="text-gray-300 text-sm">
            Innovation in AI, boom in digital/creator economy, and macro changes create a strong "why now" for technology-enabled licensing solutions.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage(0)}
          className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-2 mx-auto"
        >
          <ChevronLeft className="w-4 h-4" />
          Return to Start
        </button>
      </div>
    </div>
  );

  // Navigation
  const Navigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-950/90 backdrop-blur-lg border-t border-gray-800 p-4 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="flex items-center gap-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Previous</span>
        </button>
        
        <div className="flex items-center gap-2">
          {pages.map((page, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentPage === i ? 'bg-emerald-400 w-6' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1}
          className="flex items-center gap-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (pages[currentPage]) {
      case 'landing': return <LandingPage />;
      case 'market': return <MarketPage />;
      case 'steps': return <StepsPage />;
      case 'opportunities': return <OpportunitiesPage />;
      case 'questions': return <QuestionsPage />;
      case 'conclusion': return <ConclusionPage />;
      default: return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-gray-950/90 backdrop-blur-lg border-b border-gray-800 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-2 bg-emerald-400 rounded-sm transform -skew-x-12"></div>
            <div className="w-6 h-2 bg-emerald-400 rounded-sm transform -skew-x-12"></div>
            <span className="text-white font-semibold ml-2 hidden sm:inline">Brand Licensing Thesis</span>
          </div>
          <span className="text-gray-500 text-sm">
            {pages[currentPage].charAt(0).toUpperCase() + pages[currentPage].slice(1)}
          </span>
        </div>
      </div>

      {/* Page Content */}
      <div className="pt-16">
        {renderPage()}
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
}
