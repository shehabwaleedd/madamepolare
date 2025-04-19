import React from 'react';
import styles from "./style.module.scss";

/**
 * Available icon types for the Icon component.
 * Currently focused on directional arrows.
 */
type IconType =
    'arrowRight' |
    'arrowLeft' |
    'arrowUp' |
    'arrowDown' |
    'arrowUpRight' |
    'arrowUpLeft' |
    'arrowDownRight' |
    'arrowDownLeft';

/**
 * Props interface for the Icon component.
 * @property {IconType} type - The type of icon to display (default: 'arrowRight')
 * @property {number} size - Size of the icon in pixels (default: 24)
 * @property {string} color - Color of the icon (default: 'currentColor')
 */
interface IconProps {
    type?: IconType;
    size?: number;
    color?: string;
}

/**
 * A dynamic Icon component that renders different SVG icons based on the provided type.
 * Currently specialized in arrow directions, but can be extended for other icons.
 */
const Icon: React.FC<IconProps> = ({
    type = 'arrowRight',
    size = 24,
    color = 'currentColor'
}) => {
    /**
     * Object containing SVG path definitions for each icon type.
     * Each entry includes the SVG path element and the viewBox attribute.
     */
    const iconPaths = {
        // Right arrow (→)
        arrowRight: {
            path: <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m7 7l7-7l-7-7" />,
            viewBox: "0 0 24 24"
        },
        // Left arrow (←)
        arrowLeft: {
            path: <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7l-7 7l7 7" />,
            viewBox: "0 0 24 24"
        },
        // Up arrow (↑)
        arrowUp: {
            path: <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14M5 12l7-7l7 7" />,
            viewBox: "0 0 24 24"
        },
        // Down arrow (↓)
        arrowDown: {
            path: <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19V5m-7 7l7 7l7-7" />,
            viewBox: "0 0 24 24"
        },
        // Up-right arrow (↗)
        arrowUpRight: {
            path: <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7h-6M17 7v6" />,
            viewBox: "0 0 24 24"
        },
        // Up-left arrow (↖)
        arrowUpLeft: {
            path: <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17L7 7M7 7h6M7 7v6" />,
            viewBox: "0 0 24 24"
        },
        // Down-right arrow (↘)
        arrowDownRight: {
            path: <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7l10 10m-10 0h6m-6 0v-6" />,
            viewBox: "0 0 24 24"
        },
        // Down-left arrow (↙)
        arrowDownLeft: {
            path: <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 7L7 17m0 0h6m-6 0v-6" />,
            viewBox: "0 0 24 24"
        }
    };

    /**
     * Select the icon based on the provided type.
     * Falls back to arrowRight if the requested type doesn't exist.
     */
    const selectedIcon = iconPaths[type] || iconPaths.arrowRight;

    return (
        <div className={styles.icon}>
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={selectedIcon.viewBox} aria-hidden="true" >
                {selectedIcon.path}
            </svg>
        </div>
    );
};

export default Icon;