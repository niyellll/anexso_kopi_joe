import { CartCheckoutV2 } from "../cart-checkout-v2";
import { CartRulesMigration } from "../cart-rules";
import { BenefitStrip, PageShell } from "../site-ui";

export default function CartPage() {
  return (
    <PageShell>
      <main>
        <CartRulesMigration />
        <section className="checkout-steps">
          <div className="container step-grid">
            <div className="active"><b>1</b><span><strong>Keranjang</strong>Review produk</span></div>
            <div><b>2</b><span><strong>Pengiriman</strong>Finalkan ongkir</span></div>
            <div><b>3</b><span><strong>Pembayaran</strong>Setelah total final</span></div>
            <div><b>4</b><span><strong>Konfirmasi</strong>Selesai</span></div>
          </div>
        </section>
        <CartCheckoutV2 />
        <BenefitStrip items={[
          ["◉", "100% Biji Kopi Pilihan", "Tanpa campuran & pengawet"],
          ["▣", "Pengemasan Premium", "Menjaga kesegaran kopi"],
          ["🚚", "Pengiriman Sesuai Produk", "Kurir nasional / GoSend / tanpa ongkir"],
          ["♡", "Transaksi Aman", "Pembayaran setelah total akhir final"],
        ]} />
      </main>
    </PageShell>
  );
}
