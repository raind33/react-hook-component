import React from 'react';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import Upload, { UploadProps } from '.'

const props: UploadProps = {
  name: 'file',
  action: 'http://localhost:3333/upload',
  beforeUpload(file: File) {
    if(file.name.includes('1.image')) {
      return false;
    }
    return true;
  },
  onSuccess(ret: any) {
    console.log('onSuccess', ret);
  },
  onError(err: any) {
    console.log('onError', err);
  },
  onProgress(percentage:any, file:any) {
    console.log('onProgress', percentage);
  },
  onChange(file:any) {
    console.log('onChange', file);
  }
};

const App: React.FC = () => (
  <Upload {...props} drag>
    {/* <Button icon={<UploadOutlined />}>Click to Upload</Button> */}
    <p>
      <InboxOutlined style={{fontSize: '50px'}}/>
    </p>
    <p>点击或者拖拽文件到此处</p>
  </Upload>
);

export default App;