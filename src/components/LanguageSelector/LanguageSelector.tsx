"use client";

import flagGeorgia from "../../../public/assets/flag_georgia.svg";
import flagUS from "../../../public/assets/flag_us.svg";
import { Button } from "../ui/button";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";

import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import styles from "./LanguageSelector.module.css";

import clsx from "clsx";
import language from "../../../public/assets/language.svg";

export default function LanguageSelector() {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentValue = locale === "en" ? "EN" : "KA";
  const qs = searchParams?.toString();
  const href = `${pathname}${qs ? `?${qs}` : ""}`;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={styles.trigger}>
          <Image src={language} alt="language" width={16} height={16} />
          <span className={styles.languageText}>{currentValue}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className={styles.content}>
        <DropdownMenuRadioGroup value={currentValue} className={styles.group}>
          <Link href={href} locale="en" className={styles.link}>
            <DropdownMenuRadioItem
              value="EN"
              className={clsx(
                styles.item,
                currentValue === "EN" && styles.activeItem,
              )}
            >
              <span className={styles.itemInner}>
                <Image
                  src={flagUS}
                  alt="American flag"
                  width={18}
                  height={18}
                />
                <span className={styles.itemText}>English</span>
              </span>
            </DropdownMenuRadioItem>
          </Link>
          <DropdownMenuSeparator className="bg-[var(--red)]" />

          <Link href={href} locale="ka" className={styles.link}>
            <DropdownMenuRadioItem
              value="KA"
              className={clsx(
                styles.item,
                currentValue === "KA" && styles.activeItem,
              )}
            >
              <span className={styles.itemInner}>
                <Image
                  src={flagGeorgia}
                  alt="Georgian flag"
                  width={18}
                  height={18}
                />
                <span className={styles.itemText}>ქართული</span>
              </span>
            </DropdownMenuRadioItem>
          </Link>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
