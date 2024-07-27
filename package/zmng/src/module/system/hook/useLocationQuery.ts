import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import UseModal from '@hooks/UseModal'; 
import { toast } from 'react-toastify';
import { ILocationInfoState } from '@module/system/components/location/InterfaceLocation';

const api_url = import.meta.env.VITE_SYSTEM_API;

interface LocationInfoState extends ILocationInfoState {}

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
const createLocation = (location:LocationInfoState) => {
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
  })
}

/**
 * 기관 수정
 * @param location 
 * @returns 
 */
const updateLocation = (location:LocationInfoState) => {
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