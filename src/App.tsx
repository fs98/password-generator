import "antd/dist/antd.css";

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
            <GithubOutlined style={{ fontSize: "24px", color: "#08c" }} />
          </Button>,
        ]}
      />
      <Content>Content</Content>
      <Footer style={{ textAlign: "center" }}>Password Generater ©2022</Footer>
    </Layout>
  );
};

export default App;
