import React from "react";

import {
  Divider,
  Typography,
  FloatButton,
  DescriptionsProps,
  Descriptions,
} from "antd";
import { exportPDF } from "@utils/index";
import { DownCircleFilled } from "@ant-design/icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import { View, Text, StyleSheet } from "@react-pdf/renderer";
import logo from "@assets/avatar.png";
// import { View, Text, StyleSheet } from "@react-pdf/renderer";
import Monocraft from "@assets/Monocraft.ttf";
const { Title, Paragraph, Text, Link } = Typography;
import "./index.less";
import { useImage } from "../context";

const Page9: React.FC = () => {
  const { imageBase64, setImageBase64, text } = useImage();
  return (
    <div>
      <Typography>
        <Title>Page9</Title>
        <Paragraph>
          In the process of internal desktop applications development, many
          different design specs and implementations would be involved, which
          might cause designers and developers difficulties and duplication and
          reduce the efficiency of development.
        </Paragraph>

        <Paragraph>
          After massive project practice and summaries, Ant Design, a design
          language for background applications, is refined by Ant UED Team,
          which aims to{" "}
          <Text strong>
            uniform the user interface specs for internal background projects,
            lower the unnecessary cost of design differences and implementation
            and liberate the resources of design and front-end development
          </Text>
          .
        </Paragraph>

        <Title level={4}>Guidelines and Resources</Title>

        <Paragraph>
          We supply a series of design principles, practical patterns and high
          quality design resources (<Text>Sketch</Text> and <Text>Axure</Text>),
          to help people create their product prototypes beautifully and
          efficiently.
        </Paragraph>

        <Paragraph>
          Press <Text keyboard>Esc</Text> to exit...
        </Paragraph>

        <Paragraph>
          蚂蚁的企业级产品是一个庞大且复杂的体系。这类产品不仅量级巨大且功能复杂，而且变动和并发频繁，常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件，可以通过抽象得到一些稳定且高复用性的内容。
        </Paragraph>

        <Title level={4}>设计资源</Title>

        <Paragraph>
          我们提供完善的设计原则、最佳实践和设计资源文件（
          <Text>Sketch</Text> 和<Text>Axure</Text>
          ），来帮助业务快速设计出高质量的产品原型。
        </Paragraph>
      </Typography>
    </div>
  );
};
export default Page9;
