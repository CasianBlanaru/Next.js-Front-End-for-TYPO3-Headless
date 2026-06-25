import { GsapAnimatedContent } from './GsapAnimatedContent';

export function ContentElement({ content, children }) {
  const animationSettings = content?._gsap;
  const pixelcodaData = content?._pixelcoda;
  const hasAnimation = animationSettings && animationSettings.animation;

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

  const ContentWrapper = hasAnimation ? GsapAnimatedContent : 'div';
  const wrapperProps = hasAnimation 
    ? { animationSettings, ...editingAttributes }
    : editingAttributes;

  return <ContentWrapper {...wrapperProps}>{children}</ContentWrapper>;
}
