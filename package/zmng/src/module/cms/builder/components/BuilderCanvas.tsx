import { BuilderItemsProps } from '@module/cms/builder/components/BuilderSideBarItem';

import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';

import 'react-resizable/css/styles.css';

import { Grid } from '@mui/material';
import SortableItem from '@module/cms/builder/components/BuilderCanvasItem';
import { ResizableBox } from 'react-resizable';
import Item from '@ui-kit/app/components/SideBar/Item';
import { useEffect, useRef, useState } from 'react';

// Builder Cavas에 Dnd Drop 설정
const BuilderCanvas = ({
  items,
  onDelete,
  canvasId,
  selectedId,
  setSelectedId,
}: {
  items: BuilderItemsProps[];
  onDelete: (id: UniqueIdentifier) => void;
  canvasId: UniqueIdentifier;
  selectedId: UniqueIdentifier;
  setSelectedId: (id: UniqueIdentifier) => void;
}) => {
  const { setNodeRef } = useDroppable({
    id: canvasId,
    data: {
      canvasId,
      parent: null,
      isContainer: true,
    },
  });

  const canverWidthRef = useRef<HTMLDivElement | null>(null);
  const canverHeightRef = useRef<HTMLDivElement | null>(null);

  const [canverWidth, setCanverWidth] = useState(100); // 기본 너비 설정
  const [canverHeight, setCanverHeight] = useState(0); // 기본 높이 설정

  useEffect(() => {
    // 현재 ref 값을 복사
    const currentWidthRef = canverWidthRef.current;
    const currentHeightRef = canverHeightRef.current;

    if (currentWidthRef) {
      setCanverWidth(currentWidthRef.offsetWidth - 10);
    }

    const updateHeight = () => {
      if (currentHeightRef) {
        setCanverHeight(currentHeightRef.offsetHeight);
      }
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    if (currentHeightRef) {
      observer.observe(currentHeightRef);
    }

    return () => {
      if (currentHeightRef) {
        observer.unobserve(currentHeightRef);
      }
    };
  }, [items]);

  return (
    <Grid item lg={12} xs={12} sm={12} ref={canverWidthRef}>
      <ResizableBox
        width={canverWidth} // 초기 너비 설정
        height={canverHeight} // 초기 높이 설정
        minConstraints={[100, canverHeight]} // 최소 제약 조건 설정
        maxConstraints={[canverWidth, canverHeight]} // 최대 제약 조건 설정
      >
        <Grid container spacing={1} ref={setNodeRef} className="canvas">
          <Grid
            container
            style={{
              height: 'auto',
              width: '100%',
              minHeight: 100,
              alignItems: 'flex-start',
            }}
            ref={canverHeightRef}
            border={1}
          >
            {items?.map((item, i) => (
              <Grid item lg={12} xs={12} sm={12} border={1}>
                <SortableItem
                  key={item.dragId}
                  item={item}
                  index={i}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  onDelete={onDelete}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </ResizableBox>
    </Grid>
  );
};

export default BuilderCanvas;
