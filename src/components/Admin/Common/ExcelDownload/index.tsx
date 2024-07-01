import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { AxiosResponse } from 'axios';

interface Props {
  text?: string;
  downloadFunction: () => Promise<AxiosResponse<any, any>>;
}

function ExcelDownload({ text, downloadFunction }: Props) {
  const defaultText = text || '다운로드';

  const handleDownload = async () => {
    try {
      const blobData = await downloadFunction();
      const excelBlob = new Blob([`\ufeff${blobData.data}`], {
        type: 'text/csv; charset=UTF-8',
      });

      const originFileName = blobData.headers['content-disposition'];
      let filename = '';
      const regexFileName = /filename="/;
      if (regexFileName.test(originFileName)) {
        filename = originFileName.split('filename="')[1].split('.')[0] || '';
      } else {
        filename = originFileName.split("filename*=utf-8''")[1] || '';
      }

      const link = document.createElement('a');
      const blobUrl = URL.createObjectURL(excelBlob);
      link.href = blobUrl;
      link.download = decodeURIComponent(filename);
      link.click();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error(err);
      window.alert('다운로드에 실패하였습니다.');
    }
  };

  return (
    <Button onClick={handleDownload}>
      {defaultText} <DownloadIcon />
    </Button>
  );
}

export default ExcelDownload;
