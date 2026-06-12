import React, { Suspense } from "react";
import type { ComponentType } from "react";
import componentMap from "@hooks/componentMap";
import ComponentErrorBoundary from "@components/layout/ComponentErrorBoundary";
import { getActiveSkin } from "@config/skin";

export interface RegistryOptions {
  skin?: string;
  fallback?: ComponentType<any>;
}

const skinOverrides: Record<string, Record<string, ComponentType<any>>> = {
  premium: {}
};

export const getComponent = (type: string, options: RegistryOptions = {}) => {
  const activeSkin = getActiveSkin();
  const { skin = activeSkin, fallback } = options;
  const normalizedType = type.toLowerCase().trim();
  if (skinOverrides[skin] && (skinOverrides[skin][normalizedType] || skinOverrides[skin][type])) {
    return skinOverrides[skin][normalizedType] || skinOverrides[skin][type];
  }
  return componentMap[normalizedType] || componentMap[type] || fallback || componentMap.default;
};

export const DynamicComponentRenderer: React.FC<{ type: string; props: any; options?: RegistryOptions }> = ({ type, props, options }) => {
  const Component = getComponent(type, options);
  if (!Component) return React.createElement("div", { className: "p-4 border border-dashed border-slate-300 text-slate-400 rounded-md text-sm italic" }, `Component "${type}" not found.`);
  return React.createElement(ComponentErrorBoundary, null, React.createElement(Suspense, { fallback: React.createElement("div", { className: "animate-pulse bg-slate-100 h-24 rounded-md" }) }, React.createElement(Component, props)));
};