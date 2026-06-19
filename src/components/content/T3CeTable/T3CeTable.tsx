import React, { useMemo } from "react";
import T3CeHeader from "@components/content/T3CeHeader/T3CeHeader";
import { BodyTextType, useT3CeTable } from "../T3CeTable/useT3CeTable";
import type { T3CeTableProps } from "@/types";

const T3CeTable: React.FC<T3CeTableProps> = (props) => {
    const { thead } = useT3CeTable(props);
    const tfoot = useMemo((): string[] => {
        return (
            (props.tableTfoot === "1" &&
                [...(props.bodytext as BodyTextType)].pop()) ||
            []
        );
    }, [props.bodytext, props.tableTfoot]);

    const tbody = useMemo((): string[][] => {
        const tbody = [...(props.bodytext as BodyTextType)];
        if (thead.length) {
            tbody.shift();
        }
        if (tfoot.length) {
            tbody.pop();
        }
        return tbody;
    }, [props.bodytext, thead, tfoot]);

    return (
        <div className={`t3-ce-table t3-ce-table--${props.tableClass}`}>
            <T3CeHeader
                tableCaption={props.tableCaption}
                tableHeaderPosition={props.tableHeaderPosition}
                tableClass={props.tableClass}
                tableTfoot={props.tableTfoot}
                bodytext={props.bodytext}
            />
            <table>
                {props.tableCaption && <caption>{props.tableCaption}</caption>}
                {thead?.length > 0 && (
                    <thead>
                        <tr>
                            {thead.map((col, colKey) => (
                                <th key={colKey}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                )}
                {tbody && (
                    <tbody>
                        {tbody.map((row, rowKey) => (
                            <tr key={rowKey}>
                                {row.map((col, colKey) => (
                                    <td key={colKey}>{col}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                )}
                {tfoot?.length > 0 && (
                    <tfoot>
                        <tr>
                            {tfoot.map((col, colKey) => (
                                <td key={colKey}>{col}</td>
                            ))}
                        </tr>
                    </tfoot>
                )}
            </table>
        </div>
    );
};

export default T3CeTable;
