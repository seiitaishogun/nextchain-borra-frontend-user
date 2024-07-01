import React, { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import styled from 'styled-components';
import { fetchFileUpload } from '@/api/admin/file';
import { FileT } from '@/types/admin/common/file';

interface Props {
  id?: string;
  name: string;
  accept?: string;
  isPreview?: boolean;
  file?: FileT | null;
  handleChange: (file: FileT | null) => void;
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  .file {
    display: flex;
    align-items: center;

    label {
      display: flex;
      align-items: center;
      height: 100%;
      margin-right: 10px;
      padding: 16px 18px;
      border-radius: 8px;
      background: #e6e6e6;
      cursor: pointer;
    }

    input[type='file'] {
      display: none;
    }
  }

  .preview {
    margin-top: 10px;
  }
`;

const FileName = styled.div`
  display: flex;
  align-items: center;

  svg {
    cursor: pointer;
  }
`;

const Preview = styled.img`
  width: 320px;
  margin: 12px 0;
`;

function File({
  id,
  name,
  accept,
  isPreview,
  file: defaultFile,
  handleChange,
}: Props) {
  const [file, setFile] = useState<FileT | null>(defaultFile || null);

  const handleSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile: any = e.target.files?.[0];
    const formData = new FormData();
    formData.append('upload', uploadFile);

    try {
      const { file: uploadedFile, message } = await fetchFileUpload(formData);
      setFile(uploadedFile);
      handleChange(uploadedFile);
      alert(message);
    } catch {
      setFile(null);
      handleChange(null);
      alert('오류');
    }
  };

  const inputId = id || name;

  return (
    <Layout>
      <div className="file">
        <label htmlFor={inputId}>파일 선택</label>
        <input
          type="file"
          id={inputId}
          name={name}
          accept={accept}
          onChange={handleSelect}
        />
        {file && (
          <FileName>
            {file.name}
            <ClearIcon
              onClick={() => {
                setFile(null);
                handleChange(null);
              }}
            />
          </FileName>
        )}
      </div>
      {isPreview && file && <Preview src={file.path} />}
    </Layout>
  );
}

File.defaultProps = {
  accept: 'image/*',
};

export default File;
