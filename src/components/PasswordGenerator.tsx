import React, { useState } from 'react';
import { Form, Button, Card, Alert, Checkbox } from 'antd';
import type { CheckboxOptionType } from 'antd';

export const PasswordGenerator = (): JSX.Element => {
  const [password, setPassword] = useState('Not Generated');

  const onFinish = (values: {
    specialCharacters: CheckboxOptionType;
    numbers: CheckboxOptionType;
  }): void => {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialCharacters = '!@#$%^&*()';

    let chars = letters;

    if (values.specialCharacters) {
      chars += specialCharacters;
    }

    if (values.numbers) {
      chars += numbers;
    }

    const passwordLength = 12;

    let generatedPassword = '';

    for (let i = 0; i <= passwordLength; i += 1) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      generatedPassword += chars.substring(randomNumber, randomNumber + 1);

      setPassword(generatedPassword);
    }
  };

  // I have no idea if this errorInfo should be the type of object
  const onFinishFailed = (errorInfo: object): void => {
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
          name="specialCharacters"
          valuePropName="checked"
          initialValue={false}
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Checkbox>Include special characters</Checkbox>
        </Form.Item>
        <Form.Item
          name="numbers"
          valuePropName="checked"
          initialValue
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Checkbox>Include numbers</Checkbox>
        </Form.Item>
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
