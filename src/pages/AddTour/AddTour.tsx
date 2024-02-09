import React, { useState } from 'react';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Form,
  Input,
  DatePicker,
  Select,
  Typography,
  Upload,
  message,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { createNewTour, PlanTag } from '../../counter/planSlice';
import { useAppDispatch } from '../../hooks/utils';
import { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { Dropbox, DropboxResponse } from 'dropbox';

interface DateTour {
  start: Date;
  finish: Date;
}

interface YourFormValues {
  tickets: {
    ticket: 'link' | 'file' | 'text';
  }[];
}

interface ToursPlan {
  city: string;
  desc: string;
  ticket: [];
  hotel: [];
  dates: DateTour;
}

interface Plan {
  name: string;
  tags: string[];
  photos: string[];
  dates: DateTour;
  plan: ToursPlan[];
}

type PlanTagIndex = Record<string, string>;

function AddTour() {
  const { RangePicker } = DatePicker;

  const [plan, setPlan] = useState<Plan>({
    name: '',
    tags: [],
    dates: {
      start: new Date(2023, 10, 3, 12, 0, 0),
      finish: new Date(2023, 10, 5, 12, 0, 0),
    },
    photos: [],
    plan: [
      {
        city: '',
        desc: '',
        ticket: [],
        hotel: [],
        dates: {
          start: new Date(2023, 10, 3, 12, 0, 0),
          finish: new Date(2023, 10, 5, 12, 0, 0),
        },
      },
    ],
  });
  const [typeHotel, setTypeHotel] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [listPhoto, setListPhoto] = useState(false);
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const handleUploadPhoto = () => {
    const formData = new FormData();

    uploadFile(fileList);
    setUploading(false);
  };

  const uploadFile = (files: any) => {
    const dbx = new Dropbox({
      accessToken:
        'sl.BvSNRvWTSbFX8nVXnr7mF-x8RdA1Mbbgdef07L5-GtwzrwrfaeLo4rGGqgkblUiD1q2AjnFW_K_qiAXoOqQX7BCiQ5EqvZYRLruvpTtcYgGgsdsrrdVkCiexDXSHhcr9mHAs3w9o2wAeQ3Ik_aJyRJM',
      // accessToken: process.env.ACCESS_TOKEN,
    });

    const fileArr: any = [];

    const uploadPromises = files.map((file: any) => {
      return dbx
        .filesUpload({ path: '/' + file.name, contents: file })
        .then((el) => {
          const pathDisplay = el.result.path_display;
          return dbx.sharingListSharedLinks({ path: pathDisplay as any });
        })
        .then((res) => {
          if (res.result.links.length === 0) {
            return dbx.sharingCreateSharedLinkWithSettings({
              path: '/' + file.name,
            }) as Promise<DropboxResponse<any>>;
          } else {
            return Promise.resolve(res);
          }
        })
        .then((res) => {
          const fileUrl = res.result.links
            ? res.result.links['0'].url
            : res.result.url;
          const newFileUrl = fileUrl.replace(
            'www.dropbox.com',
            'dl.dropboxusercontent.com',
          );
          fileArr.push(newFileUrl);
        })
        .catch((error) => {
          throw error;
        });
    });

    return Promise.all(uploadPromises)
      .then(() => {
        console.log('All files uploaded and shared:', fileArr);
      })
      .catch((error) => {
        console.error('Error:', error);
        throw error;
      })
      .finally(() => {
        setListPhoto(fileArr);
      });
  };

  const props: UploadProps = {
    multiple: true,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList((fileList) => [...fileList, file]);

      return false;
    },
    fileList,
  };

  const { Option } = Select;
  const planTagOptions = Object.keys(PlanTag).map((key) => ({
    value: key,
    label: (PlanTag as PlanTagIndex)[key],
  }));

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleSubmit = async (el: any) => {
    try {
      await handleUploadPhoto();
      dispatch(createNewTour(el));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="dynamic_form_complex"
      autoComplete="off"
      initialValues={{ items: [{}] }}
    >
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUploadPhoto}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="tags"
        label="Tags"
        rules={[
          {
            required: true,
            message: 'Please select your favourite tags!',
            type: 'array',
          },
        ]}
      >
        <Select mode="multiple" placeholder="">
          {planTagOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.List name="items">
        {(fields, { add, remove }) => (
          <>
            <div
              style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}
            >
              {fields.map((field, index) => (
                <Card
                  title={`Item ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <div className="row">
                    <div className="city">
                      <Form.Item label="City" name={[field.name, 'city']}>
                        <Input />
                      </Form.Item>
                    </div>
                    <div className="description">
                      <Form.Item
                        label="Description"
                        name={[field.name, 'description']}
                      >
                        <Input />
                      </Form.Item>
                    </div>
                    <div className="ticket">
                      <div className="plus"></div>
                      <Form.Item label="Select" name={[field.name, `ticket`]}>
                        <>
                          <Select>
                            <Select.Option value="link">Link</Select.Option>
                            <Select.Option value="file">File</Select.Option>
                            <Select.Option value="text">Text</Select.Option>
                          </Select>
                        </>
                      </Form.Item>
                      <Form.Item
                        shouldUpdate={(prevValues: any, currentValues: any) => {
                          return (
                            prevValues.items[index]?.ticket !==
                            currentValues.items[index]?.ticket
                          );
                        }}
                      >
                        {({ getFieldValue }) => {
                          const typeTicket = getFieldValue([
                            'items',
                            field.name,
                            `ticket`,
                          ]);

                          if (typeTicket === 'text') {
                            return (
                              <Form.Item
                                name={[field.name, `ticketText`]}
                                label="ticket Text"
                              >
                                <Input />
                              </Form.Item>
                            );
                          }

                          if (typeTicket === 'link') {
                            return (
                              <Form.Item
                                name={[field.name, `ticketLink`]}
                                label="ticket Link"
                              >
                                <Input />
                              </Form.Item>
                            );
                          }

                          if (typeTicket === 'file') {
                            return (
                              <Form.Item
                                name={[field.name, `ticketFile`]}
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                noStyle
                              >
                                <Upload.Dragger
                                  name="files"
                                  customRequest={(arg) => {
                                    const { onSuccess } = arg;
                                    if (
                                      onSuccess &&
                                      typeof onSuccess === 'function'
                                    ) {
                                      onSuccess('ok');
                                    }
                                  }}
                                >
                                  <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                  </p>
                                  <p className="ant-upload-text">
                                    Click or drag file to this area to upload
                                  </p>
                                  <p className="ant-upload-hint">
                                    Support for a single or bulk upload.
                                  </p>
                                </Upload.Dragger>
                              </Form.Item>
                            );
                          }
                        }}
                      </Form.Item>
                    </div>
                    <div className="hotel">
                      <div className="plus"></div>
                      <Form.Item label="Select" name={[field.name, `hotel`]}>
                        <>
                          <Select>
                            <Select.Option value="link">Link</Select.Option>
                            <Select.Option value="file">File</Select.Option>
                            <Select.Option value="text">Text</Select.Option>
                          </Select>
                        </>
                      </Form.Item>
                      <Form.Item
                        shouldUpdate={(prevValues: any, currentValues: any) => {
                          return (
                            prevValues.items[index]?.hotel !==
                            currentValues.items[index]?.hotel
                          );
                        }}
                      >
                        {({ getFieldValue }) => {
                          const typeTicket = getFieldValue([
                            'items',
                            field.name,
                            `hotel`,
                          ]);

                          if (typeTicket === 'text') {
                            return (
                              <Form.Item
                                name={[field.name, `hotelText`]}
                                label="hotel Text"
                              >
                                <Input />
                              </Form.Item>
                            );
                          }

                          if (typeTicket === 'link') {
                            return (
                              <Form.Item
                                name={[field.name, `hotelLink`]}
                                label="hotel Link"
                              >
                                <Input />
                              </Form.Item>
                            );
                          }

                          if (typeTicket === 'file') {
                            return (
                              <Form.Item
                                name={[field.name, `hotelFile`]}
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                noStyle
                              >
                                <Upload.Dragger
                                  name="files"
                                  customRequest={(arg) => {
                                    const { onSuccess } = arg;
                                    if (
                                      onSuccess &&
                                      typeof onSuccess === 'function'
                                    ) {
                                      onSuccess('ok');
                                    }
                                  }}
                                >
                                  <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                  </p>
                                  <p className="ant-upload-text">
                                    Click or drag file to this area to upload
                                  </p>
                                  <p className="ant-upload-hint">
                                    Support for a single or bulk upload.
                                  </p>
                                </Upload.Dragger>
                              </Form.Item>
                            );
                          }
                        }}
                      </Form.Item>
                    </div>

                    <div className="dates">
                      <Form.Item
                        label="RangePicker"
                        name={[field.name, 'date']}
                      >
                        <RangePicker />
                      </Form.Item>
                    </div>
                  </div>
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block>
                + Add Item
              </Button>

              <Button
                type="primary"
                onClick={() => handleSubmit(form.getFieldsValue())}
              >
                Submit
              </Button>
            </div>
          </>
        )}
      </Form.List>

      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
      <Link to={`/user`}>Add tour</Link>
    </Form>
  );
}

export default AddTour;
