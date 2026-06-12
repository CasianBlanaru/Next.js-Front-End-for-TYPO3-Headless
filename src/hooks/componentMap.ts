import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const T3CeText = dynamic(() => import("@components/content/T3CeText/T3CeText"));
const T3CeTextpic = dynamic(() => import("@components/content/T3CeTextpic/T3CeTextpic"));
const T3CeHeader = dynamic(() => import("@components/content/T3CeHeader/T3CeHeader"));
const T3CeBullets = dynamic(() => import("@components/content/T3CeBullets/T3CeBullets"));
const T3CeUploads = dynamic(() => import("@components/content/T3CeUploads/T3CeUploads"));
const T3CeTable = dynamic(() => import("@components/content/T3CeTable/T3CeTable"));
const T3CeMenuPages = dynamic(() => import("@components/navigation/T3CeMenuPages/T3CeMenuPages"));
const T3CeMenuSubpages = dynamic(() => import("@components/navigation/T3CeMenuSubpages/T3CeMenuSubpages"));
const T3CeMenuSitemapPages = dynamic(() => import("@components/navigation/T3CeMenuSitemapPages/T3CeMenuSitemapPages"));
const T3CeMenuAbstract = dynamic(() => import("@components/navigation/T3CeMenuAbstract/T3CeMenuAbstract"));
const T3MediaGallery = dynamic(() => import("@components/content/T3MediaGallery/T3MediaGallery"));
const T3CeShortcut = dynamic(() => import("@components/content/T3CeShortcut/T3CeShortcut"));
const T3CeHtml = dynamic(() => import("@components/content/T3CeHtml/T3CeHtml"));
const T3CeImage = dynamic(() => import("@components/content/T3CeImage/T3CeImage"));
const T3CeDiv = dynamic(() => import("@components/content/T3CeDiv/T3CeDiv"));
const T3CeDefault = dynamic(() => import("@components/content/T3CeDefault/T3CeDefault"));
const T3CeNewsList = dynamic(() => import("@components/content/T3CeNews/T3CeNewsList"));
const T3CeNewsDetail = dynamic(() => import("@components/content/T3CeNews/T3CeNewsDetail"));
const T3Frame = dynamic(() => import("@components/layout/T3Frame/T3Frame"));

const componentMap: { [key: string]: ComponentType<any> } = {
  text: T3CeText,
  textpic: T3CeTextpic,
  textmedia: T3CeTextpic,
  header: T3CeHeader,
  bullets: T3CeBullets,
  uploads: T3CeUploads,
  table: T3CeTable,
  shortcut: T3CeShortcut,
  html: T3CeHtml,
  image: T3CeImage,
  div: T3CeDiv,
  default: T3CeDefault,
  menu_pages: T3CeMenuPages,
  menu_subpages: T3CeMenuSubpages,
  menu_sitemap_pages: T3CeMenuSitemapPages,
  news_list: T3CeNewsList,
  news_detail: T3CeNewsDetail,
  headless_news: T3CeNewsList,
  T3Frame: T3Frame,
  link: dynamic(() => import("@components/navigation/T3Link/T3Link")),
  mediaFile: dynamic(() => import("@components/media/MediaFile/MediaFile")),
  localeSwitcher: dynamic(() => import("@components/navigation/T3LocaleSwitcher/T3LocaleSwitcher")),
  backendLayout: dynamic(() => import("@components/layout/T3BackendLayout/T3BackendLayout")),
  CustomLayout: dynamic(() => import("@components/layout/CustomLayout")),
  DefaultLayout: dynamic(() => import("@components/layout/DefaultLayout")),
};

export default componentMap;
