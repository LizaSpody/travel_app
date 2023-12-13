import React, { useState, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, DatePicker, Select, Typography } from 'antd';

interface DateTour {
  start: Date;
  finish: Date;
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

  // useEffect(setup, )
  //
  // const handleChange = (
  //   option: string,
  //   e: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   setPlan((prevState) => ({
  //     ...prevState,
  //     [option]: e.target.value,
  //   }));
  // };
  //
  // const rowChange = (
  //   option: string,
  //   key: number,
  //   e: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   setPlan((prevState) => ({
  //     ...prevState,
  //     plan: prevState.plan.map((item, index) =>
  //         index === key
  //             ? { ...item, [option]: e.target.value }
  //             : item
  //     ),
  //   }));
  // };
  //
  // const addRow = () => {
  //   setPlan((prevState) => ({
  //     ...prevState,
  //     plan: [...prevState.plan, {
  //       city: '',
  //       desc: '',
  //       ticket: [],
  //       hotel: [],
  //       dates: {
  //         start: new Date(2023, 10, 3, 12, 0, 0),
  //         finish: new Date(2023, 10, 5, 12, 0, 0),
  //       },
  //     }],
  //   }));
  // };

  // return (
  //   <div className="container">
  //     <h2>Add Tour</h2>
  //
  //     <div className="add-block">
  //       <input
  //         type="text"
  //         value={plan.name}
  //         placeholder="Name"
  //         // onChange={(e) => handleChange('name', e)}
  //       />
  //       <div className="date-wrap">
  //         <input type="text" className="start" />
  //         <input type="text" className="end" />
  //       </div>
  //       <div className="plan-wrap">
  //         <div className="row">
  //           <div className="city">City</div>
  //           <div className="description">Description</div>
  //           <div className="ticket">Ticket</div>
  //           <div className="hotel">Hotel</div>
  //           <div className="plan-list-todo">Plan</div>
  //           <div className="dates">Dates</div>
  //         </div>
  //         {plan.plan.map((item, index) => (
  //           <div className="row" key={index}>
  //             <div className="city">
  //               <input type="text" value={item.city}
  //                      // onChange={(e) => rowChange('city', index, e)}
  //                      placeholder="City" />
  //             </div>
  //             <div className="description">
  //               <input
  //                 type="text"
  //                 value={item.desc}
  //                 placeholder="description"
  //                 // onChange={(e) => rowChange('desc', index, e)}
  //               />
  //             </div>
  //             <div className="ticket">
  //               <div className="plus"></div>
  //               <select name="" id="">
  //                 <option value="Link">Link</option>
  //                 <option value="File">File</option>
  //                 <option value="Text">Text</option>
  //               </select>
  //               <input type="file"
  //                      // onChange={(e) => rowChange('ticket', index, e)}
  //               />
  //               <input type="text" placeholder="Link" />
  //               <input type="text" placeholder="Text"
  //                      // onChange={(e) => rowChange('ticket', index, e)}
  //               />
  //             </div>
  //             <div className="hotel">
  //               <div className="plus"></div>
  //               <select name="" id="">
  //                 <option value="Link">Link</option>
  //                 <option value="File">File</option>
  //                 <option value="Text">Text</option>
  //               </select>
  //               <input type="file" />
  //               <input type="text" placeholder="Link" />
  //               <input type="text" placeholder="Text" />
  //             </div>
  //             <div className="plan-list-todo">
  //               <ul>
  //                 <li></li>
  //               </ul>
  //               <div className="plus"></div>
  //             </div>
  //             <div className="dates">
  //               <input type="text" className="start" />
  //               <input type="text" className="end" />
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //
  //       <button className="plus"
  //               // onClick={addRow}
  //       >
  //         +
  //       </button>
  //     </div>
  //   </div>
  // );

  const [form] = Form.useForm();

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="dynamic_form_complex"
      autoComplete="off"
      initialValues={{ items: [{}] }}
    >
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
            {fields.map((field) => (
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

                    <input type="file" />
                    <input type="text" placeholder="Link" />
                    <input type="text" placeholder="Text" />

                    <Form.Item label="Select" name={[field.name, 'ticket']}>
                      <Select>
                        <Select.Option value="demo">Link</Select.Option>
                        <Select.Option value="demo">File</Select.Option>
                        <Select.Option value="demo">Text</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="hotel">
                    <div className="plus"></div>
                    <input type="file" />
                    <input type="text" placeholder="Link" />
                    <input type="text" placeholder="Text" />

                    <Form.Item label="Hotel" name={[field.name, 'hotel']}>
                      <Select>
                        <Select.Option value="demo">Link</Select.Option>
                        <Select.Option value="demo2">File</Select.Option>
                        <Select.Option value="demo3">Text</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="plan-list-todo">
                    <ul>
                      <li></li>
                    </ul>
                    <Form.Item label="Plan">
                      <Form.List name={[field.name, 'plan']}>
                        {(subFields, subOpt) => (
                            <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                              {subFields.map((subField) => (
                                  <Space key={subField.key}>
                                    <Form.Item noStyle name={[subField.name, 'first']}>
                                      <Input placeholder="todo" />
                                    </Form.Item>
                                    <CloseOutlined
                                        onClick={() => {
                                          subOpt.remove(subField.name);
                                        }}
                                    />
                                  </Space>
                              ))}
                              <Button type="dashed" onClick={() => subOpt.add()} block>
                                + Add Sub Item
                              </Button>
                            </div>
                        )}
                      </Form.List>
                    </Form.Item>
                    <div className="plus"></div>
                  </div>
                  <div className="dates">
                    <Form.Item label="RangePicker" name={[field.name, 'date']}>
                      <RangePicker />
                    </Form.Item>
                  </div>
                </div>
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Add Item
            </Button>
          </div>
        )}
      </Form.List>

      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
    </Form>
  );
}

export default AddTour;
