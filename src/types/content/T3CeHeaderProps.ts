import type { T3CeBaseProps } from "./T3CeBase";
import type { T3Link } from "../T3Link";

export interface T3CeHeaderProps extends T3CeBaseProps {
  header?: string;
  headerLayout?: number;
  headerPosition?: string;
  headerLink?: T3Link | string;
  subheader?: string;
  tableClass: string;
  tableTfoot: string;
  bodytext: string[][];

  position: {
    horizontal: "left" | "right" | "center";
    vertical: "above" | "below" | "intext";
    noWrap?: boolean;
  };
  count: {
    files: number;
  };
  rows: {
    [key: string]: {
      columns: {
        [key: string]: any;
      };
    };
  };
  width: number;
  columnSpacing: number;
  border: {
    enabled: boolean;
    width: number;
    padding: number;
  };
  images?: string[]; //
}
