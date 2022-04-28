import React, { useState } from 'react';
import { Form, Button, Card, Alert, Checkbox, Select } from 'antd';
import { ValidateErrorEntity } from 'antd/node_modules/rc-field-form/lib/interface';

interface FormValues {
  specialCharacters: boolean;
  numbers: boolean;
  length: number;
}

const lengthOptions = [
  {
    label: '8',
    value: 8,
  },
  {
    label: '10',
    value: 10,
  },
  {
    label: '12',
    value: 12,
  },
  {
    label: '14',
    value: 14,
  },
  {
    label: '16',
    value: 16,
  },
  {
    label: '32',
    value: 32,
  },
];

export const PasswordGenerator = (): JSX.Element => {
  const [password, setPassword] = useState<string>('...');

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

    const passwordLength = values.length;

    let generatedPassword = '';

    for (let i = 0; i < passwordLength; i += 1) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      generatedPassword += chars.substring(randomNumber, randomNumber + 1);

      setPassword(generatedPassword);
    }
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity): void => {
    console.log('Failed:', errorInfo.errorFields);
  };

  return (
    <Card className="h-full">
      <Form
        name="basic"
        wrapperCol={{
          span: 16,
          offset: 0,
          md: {
            offset: 4,
          },
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

        <Form.Item
          initialValue={8}
          name="length"
          labelCol={{
            span: 2.5,
            offset: 0,
            md: {
              span: 2,
              offset: 2,
            },
          }}
          wrapperCol={{
            span: 16,
            offset: 0,
            md: {
              span: 16,
              offset: 0,
            },
          }}
          label="Length"
        >
          <Select options={lengthOptions} />
        </Form.Item>

        <Form.Item>
          <Alert message={password} type="info" />
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
