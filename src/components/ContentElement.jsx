"use client";

export function ContentElement({ content, children }) {
  const pixelcodaData = content?._pixelcoda;

  const editingAttributes = {};
  if (pixelcodaData?.uid) {
    editingAttributes['data-t3-uid'] = pixelcodaData.uid;
    editingAttributes['data-t3-type'] = pixelcodaData.ctype;
    if (pixelcodaData.pid) {
      editingAttributes['data-t3-pid'] = pixelcodaData.pid;
    }
    if (pixelcodaData.backendEditUrl) {
      editingAttributes['data-backend-edit-url'] = pixelcodaData.backendEditUrl;
    }
  }

  // GSAP animations temporarily disabled due to Turbopack module loading issues
  // Will be re-enabled after investigating Turbopack compatibility
  return <div {...editingAttributes}>{children}</div>;
}
