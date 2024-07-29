export interface IManager {
  id: number;
  userid: string;
  name: string;
  email?: string;
  tel?: string;
  password:string;
};

export interface IManagerState {
  userid: string;
  name: string;
  email?: string;
  tel?: string;
  password:string;
};

export interface IFormValues extends IManagerState {};