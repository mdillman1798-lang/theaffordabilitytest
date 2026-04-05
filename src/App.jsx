import { useState, useCallback } from 'react';
import InputForm from './components/InputForm';
import ResultsSection from './components/ResultsSection';
import { calculateAll } from './utils/calculations';

const POSTS = [
  {
    tag: 'Housing',
    title: 'The 28% Rule Is Outdated — Here\'s What Actually Works',
    excerpt: 'The old advice to spend no more than 28% of your gross income on housing made sense in 1980. With home prices up 40% since 2020, the math has changed significantly.',
    readTime: '5 min read',
  },
  {
    tag: 'Taxes',
    title: 'Why Your Marginal Tax Rate Is Not What You Actually Pay',
    excerpt: 'Most people dramatically overestimate how much they owe in taxes because they confuse marginal and effective rates. Here\'s how the bracket system actually works.',
    readTime: '4 min read',
  },
  {
    tag: 'Cars',
    title: 'The True Cost of a Car Payment (It\'s More Than You Think)',
    excerpt: 'The sticker price and monthly payment are just the beginning. When you factor in insurance, fuel, maintenance, and depreciation, the real number surprises most buyers.',
    readTime: '6 min read',
  },
];

const DEFAULT_INPUTS = {
  salary: '',
  state: '',
  county: '',
  filingStatus: 'single',
  downPayment: '',
  monthlyDebt: '',
  creditScore: 'good',
  interestRate: '7.25',
  firstTimeBuyer: false,
  highIncome: false,
  aggressiveSaver: false,
  luxuryCar: false,
};

function Header() {
  return (
    <header className="bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 sm:py-14">
        <div className="max-w-2xl">
          <p className="text-slate-400 text-xs font-medium tracking-widest uppercase mb-3">
            Personal Finance
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
            The Affordability<br />
            <span className="text-slate-400">Test.</span>
          </h1>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed max-w-lg">
            Enter your income and location. Get realistic numbers for housing, cars, and lifestyle — built on actual tax math.
          </p>
        </div>
      </div>
    </header>
  );
}

function BlogSection() {
  return (
    <section className="border-t border-slate-200 bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-xl font-black text-slate-900 tracking-tight mb-1">From the blog</h2>
        <p className="text-sm text-slate-400 mb-8">Plain-English guides to personal finance.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <article key={post.title} className="group cursor-pointer">
              <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">{post.tag}</div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2 group-hover:text-slate-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">{post.excerpt}</p>
              <span className="text-xs text-slate-400">{post.readTime}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 mt-12">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-400">
        <span className="font-medium text-slate-500">The Affordability Test</span>
        <span>Estimates only. Tax data reflects 2024 rates. Not financial advice.</span>
      </div>
    </footer>
  );
}

export default function App() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = useCallback(() => {
    setError('');
    if (!inputs.salary || Number(inputs.salary) <= 0) {
      setError('Please enter a valid annual salary.');
      return;
    }
    if (!inputs.state) {
      setError('Please select a state.');
      return;
    }
    try {
      const r = calculateAll(inputs);
      if (!r) {
        setError('Could not calculate results. Please check your inputs.');
        return;
      }
      setResults(r);
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (e) {
      console.error(e);
      setError('An error occurred during calculation. Please try again.');
    }
  }, [inputs]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        <InputForm
          inputs={inputs}
          onChange={setInputs}
          onCalculate={handleCalculate}
        />

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {results && (
          <div id="results">
            <ResultsSection results={results} inputs={inputs} />
          </div>
        )}

        {!results && (
          <div className="text-center py-20 text-slate-400">
            <p className="text-base font-medium text-slate-500">Enter your salary and state above to get started.</p>
          </div>
        )}
      </main>

      <BlogSection />

      <Footer />
    </div>
  );
}
