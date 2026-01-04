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
    text: "Sicherheit, Feinschliff und Letzte Passung.",
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
            Danke! Deine Nachricht wurde gesendet. Ich melde mich in der Regel in den nächsten 24 Stunden. Viele Grüße Max
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
    <main className="max-w-2xl mx-auto px-6 py-16 leading-relaxed text-slate-800">
      <button
        onClick={onBack}
        className="mb-6 rounded-full border px-4 py-2 text-sm hover:bg-slate-100"
      >
        ← Zurück zur Website
      </button>

      <h1 className="text-3xl font-semibold mb-6">Impressum</h1>

      <h2 className="text-xl font-semibold mt-6">Angaben gemäß § 5 TMG</h2>
      <p className="mt-2">
        Max Pehlivan <br />
        Arndtstrasse 20A <br />
        33615 Bielefeld
      </p>

      <h2 className="text-xl font-semibold mt-6">Kontakt</h2>
      <p className="mt-2">
        E-Mail:{" "}
        <a href="mailto:max@schreibwerk-studio.de" className="underline">
          max@schreibwerk-studio.de
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-6">Umsatzsteuer-ID</h2>
      <p className="mt-2">
        Nach § 19 UStG (Kleinunternehmerregelung) wird keine Umsatzsteuer
        ausgewiesen. Eine Umsatzsteuer-ID ist daher nicht erforderlich.
      </p>

      <h2 className="text-xl font-semibold mt-6">Haftung für Inhalte</h2>
      <p className="mt-2">
        Als Diensteanbieter bin ich nach § 7 Abs. 1 TMG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8
        bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet,
        übermittelte oder gespeicherte fremde Informationen zu überwachen oder
        nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
        hinweisen.
      </p>

      <h2 className="text-xl font-semibold mt-6">Haftung für Links</h2>
      <p className="mt-2">
        Mein Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte
        ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch
        keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets
        der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
      </p>

      <h2 className="text-xl font-semibold mt-6">Urheberrecht</h2>
      <p className="mt-2">
        Die durch mich erstellten Inhalte und Werke auf diesen Seiten
        unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
        Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
        Urheberrechts bedürfen meiner schriftlichen Zustimmung.
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

      <h1 className="text-3xl font-semibold mb-6">Datenschutzerklärung</h1>

      <h2 className="text-xl font-semibold mt-6">1. Verantwortliche Stelle</h2>
      <p className="mt-2">
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        <br />
        Max Pehlivan
        <br />
      Arndtstrasse 20A
        <br />
        33615 Bielefeld
        <br />
        <br />
        E-Mail:{" "}
        <a href="mailto:max@schreibwerk-studio.de" className="underline">
          max@schreibwerk-studio.de
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-6">
        2. Hosting und Server-Logfiles
      </h2>
      <p className="mt-2">
        Diese Website wird bei einem externen Dienstleister gehostet
        (z.&nbsp;B. Vercel Inc.). Beim Aufruf der Website werden automatisch
        Server-Logfiles erfasst, darunter IP-Adresse, Datum und Uhrzeit des
        Zugriffs, aufgerufene Seiten, übertragene Datenmengen sowie Angaben zu
        Browser und Betriebssystem. Die Verarbeitung dieser Daten erfolgt auf
        Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse
        liegt in der Bereitstellung einer stabilen und sicheren Website.
      </p>

      <h2 className="text-xl font-semibold mt-6">
        3. Kontaktaufnahme per E-Mail oder Kontaktformular
      </h2>
      <p className="mt-2">
        Wenn du mich per E-Mail oder über das Kontaktformular kontaktierst,
        werden die von dir mitgeteilten Daten (z.&nbsp;B. Name, E-Mail-Adresse,
        Inhalt der Nachricht) verarbeitet, um deine Anfrage zu bearbeiten und
        zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
        (vorvertragliche bzw. vertragliche Maßnahmen) bzw. Art. 6 Abs. 1
        lit. f DSGVO (berechtigtes Interesse an der Kommunikation mit
        Interessierten).
      </p>

      <h2 className="text-xl font-semibold mt-6">4. Nutzung von Formspree</h2>
      <p className="mt-2">
        Für das Kontaktformular nutze ich den Dienst „Formspree“
        (Formspree, Inc.). Wenn du das Formular absendest, werden die von dir
        eingegebenen Daten (z.&nbsp;B. Name, E-Mail-Adresse, Nachricht) über
        die Server von Formspree an mich weitergeleitet und dort per E-Mail
        zugestellt. Formspree verarbeitet diese Daten in meinem Auftrag auf
        Grundlage eines Auftragsverarbeitungsvertrags gemäß Art. 28 DSGVO.
      </p>
      <p className="mt-2">
        Weitere Informationen zur Datenverarbeitung durch Formspree findest du
        in der Datenschutzerklärung des Anbieters.
      </p>

      <h2 className="text-xl font-semibold mt-6">5. Speicherdauer</h2>
      <p className="mt-2">
        Die im Rahmen der Kontaktaufnahme anfallenden personenbezogenen Daten
        werden nur so lange gespeichert, wie es für die Bearbeitung deiner
        Anfrage erforderlich ist oder wie es gesetzliche Aufbewahrungspflichten
        vorsehen. Anschließend werden die Daten gelöscht.
      </p>

      <h2 className="text-xl font-semibold mt-6">6. Rechtsgrundlagen</h2>
      <p className="mt-2">
        Soweit in dieser Datenschutzerklärung nichts anderes angegeben ist,
        erfolgt die Verarbeitung deiner personenbezogenen Daten auf Grundlage
        von Art. 6 Abs. 1 lit. b DSGVO (Vertrag / vorvertragliche Maßnahmen)
        sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer
        funktionierenden Website und der Kommunikation mit Interessierten).
      </p>

      <h2 className="text-xl font-semibold mt-6">7. Deine Rechte</h2>
      <p className="mt-2">
        Dir stehen im Rahmen der DSGVO insbesondere folgende Rechte zu:
        Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO),
        Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18
        DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch gegen
        bestimmte Verarbeitungen (Art. 21 DSGVO). Du kannst diese Rechte
        jederzeit unter der oben genannten Kontaktadresse geltend machen.
      </p>

      <h2 className="text-xl font-semibold mt-6">
        8. Beschwerderecht bei der Aufsichtsbehörde
      </h2>
      <p className="mt-2">
        Wenn du der Ansicht bist, dass die Verarbeitung deiner
        personenbezogenen Daten gegen Datenschutzrecht verstößt, hast du das
        Recht, dich bei einer zuständigen Datenschutzaufsichtsbehörde zu
        beschweren (Art. 77 DSGVO).
      </p>

      <h2 className="text-xl font-semibold mt-6">
        9. Änderungen dieser Datenschutzerklärung
      </h2>
      <p className="mt-2">
        Ich behalte mir vor, diese Datenschutzerklärung anzupassen, wenn sich
        die rechtlichen Vorgaben oder die von mir durchgeführten
        Datenverarbeitungen ändern. Es gilt jeweils die auf dieser Website
        veröffentlichte aktuelle Version.
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
          1:1-Coaching für Haus- und Bachelorarbeiten. Mit
Struktur, rotem Faden und sauberem wissenschaftliches Schreiben.
        </motion.p>

        <motion.div {...fadeUp(0.2)} className="mt-10 flex gap-4">
         <button
  onClick={() => setView("kontakt")}
  className="rounded-full bg-slate-900 text-white px-8 py-3 hover:bg-black"
>
  Erstgespräch
  <ArrowRight
    className="hidden md:inline-block ml-2"
    size={16}
  />
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
  <CheckCircle2 className="mt-[2px] h-5 w-5 shrink-0 text-slate-700" />
  <span className="leading-relaxed">
    Klarheit & Struktur: von Thema zu tragfähiger Gliederung
  </span>
</div>

<div className="flex items-start gap-3">
  <CheckCircle2 className="mt-[2px] h-5 w-5 shrink-0 text-slate-700" />
  <span className="leading-relaxed">
    Stil & Ausdruck: präzise, sauber, journal-tauglich
  </span>
</div>

<div className="flex items-start gap-3">
  <CheckCircle2 className="mt-[2px] h-5 w-5 shrink-0 text-slate-700" />
  <span className="leading-relaxed">
    Systemisches Coaching: Denk- & Schreibprozesse stärken
  </span>
</div>

<div className="flex items-start gap-3">
  <CheckCircle2 className="mt-[2px] h-5 w-5 shrink-0 text-slate-700" />
  <span className="leading-relaxed">
    Konkrete To-Dos nach jeder Session
  </span>
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
  <div className="grid md:grid-cols-2 gap-12 items-start">

{/* Bildspalte */}
<div className="order-1 md:order-2 flex justify-center md:justify-end">
  <div className="w-full max-w-[200px] sm:max-w-[230px]">
    <div className="rounded-full border border-slate-200 bg-white/70 p-2 shadow-sm">
      <div className="overflow-hidden rounded-full bg-slate-100">
        <img
          src="/images/Bewerbungsbild-1.jpg"
          alt="Max"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  </div>
</div>

    {/* Textspalte */}
    <div className="order-2 md:order-1">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
        Über mich
      </h2>

      <p className="mt-5 text-slate-600 leading-relaxed text-lg">
        Ich bin Max – Sozialarbeiter B.A., systemischer Berater in Ausbildung
        und Masterstudent der Erziehungswissenschaft (Schwerpunkt Beratung).
      </p>

      <p className="mt-5 text-slate-600 leading-relaxed text-lg">
        Mein Ansatz ist einfach: weniger Druck, mehr Struktur. Ich begleite
        Studierende dabei, ihr Denken zu sortieren, Argumente klar zu entwickeln
        und wieder ins Schreiben zu kommen.
      </p>

      <p className="mt-5 text-slate-600 leading-relaxed text-lg">
        Es geht nicht um Perfektion, sondern um Klarheit und Selbstwirksamkeit –
        Schritt für Schritt, auf Augenhöhe.
      </p>

      {/* Mein Ansatz Box (bleibt in der Textspalte, unter dem Text) */}
      <div className="mt-8 rounded-3xl shadow-sm border border-slate-200 bg-white/70 p-6 md:p-10">
        <h3 className="text-xl font-semibold mb-6 text-slate-900">
          Mein Ansatz
        </h3>

        <div className="space-y-6 text-slate-600">
          <div className="grid grid-cols-[24px_1fr] gap-x-3 items-start">
            <CheckCircle2 className="h-5 w-5 text-slate-700 mt-1 shrink-0" />
            <span>Systemische Haltung: Ressourcen- &amp; Lösungsorientierung</span>
          </div>

          <div className="grid grid-cols-[24px_1fr] gap-x-3 items-start">
            <CheckCircle2 className="h-5 w-5 text-slate-700 mt-1 shrink-0" />
            <span>Coaching statt Korrektorat: sauber argumentieren lernen</span>
          </div>

          <div className="grid grid-cols-[24px_1fr] gap-x-3 items-start">
            <CheckCircle2 className="h-5 w-5 text-slate-700 mt-1 shrink-0" />
            <span>Transparenz: kein Ghostwriting</span>
          </div>

          <div className="grid grid-cols-[24px_1fr] gap-x-3 items-start">
            <CheckCircle2 className="h-5 w-5 text-slate-700 mt-1 shrink-0" />
            <span>Konkrete To-Dos nach jeder Session</span>
          </div>
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
