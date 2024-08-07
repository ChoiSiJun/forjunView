export interface ILocation {
  "mloc": string;
  "name_ko": string;
  "zipcode": string;
  "address": string;
  "addressDetail": string,
  "email": string,
  "tel": string
}

export interface ILocationInfoState {
  mloc:string
  name_ko:string
  name_en?:string
  name_jp?:string
  name_cn?:string
  zipcode?:string
  address?:string
  addressDetail?:string
  email?:string
  tel?:string
  fax?:string
}

export interface IFormValues extends ILocationInfoState {};

