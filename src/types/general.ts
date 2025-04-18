import { ImageField, KeyTextField, LinkField } from "@prismicio/client";

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
    site_title: KeyTextField;
    site_logo: ImageField;
    marqueetext: KeyTextField;
    centeredtitle: KeyTextField;
    double_button_title: KeyTextField;
    nav_items: {
        link_label: KeyTextField;
        link_url: LinkField;
    }[];
}

export interface DoubleButtonProps {
    buttonTitle?: string;
    type?: IconType;
    field?: LinkField;
    className?: string;
}

export type IconType =
    'arrowRight' |
    'arrowLeft' |
    'arrowUp' |
    'arrowDown' |
    'arrowUpRight' |
    'arrowUpLeft' |
    'arrowDownRight' |
    'arrowDownLeft';