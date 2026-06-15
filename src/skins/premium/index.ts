export { default as PremiumLayout } from './PremiumLayout';
export { default as PremiumHero } from './PremiumHero';
export { default as PremiumFeatureGrid } from './PremiumFeatureGrid';
export { default as PremiumNewsList } from './PremiumNewsList';
export { default as PremiumCTA } from './PremiumCTA';

export const premiumSkin = {
  name: 'premium',
  components: ['PremiumLayout', 'PremiumHero', 'PremiumFeatureGrid', 'PremiumNewsList', 'PremiumCTA'],
};
