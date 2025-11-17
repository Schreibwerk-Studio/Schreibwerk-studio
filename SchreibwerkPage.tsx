import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  PenTool,
  Clock,
  ArrowRight,
  BookOpenText,
  GraduationCap,
  LayoutTemplate,
} from "lucide-react";

// Smooth scroll
const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Animation helper
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

/* -------------------------------------------------------------------------- */
/*                                   CONTACT                                   */
/* -------------------------------------------------------------------------- */

function ContactView({ onBack }: any) {
  const [status, setStatus] = React.useState("idle");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setStatus("sending");

    const data = new FormData(e.target);

    try {
      const res = await fetch("https://formspree.io/f/mzzyjrjz", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-16 text-slate-800">
      <button
        onClick={onBack}
        className="mb-6 rounded-full border px-4 py-2 text-sm hover:bg-slate-100"
      >
        ← Zurück zur Website
      </button>

      <h1 className="text-3xl font-semibold mb-4">Kontakt</h1>
      <p className="text-slate-600 mb-8">
        Schreib mir kurz, wobei ich dich unterstützen kann.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            name="name"
            required
            className="w-full rounded-xl border px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">E-Mail</label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-xl border px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Nachricht</label>
          <textarea
            name="message"
            rows={6}
            required
            className="w-full rounded-xl border px-4 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-slate-900 text-white px-6 py-3 hover:bg-black"
        >
          {status === "sending" ? "Wird gesendet…" : "Absenden"}
        </button>

        {status === "success" && (
          <p className="text-green-700 bg-green-100 p-3 rounded-xl">
            Danke! Deine Nachricht wurde gesendet.
          </p>
        )}

        {status === "error" && (
          <p className="text-red-700 bg-red-100 p-3 rounded-xl">
            Fehler – schreib direkt an{" "}
            <a href="mailto:max@schreibwerk-studio.de" className="underline">
              max@schreibwerk-studio.de
            </a>
          </p>
        )}
      </form>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 IMPRESSUM                                  */
/* -------------------------------------------------------------------------- */

function Impressum({ onBack }: any) {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 text-slate-800 leading-relaxed">
      <button
        onClick={onBack}
        className="mb-6 rounded-full border px-4 py-2 text-sm hover:bg-slate-100"
      >
        ← Zurück zur Website
      </button>

      <h1 className="text-3xl font-semibold mb-4">Impressum</h1>

      <p>Angaben gemäß § 5 TMG:</p>

      <p className="mt-4">
        Max Pehlivan <br />
        Musterstraße 12 <br />
        12345 Musterstadt
      </p>

      <p className="mt-4">
        E-Mail:{" "}
        <a href="mailto:max@schreibwerk-studio.de" className="underline">
          max@schreibwerk-studio.de
        </a>
      </p>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                               DATENSCHUTZ                                  */
/* -------------------------------------------------------------------------- */

function Datenschutz({ onBack }: any) {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 text-slate-800 leading-relaxed">
      <button
        onClick={onBack}
        className="mb-6 rounded-full border px-4 py-2 text-sm hover:bg-slate-100"
      >
        ← Zurück zur Website
      </button>

      <h1 className="text-3xl font-semibold mb-4">Datenschutzerklärung</h1>

      <p>
        Diese Website verarbeitet personenbezogene Daten ausschließlich zur
        Beantwortung von Kontaktanfragen über das Formular.
      </p>

      <p className="mt-4">
        Eine Speicherung erfolgt nur so lange, wie die Bearbeitung der Anfrage
        notwendig ist.
      </p>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 MAIN PAGE                                  */
/* -------------------------------------------------------------------------- */

export default function SchreibwerkPage() {
  const [view, setView] = React.useState("home");

  if (view === "kontakt") return <ContactView onBack={() => setView("home")} />;
  if (view === "impressum")
    return <Impressum onBack={() => setView("home")} />;
  if (view === "datenschutz")
    return <Datenschutz onBack={() => setView("home")} />;

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* NAVIGATION */}
      <header className="sticky top-0 bg-white/70 backdrop-blur border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => scrollToId("top")}
            className="rounded-full border px-4 py-1 text-sm hover:bg-slate-100"
          >
            Schreibwerk-Studio
          </button>

          <nav className="hidden md:flex gap-8 text-sm">
            <button
              onClick={() => scrollToId("problem")}
              className="hover:text-slate-900 text-slate-600"
            >
              Problem → Lösung
            </button>
            <button
              onClick={() => scrollToId("angebot")}
              className="hover:text-slate-900 text-slate-600"
            >
              Angebot
            </button>
            <button
              onClick={() => scrollToId("prozess")}
              className="hover:text-slate-900 text-slate-600"
            >
              Prozess
            </button>
            <button
              onClick={() => scrollToId("ueber-mich")}
              className="hover:text-slate-900 text-slate-600"
            >
              Über mich
            </button>

            <button
              onClick={() => setView("kontakt")}
              className="rounded-full bg-slate-900 text-white px-5 py-2 hover:bg-black"
            >
              Kontakt
            </button>
          </nav>
        </div>
      </header>

      <div id="top" />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.h1
          {...fadeUp(0)}
          className="text-5xl md:text-7xl font-extrabold tracking-tight"
        >
          Schreibwerk-Studio
        </motion.h1>

        <motion.p
          {...fadeUp(0.1)}
          className="text-xl text-slate-600 max-w-xl mt-4"
        >
          Premium 1:1-Coaching für wissenschaftliches Schreiben – mit Struktur,
          Klarheit und systemischem Ansatz.
        </motion.p>

        <motion.div {...fadeUp(0.2)} className="mt-10 flex gap-4">
          <button
            onClick={() => setView("kontakt")}
            className="rounded-full bg-slate-900 text-white px-8 py-3 hover:bg-black"
          >
            Erstgespräch <ArrowRight className="inline-block ml-2" size={16} />
          </button>

          <button
            onClick={() => scrollToId("angebot")}
            className="rounded-full border px-8 py-3 hover:bg-slate-100"
          >
            Angebot ansehen
          </button>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10 text-center text-sm text-slate-500">
        <button onClick={() => setView("impressum")}>Impressum</button> ·{" "}
        <button onClick={() => setView("datenschutz")}>Datenschutz</button>
      </footer>
    </div>
  );
}
