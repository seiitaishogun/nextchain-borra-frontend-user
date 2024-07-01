import { TextareaAutosize } from '@mui/material';

function Textarea(props: any) {
  return (
    <TextareaAutosize
      minRows={8}
      maxRows={8}
      style={{
        width: '100%',
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid #C4C4C4',
        resize: 'none',
      }}
      {...props}
    />
  );
}

export default Textarea;
