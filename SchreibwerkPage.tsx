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
  User,
  Target,
  Calendar,
  Lightbulb,
  ClipboardList,
} from "lucide-react";

/* ============================================================================
   Helper Functions
============================================================================ */

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

/* ============================================================================
   Kontakt-Formular – Formspree
============================================================================ */

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
      } else setStatus("error");
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

/* ============================================================================
   Impressum
============================================================================ */

function Impressum({ onBack }: any) {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 leading-relaxed text-slate-800">
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

/* ============================================================================
   Datenschutz
============================================================================ */

function Datenschutz({ onBack }: any) {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 leading-relaxed text-slate-800">
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

/* ============================================================================
   Hauptseite (ALLE SEKTIONEN VOLLSTÄNDIG)
============================================================================ */

export default function SchreibwerkPage() {
  const [view, setView] = React.useState("home");

  if (view === "kontakt") return <ContactView onBack={() => setView("home")} />;
  if (view === "impressum")
    return <Impressum onBack={() => setView("home")} />;
  if (view === "datenschutz")
    return <Datenschutz onBack={() => setView("home")} />;

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* ------------------------------------------------------------------ */}
      {/* NAVIGATION */}
      {/* ------------------------------------------------------------------ */}

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

      {/* ------------------------------------------------------------------ */}
      {/* HERO */}
      {/* ------------------------------------------------------------------ */}

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

      {/* ------------------------------------------------------------------ */}
      {/* PROBLEM → LÖSUNG */}
      {/* ------------------------------------------------------------------ */}

      <section id="problem" className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            {...fadeUp(0)}
            className="text-3xl font-semibold mb-10 text-center"
          >
            Problem → Lösung
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              {...fadeUp(0.1)}
              className="rounded-2xl p-8 bg-white shadow-sm border"
            >
              <BookOpenText className="w-10 h-10 mb-4 text-slate-700" />
              <h3 className="font-semibold text-lg mb-2">Komplexität</h3>
              <p className="text-slate-600">
                Wissenschaftliches Schreiben ist komplex – ich helfe dir, die
                Struktur zu finden.
              </p>
            </motion.div>

            <motion.div
              {...fadeUp(0.2)}
              className="rounded-2xl p-8 bg-white shadow-sm border"
            >
              <Clock className="w-10 h-10 mb-4 text-slate-700" />
              <h3 className="font-semibold text-lg mb-2">Zeitdruck</h3>
              <p className="text-slate-600">
                Gemeinsam bringen wir Klarheit in dein Vorgehen und nutzen deine
                Zeit effizient.
              </p>
            </motion.div>

            <motion.div
              {...fadeUp(0.3)}
              className="rounded-2xl p-8 bg-white shadow-sm border"
            >
              <CheckCircle2 className="w-10 h-10 mb-4 text-slate-700" />
              <h3 className="font-semibold text-lg mb-2">Struktur</h3>
              <p className="text-slate-600">
                Ich begleite dich dabei, eine klare Argumentation aufzubauen.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* ANGEBOT */}
      {/* ------------------------------------------------------------------ */}

      <section id="angebot" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            {...fadeUp(0)}
            className="text-3xl font-semibold mb-10 text-center"
          >
            Angebot
          </motion.h2>

          <motion.div
            {...fadeUp(0.1)}
            className="max-w-xl mx-auto rounded-2xl border p-10 shadow-sm bg-white"
          >
            <h3 className="text-xl font-semibold mb-4">
              1:1 Coaching – Wissenschaftliches Schreiben
            </h3>

            <p className="text-slate-600 mb-6">
              Individuelle Begleitung beim Schreiben deiner Haus- oder
              Bachelorarbeit. Keine Ghostwriting-Leistungen.
            </p>

            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-2">
                <PenTool className="w-5 h-5" /> Gemeinsame Strukturentwicklung
              </li>
              <li className="flex gap-2">
                <LayoutTemplate className="w-5 h-5" /> Klarer Schreibprozess
              </li>
              <li className="flex gap-2">
                <User className="w-5 h-5" /> Individuelle Beratung
              </li>
              <li className="flex gap-2">
                <GraduationCap className="w-5 h-5" /> Wissenschaftliche Qualität
              </li>
            </ul>

            <button
              onClick={() => setView("kontakt")}
              className="w-full mt-8 rounded-full bg-slate-900 text-white px-6 py-3 hover:bg-black"
            >
              Kontakt aufnehmen
            </button>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* PROZESS */}
      {/* ------------------------------------------------------------------ */}

      <section id="prozess" className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            {...fadeUp(0)}
            className="text-3xl font-semibold mb-10 text-center"
          >
            Prozess
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "1. Zielklärung", text: "Was brauchst du? Was ist dein Projekt?" },
              { icon: Lightbulb, title: "2. Analyse", text: "Wir klären Wissensstand, Thema, Anforderungen." },
              { icon: ClipboardList, title: "3. Struktur", text: "Gemeinsam bauen wir dein Fundament." },
              { icon: PenTool, title: "4. Schreiben", text: "Ich begleite dich Schritt für Schritt." },
              { icon: Calendar, title: "5. Planung", text: "Wir organisieren deinen Schreibprozess." },
              { icon: CheckCircle2, title: "6. Abschluss", text: "Feinschliff, Korrekturen & finale Sicherheit." },
            ].map((step, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="bg-white border shadow-sm rounded-2xl p-8"
              >
                <step.icon className="w-10 h-10 mb-4 text-slate-700" />
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* ÜBER MICH */}
      {/* ------------------------------------------------------------------ */}

      <section id="ueber-mich" className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            {...fadeUp(0)}
            className="text-3xl font-semibold mb-6"
          >
            Über mich
          </motion.h2>

          <motion.div
            {...fadeUp(0.1)}
            className="mx-auto w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center mb-6"
          >
            <User className="w-12 h-12 text-slate-600" />
          </motion.div>

          <motion.p
            {...fadeUp(0.2)}
            className="max-w-2xl mx-auto text-slate-600 text-lg"
          >
            Ich unterstütze Studierende seit vielen Jahren dabei, wissenschaftliche
            Texte klar, strukturiert und selbstbewusst zu schreiben.
            Durch meinen systemischen Ansatz bist du nicht allein im Prozess –
            wir arbeiten gemeinsam, Schritt für Schritt.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="mt-10">
            <button
              onClick={() => setView("kontakt")}
              className="rounded-full bg-slate-900 text-white px-8 py-3 hover:bg-black"
            >
              Erstgespräch vereinbaren
            </button>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER */}
      {/* ------------------------------------------------------------------ */}

      <footer className="border-t py-10 text-center text-sm text-slate-500">
        <button onClick={() => setView("impressum")}>Impressum</button> ·{" "}
        <button onClick={() => setView("datenschutz")}>Datenschutz</button>
      </footer>
    </div>
  );
}
