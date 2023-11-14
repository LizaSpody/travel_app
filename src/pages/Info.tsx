import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { Dropbox } from 'dropbox';

const Info: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const dbx = new Dropbox({
      accessToken:
        'sl.Bpsw4GIEDn-NViYJjihctfCmoBWPA1A1Bucvwtlv9G3x88pMSjGOhS5wFeLhj8ZW4aFcNpJMuvlemex0Vu3qTXUrIu9akAOnoKthEtVEEfLlJrA4YT3SgXzCzYGQAsPG22QshvJgo10TILQ5Lla87J0',
    });

    const formData = new FormData();
    fileList.forEach((file) => {
      // formData.append('files[]', file as RcFile);
      dbx
        .filesUpload({ path: '/' + file.name, contents: file })
        .then(() => {
          setFileList([]);
          message.success('upload successfully.');
        })
        .catch(() => {
          message.error('upload failed.');
        })
        .finally(() => {
          setUploading(false);
        });
    });
    setUploading(true);
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  );
};

export default Info;
