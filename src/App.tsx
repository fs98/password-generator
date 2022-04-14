import "antd/dist/antd.min.css";

import { Layout, PageHeader, Button } from "antd";
import { GithubOutlined } from "@ant-design/icons";

const { Footer, Content } = Layout;

const App = () => {
  return (
    <Layout>
      <PageHeader
        className="site-page-header"
        title="Password Generator"
        subTitle="Fata Sefer"
        extra={[
          <Button
            key="3"
            type="link"
            href="https://github.com/fs98/password-generator"
            target="_blank"
          >
            <GithubOutlined className="text-2xl" />
          </Button>,
        ]}
      />
      <Content>Content</Content>
      <Footer className="text-center">Password Generater ©2022</Footer>
    </Layout>
  );
};

export default App;
