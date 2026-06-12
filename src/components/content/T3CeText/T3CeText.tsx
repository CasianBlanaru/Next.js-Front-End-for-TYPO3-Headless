import React from "react";
import T3CeHeader from "@components/content/T3CeHeader/T3CeHeader";
import T3HtmlParser from "@components/ui/T3HtmlParser/T3HtmlParser";

const T3CeText: React.FC<any> = (props) => {
  const bodyTextHtml =
    typeof props.bodytext === "string"
      ? props.bodytext
      : props.content?.bodytext || "";

  return (
    <div className="t3-ce-text">
      <T3CeHeader {...props} />

      {bodyTextHtml && (
        <T3HtmlParser content={bodyTextHtml} />
      )}
    </div>
  );
};

export default T3CeText;