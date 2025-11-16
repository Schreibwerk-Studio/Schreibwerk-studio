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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Hilfsfunktionen
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

// Daten
const STEPS = [
  { step: 1, title: "Standort & Ziele", text: "Status, Hindernisse, Zielbild – Klarheit schaffen." },
  { step: 2, title: "Thema & Frage", text: "Themenfokus und Forschungsfrage schärfen." },
  { step: 3, title: "Aufbau & Logik", text: "Argumentationslinie und Gliederung tragen." },
  { step: 4, title: "Prozess & Zeit", text: "Schreibprozess, Selbstmanagement, To-Dos." },
  { step: 5, title: "Reflexion & Fit", text: "Sicherheit, Feinschliff, Abgabefit." },
  {
    step: 6,
    title: "Ziel erreicht",
    text: "Klarer Text, klare Argumentation – du bist abgabefit.",
    success: true,
  },
];

const OFFER = [
  {
    title: "Einzelsession (45 Min)",
    list: ["Klärung, Struktur, Schreibprozess", "Motivation & Reflexion"],
    price: "25 €",
  },
  {
    title: "5er-Paket",
    list: ["Fester Prozess (z. B. Themenfindung → Abgabe)", "Roadmap & Zwischenziele"],
    price: "100 €",
  },
  {
    title: "Text-Feedback light",
    list: ["Bis 3 Seiten", "Argumentation & Struktur (kein Lektorat)"],
    price: "20 €",
  },
  {
    title: "Mini-Workshop (90 Min)",
    list: ["Ab 4 Teilnehmende", "Schreibstart, Motivation, Selbstorganisation"],
    price: "15 € p. P.",
  },
];

// Kleine Karte fürs Angebot
function PriceCard({ title, list, price }) {
  return (
    <Card className="rounded-3xl shadow-sm border border-slate-200 h-full flex">
      <div className="flex flex-col p-6 w-full">
        <div>
          <div className="text-lg font-semibold text-slate-900 mb-3">{title}</div>
          <ul className="list-disc ml-5 space-y-1 text-slate-600">
            {list.map((t, j) => (
              <li key={j}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="mt-auto pt-4">
          <div className="font-semibold text-slate-900 text-base">{price}</div>
        </div>
      </div>
    </Card>
  );
}

// ======================= SUBVIEW: KONTAKT =======================

function ContactView({ onBack }) {
  const [status, setStatus] = React.useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mzzyjrjz", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 text-slate-700">
      <Button variant="outline" onClick={onBack} className="rounded-full mb-6">
        Zurück zur Website
      </Button>

      <h1 className="text-3xl font-semibold mb-2">Kontakt</h1>
      <p className="text-slate-600 mb-8">
        Schreib mir kurz, wobei ich dich unterstützen kann – ich antworte zeitnah.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
        <div>
          <label className="block text-sm mb-1" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-xl border border-slate-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1" htmlFor="email">
            E-Mail
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="w-full rounded-xl border border-slate-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1" htmlFor="message">
            Nachricht
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full rounded-xl border border-slate-300 px-3 py-2"
          />
        </div>

        <Button type="submit" className="rounded-full px-6" disabled={status === "sending"}>
          {status === "sending" ? "Wird gesendet…" : "Absenden"}
        </Button>

        {status === "success" && (
          <p className="mt-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl p-3">
            Danke! Deine Nachricht wurde gesendet.
          </p>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
            Da ist etwas schiefgelaufen. Bitte schreib direkt an
            <a href="mailto:max@schreibwerk-studio.de" className="underline">
              {" "}
              max@schreibwerk-studio.de
            </a>
            .
          </p>
        )}
      </form>
    </main>
  );
}

// ======================= SUBVIEW: IMPRESSUM =======================

function ImpressumView({ onBack }) {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 text-slate-700 leading-relaxed">
      <Button variant="outline" onClick={onBack} className="rounded-full mb-6">
        Zurück zur Website
      </Button>

      <h1 className="text-3xl font-semibold mb-6">Impressum</h1>
      <p>Angaben gemäß § 5 TMG:</p>

      <p className="mt-4">
        {/* HIER deine echten Daten eintragen */}
        Max Pehlivan
        <br />
        Beispielstraße 1
        <br />
        12345 Beispielstadt
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

// ======================= SUBVIEW: DATENSCHUTZ =======================

function DatenschutzView({ onBack }) {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 text-slate-700 leading-relaxed">
      <Button variant="outline" onClick={onBack} className="rounded-full mb-6">
        Zurück zur Website
      </Button>

      <h1 className="text-3xl font-semibold mb-6">Datenschutzerklärung</h1>

      <p className="mb-4">
        Diese Website verarbeitet personenbezogene Daten nur im technisch notwendigen Umfang sowie zur Beantwortung von
        Kontaktanfragen.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Kontaktformular</h2>
      <p>
        Wenn du das Kontaktformular nutzt, werden die von dir eingegebenen Daten (Name, E-Mail-Adresse, Nachricht) über
        den Dienst Formspree übermittelt und per E-Mail an mich weitergeleitet. Die Daten werden ausschließlich zur
        Bearbeitung deiner Anfrage verwendet.
      </p>

      <p className="mt-6 text-sm text-slate-500">Stand: {new Date().getFullYear()}</p>
    </main>
  );
}

// ======================= HAUPTSEITE =======================

export default function SchreibwerkPage() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [view, setView] = React.useState("home"); // "home" | "kontakt" | "impressum" | "datenschutz"

  // Subviews separat rendern
  if (view === "kontakt") return <ContactView onBack={() => setView("home")} />;
  if (view === "impressum") return <ImpressumView onBack={() => setView("home")} />;
  if (view === "datenschutz") return <DatenschutzView onBack={() => setView("home")} />;

  // Home-Ansicht
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200/70">
        <div className="mx-auto max-w-7xl px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToId("top")}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium tracking-wide text-slate-700 hover:bg-slate-100 transition"
            >
              Schreibwerk-Studio
            </button>
            <span className="hidden md:inline text-slate-400">
              Coaching für wissenschaftliches Schreiben
            </span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm">
            <button className="hover:text-slate-900 text-slate-600" onClick={() => scrollToId("problem")}>
              Problem → Lösung
            </button>
            <button className="hover:text-slate-900 text-slate-600" onClick={() => scrollToId("angebot")}>
              Angebot
            </button>
            <button className="hover:text-slate-900 text-slate-600" onClick={() => scrollToId("prozess")}>
              Prozess
            </button>
            <button className="hover:text-slate-900 text-slate-600" onClick={() => scrollToId("ueber-mich")}>
              Über mich
            </button>
            <Button
              onClick={() => setView("kontakt")}
              className="rounded-full px-5 bg-slate-900 hover:bg-black"
            >
              Kontakt
            </Button>
          </nav>

          {/* Mobile */}
          <button
            aria-label="Menü öffnen"
            className="md:hidden inline-flex items-center justify-center rounded-full border border-slate-300/80 w-10 h-10 text-slate-700"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="block w-5 h-0.5 bg-slate-700 mb-1" />
            <span className="block w-5 h-0.5 bg-slate-700 mb-1" />
            <span className="block w-5 h-0.5 bg-slate-700" />
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="max-w-7xl mx-auto px-5 py-4 grid gap-3 text-slate-700">
              <button
                className="text-left py-2"
                onClick={() => {
                  setMobileOpen(false);
                  scrollToId("problem");
                }}
              >
                Problem → Lösung
              </button>
              <button
                className="text-left py-2"
                onClick={() => {
                  setMobileOpen(false);
                  scrollToId("angebot");
                }}
              >
                Angebot
              </button>
              <button
                className="text-left py-2"
                onClick={() => {
                  setMobileOpen(false);
                  scrollToId("prozess");
                }}
              >
                Prozess
              </button>
              <button
                className="text-left py-2"
                onClick={() => {
                  setMobileOpen(false);
                  scrollToId("ueber-mich");
                }}
              >
                Über mich
              </button>
              <button
                className="text-left py-2"
                onClick={() => {
                  setMobileOpen(false);
                  setView("kontakt");
                }}
              >
                Kontakt
              </button>
            </div>
          </div>
        )}
      </header>

      {/* PAGE TOP ANCHOR */}
      <div id="top" />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 right-[-10%] h-[38rem] w-[38rem] rounded-full bg-gradient-to-b from-slate-100 to-white blur-3xl" />
        <div className="pointer-events-none absolute -left-1/3 top-1/3 h-[32rem] w-[32rem] rounded-full bg-gradient-to-tr from-slate-50 to-white blur-2xl" />
        <div className="mx-auto max-w-7xl px-5 py-24 lg:py-32 relative">
          <motion.h1
            {...fadeUp(0)}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95]"
          >
            <span className="bg-gradient-to-b from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Schreibwerk-Studio
            </span>
            <span className="block mt-3 text-slate-700 font-semibold">Wissenschaftliches Schreiben</span>
            <span className="block text-slate-500 text-xl md:text-2xl font-normal mt-4">
              mit Struktur & Klarheit.
            </span>
          </motion.h1>
          <motion.p
            {...fadeUp(0.1)}
            className="mt-8 text-lg md:text-xl text-slate-600 max-w-2xl"
          >
            1:1-Coaching für Studierende – präzise, entspannt, ressourcenorientiert. Fokus auf
            Argumentation, Form und Flow.
          </motion.p>
          <motion.div
            {...fadeUp(0.15)}
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Button
              size="lg"
              className="rounded-full px-7 h-12 bg-slate-900 hover:bg-black shadow-sm"
              onClick={() => setView("kontakt")}
            >
              Kostenloses Erstgespräch <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <button
              onClick={() => scrollToId("angebot")}
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Angebot ansehen
            </button>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM → LÖSUNG */}
      <section id="problem" className="mx-auto max-w-7xl px-5 py-20 lg:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          <Card className="rounded-3xl shadow-sm border border-slate-200 h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Womit viele kämpfen</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600 space-y-4 flex flex-col justify-between h-full">
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
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-sm border border-slate-200 h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Was du mit mir bekommst</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600 space-y-4 flex flex-col justify-between h-full">
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
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ANGEBOT */}
      <section id="angebot" className="bg-slate-50/60 border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:py-24">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Angebot</h2>
          <p className="mt-3 text-slate-600 max-w-2xl">Flexibel, transparent, fair.</p>
          <div className="mt-10 grid md:grid-cols-4 gap-6 items-stretch">
            {OFFER.map((item, i) => (
              <PriceCard key={i} title={item.title} list={item.list} price={item.price} />
            ))}
          </div>
        </div>
      </section>

      {/* PROZESS */}
      <section id="prozess" className="mx-auto max-w-7xl px-5 py-20 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-1">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Der Prozess</h2>
            <p className="mt-4 text-slate-600 max-w-prose">
              Eine klare Linie über sechs Schritte – und ein sichtbarer Abschluss. Ruhig, strukturiert, machbar.
            </p>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STEPS.map((s) => {
              const inner = (
                <Card
                  className={`h-full flex flex-col rounded-3xl shadow-sm border ${
                    s.success ? "border-green-200 bg-green-50/50" : "border-slate-200"
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm text-slate-500">
                      {s.success && <CheckCircle2 className="h-4 w-4 text-green-600" />} Schritt {s.step}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`font-medium ${s.success ? "text-green-800" : ""}`}>{s.title}</div>
                    <p className="mt-1 text-sm text-slate-600">{s.text}</p>
                  </CardContent>
                </Card>
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
      <section id="ueber-mich" className="mx-auto max-w-7xl px-5 py-20 lg:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Über mich</h2>
            <p className="mt-5 text-slate-600 leading-relaxed text-lg">
              Ich bin Max – Sozialarbeiter B.A., systemischer Berater in Ausbildung und Masterstudent der
              Erziehungswissenschaft (Schwerpunkt Beratung). Ich begleite Studierende, die beim wissenschaftlichen
              Schreiben den Überblick verloren haben – oder gar nicht erst ins Schreiben finden.
            </p>
            <p className="mt-5 text-slate-600 leading-relaxed text-lg">
              Mein Ansatz ist einfach: weniger Druck, mehr Struktur. Ich helfe dir, dein Denken zu sortieren, deine
              Argumentation zu schärfen und deinen Schreibprozess so zu gestalten, dass er zu dir passt.
            </p>
            <p className="mt-5 text-slate-600 leading-relaxed text-lg">
              Dabei geht es nicht um Perfektion, sondern um Klarheit und Selbstwirksamkeit. Du lernst, deinen Text zu
              verstehen, zu steuern und selbstbewusst zu vertreten – Schritt für Schritt.
            </p>
            <ul className="mt-6 space-y-2 text-slate-600">
              <li className="flex gap-2 items-start">
                <GraduationCap className="mt-0.5 h-5 w-5 text-slate-500" />
                Bachelor Soziale Arbeit, Masterstudent Erziehungswissenschaft · Schwerpunkt Beratung
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
          <Card className="rounded-3xl shadow-sm border border-slate-200 bg-white/70">
            <CardHeader>
              <CardTitle className="text-lg">Mein Ansatz</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-slate-700" />
                <span>Systemische Haltung: Ressourcen- & Lösungsorientierung</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-slate-700" />
                <span>Coaching statt Korrektorat: sauber argumentieren lernen</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-slate-700" />
                <span>Transparenz: kein Ghostwriting</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-7xl px-5 py-20 lg:py-24">
        <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Bereit, stressfrei zu schreiben?
            </h3>
            <p className="mt-3 text-slate-600 max-w-2xl">
              Buche ein kostenloses Erstgespräch (15 Minuten). Wir klären dein Ziel und planen die nächsten
              Schritte.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              size="lg"
              className="rounded-full h-12 px-7 bg-slate-900 hover:bg-black"
              onClick={() => setView("kontakt")}
            >
              Erstgespräch anfragen
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full h-12 px-7 border-slate-900 text-slate-900 hover:bg-slate-100"
              onClick={() => (window.location.href = "mailto:max@schreibwerk-studio.de")}
            >
              Direkt mailen
            </Button>
          </div>
        </div>
        <p className="mt-6 text-xs text-slate-500">
          Transparenz: Ich begleite dich methodisch & inhaltlich – ich schreibe keine Arbeiten (kein Ghostwriting).
        </p>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10 text-center text-sm text-slate-500">
        <div className="space-x-2">
          <span>© {new Date().getFullYear()} Schreibwerk</span>
          <span>·</span>
          <button
            onClick={() => setView("impressum")}
            className="underline hover:no-underline"
          >
            Impressum
          </button>
          <span>·</span>
          <button
            onClick={() => setView("datenschutz")}
            className="underline hover:no-underline"
          >
            Datenschutz
          </button>
        </div>
      </footer>
    </div>
  );
}
add schreibwerk page
