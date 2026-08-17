"use client";

import { useEffect, useRef, useState } from "react";

const AUDIO_SRC = "/mars-kopi-joe.mp3";
const MUSIC_VOLUME = 0.12;

function MusicIcon({ playing }: { playing: boolean }) {
  return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">{playing ? <path d="M8 6v12M16 6v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /> : <><path d="M9 18V6l10-2v12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M6.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM16.5 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="1.7" /></>}</svg>;
}

function ThemeIcon({ dark }: { dark: boolean }) {
  return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">{dark ? <path d="M21 13.2A8.5 8.5 0 0 1 10.8 3 7.5 7.5 0 1 0 21 13.2Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /> : <><path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" strokeWidth="1.7" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.4 1.4M17.6 17.6 19 19M19 5l-1.4 1.4M6.4 17.6 5 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></>}</svg>;
}

export default function SiteControls() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [dark, setDark] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);

  function toggleTheme() {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    try { localStorage.setItem("theme", nextDark ? "dark" : "light"); } catch {}
  }

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = MUSIC_VOLUME;
    setAudioError(false);
    if (!audio.paused) { audio.pause(); setPlaying(false); return; }
    try { await audio.play(); setPlaying(true); } catch { setPlaying(false); setAudioError(true); }
  }

  const buttonClass = "grid h-10 w-10 place-items-center rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] text-[var(--foreground)] shadow-[var(--shadow-soft)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[color:var(--primary)]";

  return <><audio ref={audioRef} src={AUDIO_SRC} preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => { setPlaying(false); setAudioError(true); }} /><div className="fixed bottom-4 right-4 z-[80] flex items-center gap-2 xl:bottom-auto xl:right-[176px] xl:top-[14px]"><button type="button" onClick={toggleMusic} className={buttonClass} aria-label={playing ? "Matikan musik" : "Nyalakan musik"} title={audioError ? "Musik gagal diputar" : playing ? "Matikan musik" : "Nyalakan musik"}><MusicIcon playing={playing} /></button><button type="button" onClick={toggleTheme} className={buttonClass} aria-label={dark ? "Aktifkan mode terang" : "Aktifkan mode gelap"} title={dark ? "Mode terang" : "Mode gelap"}><ThemeIcon dark={dark} /></button></div></>;
}
