"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { getLocalizedValue } from "@/lib/utils/getLocalizedValue";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import styles from "./ProductsSection.module.css";
import {
  ProductCategoryDto,
  ProductDto,
} from "@/lib/apiClient/generated/client";

interface ProductsSectionProps {
  categories: ProductCategoryDto[];
  products: ProductDto[];
}

const ALL_CATEGORY = "all";

export default function ProductsSection({
  categories,
  products,
}: ProductsSectionProps) {
  const locale = useLocale();
  const t = useTranslations("ProductSection");
  const { addToCart, increaseQuantity, decreaseQuantity, getQuantity } =
    useCart();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams?.get("category") ?? ALL_CATEGORY;
  const [searchValue, setSearchValue] = useState("");

  const visibleCategories = useMemo(() => {
    const usedIds = new Set<string>();

    products.forEach((product) => {
      (product.categoryIds ?? []).forEach((id) => usedIds.add(id));
    });

    return categories.filter((category) => usedIds.has(category.id));
  }, [products, categories]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    const sortedProducts = [...products].sort(
      (a, b) => a.sortOrder - b.sortOrder,
    );

    return sortedProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === ALL_CATEGORY ||
        (product.categoryIds ?? []).includes(selectedCategory);

      const localizedName = getLocalizedValue(product.name, locale) ?? "";
      const matchesSearch =
        !normalizedSearch ||
        localizedName.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchValue, locale]);

  const updateCategory = (categoryId: string) => {
    const params = new URLSearchParams(searchParams?.toString());

    if (categoryId === ALL_CATEGORY) {
      params.delete("category");
    } else {
      params.set("category", categoryId);
    }

    router.replace(
      params.toString() ? `${pathname}?${params.toString()}` : pathname,
      { scroll: false },
    );
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </header>

        <div className={styles.toolbar}>
          <div className={styles.searchWrap}>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filtersWrap}>
            <div className={styles.filters}>
              <button
                type="button"
                className={cn(
                  styles.filterButton,
                  selectedCategory === ALL_CATEGORY &&
                    styles.filterButtonActive,
                )}
                onClick={() => updateCategory(ALL_CATEGORY)}
              >
                {t("all")}
              </button>

              {visibleCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={cn(
                    styles.filterButton,
                    selectedCategory === category.id &&
                      styles.filterButtonActive,
                  )}
                  onClick={() => updateCategory(category.id)}
                >
                  {getLocalizedValue(category.name, locale)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className={styles.grid}>
            {filteredProducts.map((product) => {
              const image = product.images?.[0];
              const productName = getLocalizedValue(product.name, locale);
              const quantity = getQuantity(product.id);
              const isInCart = quantity > 0;

              return (
                <article key={product.id} className={styles.card}>
                  <div className={styles.imageWrap}>
                    {image ? (
                      <Image
                        src={image}
                        alt={"product image"}
                        fill
                        className={styles.cardImage}
                      />
                    ) : (
                      <div className={styles.imagePlaceholder} />
                    )}

                    <div
                      className={cn(
                        styles.imageOverlay,
                        isInCart && styles.imageOverlayVisible,
                      )}
                    >
                      <div className={styles.overlayControlShell}>
                        {isInCart ? (
                          <div className={styles.quantityControl}>
                            <button
                              type="button"
                              className={styles.quantityButton}
                              onClick={() => decreaseQuantity(product.id)}
                            >
                              −
                            </button>

                            <span className={styles.quantityValue}>
                              {quantity}
                            </span>

                            <button
                              type="button"
                              className={styles.quantityButton}
                              onClick={() => increaseQuantity(product.id)}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <>
                            <button
                              type="button"
                              className={styles.addToCartButton}
                              onClick={() => addToCart(product.id)}
                              aria-label={t("addToCart")}
                            >
                              {t("addToCart")}
                            </button>

                            <button
                              type="button"
                              className={styles.mobilePhotoAddToCartButton}
                              onClick={() => addToCart(product.id)}
                              aria-label={t("addToCart")}
                            >
                              {t("addToCart")}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{productName}</h3>

                    <div className={styles.cardDescription} />

                    <p className={styles.price}>
                      {(product.price / 100).toFixed(2)} ₾
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <span className={styles.emptyState}>
            {t("empty").toLocaleUpperCase(locale)}
          </span>
        )}
      </div>
    </section>
  );
}
