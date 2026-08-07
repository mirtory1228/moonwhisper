'use client';
// Interactive tarot reading: shuffle → fan out 78 face-down cards → the user
// picks 1 (Daily) or 3 (Past/Present/Future) → cards flip to reveal meanings.
// Pure client-side, no backend. On-brand galaxy/gold styling.
import { useState } from 'react';
import { TAROT, drawCards } from '@/lib/tarot';

const LABELS3 = ['Past', 'Present', 'Future'];

export default function TarotReading() {
  const [phase, setPhase] = useState('intro'); // intro | shuffle | spread | reveal
  const [mode, setMode] = useState(1);          // 1 or 3
  const [picked, setPicked] = useState([]);     // chosen fan indices
  const [drawn, setDrawn] = useState([]);       // revealed cards
  const [flipped, setFlipped] = useState([]);   // which reveal cards are face-up

  const N = TAROT.length; // 78

  function start(m) {
    setMode(m); setPicked([]); setDrawn([]); setFlipped([]);
    setPhase('shuffle');
    setTimeout(() => setPhase('spread'), 1700);
  }

  function pick(i) {
    if (picked.includes(i)) return;
    if (picked.length >= mode) return;
    const next = [...picked, i];
    setPicked(next);
    if (next.length === mode) {
      const cards = drawCards(mode);
      setDrawn(cards);
      setTimeout(() => {
        setPhase('reveal');
        // flip cards in one by one
        cards.forEach((_, k) => setTimeout(() => setFlipped((f) => [...f, k]), 350 + k * 550));
      }, 480);
    }
  }

  function reset() { setPhase('intro'); setPicked([]); setDrawn([]); setFlipped([]); }

  function shareText() {
    if (!drawn.length) return '';
    const names = drawn.map((c, k) => `${mode === 3 ? LABELS3[k] + ': ' : ''}${c.name}${c.reversed ? ' (Reversed)' : ''}`).join(' · ');
    return `My tarot pull: ${names}`;
  }

  return (
    <div className="tarot-tool">
      {phase === 'intro' && (
        <div className="tarot-intro">
          <p className="tarot-sub">Take a breath, hold your question in mind, and choose your spread.</p>
          <div className="tarot-modes">
            <button className="tarot-mode-btn" onClick={() => start(1)}>
              <span className="tm-title">Daily Card</span>
              <span className="tm-desc">Pull one card for guidance right now</span>
            </button>
            <button className="tarot-mode-btn" onClick={() => start(3)}>
              <span className="tm-title">Past · Present · Future</span>
              <span className="tm-desc">A three-card story of your situation</span>
            </button>
          </div>
        </div>
      )}

      {phase === 'shuffle' && (
        <div className="tarot-shuffle" aria-label="Shuffling the deck">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="shuffle-card card-back" style={{ animationDelay: `${i * 0.12}s` }} />
          ))}
          <p className="tarot-status">Shuffling the deck…</p>
        </div>
      )}

      {phase === 'spread' && (
        <div className="tarot-spread-wrap">
          <p className="tarot-status">
            {picked.length < mode
              ? `Pick ${mode} card${mode > 1 ? 's' : ''} · ${picked.length}/${mode} chosen`
              : 'Revealing your cards…'}
          </p>
          <div className="tarot-fan" role="group" aria-label="Fanned tarot deck">
            {Array.from({ length: N }).map((_, i) => {
              const angle = (i - (N - 1) / 2) * (150 / (N - 1)); // total ~150° arc
              const sel = picked.includes(i);
              return (
                <button
                  key={i}
                  className={`tarot-card card-back${sel ? ' selected' : ''}`}
                  style={{ transform: `rotate(${angle}deg)`, zIndex: sel ? 200 : i }}
                  onClick={() => pick(i)}
                  aria-label={`Card ${i + 1}`}
                  disabled={picked.length >= mode && !sel}
                />
              );
            })}
          </div>
        </div>
      )}

      {phase === 'reveal' && (
        <div className="tarot-reveal">
          <div className={`reveal-row cards-${mode}`}>
            {drawn.map((c, k) => (
              <div className="reveal-card" key={k}>
                {mode === 3 && <span className="reveal-pos">{LABELS3[k]}</span>}
                <div className={`flip${flipped.includes(k) ? ' flipped' : ''}`}>
                  <div className="flip-inner">
                    <div className="flip-face flip-back card-back" />
                    <div className="flip-face flip-front">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className={`fc-img${c.reversed ? ' reversed' : ''}`}
                        src={c.img}
                        alt={`${c.name} tarot card`}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  </div>
                </div>
                {flipped.includes(k) && (
                  <div className="reveal-info">
                    <span className="fc-arcana">{c.arcana}</span>
                    <span className="fc-name">{c.name}{c.reversed ? ' · Reversed' : ''}</span>
                    <span className="fc-kw">{c.reversed ? c.revKw : c.upKw}</span>
                    <p className="reveal-meaning">{c.reversed ? c.rev : c.up}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {flipped.length === mode && (
            <div className="tarot-actions">
              <button className="tarot-again" onClick={reset}>↺ Draw again</button>
              <a
                className="tarot-share"
                href={`https://www.pinterest.com/pin/create/button/?description=${encodeURIComponent(shareText())}`}
                target="_blank" rel="noopener noreferrer"
              >Share on Pinterest</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
