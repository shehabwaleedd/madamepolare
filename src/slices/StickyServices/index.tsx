import React from 'react';
import { Content, FilledContentRelationshipField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from '@prismicio/next';
import { createClient } from '@/prismicio';
import styles from "./style.module.scss";
import TransitionLink from '@/animation/transitionLink';

export type StickyServicesProps =
  SliceComponentProps<Content.StickyServicesSlice>;

type FilledServiceRelationship = FilledContentRelationshipField<"service_post">;

const isFilledServiceRelationship = (
  field: Content.StickyServicesSliceDefaultPrimaryStickyCardItem['sticky_card']
): field is FilledServiceRelationship => {
  return field.link_type === 'Document' && 'id' in field;
};

const fetchServiceData = async (slice: Content.StickyServicesSlice) => {
  const client = createClient();

  const serviceIds = slice.primary.sticky_card
    ?.map(item => {
      if (isFilledServiceRelationship(item.sticky_card)) {
        return item.sticky_card.id;
      }
      return null;
    })
    .filter((id): id is string => id !== null) || [];

  const enServices = await client.getAllByType('service_post', { lang: 'en-us' });
  const frServices = await client.getAllByType('service_post', { lang: 'fr-fr' });
  const allServices = [...enServices, ...frServices];

  const filteredServices = serviceIds
    .map(id => allServices.find(service => service.id === id))
    .filter((service): service is typeof allServices[0] => service !== undefined);

  return filteredServices;
};

const StickyServices = async ({ slice }: StickyServicesProps) => {
  const { section_eyebrow, section_title, sticky_card, is_sticky } = slice.primary;

  const services = await fetchServiceData(slice);

  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} data-is-sticky={is_sticky} className={styles.stickyServices}>
      <div className={styles.header}>
        {section_eyebrow && (
          <span className={styles.eyebrow}>{section_eyebrow}</span>
        )}
        {section_title && (
          <h2 className={styles.title}>{section_title}</h2>
        )}
      </div>

      <div className={styles.cardsContainer}>
        {sticky_card.map((item, index) => {
          const cardId = isFilledServiceRelationship(item.sticky_card)
            ? item.sticky_card.id
            : undefined;

          const service = cardId
            ? services.find(s => s.id === cardId)
            : undefined;

          if (!service) return null;

          return (
            <TransitionLink key={service.id} href={`/services/${service.uid}`} className={styles.cardLink} style={{ backgroundColor: item.card_background_color || "#ffffff", color: item.card_text_color || "#000000", top: is_sticky ? `calc(-2vh + ${index * 8.75}vh)` : 'auto' }}>
              <div className={styles.card}>
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{service.data.title}</h3>
                    <p style={{ color: item.card_text_color || "#fff" }} className={styles.tagline}>{service.data.tagline}</p>
                  </div>
                  <div className={styles.cardDescription}>
                    <div className={styles.featuresTop}>
                      <span className={styles.indicator}>•</span>
                    </div>
                    <div className={styles.featuresBottom}>
                      {service.data.service_items?.map((serviceItem, i) => (
                        <p style={{ color: item.card_text_color || "#fff" }} key={i}>• {serviceItem.item}</p>
                      ))}
                    </div>
                  </div>
                  <div className={styles.cardImage}>
                    {service.data.main_image?.url ? (
                      <PrismicNextImage field={service.data.main_image} className={styles.image} />
                    ) : (
                      <div className={styles.imagePlaceholder} />
                    )}
                  </div>
                </div>
              </div>
            </TransitionLink>
          );
        })}
      </div>
    </section>
  );
};

export default StickyServices;