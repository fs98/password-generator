import "antd/dist/antd.css";

import { Layout, PageHeader, Button } from "antd";

const { Footer, Content } = Layout;

const App = () => {
  return (
    <Layout>
      <PageHeader className="site-page-header" title="Password Generator" />
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default App;
