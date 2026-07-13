import type { T3CeBaseProps } from "./T3CeBase";

export interface T3CeTableProps extends T3CeBaseProps {
  tableCaption: string
  tableHeaderPosition: number
  tableClass: string
  tableTfoot: string
  bodytext: string[][]
}
