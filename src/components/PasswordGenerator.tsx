import React, { useState } from 'react';
import { Form, Button, Card, Alert, Checkbox } from 'antd';
import { ValidateErrorEntity } from 'antd/node_modules/rc-field-form/lib/interface';

interface FormValues {
  specialCharacters: boolean;
  numbers: boolean;
}

export const PasswordGenerator = (): JSX.Element => {
  const [password, setPassword] = useState<null | string>(null);

  const onFinish = (values: FormValues): void => {
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
  const onFinishFailed = (errorInfo: ValidateErrorEntity): void => {
    console.log('Failed:', errorInfo.errorFields);
  };

  return (
    <Card className="h-full">
      <Form
        name="basic"
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
        >
          <Checkbox>Include special characters</Checkbox>
        </Form.Item>

        <Form.Item name="numbers" valuePropName="checked" initialValue>
          <Checkbox>Include numbers</Checkbox>
        </Form.Item>

        <Form.Item>
          <Alert message={password ?? '...'} type="info" />
        </Form.Item>

        <Form.Item>
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
