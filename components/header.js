import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Logo from "../public/assets/logo.png";

export default function Header() {
  return (
    <section className={styles.header}>
      <section className={styles.navbar}>
        <Image src={Logo} alt="Namada Logo" className={styles.logo} />
        <section className={styles.menu}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
          <Link href="/validators" className={styles.link}>
            Validators
          </Link>
          <Link href="/blocks" className={styles.link}>
            Blocks
          </Link>
          <Link href="/transactions" className={styles.link}>
            Transactions
          </Link>
          <Link href="/proposals" className={styles.link}>
            Proposals
          </Link>
        </section>
      </section>
    </section>
  );
}
