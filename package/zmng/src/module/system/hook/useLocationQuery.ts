import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import UseModal from '@hooks/UseModal'; 
import { toast } from 'react-toastify';
import { IFormValues } from '@module/system/components/manager/InterfaceManager';

const api_url = import.meta.env.VITE_SYSTEM_API;

/**
 * 기관리스트 가져오기
 * @returns 
 */
const getLocationList = () => {
  return axios.get(
    `${api_url}/sys-system/locations`,
  )
}

export const useLocationCodeNameList = () => {
  return useQuery("getLocationCodeNameList", getLocationList, {
    select: data => {
      const codeNameList = data.data?.map(item  => ({key: item.mloc, code: item.mloc, name_ko: item.name_ko}))

      return codeNameList
    },
  })
}

export const useLocationLabelValueList = () => {
  return useQuery("getLocationLabelValueList", getLocationList, {
    select: data => {
      const codeNameList = data.data?.map(item  => ({key: item.mloc, value: item.mloc, label: item.name_ko}))

      return codeNameList
    },
  })
}

/**
 * 기관정보 가져오기
 * @param mloc 
 * @returns 
 */
const fetchLocation = (mloc:string|number) => {
  return axios.get(
    `${api_url}/sys-system/locations/${mloc}`,
  )

}

export const useLocation = (mloc:string|number) => {
  return useQuery(["getLocation", mloc], () => fetchLocation(mloc), {
    enabled: !!mloc,
  })
}

/**
 * 기관 생성
 * @param location 
 * @returns 
 */
const createLocation = (location:IFormValues) => {
  return axios.post(
    `${api_url}/sys-system/locations`, location
  );
}

export const useCreateLocation = () => {
  const queryClient = useQueryClient()
  const { closeModal } = UseModal(); 

  return useMutation(createLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries('getLocationCodeNameList')
      closeModal();
      toast.success('저장되었습니다.');
    },
    onError: () => {
      toast.success('저장하지 못하였습니다.');
    }
  })
}

/**
 * 기관 수정
 * @param location 
 * @returns 
 */
const updateLocation = (location:IFormValues) => {
  return axios.put(
    `${api_url}/sys-system/locations/${location.mloc}`, location
  );
}

export const useUpdateLocation = () => {
  const queryClient = useQueryClient()
  const { closeModal } = UseModal(); 

  return useMutation(updateLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries('getLocationCodeNameList')
      closeModal();
      toast.success('수정 되었습니다.');
    },
    onError: () => {
      toast.success('저장하지 못하였습니다.');
    }
  })
}

/**
 * 기관 삭제
 * @param mloc 
 * @returns 
 */
// const deleteLocation = (mloc:string|number) => {
//   return axios.delete(
//     `${api_url}/sys-system/locations/${mloc}`,
//   )
// }

// export const useDeleteLocation = () => {
//   const queryClient = useQueryClient()
//   const { closeModal } = UseModal(); 

//   return useMutation(deleteLocation, {
//     onSuccess: () => {
//       queryClient.invalidateQueries('getLocationList')
//       closeModal();
//       toast.success('삭제되었습니다.');
//     },
//   })
// }