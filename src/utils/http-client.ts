import fetch from 'node-fetch';

export interface IHttpClientOptions {
  headers?: HeadersInit;
}

const defaultHeaders: HeadersInit = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export class HttpClient {
  private lastId = 0;
  private headers = defaultHeaders;

  constructor(private url: string, private options?: IHttpClientOptions) {
    this.headers = { ...defaultHeaders, ...(options?.headers || {}) };
  }

  public get(path: string): Promise<any> {
    return fetch(this.url + path, {
      method: 'GET',
      headers: this.headers,
    }).then(async (res) => {
      const response = await res.json();
      //  console.log('RPC client', 'response', response);
      return response;
    });
  }

  public post(path: string, body: Record<string, unknown>): Promise<any> {
    return fetch(this.url + path, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    }).then((response) => {
      return response.json();
    });
  }

  public jsonRpc(method: string, params: any[] = []): Promise<any> {
    const id = this.lastId++;
    const body = {
      jsonrpc: '2.0',
      id,
      method,
      params: Array.isArray(params) ? params : [params],
    };

    // console.log('RPC client', 'request', this.url, body);
    return this.post('', body).then(async (res) => {
      return res.result;
    });
  }
}
