import axios from "axios"
import { IFormValues } from '@module/system/api/InterfaceLocation';

const api_url = import.meta.env.VITE_SYSTEM_API;
const api_module_url = api_url.concat('/sys-system');

/**
 * 기관 리스트 가져오기
 * @returns 
 */
export const getLocationList = () => {
  return axios.get(
    `${api_module_url}/locations`,
  )
}

/**
 * 기관정보 가져오기
 * @param mloc 
 * @returns 
 */
export const getLocation = (mloc:string|number) => {
  return axios.get(
    `${api_module_url}/locations/${mloc}`,
  )
}

/**
 * 기관 생성
 * @param location 
 * @returns 
 */
export const createLocation = (location:IFormValues) => {
  return axios.post(
    `${api_module_url}/locations`, location
  );
}

/**
 * 기관 수정
 * @param location 
 * @returns 
 */
export const updateLocation = (location:IFormValues) => {
  return axios.put(
    `${api_module_url}/locations/${location.mloc}`, location
  );
}
