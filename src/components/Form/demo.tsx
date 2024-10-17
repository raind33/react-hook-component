import { Button, Checkbox, Input } from "antd";
import Form from "./index";
import React,  { useRef } from "react";
import { FormRef } from "./Form";

const Basic: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const formRef = useRef<FormRef>(null);
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          formRef.current?.setFieldsValue({
            username: "9999",
          });
        }}
      >
        设置值
      </Button>
      <Button
        type="primary"
        onClick={() => {
          const values = formRef.current?.getFieldsValue();
          console.log(values);
        }}
      >
        获取值
      </Button>
      <Form
        ref={formRef}
        initialValues={{ remember: true, username: "哈哈哈哈" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "请输入用户名!" },
            { max: 6, message: "长度不能大于 6" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item>
          <div>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default Basic;
