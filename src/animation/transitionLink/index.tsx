'use client';

import React, { forwardRef, useCallback } from 'react';
import { useTransitionRouter } from "next-view-transitions";
import Link from 'next/link';

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
    className?: string;
    target?: string;
    rel?: string;
    scroll?: boolean;
}

const pageAnimation = () => {

    document.dispatchEvent(new Event('startViewTransition'));

    const oldAnimation = document.documentElement.animate(
        [
            {
                opacity: 1,
                transform: "scale(1)",
            },
            {
                opacity: 0.4,
                transform: "scale(0.5)",
            },
        ],
        {
            duration: 1500,
            easing: "cubic-bezier(0.87, 0, 0.13, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-old(root)",
        }
    );

    const newAnimation = document.documentElement.animate(
        [
            {
                transform: "translateY(100%)",
            },
            {
                transform: "translateY(0)",
            },
        ],
        {
            duration: 1500,
            easing: "cubic-bezier(0.87, 0, 0.13, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
        }
    );

    return Promise.all([
        oldAnimation.finished,
        newAnimation.finished
    ]).finally(() => {
        document.dispatchEvent(new Event('finishViewTransition'));
    });
};

const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
    ({ href, children, className, onClick, ...props }, ref) => {
        const router = useTransitionRouter();

        const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
            if (props.target === '_blank' || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
                if (onClick) onClick(e);
                return;
            }

            e.preventDefault();

            if (onClick) onClick(e);

            router.push(href, { onTransitionReady: pageAnimation, });
        }, [router, href, onClick, props.target]);

        return (
            <Link ref={ref} href={href} className={className} onClick={handleClick}{...props}>
                {children}
            </Link>
        );
    }
);

TransitionLink.displayName = 'TransitionLink';

export default TransitionLink;