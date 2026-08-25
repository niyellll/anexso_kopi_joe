import { RegistrationForm } from "../../commerce-widgets-v14";
import { PageShell } from "../../site-ui";
import { tqPrograms } from "../../site-data";

export default async function RegistrationPage({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){const sp=await searchParams; const slug=typeof sp.program==="string"?sp.program:"the-new-manager"; const program=tqPrograms.find(p=>p.slug===slug)||tqPrograms[1]; return <PageShell active="TQ Business"><main><section className="registration-steps"><div className="container step-grid"><div className="active"><b>1</b><span><strong>Pilih Program & Daftar</strong></span></div><div><b>2</b><span><strong>Pilih Jadwal & Format</strong></span></div><div><b>3</b><span><strong>Pembayaran</strong></span></div><div><b>4</b><span><strong>Konfirmasi</strong></span></div></div></section><RegistrationForm program={program}/></main></PageShell>}
