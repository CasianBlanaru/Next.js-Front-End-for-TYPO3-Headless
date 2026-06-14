import type { ReactNode } from 'react';

export interface LayoutRendererProps {
  title?: string;
  children?: ReactNode;
}

function DefaultLayout({ children }: LayoutRendererProps) {
  return <>{children}</>;
}

function OneColumnLayout({ children }: LayoutRendererProps) {
  return <div className="grid gap-8">{children}</div>;
}

function TwoColumnLayout({ children }: LayoutRendererProps) {
  return <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">{children}</div>;
}

function ThreeColumnLayout({ children }: LayoutRendererProps) {
  return <div className="grid gap-8 lg:grid-cols-3">{children}</div>;
}

function SidebarLeftLayout({ children }: LayoutRendererProps) {
  return <div className="grid gap-8 lg:grid-cols-[minmax(280px,1fr)_minmax(0,2fr)]">{children}</div>;
}

function SidebarRightLayout({ children }: LayoutRendererProps) {
  return <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">{children}</div>;
}

const layoutRegistry = {
  default: DefaultLayout,
  'one-column': OneColumnLayout,
  'two-column': TwoColumnLayout,
  'three-column': ThreeColumnLayout,
  'sidebar-left': SidebarLeftLayout,
  'sidebar-right': SidebarRightLayout,
  landingpage: OneColumnLayout,
  news: OneColumnLayout,
};

export type LayoutIdentifier = keyof typeof layoutRegistry | string;

export function getLayoutComponent(identifier?: LayoutIdentifier) {
  const normalized = identifier?.toLowerCase().trim() ?? 'default';
  return layoutRegistry[normalized as keyof typeof layoutRegistry] ?? layoutRegistry.default;
}

export default layoutRegistry;
