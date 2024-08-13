import { SortingStrategy } from '@dnd-kit/sortable';

export const BuilderCanvasSortingStrategy: SortingStrategy = {
  getNewIndex: (container, item, target) => {
    const {items} = container;
    const itemIndex = items.indexOf(item);
    const targetIndex = items.indexOf(target);

    // 예를 들어, 12그리드 기준으로 수평 및 수직 정렬을 처리
    const isHorizontal = Math.abs(item.x - target.x) > 6; // 12그리드 기준으로 6을 사용

    if (isHorizontal) {
      return Math.max(targetIndex, 0);
    } else {
      return Math.min(targetIndex + 1, items.length - 1);
    }
  },
};


const getGridPosition = (itemId) => {
  // 아이템 ID에 따라 그리드 위치를 반환하는 함수 (예: Mock 데이터)
  // 실제로는 아이템의 위치를 상태에서 가져와야 합니다.
  const gridPositions = {
    '1': { x: 0, y: 0 },
    '2': { x: 6, y: 0 },
    '3': { x: 0, y: 6 },
    '4': { x: 6, y: 6 },
  };
  return gridPositions[itemId] || { x: 0, y: 0 };
};
