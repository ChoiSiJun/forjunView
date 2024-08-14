import { useQuery, useMutation, useQueryClient } from 'react-query'
import UseModal from '@hooks/UseModal'; 
import { toast } from 'react-toastify';
import {
  getLocationList,
  getLocation,
  createLocation,
  updateLocation
} from '@module/system/api/locationApi';

/**
 * 기관 리스트 가져오기 (code, name)
 * @returns 
 */
export const useLocationCodeNameList = () => {
  return useQuery("getLocationCodeNameList", getLocationList, {
    select: data => {
      const codeNameList = data.data?.map(item  => ({key: item.mloc, code: item.mloc, name_ko: item.name_ko}))

      return codeNameList
    },
  })
}

/**
 * 기관 리스트 가져오기 (label, value)
 * @returns 
 */
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
export const useLocation = (mloc:string|number) => {
  return useQuery(["getLocation", mloc], () => getLocation(mloc), {
    enabled: !!mloc,
  })
}

/**
 * 기관 생성
 * @returns 
 */
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
      toast.error('저장하지 못하였습니다.');
    }
  })
}

/**
 * 기관 수정
 * @returns 
 */
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