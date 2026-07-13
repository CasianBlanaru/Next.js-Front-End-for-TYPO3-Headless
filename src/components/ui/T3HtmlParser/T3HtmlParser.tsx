"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface T3HtmlParserProps {
    content: string;
}

const T3HtmlParser: React.FC<T3HtmlParserProps> = ({ content }) => {
    const htmlParserRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const linksRef = useRef<NodeListOf<HTMLAnchorElement> | null>(null);

    const redirect = useCallback((e: MouseEvent, target: HTMLAnchorElement) => {
        const href = target.getAttribute("href");
        const hrefTarget = target.getAttribute("target");
        const isCtrlKeyPressed = e.ctrlKey || e.metaKey;
        const openInNewTab =
            (hrefTarget && hrefTarget === "_blank") || isCtrlKeyPressed;

        if (href && href[0] === "/" && !openInNewTab) {
            e.preventDefault();
            router.push(href);
        }
    }, [router]);

    const navigate = useCallback((e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest('a');
        if (target) {
            redirect(e, target);
        }
    }, [redirect]);

    const addListeners = useCallback(() => {
        // Query all anchor tags within the parsed HTML content
        const links = htmlParserRef.current?.querySelectorAll<HTMLAnchorElement>('a');
        linksRef.current = links || null;
        linksRef.current?.forEach(link => link.addEventListener('click', navigate));
    }, [navigate]);

    const removeListeners = useCallback(() => {
        linksRef.current?.forEach(link => link.removeEventListener('click', navigate));
        linksRef.current = null; // Clear the ref after removing listeners
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
