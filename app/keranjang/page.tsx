import { CartClient } from "../commerce-widgets-v14";
import { CartRulesMigration } from "../cart-rules";
import { BenefitStrip, PageShell } from "../site-ui";

export default function CartPage(){ return <PageShell><main><CartRulesMigration/><section className="checkout-steps"><div className="container step-grid"><div className="active"><b>1</b><span><strong>Keranjang</strong>Review produk</span></div><div><b>2</b><span><strong>Pengiriman</strong>Pilih alamat</span></div><div><b>3</b><span><strong>Pembayaran</strong>Pilih metode bayar</span></div><div><b>4</b><span><strong>Konfirmasi</strong>Selesai</span></div></div></section><CartClient/><BenefitStrip items={[["◉","100% Biji Kopi Pilihan","Tanpa campuran & pengawet"],["▣","Pengemasan Premium","Menjaga kesegaran kopi"],["🚚","Pengiriman Cepat & Aman","Sampai ke tangan Anda"],["♡","Garansi Kepuasan","Kepuasan Anda prioritas kami"]]}/></main></PageShell> }
