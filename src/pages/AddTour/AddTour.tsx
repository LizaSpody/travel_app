import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Form,
  Input,
  DatePicker,
  Select,
  Typography,
  Upload,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { createNewTour, PlanTag } from '../../counter/planSlice';
import { useAppDispatch } from '../../hooks/utils';

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

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

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

  const handleChangeHotel = (value: string) => {
    console.log(typeHotel);
    setTypeHotel(value);
  };

  const handleSubmit = (el: any) => {
    dispatch(createNewTour(el));
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
                      <Form.Item
                        label="Select"
                        name={[field.name, `ticket`]}
                      >
                        <>
                          <Select>
                            <Select.Option value="link">Link</Select.Option>
                            <Select.Option value="file">File</Select.Option>
                            <Select.Option value="text">Text</Select.Option>
                          </Select>
                        </>
                      </Form.Item>
                      <Form.Item
                        shouldUpdate={(prevValues:any, currentValues:any) => {
                            return (
                              prevValues.items[index]?.[`ticket`] !==
                              currentValues.items[index]?.[`ticket`]
                            );

                        }}
                      >
                        {({ getFieldValue }) => {
                          const typeTicket = getFieldValue(['items', field.name, `ticket`,])

                          if (typeTicket === 'text') {
                            return <Form.Item
                                name={[field.name, `ticketText`]}
                                label="ticket Text"
                            >
                              <Input />
                            </Form.Item>
                          }

                          if (typeTicket === 'link') {
                            return <Form.Item
                                name={[field.name, `ticketLink`]}
                                label="ticket Link"
                            >
                              <Input />
                            </Form.Item>
                          }

                          if (typeTicket === 'file') {
                            return  <Form.Item name={[field.name, `ticketFile`]} valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                              <Upload.Dragger name="files" customRequest={
                                (arg) => {
                                  const { onSuccess } = arg
                                  if (onSuccess && typeof onSuccess === 'function') {
                                    onSuccess('ok');
                                  }
                                }
                              }>
                                <p className="ant-upload-drag-icon">
                                  <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                              </Upload.Dragger>
                            </Form.Item>
                          }

                        }}
                      </Form.Item>
                    </div>
                    <div className="hotel">
                      <div className="plus"></div>
                      <Form.Item
                          label="Select"
                          name={[field.name, `hotel`]}
                      >
                        <>
                          <Select>
                            <Select.Option value="link">Link</Select.Option>
                            <Select.Option value="file">File</Select.Option>
                            <Select.Option value="text">Text</Select.Option>
                          </Select>
                        </>
                      </Form.Item>
                      <Form.Item
                          shouldUpdate={(prevValues:any, currentValues:any) => {
                            return (
                                prevValues.items[index]?.[`hotel`] !==
                                currentValues.items[index]?.[`hotel`]
                            );

                          }}
                      >
                        {({ getFieldValue }) => {
                          const typeTicket = getFieldValue(['items', field.name, `hotel`,])

                          if (typeTicket === 'text') {
                            return <Form.Item
                                name={[field.name, `hotelText`]}
                                label="hotel Text"
                            >
                              <Input />
                            </Form.Item>
                          }

                          if (typeTicket === 'link') {
                            return <Form.Item
                                name={[field.name, `hotelLink`]}
                                label="hotel Link"
                            >
                              <Input />
                            </Form.Item>
                          }

                          if (typeTicket === 'file') {
                            return  <Form.Item name={[field.name, `hotelFile`]} valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                              <Upload.Dragger name="files" customRequest={
                                (arg) => {
                                  const { onSuccess } = arg
                                  if (onSuccess && typeof onSuccess === 'function') {
                                    onSuccess('ok');
                                  }
                                }
                              }>
                                <p className="ant-upload-drag-icon">
                                  <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                              </Upload.Dragger>
                            </Form.Item>
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
