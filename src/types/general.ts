import { ImageField } from "@prismicio/client";

export interface NavbarProps {
    locales: {
        lang: string;
        lang_name: string;
        url: string;
    }[];
    settings?: Settings;
    buttonTitle?: string;

}

export interface Settings {
    site_title: string;
    site_logo: ImageField;  
    marqueetext: string;
    centeredtitle: string;
    double_button_title: string;
    nav_items: NavItem[];
}

export interface NavItem {
    link_label: string;
    link_url: {
        id: string;
        type: string;
        uid?: string;
        url?: string;
        slug?: string;
        isBroken: boolean;
        lang: string;
        link_type: string;
        first_publication_date?: string;
        last_publication_date?: string;
    };
}