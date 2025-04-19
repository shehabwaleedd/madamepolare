import { KeyTextField, LinkField } from '@prismicio/client';

export interface SettingsDocumentData {
    footer_navigation_title?: KeyTextField;
    footer_navigation_links?: {
        link_label: KeyTextField;
        link_url: LinkField;
    }[];
    footer_social_title?: KeyTextField;
    footer_social_links?: {
        platform_name: KeyTextField;
        platform_url: LinkField;
        platform_icon: KeyTextField;
    }[];
    footer_offices?: {
        office_title: KeyTextField;
        office_address_line1: KeyTextField;
        office_address_line2: KeyTextField;
        office_phone: KeyTextField;
    }[];
    footer_newsletter_label?: KeyTextField;
    footer_newsletter_placeholder?: KeyTextField;
    footer_copyright_text?: KeyTextField;
    footer_legal_links?: {
        link_label: KeyTextField;
        link_url: LinkField;
    }[];
    footer_back_to_top_text?: KeyTextField;
}