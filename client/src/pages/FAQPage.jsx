import React, { useState, useEffect, useMemo } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  AlertTriangle,
  Binary,
  ShieldCheck,
  RotateCcw,
  Terminal,
  CheckCircle2,
  XCircle,
  Info,
} from 'lucide-react';
import { FAQBackground } from '../components/backgrounds/FAQBackground';
import { api } from '../services/api';

export const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // SQL Injection Demonstration State
  // activeDemo: null | 'error-based' | 'boolean-based'
  const [activeDemo, setActiveDemo] = useState(null);
  const [errorDemoMode, setErrorDemoMode] = useState('vulnerable'); // 'vulnerable' | 'secure'
  const [booleanScenario, setBooleanScenario] = useState('true'); // 'true' | 'false'

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await api.getFAQs();
        if (res.success && Array.isArray(res.data)) {
          setFaqs(res.data);
        }
      } catch (err) {
        console.warn('Failed to load FAQs from server:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  // Determine error injection state for Error-Based demonstration
  const errorDetails = useMemo(() => {
    if (activeDemo !== 'error-based') return null;

    const trimmed = searchQuery.trim();
    // Check if user input contains typical SQL injection quote or syntax error characters
    const hasQuote = trimmed.includes("'") || trimmed.includes('"');
    const isXpath = /extractvalue|updatexml/i.test(trimmed);

    if (!hasQuote && !isXpath) {
      return { triggered: false };
    }

    if (errorDemoMode === 'vulnerable') {
      if (isXpath) {
        return {
          triggered: true,
          type: 'xpath',
          code: '1105 (HY000)',
          title: 'XPATH Syntax Error (Data Disclosure)',
          rawError: `[MySQL 8.0 Error 1105 (HY000)]: XPATH syntax error: '~8.0.36-nerdslab-db~'`,
          query: `SELECT * FROM faqs WHERE activeStatus = 1 AND question LIKE '%${trimmed}%'`,
          explanation:
            'Vulnerable Demo: Unhandled database exception is leaked directly in the HTTP response. Attackers leverage XPath evaluation errors (EXTRACTVALUE / UPDATEXML) to exfiltrate database version, schema names, and tables.',
        };
      }

      return {
        triggered: true,
        type: 'syntax',
        code: '1064 (42000)',
        title: 'SQL Syntax Error Disclosed',
        rawError: `[MySQL 8.0 Error 1064 (42000)]: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '${trimmed.replace(/'/g, "\\'")}%' AND activeStatus = 1' at line 1`,
        query: `SELECT * FROM faqs WHERE activeStatus = 1 AND question LIKE '%${trimmed}%'`,
        explanation:
          'Vulnerable Demo: Unsanitized user input broke out of the SQL string literal, causing a syntax exception that was returned to the client. This discloses database engine type, version, and internal query syntax.',
      };
    }

    // Secure Demo Mode
    return {
      triggered: true,
      secure: true,
      title: 'Parameterized Query (Safe Handling)',
      status: '200 OK — Prepared Statement Bound',
      query: `SELECT * FROM faqs WHERE activeStatus = 1 AND question LIKE ? [Binding: '%${trimmed}%']`,
      explanation:
        'Secure Demo: The backend executes queries strictly with parameterized prepared statements. Special characters like quotes are treated as literal text data rather than executable code, preventing query breakout and withholding raw database error messages.',
    };
  }, [activeDemo, errorDemoMode, searchQuery]);

  // Filter FAQs based on active demo or standard search
  const filteredFaqs = useMemo(() => {
    // 1. Boolean-Based Blind Demo
    if (activeDemo === 'boolean-based') {
      // Determine if the scenario is TRUE or FALSE
      const isFalse =
        booleanScenario === 'false' ||
        searchQuery.includes('1=2') ||
        searchQuery.toLowerCase().includes('and false');

      if (isFalse) {
        // FALSE condition yields 0 records (empty set)
        return [];
      }

      // TRUE condition: returns matching records for base keyword (or initial set)
      const baseTerm = searchQuery.split("'")[0]?.trim() || '';
      if (!baseTerm) return faqs;

      const q = baseTerm.toLowerCase();
      const matches = faqs.filter(
        (faq) =>
          faq.question?.toLowerCase().includes(q) ||
          faq.answer?.toLowerCase().includes(q) ||
          faq.category?.toLowerCase().includes(q)
      );
      return matches.length > 0 ? matches : faqs;
    }

    // 2. Error-Based Demo in Vulnerable mode with error triggered
    if (activeDemo === 'error-based' && errorDemoMode === 'vulnerable' && errorDetails?.triggered) {
      // Database query failed with exception; no rows returned
      return [];
    }

    // 3. Standard Search Mode (or Secure Error Demo Mode)
    const q = searchQuery.toLowerCase().trim();
    if (!q) return faqs;

    return faqs.filter((faq) => {
      return (
        faq.question?.toLowerCase().includes(q) ||
        faq.answer?.toLowerCase().includes(q) ||
        faq.category?.toLowerCase().includes(q)
      );
    });
  }, [faqs, searchQuery, activeDemo, booleanScenario, errorDemoMode, errorDetails]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handleSelectDemo = (demoType) => {
    if (activeDemo === demoType) {
      // Deselect and reset to normal search
      setActiveDemo(null);
      setSearchQuery('');
    } else {
      setActiveDemo(demoType);
      if (demoType === 'error-based') {
        setSearchQuery("'");
        setErrorDemoMode('vulnerable');
      } else if (demoType === 'boolean-based') {
        setSearchQuery("cyber' AND 1=1--");
        setBooleanScenario('true');
      }
    }
  };

  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-24 relative overflow-hidden min-h-screen">
      {/* 3D Question Mark Background Animation only */}
      <FAQBackground />

      {/* ── HEADER: Centered Title, Subtitle, Demo Selectors & Search Bar ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 relative z-10 text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyber-neonGreen/30 text-cyber-neonGreen text-xs sm:text-sm font-mono shadow-[0_0_15px_rgba(0,245,160,0.15)]">
            <HelpCircle className="w-4 h-4" />
            <span>KNOWLEDGE BASE &amp; CYBER RANGE GUIDANCE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-cyber-text tracking-tight">
            Frequently Asked <br className="hidden sm:inline" />
            <span className="text-gradient-green">Questions</span>
          </h1>

          <p className="text-base sm:text-lg text-cyber-muted max-w-2xl mx-auto leading-relaxed">
            Find instant answers regarding NERDS LAB training curriculums, practical virtual labs, certifications, batch formats, and career placement support.
          </p>

          {/* ── TWO SIMPLE RECTANGULAR CARDS ABOVE THE FAQ SEARCH BOX ── */}
          <div className="pt-4 max-w-2xl mx-auto px-4 sm:px-0 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyber-dim">
                SQL Injection Demonstration Modes
              </span>
              {activeDemo && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveDemo(null);
                    setSearchQuery('');
                  }}
                  className="flex items-center space-x-1 text-xs font-mono text-cyber-neonGreen hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Exit Demo / Standard Search</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {/* Card 1: Error-Based SQL Injection */}
              <div
                onClick={() => handleSelectDemo('error-based')}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 relative overflow-hidden select-none ${
                  activeDemo === 'error-based'
                    ? 'bg-cyber-card/95 border-cyber-neonGreen shadow-[0_0_20px_rgba(0,245,160,0.2)] scale-[1.01]'
                    : 'bg-cyber-card/75 border-cyber-border/80 hover:border-cyber-neonGreen/40 hover:bg-cyber-card/90'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`p-1.5 rounded-lg ${
                        activeDemo === 'error-based'
                          ? 'bg-cyber-neonGreen/20 text-cyber-neonGreen'
                          : 'bg-cyber-surface text-cyber-muted'
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-cyber-neonGreen/90 bg-cyber-neonGreen/10 px-2 py-0.5 rounded border border-cyber-neonGreen/20">
                      Demonstration 1
                    </span>
                  </div>
                  <span
                    className={`text-xs font-mono font-bold ${
                      activeDemo === 'error-based' ? 'text-cyber-neonGreen' : 'text-cyber-dim'
                    }`}
                  >
                    {activeDemo === 'error-based' ? '● ACTIVE' : 'SELECT'}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-cyber-text mt-2.5">
                  Error-Based SQL Injection
                </h3>
                <p className="text-sm text-cyber-muted mt-1 leading-snug">
                  Demonstrates how unhandled database exceptions expose SQL syntax and engine error messages to users.
                </p>
              </div>

              {/* Card 2: Boolean-Based Blind SQL Injection */}
              <div
                onClick={() => handleSelectDemo('boolean-based')}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 relative overflow-hidden select-none ${
                  activeDemo === 'boolean-based'
                    ? 'bg-cyber-card/95 border-cyber-teal shadow-[0_0_20px_rgba(0,210,255,0.2)] scale-[1.01]'
                    : 'bg-cyber-card/75 border-cyber-border/80 hover:border-cyber-teal/40 hover:bg-cyber-card/90'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`p-1.5 rounded-lg ${
                        activeDemo === 'boolean-based'
                          ? 'bg-cyber-teal/20 text-cyber-teal'
                          : 'bg-cyber-surface text-cyber-muted'
                      }`}
                    >
                      <Binary className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-cyber-teal/90 bg-cyber-teal/10 px-2 py-0.5 rounded border border-cyber-teal/20">
                      Demonstration 2
                    </span>
                  </div>
                  <span
                    className={`text-xs font-mono font-bold ${
                      activeDemo === 'boolean-based' ? 'text-cyber-teal' : 'text-cyber-dim'
                    }`}
                  >
                    {activeDemo === 'boolean-based' ? '● ACTIVE' : 'SELECT'}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-cyber-text mt-2.5">
                  Boolean-Based Blind SQL Injection
                </h3>
                <p className="text-sm text-cyber-muted mt-1 leading-snug">
                  Demonstrates how application output toggles between TRUE and FALSE conditions to infer database state.
                </p>
              </div>
            </div>

            {/* ── CONTEXTUAL DEMO CONTROLS ── */}
            {activeDemo === 'error-based' && (
              <div className="p-4 mb-3 rounded-xl bg-cyber-card/90 border border-cyber-neonGreen/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-mono font-bold text-cyber-text flex items-center space-x-1.5">
                    <Terminal className="w-4 h-4 text-cyber-neonGreen" />
                    <span>Error-Based Mode:</span>
                  </span>
                  <div className="inline-flex rounded-lg border border-cyber-border p-0.5 bg-cyber-surface text-xs sm:text-sm font-mono">
                    <button
                      type="button"
                      onClick={() => setErrorDemoMode('vulnerable')}
                      className={`px-3 py-1 rounded-md transition-all ${
                        errorDemoMode === 'vulnerable'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30 font-bold'
                          : 'text-cyber-muted hover:text-cyber-text'
                      }`}
                    >
                      Vulnerable Demo
                    </button>
                    <button
                      type="button"
                      onClick={() => setErrorDemoMode('secure')}
                      className={`px-3 py-1 rounded-md transition-all ${
                        errorDemoMode === 'secure'
                          ? 'bg-cyber-neonGreen/20 text-cyber-neonGreen border border-cyber-neonGreen/30 font-bold'
                          : 'text-cyber-muted hover:text-cyber-text'
                      }`}
                    >
                      Secure Demo
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                  <span className="text-cyber-dim">Quick Test Inputs:</span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("'")}
                    className="px-2.5 py-1 rounded bg-cyber-surface border border-cyber-border/70 hover:border-cyber-neonGreen text-cyber-text transition-colors"
                  >
                    ' (Syntax Error)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("' AND EXTRACTVALUE(1, CONCAT(0x7e, @@version))--")}
                    className="px-2.5 py-1 rounded bg-cyber-surface border border-cyber-border/70 hover:border-cyber-neonGreen text-cyber-text transition-colors"
                  >
                    XPath Version Probe
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('training')}
                    className="px-2.5 py-1 rounded bg-cyber-surface border border-cyber-border/70 hover:border-cyber-neonGreen text-cyber-text transition-colors"
                  >
                    Normal Text
                  </button>
                </div>
              </div>
            )}

            {activeDemo === 'boolean-based' && (
              <div className="p-4 mb-3 rounded-xl bg-cyber-card/90 border border-cyber-teal/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-mono font-bold text-cyber-text flex items-center space-x-1.5">
                    <Binary className="w-4 h-4 text-cyber-teal" />
                    <span>Predetermined Scenarios:</span>
                  </span>
                  <div className="inline-flex rounded-lg border border-cyber-border p-0.5 bg-cyber-surface text-xs sm:text-sm font-mono">
                    <button
                      type="button"
                      onClick={() => {
                        setBooleanScenario('true');
                        setSearchQuery("cyber' AND 1=1--");
                      }}
                      className={`px-3 py-1 rounded-md transition-all flex items-center space-x-1 ${
                        booleanScenario === 'true'
                          ? 'bg-cyber-neonGreen/20 text-cyber-neonGreen border border-cyber-neonGreen/30 font-bold'
                          : 'text-cyber-muted hover:text-cyber-text'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Test TRUE (1=1)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBooleanScenario('false');
                        setSearchQuery("cyber' AND 1=2--");
                      }}
                      className={`px-3 py-1 rounded-md transition-all flex items-center space-x-1 ${
                        booleanScenario === 'false'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30 font-bold'
                          : 'text-cyber-muted hover:text-cyber-text'
                      }`}
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Test FALSE (1=2)</span>
                    </button>
                  </div>
                </div>

                <div className="text-xs sm:text-sm font-mono text-cyber-muted">
                  {booleanScenario === 'true' ? (
                    <span className="text-cyber-neonGreen font-semibold">
                      🟢 Condition 1=1 is TRUE: Query succeeds and displays matching FAQ entries.
                    </span>
                  ) : (
                    <span className="text-red-400 font-semibold">
                      🔴 Condition 1=2 is FALSE: Query fails and yields 0 rows (empty search state).
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── EXISTING FULL-WIDTH SEARCH BAR (PRESERVED & INTEGRATED) ── */}
          <div className="pt-1 max-w-2xl mx-auto px-4 sm:px-0">
            <div className="relative flex items-center w-full">
              <Search className="w-5 h-5 text-cyber-dim absolute left-4 pointer-events-none z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  activeDemo === 'error-based'
                    ? "Enter test input (e.g. ' or ' AND EXTRACTVALUE(1, CONCAT(0x7e, @@version))--)..."
                    : activeDemo === 'boolean-based'
                    ? "Test TRUE / FALSE conditions (e.g. cyber' AND 1=1-- or cyber' AND 1=2--)..."
                    : 'Search FAQs by question, topic, or keyword (e.g. labs, certification, beginner)...'
                }
                className={`w-full pl-12 pr-11 py-3.5 rounded-xl bg-cyber-card/90 border outline-none text-sm sm:text-base text-cyber-text placeholder:text-cyber-dim font-mono transition-colors shadow-inner ${
                  activeDemo === 'error-based'
                    ? 'border-cyber-neonGreen/70 focus:border-cyber-neonGreen'
                    : activeDemo === 'boolean-based'
                    ? 'border-cyber-teal/70 focus:border-cyber-teal'
                    : 'border-cyber-border focus:border-cyber-neonGreen'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-cyber-dim hover:text-cyber-text text-sm p-1 z-10"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* ── SIMULATION RESPONSE BANNER FOR DEMONSTRATIONS ── */}
          {activeDemo === 'error-based' && errorDetails && (
            <div className="max-w-2xl mx-auto px-4 sm:px-0 pt-2 text-left">
              {errorDetails.triggered ? (
                errorDetails.secure ? (
                  <div className="p-4 rounded-xl border border-cyber-neonGreen/40 bg-cyber-surface/90 space-y-2.5">
                    <div className="flex items-center space-x-2 text-sm font-mono font-bold text-cyber-neonGreen">
                      <ShieldCheck className="w-4 h-4 text-cyber-neonGreen shrink-0" />
                      <span>{errorDetails.title}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded bg-cyber-neonGreen/10 border border-cyber-neonGreen/20">
                        {errorDetails.status}
                      </span>
                    </div>
                    <pre className="text-xs sm:text-sm font-mono text-cyber-muted bg-black/50 p-3 rounded-lg overflow-x-auto border border-cyber-border/40">
                      <code>{errorDetails.query}</code>
                    </pre>
                    <p className="text-sm text-cyber-muted leading-relaxed font-sans">
                      {errorDetails.explanation}
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-red-500/40 bg-red-950/20 space-y-2.5">
                    <div className="flex items-center space-x-2 text-sm font-mono font-bold text-red-400">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorDetails.title}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded bg-red-500/20 border border-red-500/30">
                        Error {errorDetails.code}
                      </span>
                    </div>
                    <pre className="text-xs sm:text-sm font-mono text-red-300 bg-black/60 p-3 rounded-lg overflow-x-auto border border-red-500/30">
                      <code>{errorDetails.rawError}</code>
                    </pre>
                    <p className="text-sm text-cyber-muted leading-relaxed font-sans">
                      {errorDetails.explanation}
                    </p>
                  </div>
                )
              ) : (
                <div className="p-3.5 rounded-lg bg-cyber-card/60 border border-cyber-border text-sm font-mono text-cyber-muted flex items-center space-x-2">
                  <Info className="w-4 h-4 text-cyber-neonGreen shrink-0" />
                  <span>
                    Enter a single quote (<span className="text-cyber-neonGreen font-bold">'</span>) or select an XPath probe above to trigger the simulated database exception disclosure.
                  </span>
                </div>
              )}
            </div>
          )}

          {activeDemo === 'boolean-based' && (
            <div className="max-w-2xl mx-auto px-4 sm:px-0 pt-2 text-left">
              <div className="p-4 rounded-xl border border-cyber-teal/40 bg-cyber-surface/90 space-y-2.5">
                <div className="flex items-center justify-between text-sm font-mono font-bold">
                  <span className="flex items-center space-x-2 text-cyber-teal">
                    <Binary className="w-4 h-4 shrink-0" />
                    <span>
                      Condition Evaluated:{' '}
                      <strong className={booleanScenario === 'true' ? 'text-cyber-neonGreen' : 'text-red-400'}>
                        {booleanScenario === 'true' ? 'TRUE (1=1)' : 'FALSE (1=2)'}
                      </strong>
                    </span>
                  </span>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded border ${
                      booleanScenario === 'true'
                        ? 'bg-cyber-neonGreen/10 border-cyber-neonGreen/30 text-cyber-neonGreen'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}
                  >
                    {booleanScenario === 'true'
                      ? `${filteredFaqs.length} FAQs Displayed`
                      : '0 FAQs (Empty State)'}
                  </span>
                </div>

                <p className="text-sm text-cyber-muted leading-relaxed font-sans">
                  {booleanScenario === 'true' ? (
                    <>
                      <strong className="text-cyber-text">How it works:</strong> The injected expression{' '}
                      <code className="text-cyber-neonGreen bg-black/40 px-1 py-0.5 rounded font-mono">
                        AND 1=1
                      </code>{' '}
                      evaluates to <strong className="text-cyber-neonGreen">TRUE</strong>. The database returns all
                      matching FAQ rows, signaling to the tester that the logical proposition was valid.
                    </>
                  ) : (
                    <>
                      <strong className="text-cyber-text">How it works:</strong> The injected expression{' '}
                      <code className="text-red-400 bg-black/40 px-1 py-0.5 rounded font-mono">
                        AND 1=2
                      </code>{' '}
                      evaluates to <strong className="text-red-400">FALSE</strong>. Because the WHERE clause fails,
                      zero rows match and the application renders an empty state.
                    </>
                  )}
                </p>

                <div className="pt-1 text-xs font-mono text-cyber-dim border-t border-cyber-border/40 flex items-center justify-between">
                  <span>Inference: Observation of content presence vs. absence</span>
                  <span className="text-cyber-teal font-semibold">Bit-by-Bit Data Exfiltration</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── CENTERED FAQ ACCORDIONS (PRESERVED ACCORDION LAYOUT & COLOR SYSTEM) ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3.5">
        {loading ? (
          <div className="py-14 px-6 rounded-2xl glass-panel border border-cyber-border/70 text-center space-y-3">
            <div className="w-8 h-8 mx-auto border-2 border-cyber-neonGreen border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-mono text-cyber-muted">Connecting to MySQL database &amp; loading FAQs...</p>
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="py-14 px-6 rounded-2xl glass-panel border border-cyber-border/70 text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-cyber-muted mx-auto" />
            <p className="text-lg font-mono text-cyber-text">
              {activeDemo === 'boolean-based' && booleanScenario === 'false'
                ? 'No FAQ entries match the evaluated FALSE condition.'
                : activeDemo === 'error-based' && errorDetails?.triggered && errorDemoMode === 'vulnerable'
                ? 'Query aborted due to unhandled database syntax error.'
                : 'No FAQ entries match your query.'}
            </p>
            <p className="text-sm text-cyber-muted">
              {activeDemo === 'boolean-based' && booleanScenario === 'false'
                ? 'In Blind SQLi, this absence of data signals that the boolean condition evaluated to FALSE.'
                : 'Try typing a different keyword or clear the search input.'}
            </p>
            <button
              type="button"
              onClick={() => {
                if (activeDemo === 'boolean-based') {
                  setBooleanScenario('true');
                  setSearchQuery("cyber' AND 1=1--");
                } else {
                  setSearchQuery('');
                }
              }}
              className="px-5 py-2.5 rounded-xl text-sm font-mono font-bold text-black bg-cyber-neonGreen hover:bg-cyber-teal transition-all"
            >
              {activeDemo === 'boolean-based' && booleanScenario === 'false'
                ? 'Switch to TRUE Condition'
                : 'Clear Search'}
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq._id || faq.id || idx}
                className={`rounded-2xl glass-panel border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-cyber-neonGreen/60 bg-cyber-card/95 shadow-[0_0_20px_rgba(0,245,160,0.12)]'
                    : 'border-cyber-border/80 bg-cyber-card/75 hover:border-cyber-border hover:bg-cyber-card/90'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between space-x-3 sm:space-x-4 transition-colors group"
                >
                  <div className="flex items-start sm:items-center space-x-3">
                    <span
                      className={`w-2.5 h-2.5 rounded-full mt-1.5 sm:mt-0 shrink-0 transition-all ${
                        isOpen
                          ? 'bg-cyber-neonGreen shadow-[0_0_10px_rgba(0,245,160,0.9)] scale-110'
                          : 'bg-cyber-dim group-hover:bg-cyber-neonGreen/60'
                      }`}
                    />
                    <div>
                      {faq.category && (
                        <span className="inline-block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-cyber-neonGreen/80 bg-cyber-neonGreen/10 border border-cyber-neonGreen/20 px-2 py-0.5 rounded mb-1.5">
                          {faq.category}
                        </span>
                      )}
                      <h2 className="text-base sm:text-lg font-display font-bold text-cyber-text group-hover:text-cyber-neonGreen transition-colors leading-snug">
                        {faq.question}
                      </h2>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-cyber-muted shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-cyber-neonGreen' : 'group-hover:text-cyber-text'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1.5 border-t border-cyber-border/40 text-sm sm:text-base text-cyber-muted leading-relaxed font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
