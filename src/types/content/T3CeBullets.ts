import type { T3CeBaseProps } from "./T3CeBase";
import type { T3Link } from "../T3Link";

export interface T3CeBulletsProps {
  bodytext: Array<string | [string, string?]>;
  bulletsType?: number;
  header?: string;
  [key: string]: any;
}
