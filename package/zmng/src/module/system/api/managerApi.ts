import axios from "axios"
import { IFormValues } from '@module/system/api/InterfaceManager';

const api_url = import.meta.env.VITE_SYSTEM_API;
const api_module_url = api_url.concat('/sys-system');

/**
 * 관리자 리스트 가져오기
 * @returns 
 */
export const getManagerList = () => {
  return axios.get(
    `${api_module_url}/managers`,
  );
};

/**
 * 관리자 데이터 가져오기
 * @param id 
 * @returns 
 */
export const getManager = (id:string|number) => {
  return axios.get(
    `${api_module_url}/managers/${id}`,
  );
}

/**
 * 관리자 데이터 저장
 * @param manager 
 * @returns 
 */
export const createManager = (manager:IFormValues) => {
  return axios.post(
    `${api_module_url}/managers`, manager
  );
}

/**
 * 아이디로 관라자 데이터 가져오기
 * @param userid 
 * @returns 
 */
export const getManagerByUserid = (userid:string) => {
  return axios.get(
    `${api_module_url}/managers/userid/${userid}`,
  );
}

/**
 * 관리자 아이디 중복체크
 * @param userid 
 * @returns 
 */
export const existsManagerByUserid = (userid:string) => {
  return axios.get(
    `${api_module_url}/managers/userid/exists/${userid}`,
  );
};