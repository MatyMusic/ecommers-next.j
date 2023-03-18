import styles from "./styles.module.scss";

export default function Payment() {
  return (
    <div className={styles.footer__payment}>
      <h3>אני מאשר</h3>
      <div className={styles.footer__flexwrap}>
        <img  src="../../../images/payment/visa.webp" />
        <img  src="../../../images/payment/mastercard.webp" />
        <img  src="../../../images/payment/paypal.webp" />
      </div>
    </div>
  );
}
