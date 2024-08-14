import UseModal from '@hooks/UseModal';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  getManagerList,
  getManager,
  getManagerByUserid,
  createManager,
  existsManagerByUserid,
} from '@module/system/api/managerApi';

/**
 * 관리자 리스트 가져오기 (Code, Name)
 * @returns 
 */
export const useManagerCodeNameList = () => {
  return useQuery('getManagerCodeNameList', getManagerList, {
    select: data => {
      const codeNameList = data.data?.map(item => ({
        key: item.id,
        code: item.userid,
        name_ko: item.name,
      }));

      return codeNameList;
    },
  });
};

/**
 * 관리자 데이터 가져오기
 * @param id 
 * @returns 
 */
export const useManager = (id: string | number) => {
  return useQuery(['getManager', id], () => getManager(id), {
    enabled: !!id,
  });
};

/**
 * 관리자 데이터 저장
 * @returns 
 */
export const useCreateManager = () => {
  const queryClient = useQueryClient();
  const { closeModal } = UseModal();

  return useMutation(createManager, {
    onSuccess: () => {
      queryClient.invalidateQueries('getManagerCodeNameList');
      closeModal();
      toast.success('저장되었습니다.');
    },
    onError: () => {
      toast.error('저장하지 못하였습니다.');
    },
  });
};

/**
 * 아이디로 관라자 데이터 가져오기
 * @param userid 
 * @returns 
 */
export const useManagerByUserid = (userid: string) => {
  return useQuery(
    ['getManagerByUserid', userid],
    () => getManagerByUserid(userid),
    {
      enabled: !!userid,
    },
  );
};

/**
 * 관리자 아이디 중복체크
 * @param userid 
 * @returns 
 */
export const useExistsManagerByUserid = (userid: string) => {
  return useQuery(
    ['existsManagerByUserid', userid],
    () => existsManagerByUserid(userid),
    {
      enabled: !!userid,
    },
  );
};
