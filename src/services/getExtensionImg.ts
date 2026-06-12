import axios from 'axios';

export const getExtensionImg = async (extension: string): Promise<string> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://pwa-demo.ddev.site/headless';
  try {
    const response = await axios.get(`${baseUrl}/typo3/sysext/frontend/Resources/Public/Icons/FileIcons/${extension}.gif`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch image for extension ${extension}:`, error);
    return `${baseUrl}/typo3/sysext/frontend/Resources/Public/Icons/FileIcons/default.gif`;
  }
};
