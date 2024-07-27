import axios from "axios"
import { useQuery, useMutation, useQueryClient } from 'react-query'

const api_url = import.meta.env.VITE_SYSTEM_API;

/**
 * 관리자 리스트 가져오기
 * @returns 
 */
const getManagerList = () => {
    return axios.get(
        `${api_url}/sys-system/managers`,
      )
};

export const useManagerCodeNameList = () => {
    return useQuery("getManagerCodeNameList", getManagerList, {
        select: data => {
          const codeNameList = data.data?.map(item  => ({key: item.id, code: item.userid, name_ko: item.name}))
    
          return codeNameList
        },
      }) 
}

/**
 * 관리자 생성
 */
const createManager = () => {
  return axios.post(
    `${api_url}/sys-system/managers`,
  )
}