import { SortingStrategy } from '@dnd-kit/sortable';

export const BuilderCanvasSortingStrategy: SortingStrategy = {
  getNewIndex: (container, item, target) => {
    const items = container.items;
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
