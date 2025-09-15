import React, { useState, useRef } from 'react';
import useWebHistoryQuery from '@api/module/history/useWebHistoyQuery';
import { useParams } from 'react-router-dom';
import HistoryItem from '@pages/web/components/HistoryItem';
import WepContentBox from '@pages/web/components/WebContentBox';
import TimelineSidebar from '@pages/web/components/HistorySidebar';

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? '-' : date.toLocaleDateString();
};

export const OpenSmHistory = () => {
  const { userId } = useParams();
  const historyList = useWebHistoryQuery({ category: 'SM', userId }).data || [];
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleExpand = (id: number) =>
    setExpandedId(prev => (prev === id ? null : id));

  const scrollToItem = (id: number) => {
    setExpandedId(id);
    // 스크롤은 HistoryItem의 Collapse onEntered에서 처리
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* 좌측 사이드바 */}
      <TimelineSidebar
        historyList={historyList.map(h => ({ id: h.id, project: h.project }))}
        activeId={expandedId}
        onClick={scrollToItem}
      />

      {/* 우측 콘텐츠 영역 */}
      <WepContentBox color="#000" bgColor="#f0f2f5" ref={contentRef}>
        {historyList.map(history => (
          <HistoryItem
            key={history.id}
            id={`history-${history.id}`}
            history={history}
            expanded={expandedId === history.id}
            onToggle={toggleExpand}
            formatDate={formatDate}
            contentRef={contentRef} // 중앙 스크롤용 ref 전달
          />
        ))}
      </WepContentBox>
    </div>
  );
};
