import type { ComponentType } from 'react';
import componentMap from './componentMap';

interface DynamicComponentParams {
    type?: string;
    name?: string;
    fallbackComponent?: ComponentType<any>;
}

export const getT3DynamicComponent = <T = {}>(
    { type = 'default', fallbackComponent }: DynamicComponentParams = {}
): ComponentType<T> | null => {
    const normalizedType = type.trim();

    const Component =
        componentMap[normalizedType] ??
        componentMap[normalizedType.toLowerCase()] ??
        fallbackComponent;

    if (!Component) {
        console.warn(
            `Komponente vom Typ "${type}" konnte nicht gefunden werden.`
        );
        return null;
    }

    return Component as ComponentType<T>;
};