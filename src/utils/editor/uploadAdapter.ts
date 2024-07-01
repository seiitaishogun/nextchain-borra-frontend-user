import { fetchFileUpload } from '@/api/admin/file';

function UploadAdapter(this: any, loader: any) {
  this.upload = () =>
    new Promise((resolve, reject) => {
      loader.file
        .then((file: any) => {
          const formData = new FormData();
          formData.append('upload', file);

          fetchFileUpload(formData)
            .then(res => {
              resolve({
                default: res.file.path,
              });
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch((err: any) => {
          reject(err);
        });
    });
}

export default function CustomUploadAdapterPlugin(editor: any) {
  // eslint-disable-next-line no-param-reassign
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) =>
    // Configure the URL to the upload script in your back-end here!
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new UploadAdapter(loader);
}
