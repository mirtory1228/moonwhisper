'use client';
// Interactive Life Path calculator: birth date → Life Path number → meaning
// + transparent math + internal link to the matching Angel Number guide.
// Drives dwell time and cross-links our numerology content.
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { calcLifePath, LIFE_PATHS, MONTHS } from '@/lib/numerology';

const YEAR_NOW = 2026;

export default function NumerologyCalc() {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const valid = useMemo(() => {
    const m = Number(month), d = Number(day), y = Number(year);
    if (!m || !d || !y) return false;
    if (m < 1 || m > 12) return false;
    if (d < 1 || d > 31) return false;
    if (y < 1900 || y > YEAR_NOW) return false;
    return true;
  }, [month, day, year]);

  const result = useMemo(() => {
    if (!submitted || !valid) return null;
    const { number, steps } = calcLifePath(Number(year), Number(month), Number(day));
    return { number, steps, data: LIFE_PATHS[number] };
  }, [submitted, valid, year, month, day]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (valid) setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setMonth(''); setDay(''); setYear('');
  };

  return (
    <div className="numo-tool">
      <form className="numo-form" onSubmit={onSubmit}>
        <div className="numo-fields">
          <label className="numo-field">
            <span>Month</span>
            <select value={month} onChange={(e) => setMonth(e.target.value)} aria-label="Birth month">
              <option value="">—</option>
              {MONTHS.map((name, i) => (
                <option key={name} value={i + 1}>{name}</option>
              ))}
            </select>
          </label>
          <label className="numo-field">
            <span>Day</span>
            <input inputMode="numeric" pattern="[0-9]*" placeholder="DD" maxLength={2}
              value={day} onChange={(e) => setDay(e.target.value.replace(/[^0-9]/g, ''))} aria-label="Birth day" />
          </label>
          <label className="numo-field">
            <span>Year</span>
            <input inputMode="numeric" pattern="[0-9]*" placeholder="YYYY" maxLength={4}
              value={year} onChange={(e) => setYear(e.target.value.replace(/[^0-9]/g, ''))} aria-label="Birth year" />
          </label>
        </div>
        <button type="submit" className="numo-btn" disabled={!valid}>
          Calculate my Life Path →
        </button>
      </form>

      {result && result.data && (
        <div className="numo-result">
          <div className="numo-badge">
            <span className="numo-num">{result.number}</span>
            <span className="numo-label">Life Path {result.number}</span>
          </div>

          <h2 className="numo-title">
            {result.data.title}
            <em>{result.data.aka}</em>
          </h2>

          <div className="numo-keywords">
            {result.data.keywords.map((k) => (
              <span key={k} className="numo-kw">{k}</span>
            ))}
          </div>

          <p className="numo-summary">{result.data.summary}</p>

          <div className="numo-cols">
            <div className="numo-col">
              <h3>Your strengths</h3>
              <p>{result.data.strengths}</p>
            </div>
            <div className="numo-col">
              <h3>Your growth edge</h3>
              <p>{result.data.challenge}</p>
            </div>
          </div>

          <div className="numo-math">
            <span className="numo-math-label">How we got {result.number}</span>
            <code>
              Month {result.steps.month.raw} → {result.steps.month.reduced}
              {'  ·  '}
              Day {result.steps.day.raw} → {result.steps.day.reduced}
              {'  ·  '}
              Year {result.steps.year.raw} → {result.steps.year.reduced}
              {'  =  '}
              {result.steps.month.reduced}+{result.steps.day.reduced}+{result.steps.year.reduced} = {result.steps.sum} → <b>{result.number}</b>
            </code>
          </div>

          {result.data.relates && (
            <Link href={`/posts/angel-number-${result.data.relates.number}`} className="numo-relate">
              <span className="numo-relate-num">{result.data.relates.number}</span>
              <span className="numo-relate-text">
                <strong>Your number often shows up as Angel Number {result.data.relates.number}</strong>
                <em>Read what it means — {result.data.relates.why} →</em>
              </span>
            </Link>
          )}

          <button className="numo-again" onClick={reset}>← Try another date</button>
        </div>
      )}
    </div>
  );
}
