import { apiClient } from "@/lib/apiClient/server";
import styles from "./page.module.css";
import IntroSection from "@/components/IntroSection/IntroSection";

export default async function Home() {
  // const [{ data: serviceBundles }, { data: services }, { data: partners }] =
  //   await Promise.all([
  //     apiClient.serviceBundle.getServiceBundles(),
  //     apiClient.service.getServices(),
  //     apiClient.partner.getPartners(),
  //   ]);

  // const specialOffer = serviceBundles.find(
  //   (bundle) => bundle.active !== false && bundle.specialOffer === true,
  // );

  // const specialOfferServices =
  //   specialOffer?.services.map((bundleService) => {
  //     const service = services.find((s) => s.id === bundleService.serviceId);

  //     return {
  //       name: service?.name,
  //       qty: bundleService.qty,
  //       totalPrice: (service?.price ?? 0) * bundleService.qty,
  //     };
  //   }) ?? [];

  // const totalServicesPrice = specialOfferServices.reduce(
  //   (sum, service) => sum + service.totalPrice,
  //   0,
  // );

  // const activePartners = partners.filter((partner) => partner.active !== false);

  return (
    <div className={styles.mainDiv}>
      <IntroSection />
      <div className={styles.mainPageDiv}>
        <div>{/* <ServicesSection /> */}</div>

        <div>
          {/* {specialOffer && (
            <SpecialOfferSection
              specialOffer={specialOffer}
              specialOfferServices={specialOfferServices}
              totalServicesPrice={totalServicesPrice}
            />
          )} */}
        </div>

        <div>{/* <WhyRingovet /> */}</div>
        <div>{/* <DonationSection /> */}</div>
        <div>{/* <PartnersSection partners={activePartners} /> */}</div>
        <div>{/* <BlogSection /> */}</div>
      </div>
    </div>
  );
}
