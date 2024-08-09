import UseModal from "@hooks/UseModal";
import axios from "axios"
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { IFormValues } from '@module/system/components/manager/InterfaceManager';

const api_url = import.meta.env.VITE_SYSTEM_API;

/**
 * 관리자 리스트 가져오기
 * @returns 
 */
const getManagerList = () => {
    return axios.get(
      `${api_url}/sys-system/managers`,
    );
};

export const useManagerCodeNameList = () => {
    return useQuery("getManagerCodeNameList", getManagerList, {
        select: data => {
          const codeNameList = data.data?.map(item  => ({key: item.id, code: item.userid, name_ko: item.name}))
    
          return codeNameList
        },
      }) ;
}

/**
 * 관리자 데이터 가져오기
 * @param id 
 * @returns 
 */
const getManager = (id:string|number) => {
  return axios.get(
    `${api_url}/sys-system/managers/${id}`,
  );
}

export const useManager = (id:string|number) => {
  return useQuery(["getManager", id], () => getManager(id), {
    enabled: !!id,
  });
}

/**
 * 관리자 생성
 * @param manager 
 * @returns 
 */
const createManager = (manager:IFormValues) => {
  return axios.post(
    `${api_url}/sys-system/managers`, manager
  );
}

export const useCreateManager = () => {
  const queryClient = useQueryClient(); 
  const {closeModal} = UseModal();

  return useMutation(createManager, {
    onSuccess: () => {
      queryClient.invalidateQueries('getManagerCodeNameList')
      closeModal();
      toast.success('저장되었습니다.');
    },
    onError: () => {
      toast.error('저장하지 못하였습니다.');
    }
  });
}

/**
 * 아이디로 관라자 데이터 가져오기
 * @param userid 
 * @returns 
 */
const getManagerByUserid = (userid:string) => {
  return axios.get(
    `${api_url}/sys-system/managers/userid/${userid}`,
  );
}

export const useManagerByUserid = (userid:string) => {
  return useQuery(["getManagerByUserid", userid], () => getManagerByUserid(userid), {
    enabled: !!userid,
  });
}

  /* const methods = await getManagerByUserid(userid);

  console.log("methods", methods);

  return methods===undefined ? '이미 등록된 아이디입니다.' : undefined ; */
 // }