import { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css'; // 에디터 디자인을 위한 필수 CSS

interface BoardEditorProps {
  value?: string;
  setValue: (value: string) => void;
}

const BoardEditor = ({ value = '', setValue }: BoardEditorProps) => {
  const editorRef = useRef<Editor>(null);

  const handleChange = (value: string) => {
    console.log(value);
    setValue(value ?? '');
  };

  return (
    <div>
      <Editor
        ref={editorRef}
        initialValue="내용을 입력해주세요."
        previewStyle="vertical" // 미리보기 스타일 (tab, vertical)
        height="500px"
        initialEditType="wysiwyg" // 초기 에디터 모드 (markdown, wysiwyg)
        useCommandShortcut={true} // 단축키 사용 여부
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default BoardEditor;
