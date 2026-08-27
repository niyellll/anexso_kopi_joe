from pathlib import Path
import re


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if old not in text:
        raise SystemExit(f"missing anchor: {label}")
    return text.replace(old, new, 1)

commerce_path = Path("app/commerce-widgets-v14.tsx")
commerce = commerce_path.read_text(encoding="utf-8")

commerce = replace_once(
    commerce,
    '''function parseDate(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

export function RegistrationForm''',
    '''function parseDate(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

function parseRupiahLabelV16(value: string) {
  const match = String(value || "").match(/Rp\\s*([\\d.]+)/i);
  if (!match) return 0;
  const amount = Number(match[1].replace(/\\./g, ""));
  return Number.isFinite(amount) ? amount : 0;
}

export function RegistrationForm''',
    "rupiah parser",
)

commerce = replace_once(
    commerce,
    '  const [participant, setParticipant] = useState<Participant>({ name: "", email: "", whatsapp: "", company: "", position: "" });',
    '  const [participant, setParticipant] = useState<Participant>({ name: "", email: "", whatsapp: "", company: "", position: "" });\n  const [inHouseParticipantsV16, setInHouseParticipantsV16] = useState("");',
    "inhouse participant state",
)

old_calc = '''  const monthOffset = (new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay() + 6) % 7;
  const paymentWa = waLink(`Halo TQ Business & Learning Center, saya ${participant.name || "peserta"} mendaftar program ${program.title} pada ${scheduleLabel} dan memilih pembayaran Transfer Bank. Mohon kirimkan rekening resmi.`);
  const trainingAdminUrl = printUrl({ type: "training", ...participant, program: program.title, date: scheduleLabel, format, payment, investment: program.openTraining });'''
new_calc = '''  const monthOffset = (new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay() + 6) % 7;
  const isInHouseV16 = format === "In-House Training";
  const inHouseBaseV16 = parseRupiahLabelV16(program.inHouse);
  const inHousePerParticipantV16 = inHouseBaseV16 > 0 ? Math.round(inHouseBaseV16 / 10) : 0;
  const enteredParticipantsV16 = Number(inHouseParticipantsV16);
  const validInHouseParticipantsV16 = Number.isInteger(enteredParticipantsV16) && enteredParticipantsV16 >= 10 && enteredParticipantsV16 <= 25;
  const participantCountV16 = isInHouseV16 ? (validInHouseParticipantsV16 ? enteredParticipantsV16 : 0) : 1;
  const participantLabelV16 = isInHouseV16 ? (validInHouseParticipantsV16 ? `${enteredParticipantsV16} Orang` : "Belum diisi") : "1 Orang";
  const unitInvestmentLabelV16 = isInHouseV16 ? `${formatRupiah(inHousePerParticipantV16)}/orang` : program.openTraining;
  const totalInvestmentAmountV16 = isInHouseV16
    ? (validInHouseParticipantsV16 ? inHousePerParticipantV16 * enteredParticipantsV16 : 0)
    : parseRupiahLabelV16(program.openTraining);
  const totalInvestmentLabelV16 = isInHouseV16 && !validInHouseParticipantsV16
    ? "Isi jumlah peserta (10–25)"
    : formatRupiah(totalInvestmentAmountV16);
  const paymentWa = waLink(`Halo TQ Business & Learning Center, saya ${participant.name || "peserta"} mendaftar program ${program.title} pada ${scheduleLabel}${isInHouseV16 && validInHouseParticipantsV16 ? ` untuk ${enteredParticipantsV16} peserta` : ""} dan memilih pembayaran Transfer Bank. Mohon kirimkan rekening resmi.`);
  const trainingAdminUrl = printUrl({ type: "training", ...participant, program: program.title, date: scheduleLabel, format, payment, participants: participantLabelV16, investment: totalInvestmentLabelV16 });'''
commerce = replace_once(commerce, old_calc, new_calc, "training calculations")

commerce = replace_once(
    commerce,
    '    `Format: ${format}`,\n    `Tanggal: ${scheduleLabel}`,\n    `Investasi: ${program.openTraining}`,',
    '    `Format: ${format}`,\n    `Jumlah Peserta: ${participantLabelV16}`,\n    `Tanggal: ${scheduleLabel}`,\n    `Investasi: ${totalInvestmentLabelV16}`,',
    "training whatsapp summary",
)

commerce = replace_once(
    commerce,
    '<div className="selected-meta"><b>◷ {program.duration}</b><b>▣ {format}</b><b>▣ {program.openTraining}</b></div>',
    '<div className="selected-meta"><b>◷ {program.duration}</b><b>▣ {format}</b><b>▣ {isInHouseV16 ? totalInvestmentLabelV16 : program.openTraining}</b></div>',
    "selected program price",
)

format_pattern = re.compile(r'      <section className="form-card format-card">.*?</section>\n      <section className="form-card schedule-card">', re.S)
format_replacement = '''      <section className="form-card format-card"><h2>PILIH FORMAT PELATIHAN</h2><p>Pilih format yang paling sesuai dengan kebutuhan Anda.</p><div className="choice-grid">{["Online", "Offline", "Hybrid", "In-House Training"].map((choice) => <button type="button" onClick={() => setFormat(choice)} className={format === choice ? "choice active" : "choice"} key={choice}><span>{choice === "Online" ? "💻" : choice === "Offline" ? "👥" : choice === "Hybrid" ? "▣" : "🏢"}</span><b>{choice}</b><small>{choice === "Online" ? "Mengikuti pelatihan secara virtual dari mana saja." : choice === "Offline" ? "Mengikuti pelatihan langsung di lokasi yang telah ditentukan." : choice === "Hybrid" ? "Pilihan mengikuti pelatihan secara online maupun offline." : "Program khusus untuk perusahaan atau organisasi Anda."}</small></button>)}</div>{isInHouseV16 ? <div className="form-grid two" style={{marginTop:18}}><label>Jumlah Peserta *<input required type="number" min={10} max={25} step={1} inputMode="numeric" value={inHouseParticipantsV16} onChange={(event) => setInHouseParticipantsV16(event.target.value)} onBlur={(event) => { if (!event.target.value) return; const next = Math.min(25, Math.max(10, Math.round(Number(event.target.value) || 10))); setInHouseParticipantsV16(String(next)); }} placeholder="10 - 25"/><small style={{display:"block",marginTop:6}}>Minimum 10 peserta, maksimum 25 peserta.</small></label><div style={{border:"1px solid var(--border)",borderRadius:10,padding:"14px 16px",background:"var(--bg)",display:"grid",alignContent:"center",gap:5}}><span style={{fontSize:12,color:"var(--text-muted)",fontWeight:700}}>TOTAL INVESTASI IN-HOUSE</span><b style={{fontSize:22}}>{totalInvestmentLabelV16}</b><small style={{color:"var(--text-muted)"}}>Paket minimum {program.inHouse}. Total menyesuaikan jumlah peserta.</small></div></div> : null}</section>
      <section className="form-card schedule-card">'''
commerce, count = format_pattern.subn(format_replacement, commerce, count=1)
if count != 1:
    raise SystemExit("format section replacement failed")

summary_pattern = re.compile(r'      <section className="form-card summary-card">.*?</section>\n      <section className="form-card confirm-card">', re.S)
summary_replacement = '''      <section className="form-card summary-card"><h2>RINGKASAN PENDAFTARAN</h2><div><span>Program</span><b>{program.title}</b></div><div><span>Format</span><b>{format}</b></div><div><span>Tanggal</span><b>{scheduleLabel}</b></div><div><span>Peserta</span><b>{participantLabelV16}</b></div><div><span>Investasi per peserta</span><b>{unitInvestmentLabelV16}</b></div><hr/><div className="summary-total"><span>TOTAL INVESTASI</span><b>{totalInvestmentLabelV16}</b></div></section>
      <section className="form-card confirm-card">'''
commerce, count = summary_pattern.subn(summary_replacement, commerce, count=1)
if count != 1:
    raise SystemExit("summary section replacement failed")

commerce = replace_once(
    commerce,
    '<div className="success-meta"><b>Program: {program.title}</b><b>Tanggal: {scheduleLabel}</b><b>Pembayaran: {payment}</b><b>Status: Pendaftaran diterima</b></div>',
    '<div className="success-meta"><b>Program: {program.title}</b><b>Peserta: {participantLabelV16}</b><b>Investasi: {totalInvestmentLabelV16}</b><b>Tanggal: {scheduleLabel}</b><b>Pembayaran: {payment}</b><b>Status: Pendaftaran diterima</b></div>',
    "success meta",
)
commerce_path.write_text(commerce, encoding="utf-8")

# Automation must send TOTAL investment (not the old per-person label) and participant count.
auto_path = Path("app/training-confirmation-auto.tsx")
auto = auto_path.read_text(encoding="utf-8")
auto = replace_once(
    auto,
    '        investment: summaryValue(form, "Investasi per peserta"),',
    '        participants: summaryValue(form, "Peserta"),\n        investment: summaryValue(form, "TOTAL INVESTASI"),',
    "automation payload",
)
auto = replace_once(
    auto,
    '      const fingerprint = [payload.whatsapp, payload.program, payload.date, payload.format, payload.payment].join("|");',
    '      const fingerprint = [payload.whatsapp, payload.program, payload.date, payload.format, payload.participants, payload.investment, payload.payment].join("|");',
    "automation fingerprint",
)
auto_path.write_text(auto, encoding="utf-8")

# Shipping label: keep the layout and only prefix the addressee line.
print_path = Path("app/pesanan/cetak/page.tsx")
print_page = print_path.read_text(encoding="utf-8")
print_page = replace_once(
    print_page,
    '  investment?: string;\n};',
    '  investment?: string;\n  participants?: string;\n};',
    "print payload participants",
)
print_page = replace_once(
    print_page,
    '        <div className="training-field"><span>Investasi</span><b>{payload.investment || "-"}</b></div>',
    '        <div className="training-field"><span>Jumlah Peserta</span><b>{payload.participants || "1 Orang"}</b></div>\n        <div className="training-field"><span>Investasi</span><b>{payload.investment || "-"}</b></div>',
    "training print participant",
)
print_page = replace_once(
    print_page,
    '<div className="label-name">{payload.name || "-"}</div>',
    '<div className="label-name">Kepada Yth. {payload.name || "-"}</div>',
    "shipping label addressee",
)
print_path.write_text(print_page, encoding="utf-8")

# PDF document: carry participant count through and print it.
pdf_path = Path("app/api/training-confirmation/pdf/route.ts")
pdf = pdf_path.read_text(encoding="utf-8")
pdf = replace_once(
    pdf,
    'type TrainingPayload = { type?: string; name?: string; email?: string; whatsapp?: string; company?: string; position?: string; program?: string; date?: string; format?: string; payment?: string; investment?: string };',
    'type TrainingPayload = { type?: string; name?: string; email?: string; whatsapp?: string; company?: string; position?: string; program?: string; date?: string; format?: string; payment?: string; participants?: string; investment?: string };',
    "pdf payload type",
)
pdf = replace_once(
    pdf,
    'y = field("Format", payload.format, y); y = field("Jadwal", payload.date, y); y = field("Investasi", payload.investment, y);',
    'y = field("Format", payload.format, y); y = field("Jumlah Peserta", payload.participants || "1 Orang", y); y = field("Jadwal", payload.date, y); y = field("Investasi", payload.investment, y);',
    "pdf participant field",
)
pdf_path.write_text(pdf, encoding="utf-8")

# WhatsApp API: preserve participant count in the encoded PDF payload.
wa_path = Path("app/api/whatsapp/training-confirmation/route.ts")
wa = wa_path.read_text(encoding="utf-8")
wa = replace_once(
    wa,
    '  payment?: string;\n  investment?: string;',
    '  payment?: string;\n  participants?: string;\n  investment?: string;',
    "wa payload type",
)
wa = replace_once(
    wa,
    '    payment: clean(payload.payment),\n    investment: clean(payload.investment),',
    '    payment: clean(payload.payment),\n    participants: clean(payload.participants),\n    investment: clean(payload.investment),',
    "wa normalized payload",
)
wa_path.write_text(wa, encoding="utf-8")

print("V16 In-House participants + dynamic investment + shipping addressee applied")
