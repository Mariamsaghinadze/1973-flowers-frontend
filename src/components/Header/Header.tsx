"use client";

import styles from "./Header.module.css";

import BurgerMenu from "../BurgerMenu/BurgerMenu";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import CartButton from "../CartButton/CartButton";
import { useTranslations } from "next-intl";
import Image from "next/image";
import LogoOnWhite from "../../../public/assets/logoOnWhite.png";
import { Link, usePathname } from "@/i18n/navigation";

export default function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();

  return (
    <div className={styles.Header}>
      <div className={styles.LeftContainer}>
        <Link href="/" className={styles.logoLink}>
          <Image src={LogoOnWhite} alt="Logo" className={styles.logo} />
        </Link>
      </div>

      <div className={styles.MiddleContainer}>
        <nav className={styles.Nav}>
          <Link
            className={`${styles.NavLink} ${pathname === "/#products" ? styles.active : ""}`}
            href="/#products"
          >
            {t("Bouquets")}
          </Link>

          <Link
            className={`${styles.NavLink} ${pathname === "/#contactUs" ? styles.active : ""}`}
            href="#contactUs"
          >
            {t("Contact")}
          </Link>
        </nav>
      </div>

      <div className={styles.RightContainer}>
        <CartButton />
        <LanguageSelector />
        <BurgerMenu className={styles.burgerMenu} />
      </div>
    </div>
  );
}
