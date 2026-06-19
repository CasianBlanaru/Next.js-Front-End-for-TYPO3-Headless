import axios from 'axios';
import { T3Page, T3Site } from "@/types";

export const getPage = async (path: string, siteOptions: T3Site): Promise<T3Page | null> => {
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  const url = `${siteOptions.api.baseUrl}/${siteOptions.locale || 'de'}/${normalizedPath}`;

  try {
    const response = await axios.get<T3Page>(url, {
      headers: siteOptions.api.headers,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('API Fetch Error:', error.message);
    } else {
      console.error('API Fetch Error:', error);
    }
    return null;
  }
};
