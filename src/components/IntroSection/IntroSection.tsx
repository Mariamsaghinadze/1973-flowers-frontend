import Image from "next/image";
import styles from "./IntroSection.module.css";

import logoOnRed from "../../../public/assets/logoOnRed.png";

export default function IntroSection() {
  return (
    <section className={styles.section} id="section">
      <Image
        src={logoOnRed}
        alt="logo on red"
        className={styles.logo}
        width={400}
        height={400}
      />
    </section>
  );
}
