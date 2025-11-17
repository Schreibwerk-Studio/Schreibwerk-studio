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
} from "lucide-react";

/* ============================================================================
   Helper
============================================================================ */

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const STEPS = [
  {
    step: 1,
    title: "Standort & Ziele",
    text: "Status, Hindernisse, Zielbild – Klarheit schaffen.",
  },
  {
    step: 2,
    title: "Thema & Frage",
    text: "Themenfokus und Forschungsfrage schärfen.",
  },
  {
    step: 3,
    title: "Aufbau & Logik",
    text: "Argumentationslinie und Gliederung tragen.",
  },
  {
    step: 4,
    title: "Prozess & Zeit",
    text: "Schreibprozess, Selbstmanagement, To-Dos.",
  },
  {
    step: 5,
    title: "Reflexion & Fit",
    text: "Sicherheit, Feinschliff, Abgabefit.",
  },
  {
    step: 6,
    title: "Ziel erreicht",
    text: "Klarer Text, klare Argumentation – du bist abgabefit.",
    success: true,
  },
];

/* ============================================================================
   Kontakt – Formspree
============================================================================ */

function ContactView({ onBack }: any) {
  const [status, setStatus] = React.useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mzzyjrjz", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
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
          <p className="text-green-700 bg-green-100 p-3 rounded-xl mt-3">
            Danke! Deine Nachricht wurde gesendet.
          </p>
        )}

        {status === "error" && (
          <p className="text-red-700 bg-red-100 p-3 rounded-xl mt-3">
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

/* ============================================================================
   Datenschutz
============================================================================ */

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

/* ============================================================================
   Hauptseite
============================================================================ */

export default function SchreibwerkPage() {
  const [view, setView] = React.useState<"home" | "kontakt" | "impressum" | "datenschutz">("home");

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

      {/* PROBLEM → LÖSUNG – Womit viele kämpfen / Was du mit mir bekommst */}
      <section id="problem" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          {/* Womit viele kämpfen */}
          <div className="rounded-3xl shadow-sm border border-slate-200 h-full flex flex-col">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-semibold">Womit viele kämpfen</h2>
            </div>
            <div className="p-6 text-slate-600 space-y-4 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-start gap-3">
                  <LayoutTemplate className="mt-0.5 h-5 w-5 text-slate-500" />
                  <span>Kein roter Faden, unklare Gliederung</span>
                </div>
                <div className="flex items-start gap-3">
                  <PenTool className="mt-0.5 h-5 w-5 text-slate-500" />
                  <span>Unsicherheit in Stil, Zitation & Tonalität</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-slate-500" />
                  <span>Aufschieben, Zeitdruck, Schreibblockaden</span>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpenText className="mt-0.5 h-5 w-5 text-slate-500" />
                  <span>Literaturchaos statt belastbarer Argumentation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Was du mit mir bekommst */}
          <div className="rounded-3xl shadow-sm border border-slate-200 h-full flex flex-col">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-semibold">Was du mit mir bekommst</h2>
            </div>
            <div className="p-6 text-slate-600 space-y-4 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-slate-700" />
                  <span>Klarheit & Struktur: von Thema zu tragfähiger Gliederung</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-slate-700" />
                  <span>Stil & Ausdruck: präzise, sauber, journal-tauglich</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-slate-700" />
                  <span>Systemisches Coaching: Denk- & Schreibprozesse stärken</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-slate-700" />
                  <span>Konkrete To-Dos nach jeder Session</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANGEBOT – 4 KACHELN */}
      <section
        id="angebot"
        className="bg-slate-50/60 border-y border-slate-200/80 py-20"
      >
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Angebot
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl">Flexibel, transparent, fair.</p>

          <div className="mt-10 grid md:grid-cols-4 gap-6">
            {[
              {
                title: "Einzelsession (45 Min)",
                list: ["Klärung, Struktur, Schreibprozess", "Motivation & Reflexion"],
                price: "25 €",
              },
              {
                title: "5er-Paket",
                list: [
                  "Fester Prozess (z. B. Themenfindung → Abgabe)",
                  "Roadmap & Zwischenziele",
                ],
                price: "100 €",
              },
              {
                title: "Text-Feedback light",
                list: ["Bis 3 Seiten", "Argumentation & Struktur (kein Lektorat)"],
                price: "20 €",
              },
              {
                title: "Mini-Workshop (90 Min)",
                list: [
                  "Ab 4 Teilnehmende",
                  "Schreibstart, Motivation, Selbstorganisation",
                ],
                price: "15 € p. P.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-3xl shadow-sm border border-slate-200 h-full flex flex-col bg-white"
              >
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    {item.title}
                  </h3>
                </div>
                <div className="p-6 flex flex-col justify-between h-full text-slate-600">
                  <div>
                    <ul className="list-disc ml-5 space-y-1">
                      {item.list.map((text, j) => (
                        <li key={j}>{text}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 font-semibold text-slate-900 text-base mt-auto">
                    {item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROZESS – 6 Schritte, letzte grün */}
      <section id="prozess" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-1">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Der Prozess
            </h2>
            <p className="mt-4 text-slate-600 max-w-prose">
              Eine klare Linie über sechs Schritte – und ein sichtbarer Abschluss.
              Ruhig, strukturiert, machbar.
            </p>
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STEPS.map((s) => {
              const inner = (
                <div
                  className={`h-full flex flex-col rounded-3xl shadow-sm border ${
                    s.success ? "border-green-200 bg-green-50/50" : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="p-4 border-b border-slate-100/60">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      {s.success && (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      )}
                      Schritt {s.step}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div
                      className={`font-medium ${
                        s.success ? "text-green-800" : "text-slate-800"
                      }`}
                    >
                      {s.title}
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{s.text}</p>
                  </div>
                </div>
              );

              return s.success ? (
                <motion.div
                  key={s.step}
                  className="h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {inner}
                </motion.div>
              ) : (
                <div key={s.step} className="h-full">
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ÜBER MICH */}
      <section id="ueber-mich" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Über mich
            </h2>
            <p className="mt-5 text-slate-600 leading-relaxed text-lg">
              Ich bin Max – Sozialarbeiter B.A., systemischer Berater in Ausbildung
              und Masterstudent der Erziehungswissenschaft (Schwerpunkt Beratung).
              Ich begleite Studierende, die beim wissenschaftlichen Schreiben den
              Überblick verloren haben – oder gar nicht erst ins Schreiben finden.
            </p>
            <p className="mt-5 text-slate-600 leading-relaxed text-lg">
              Mein Ansatz ist einfach: weniger Druck, mehr Struktur. Ich helfe dir,
              dein Denken zu sortieren, deine Argumentation zu schärfen und deinen
              Schreibprozess so zu gestalten, dass er zu dir passt.
            </p>
            <p className="mt-5 text-slate-600 leading-relaxed text-lg">
              Dabei geht es nicht um Perfektion, sondern um Klarheit und
              Selbstwirksamkeit. Du lernst, deinen Text zu verstehen, zu steuern und
              selbstbewusst zu vertreten – Schritt für Schritt.
            </p>
            <ul className="mt-6 space-y-2 text-slate-600">
              <li className="flex gap-2 items-start">
                <GraduationCap className="mt-0.5 h-5 w-5 text-slate-500" />
                Bachelor Soziale Arbeit, Masterstudent Erziehungswissenschaft ·
                Schwerpunkt Beratung
              </li>
              <li className="flex gap-2 items-start">
                <BookOpenText className="mt-0.5 h-5 w-5 text-slate-500" />
                Tutorat „Wissenschaftliches Arbeiten“
              </li>
              <li className="flex gap-2 items-start">
                <PenTool className="mt-0.5 h-5 w-5 text-slate-500" />
                Jahrelange Erfahrung im Schreiben von wissenschaftlichen Arbeiten
              </li>
            </ul>
          </div>

          <div className="rounded-3xl shadow-sm border border-slate-200 bg-white/70 p-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <User className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Mein Ansatz</h3>
            <div className="text-slate-600 space-y-3 text-sm">
              <div className="flex items-start gap-3 text-left">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-slate-700" />
                <span>Systemische Haltung: Ressourcen- & Lösungsorientierung</span>
              </div>
              <div className="flex items-start gap-3 text-left">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-slate-700" />
                <span>Coaching statt Korrektorat: sauber argumentieren lernen</span>
              </div>
              <div className="flex items-start gap-3 text-left">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-slate-700" />
                <span>Transparenz: kein Ghostwriting</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10 text-center text-sm text-slate-500">
        <button onClick={() => setView("impressum")}>Impressum</button> ·{" "}
        <button onClick={() => setView("datenschutz")}>Datenschutz</button>
      </footer>
    </div>
  );
}
