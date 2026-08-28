"use client";

import { useEffect, useState } from "react";
import { CONTACT_WA } from "./site-config";

function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
    >
      <path
        fill="currentColor"
        d="M16.03 3C8.85 3 3 8.72 3 15.75c0 2.47.73 4.87 2.12 6.92L3.73 27.7l5.2-1.34a13.2 13.2 0 0 0 7.09 2.07h.01C23.21 28.43 29 22.72 29 15.7 29 8.7 23.2 3 16.03 3Zm0 23.28h-.01a11.06 11.06 0 0 1-5.64-1.54l-.4-.23-3.08.8.82-3-.26-.42a10.44 10.44 0 0 1-1.66-5.63c0-5.83 4.86-10.58 10.84-10.58 5.97 0 10.83 4.74 10.83 10.58 0 5.83-4.86 10.57-10.84 10.57Zm5.94-7.91c-.32-.16-1.92-.92-2.22-1.03-.3-.1-.51-.16-.73.16-.21.31-.84 1.03-1.03 1.24-.19.21-.38.24-.7.08-.33-.16-1.37-.49-2.62-1.57a9.7 9.7 0 0 1-1.81-2.2c-.19-.32-.02-.49.14-.65.15-.14.33-.37.49-.56.16-.18.22-.31.33-.52.1-.21.05-.39-.03-.55-.08-.16-.73-1.71-1-2.34-.26-.62-.53-.54-.73-.55h-.62c-.22 0-.57.08-.87.39-.3.31-1.14 1.08-1.14 2.64 0 1.55 1.17 3.06 1.33 3.27.16.21 2.3 3.43 5.57 4.81.78.33 1.39.53 1.86.68.78.24 1.49.21 2.05.13.63-.09 1.92-.77 2.19-1.51.27-.75.27-1.39.19-1.52-.08-.13-.3-.21-.62-.37Z"
      />
    </svg>
  );
}

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="wa-widget" aria-live="polite">
      {open ? (
        <section className="wa-panel" aria-label="Chat WhatsApp ANEXSO Joe Coffee">
          <div className="wa-panel-head">
            <div>
              <strong>ANEXSO | JOE COFFEE</strong>
              <span><i /> Online</span>
            </div>
            <button
              type="button"
              className="wa-close"
              aria-label="Tutup kotak WhatsApp"
              title="Tutup"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="wa-panel-body">
            <div className="wa-message">
              <p>Halo 👋</p>
              <p>Ada yang bisa kami bantu?</p>
            </div>
            <a
              className="wa-chat-button"
              href={CONTACT_WA}
              target="_blank"
              rel="noreferrer"
              aria-label="Bicara dengan ANEXSO Joe Coffee di WhatsApp"
            >
              <WhatsAppIcon size={23} />
              <span>Bicara di WhatsApp</span>
            </a>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        className="wa-fab"
        aria-label={open ? "Tutup chat WhatsApp" : "Buka chat WhatsApp"}
        title="WhatsApp"
        onClick={() => setOpen((current) => !current)}
      >
        <WhatsAppIcon size={30} />
      </button>

      <style jsx>{`
        .wa-widget {
          position: fixed;
          right: 22px;
          bottom: 22px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          pointer-events: none;
        }
        .wa-panel,
        .wa-fab {
          pointer-events: auto;
        }
        .wa-panel {
          width: min(370px, calc(100vw - 32px));
          overflow: hidden;
          border-radius: 18px;
          background: #fff;
          box-shadow: 0 18px 55px rgba(0, 0, 0, .25);
          animation: wa-pop .24s ease-out;
        }
        .wa-panel-head {
          min-height: 94px;
          padding: 20px 22px;
          color: #fff;
          background: linear-gradient(135deg, #151a17 0%, #213a2d 100%);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
        }
        .wa-panel-head strong {
          display: block;
          font-size: 16px;
          line-height: 1.35;
          letter-spacing: .01em;
        }
        .wa-panel-head span {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 6px;
          font-size: 13px;
          opacity: .9;
        }
        .wa-panel-head i {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #25d366;
          box-shadow: 0 0 0 3px rgba(37, 211, 102, .16);
        }
        .wa-close {
          border: 0;
          background: transparent;
          color: rgba(255,255,255,.74);
          font: inherit;
          font-size: 27px;
          line-height: 1;
          cursor: pointer;
          padding: 0 2px;
          transition: color .18s ease, transform .18s ease;
        }
        .wa-close:hover {
          color: #fff;
          transform: scale(1.08);
        }
        .wa-panel-body {
          padding: 22px;
          background: #f8f5ef;
        }
        .wa-message {
          position: relative;
          padding: 14px 16px;
          border-radius: 4px 14px 14px 14px;
          background: #fff;
          box-shadow: 0 5px 18px rgba(0,0,0,.07);
          color: #302d29;
        }
        .wa-message::before {
          content: "";
          position: absolute;
          top: 0;
          left: -8px;
          border-top: 9px solid #fff;
          border-left: 9px solid transparent;
        }
        .wa-message p {
          margin: 0;
          font-size: 15px;
          line-height: 1.55;
        }
        .wa-message p + p {
          margin-top: 8px;
        }
        .wa-chat-button {
          margin-top: 18px;
          min-height: 48px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          background: #25d366;
          color: #fff;
          text-decoration: none;
          font-size: 15px;
          font-weight: 800;
          box-shadow: 0 8px 22px rgba(37, 211, 102, .24);
          transition: transform .18s ease, background .18s ease;
        }
        .wa-chat-button:hover {
          background: #1fbd59;
          transform: translateY(-1px);
        }
        .wa-fab {
          width: 58px;
          height: 58px;
          border: 0;
          border-radius: 999px;
          display: grid;
          place-items: center;
          background: #25d366;
          color: #fff;
          cursor: pointer;
          box-shadow: 0 10px 26px rgba(0,0,0,.22);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .wa-fab:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 14px 30px rgba(0,0,0,.25);
        }
        @keyframes wa-pop {
          from { opacity: 0; transform: translateY(10px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 640px) {
          .wa-widget {
            right: 14px;
            bottom: 14px;
          }
          .wa-panel {
            width: min(350px, calc(100vw - 28px));
          }
          .wa-panel-head {
            min-height: 82px;
            padding: 17px 18px;
          }
          .wa-panel-body {
            padding: 18px;
          }
          .wa-fab {
            width: 54px;
            height: 54px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .wa-panel { animation: none; }
          .wa-close, .wa-chat-button, .wa-fab { transition: none; }
        }
      `}</style>
    </div>
  );
}
