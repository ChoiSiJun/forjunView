export interface IManager {
  id: number;
  userid: string;
  name: string;
  email?: string;
  tel?: string;
  password:string;
  accessLocations:[];
};

export interface IManagerState {
  manager:IManager
}

export interface IFormValues extends IManager {};