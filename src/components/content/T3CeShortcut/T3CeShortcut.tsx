// src/components/T3CeShortcut.tsx

import React from "react";
import T3Renderer from "@components/layout/T3Renderer/T3Renderer";
import type { T3ContentElement } from "@/types";
import type { T3CeBaseProps } from "@/types/content/index";

interface T3CeShortcutProps {
  shortcut: Array<T3ContentElement<T3CeBaseProps>>;
}

const T3CeShortcut: React.FC<T3CeShortcutProps> = ({ shortcut }) => {
  return (
    <div>
      <T3Renderer content={shortcut} />
    </div>
  );
};

export default T3CeShortcut;
