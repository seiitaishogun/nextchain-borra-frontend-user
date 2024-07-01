import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorLayout } from '@/components/Common/Editor/Editor.styled';
import CustomUploadAdapterPlugin from '@/utils/editor/uploadAdapter';

interface EditorProps {
  name: string;
  value: string;
  onChange: (data: any) => void;
}

function Editor({ name, value, onChange }: EditorProps) {
  return (
    <EditorLayout>
      <CKEditor
        editor={ClassicEditor}
        name={name}
        data={value}
        config={{
          language: 'ko',
          extraPlugins: [CustomUploadAdapterPlugin],
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'imageUpload',
            'blockQuote',
            'insertTable',
            '|',
            'undo',
            'redo',
          ],
          link: {
            defaultProtocol: 'http://',
            addTargetToExternalLinks: true,
          },
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </EditorLayout>
  );
}

export default Editor;
