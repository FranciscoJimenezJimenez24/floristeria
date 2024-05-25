export interface ApiResponse {
    ok: boolean;
    message?: string | undefined;
    data?: any;
    permises?: Permises | undefined | null;
  }
  
  export interface Permises {
    add: boolean;
    edit: boolean;
    delete: boolean;
  }
