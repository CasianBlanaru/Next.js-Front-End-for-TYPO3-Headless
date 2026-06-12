"use client";

import React, { useCallback, useEffect, useRef } from "react";

interface T3HtmlParserProps {
    content: string;
}

const T3HtmlParser: React.FC<T3HtmlParserProps> = ({ content }) => {
    const htmlParserRef = useRef<HTMLDivElement | null>(null);
    const linksRef = useRef<HTMLCollectionOf<HTMLAnchorElement> | null>(null);

    const redirect = useCallback((e: MouseEvent, target: HTMLAnchorElement) => {
        const href = target.getAttribute("href");
        const hrefTarget = target.getAttribute("target");
        const isCtrlKeyPressed = e.ctrlKey || e.metaKey;
        const openInNewTab =
            (hrefTarget && hrefTarget === "_blank") || isCtrlKeyPressed;

        if (href && href[0] === "/" && !openInNewTab) {
            e.preventDefault();
            // Use Next.js router for navigation
            // Implement your navigation logic here (using Next.js router)
            // Example: router.push(href);
        }
    }, []);

    const navigate = useCallback((e: MouseEvent) => {
        let target = e.target as HTMLElement;
        let i = 0;

        while (
            i < 5 &&
            !(target instanceof HTMLAnchorElement) &&
            target &&
            target.parentNode
        ) {
            target = target.parentNode as HTMLElement;
            i++;
        }

        if (!(target instanceof HTMLAnchorElement)) {
            return;
        }

        redirect(e, target);
    }, [redirect]);

    const addListeners = useCallback(() => {
        linksRef.current =
            htmlParserRef.current?.getElementsByTagName("a") || null;
        if (linksRef.current) {
            for (let i = 0; i < linksRef.current.length; i++) {
                linksRef.current[i]?.addEventListener("click", navigate);
            }
        }
    }, [navigate]);

    const removeListeners = useCallback(() => {
        if (linksRef.current) {
            for (let i = 0; i < linksRef.current.length; i++) {
                linksRef.current[i]?.removeEventListener("click", navigate);
            }
            linksRef.current = null;
        }
    }, [navigate]);

    useEffect(() => {
        if (htmlParserRef.current) {
            addListeners();
        }
        return () => {
            removeListeners();
        };
    }, [content, addListeners, removeListeners]);

    return (
        <div
            ref={htmlParserRef}
            className="t3-ce-rte"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

export default T3HtmlParser;
