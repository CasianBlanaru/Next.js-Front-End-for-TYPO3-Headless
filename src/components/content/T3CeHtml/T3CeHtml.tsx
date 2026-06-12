import React from "react";
import T3HtmlParser from "@components/ui/T3HtmlParser/T3HtmlParser";

interface T3CeHtmlProps {
  bodytext: string;
}

const T3CeHtml: React.FC<T3CeHtmlProps> = ({ bodytext }) => {
  return (
    <div className="t3-ce-html">
      <T3HtmlParser content={bodytext} />
    </div>
  );
};

export default T3CeHtml;
