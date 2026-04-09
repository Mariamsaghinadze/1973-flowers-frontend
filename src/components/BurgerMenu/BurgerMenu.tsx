"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Link } from "@/i18n/navigation";
import styles from "./BurgerMenu.module.css";
import { usePathname } from "@/i18n/navigation";

export default function BurgerMenu({ className }: { className?: string }) {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className={className}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="px-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
            >
              <path
                d="M0 12V10H18V12H0ZM0 7V5H18V7H0ZM0 2V0H18V2H0Z"
                fill="#374151"
              />
            </svg>
          </Button>
        </SheetTrigger>

        <SheetContent side="left" onCloseAutoFocus={(e) => e.preventDefault()}>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col gap-4 p-4">
            <Link
              onClick={() => setOpen(false)}
              className={`${styles.NavLink} ${pathname === "/" ? styles.active : ""}`}
              href="/"
            >
              {t("Home")}
            </Link>

            <Link
              onClick={() => setOpen(false)}
              className={`${styles.NavLink} ${pathname === "/#products" ? styles.active : ""}`}
              href="/#products"
            >
              {t("Bouquets")}
            </Link>

            <Link
              onClick={() => setOpen(false)}
              className={styles.NavLink}
              href="/#contactUs"
            >
              {t("Contact")}
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
