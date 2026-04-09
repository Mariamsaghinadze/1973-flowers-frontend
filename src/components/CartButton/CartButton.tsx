"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { ProductDto } from "@/lib/apiClient/generated/client";
import { getLocalizedValue } from "@/lib/utils/getLocalizedValue";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./CartButton.module.css";
import { getProductsByIds } from "@/lib/services/products/ProductsService";
import Link from "next/link";
import { Button } from "../ui/button";

type CartProduct = ProductDto & {
  quantity: number;
  lineTotal: number;
};

export default function CartButton() {
  const { cartItems } = useCart();
  const locale = useLocale();
  const t = useTranslations("Cart");

  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (!isOpen) return;

    const ids = cartItems.map((item) => item.productId).filter(Boolean);

    if (!ids.length) {
      setProducts([]);
      return;
    }

    let cancelled = false;

    const loadProducts = async () => {
      try {
        setIsLoading(true);

        const response = await getProductsByIds({
          productIds: ids,
        });

        if (!cancelled) {
          setProducts(response ?? []);
        }
      } catch (error) {
        console.error("Failed to load cart products", error);
        if (!cancelled) {
          setProducts([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [isOpen, cartItems]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) return;

      if (!wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const cartProducts = useMemo<CartProduct[]>(() => {
    return cartItems
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;

        return {
          ...product,
          quantity: item.quantity,
          lineTotal: product.price * item.quantity,
        };
      })
      .filter((item): item is CartProduct => item !== null);
  }, [cartItems, products]);

  const grandTotal = cartProducts.reduce(
    (sum, item) => sum + item.lineTotal,
    0,
  );

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.cartButton}
        aria-label={t("cart")}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg
          className={styles.cartIcon}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 4H5L7.2 14.4C7.3 14.9 7.7 15.2 8.2 15.2H17.4C17.9 15.2 18.3 14.9 18.4 14.4L20 7H6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="19" r="1.5" fill="currentColor" />
          <circle cx="17" cy="19" r="1.5" fill="currentColor" />
        </svg>

        {totalQuantity > 0 && (
          <span className={styles.badge}>{totalQuantity}</span>
        )}
      </button>

      {isOpen && (
        <div className={styles.popover}>
          {isLoading ? (
            <div className={styles.empty}>{t("loading")}</div>
          ) : cartProducts.length > 0 ? (
            <>
              <div className={styles.list}>
                {cartProducts.map((product) => {
                  const image = product.images?.[0];

                  return (
                    <div key={product.id} className={styles.item}>
                      <div className={styles.itemImageWrap}>
                        {image ? (
                          <Image
                            src={image}
                            alt={"product image"}
                            fill
                            className={styles.itemImage}
                          />
                        ) : (
                          <div className={styles.itemImagePlaceholder} />
                        )}
                      </div>

                      <div className={styles.itemContent}>
                        <p className={styles.itemName}>
                          {getLocalizedValue(product.name, locale)}
                        </p>

                        <p className={styles.itemMeta}>
                          {t("quantity")}: {product.quantity}
                        </p>

                        <p className={styles.itemPrice}>
                          {(product.lineTotal / 100).toFixed(2)} ₾
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.footer}>
                <span className={styles.totalLabel}>{t("total")}</span>
                <span className={styles.totalValue}>
                  {(grandTotal / 100).toFixed(2)} ₾
                </span>
              </div>
              <Link href="/cart" className={styles.checkoutLink}>
                <Button className={styles.checkoutButton}>{t("buyNow")}</Button>
              </Link>
            </>
          ) : (
            <div className={styles.empty}>{t("empty")}</div>
          )}
        </div>
      )}
    </div>
  );
}
