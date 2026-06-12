import type { FetchContext, FetchOptions, FetchResponse } from 'ofetch';
import { createFetch } from 'ofetch';
import { cleanDoubleSlashes, getQuery } from 'ufo';
import { defu } from 'defu';
import type { T3Site, T3Page, T3InitialData } from "@/types";

export interface T3Api {
  $fetch: <T>(request: RequestInfo, options?: FetchOptions<'json'>) => Promise<T>;
  siteOptions: T3Site;
  apiHeaders: Record<string, string>;
  initialDataEndpoint: string;
  filterQuery: (path: string) => string;
  mapResponseHeaders: (headers: Headers) => Record<string, string>;
  getPage(path: string, options?: FetchOptions<'json'>): Promise<T3Page>;
  getInitialData(path: string, options?: FetchOptions<'json'>): Promise<T3InitialData>;
}

export class T3ApiClient implements T3Api {
  private _$fetch: ReturnType<typeof createFetch>;
  initialDataEndpoint: string;

  constructor(public siteOptions: T3Site) {
    this.initialDataEndpoint = siteOptions.api.endpoints?.initialData || '';
    this.apiHeaders = this.siteOptions.api.headers || {};

    this._$fetch = createFetch({
      defaults: {
        headers: this.apiHeaders,
        credentials: this.siteOptions.api.credentials,
        retry: false,
      },
    });
  }

  apiHeaders: Record<string, string>;

  $fetch<T>(request: RequestInfo, options?: FetchOptions<'json'>): Promise<T> {
    return this._$fetch(request, this.getOptions(options));
  }

  getPage(path = '/', options?: FetchOptions<'json'>): Promise<T3Page> {
    return this.$fetch(this.filterQuery(path), this.getOptions(options));
  }

  getInitialData(path = '/', options?: FetchOptions<'json'>): Promise<T3InitialData> {
    const isQuery = getQuery(this.initialDataEndpoint);
    const initialDataPath = !Object.keys(isQuery).length ? this.initialDataEndpoint : '';

    return this.$fetch(
      this.filterQuery(cleanDoubleSlashes(path + initialDataPath)),
      { query: isQuery ?? {}, ...this.getOptions(options) }
    );
  }

  setHeaders(fetchOptions: Record<string, string>) {
    this.siteOptions.api.headers = defu(fetchOptions, this.apiHeaders);
    this.apiHeaders = this.siteOptions.api.headers;
  }

  getOptions(options?: FetchOptions<'json'>): FetchOptions<'json'> {
    return defu(
      options,
      {
        onResponse: (context: FetchContext & { response: FetchResponse<'json'> }) => {
          if (this.siteOptions.api.proxyHeaders && context.response.headers) {
            this.apiHeaders = this.mapResponseHeaders(context.response.headers);
          }
        },
      },
      {
        headers: this.siteOptions.api.headers,
        credentials: this.siteOptions.api.credentials,
      }
    ) as FetchOptions<'json'>;
  }

  filterQuery(path: string): string {
    return path;
  }

  mapResponseHeaders(resHeaders: Headers): Record<string, string> {
    const proxyHeaders = this.siteOptions.api.proxyHeaders as string[];

    if (!proxyHeaders?.length) {
      return {};
    }

    return Object.fromEntries(
      Array.from(resHeaders.entries()).filter((header) => proxyHeaders.includes(header[0]))
    );
  }
}
