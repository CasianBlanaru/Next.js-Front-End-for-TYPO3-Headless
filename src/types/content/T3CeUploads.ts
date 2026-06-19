import type { T3CeBaseProps } from "./T3CeBase";
import type { T3Link } from "../T3Link";
import type { T3File } from "../T3File";

export interface T3CeUploadsProps extends T3CeBaseProps {
  media?: T3File[];
  target?: "_blank" | "_parent" | "_self" | "_top" | string | null;
  displayFileSizeInformation?: boolean;
  displayDescription?: boolean;
  displayInformation?: "1" | "2";
}
