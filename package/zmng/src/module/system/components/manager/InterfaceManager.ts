export interface IManager {
  id: number;
  userid: string;
  name: string;
  email?: string;
  tel?: string;
  password:string;
  mlocs:string;
};

export interface IManagerState {
  userid: string;
  name: string;
  email?: string;
  tel?: string;
  password:string;
  mlocs:string;
};

export interface IFormValues extends IManagerState {};