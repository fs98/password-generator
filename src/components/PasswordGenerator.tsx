import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'antd';
import type { FormProps } from 'antd';

export const PasswordGenerator = (): JSX.Element => {
  const [password, setPassword] = useState('Not Generated');

  const onFinish = (values: FormProps): void => {
    // console.log('Success:', values);

    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const passwordLength = 12;
    let generatedPassword = '';

    for (let i = 0; i <= passwordLength; i += 1) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      generatedPassword += chars.substring(randomNumber, randomNumber + 1);

      setPassword(generatedPassword);
    }
  };

  const onFinishFailed = (errorInfo: any): void => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card className="h-full">
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Alert message={password} type="info" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Generate Password
          </Button>
          <Button htmlType="button" className="ml-3" disabled>
            Copy Password
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
