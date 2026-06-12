import React from "react";
import type { T3ContentElement } from "@/types";
import type { T3CeBaseProps } from "@/types/content";
import { DynamicComponentRenderer, getComponent } from "@/registry";

interface T3RendererProps {
    content?: T3ContentElement<T3CeBaseProps>[];
    frame?: boolean;
}

interface FrameProps {
    id: string;
    frameClass: string;
    layout: string;
    spaceAfter: string;
    spaceBefore: string;
    background?: string;
    children: React.ReactNode;
}

const T3Renderer: React.FC<T3RendererProps> = ({
    content = [],
    frame = true,
}) => {
    const renderComponent = (
        element: T3ContentElement<T3CeBaseProps>,
        index: number
    ) => {
        const { id, type, appearance, ...restContent } = element;

        const componentProps = {
            uid: id,
            appearance: appearance,
            index: index,
            ...(restContent.content ?? {}),
        };

        return (
            <div
                key={id}
                data-t3-uid={id}
                data-t3-type={type}
                data-t3-colpos={element.colPos ?? ''}
                data-t3-component={type}
                className="pixelcoda-t3-element"
            >
                <DynamicComponentRenderer
                    type={type}
                    props={componentProps}
                />
            </div>
        );
    };

    const renderFrame = (
        element: T3ContentElement<T3CeBaseProps>,
        index: number
    ) => {
        const FrameComponent = getComponent("T3Frame");

        if (!FrameComponent) {
            return renderComponent(element, index);
        }

        return (
            <FrameComponent
                key={element.id}
                id={`c${element.id}`}
                frameClass={element.appearance?.frameClass ?? "default"}
                layout={element.appearance?.layout ?? "default"}
                spaceAfter={element.appearance?.spaceAfter ?? "default"}
                spaceBefore={element.appearance?.spaceBefore ?? "default"}
                background={element.appearance?.background}
            >
                {renderComponent(element, index)}
            </FrameComponent>
        );
    };

    return (
        <>
            {content.map((component, index) => (
                <React.Fragment key={component.id ?? index}>
                    {frame &&
                    component.appearance?.frameClass &&
                    component.appearance.frameClass !== "none"
                        ? renderFrame(component, index)
                        : renderComponent(component, index)}
                </React.Fragment>
            ))}
        </>
    );
};

export default T3Renderer;
