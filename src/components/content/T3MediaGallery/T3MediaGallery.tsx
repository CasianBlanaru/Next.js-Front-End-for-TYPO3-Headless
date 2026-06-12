import React from "react";
import { T3CeGalleryProps } from "@/types";
import { T3Gallery } from "@/types/T3Gallery";
import { useT3MediaGallery } from "./useT3MediaGallery";
import MediaFile from "@components/media/MediaFile/MediaFile";

const T3MediaGallery: React.FC<T3CeGalleryProps> = ({
    gallery,
    children,
}) => {
    const { galleryClassList } = useT3MediaGallery(gallery);

    if (!gallery) {
        return null;
    }

    const position = gallery.position ?? {};
    const count = gallery.count ?? { files: 0 };
    const rows = gallery.rows ?? {};

    return (
        <div className={galleryClassList.join(" ")}>
            {children && (
                <div className="t3-ce-gallery__before">
                    {children}
                </div>
            )}

            {position.vertical === "below" && (
                <div className="t3-ce-gallery__text">
                    {children}
                </div>
            )}

            {count.files > 0 && (
                <div className="t3-ce-gallery__container">
                    {Object.entries(rows).map(([rowKey, row]) => {
                        const rowData =
                            row as T3Gallery["rows"][string];

                        return (
                            <div
                                key={rowKey}
                                className="t3-ce-gallery__row"
                            >
                                {Object.entries(
                                    rowData.columns ?? {}
                                ).map(([colKey, col]) => (
                                    <div
                                        key={`${rowKey}-${colKey}`}
                                        className="t3-ce-gallery__col"
                                    >
                                        <MediaFile file={col} />
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            )}

            {(position.vertical === "above" ||
                position.vertical === "intext") && (
                <div className="t3-ce-gallery__text">
                    {children}
                </div>
            )}

            {children && (
                <div className="t3-ce-gallery__after">
                    {children}
                </div>
            )}
        </div>
    );
};

export default T3MediaGallery;