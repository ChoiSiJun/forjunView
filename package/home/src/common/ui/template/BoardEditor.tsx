import { useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

interface BoardEditorProps {
  value?: string;
  setValue: (value: string) => void;
}

const BoardEditor = ({ value = '', setValue }: BoardEditorProps) => {
  const editorRef = useRef<Editor>(null);

  // 서버에서 데이터가 로드되어 value가 바뀌면 에디터에 주입
  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance) {
      if (editorInstance.getMarkdown() !== value) {
        editorInstance.setMarkdown(value || '');
      }
    }
  }, [value]);

  // 에디터 수정 시 호출 (인자를 사용하지 않고 ref에서 직접 추출)
  const handleChange = () => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance) {
      const markdown = editorInstance.getMarkdown();
      setValue(markdown);
    }
  };

  return <Editor ref={editorRef} initialValue={value || '내용을 입력해주세요.'} previewStyle="vertical" height="400px" initialEditType="wysiwyg" useCommandShortcut={true} onChange={handleChange} />;
};

export default BoardEditor;
