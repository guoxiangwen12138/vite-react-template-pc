import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Divider,
  Typography,
  FloatButton,
  Pagination,
  Button,
  Space,
} from "antd";
import { exportPDF } from "@utils/index";
import { DownCircleFilled } from "@ant-design/icons";
import { ImageProvider } from "../context";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";

import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import "./index.less";
import ReactDOM from "react-dom/client";
import NiceModal from "@ebay/nice-modal-react";
import SignatureModal from "../components/signature-modal";
import { useImage } from "../context";
import Page4 from "./Page4";
import Page5 from "./Page5";
import Page6 from "./Page6";
import Page7 from "./Page7";
import Page8 from "./Page8";
import ContractPageContainer from "../components/contract-page-container";
import Page10 from "./Page10";
import Page11 from "./Page11";
import Page12 from "./Page12";
import Page9 from "./Page9";
import Page13 from "./Page13";
import Page14 from "./Page14";
import Page15 from "./Page15";
import Page16 from "./Page16";
import Page17 from "./Page17";
import Page18 from "./Page18";
import Page19 from "./Page19";
import Page20 from "./Page20";
import Page21 from "./Page21";
import Page22 from "./Page22";
import Page23 from "./Page23";
import Page24 from "./Page24";
import Page25 from "./Page25";
interface IUserProps {
  test?: string;
}
// A4 paper dimensions in mm
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const { Title, Text } = Typography;

const EContractPreview: React.FC<IUserProps> = () => {
  const contractContentRef = useRef(null);
  const hiddenContainerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  // const { imageBase64, setImageBase64 } = useImage();
  // 签名canvas
  const [signCanvas, setSignCanvas] = useState<string>("");

  const handlePageChange = (page: number) => {
    console.log(page);
    setCurrentPage(page);
  };
  // 跳转到指定页面的锚点
  const scrollToPage = (pageId: string) => {
    const pageElement = document.getElementById(pageId);
    if (pageElement) {
      pageElement.scrollIntoView({
        behavior: "smooth", // 滚动时的动画效果
        block: "start", // 对齐到页面顶部
      });
    }
  };
  // const renderPageContent = (pageNumber: number) => {
  //   switch (pageNumber) {
  //     case 1:
  //       return <Page1 key={pageNumber}  />;
  //     case 2:
  //       return <Page2 key={pageNumber} />;
  //     case 3:
  //       return <Page3 key={pageNumber} />;
  //     // ... 其他页面的情况
  //     default:
  //       return <div key={pageNumber}>未知页面</div>;
  //   }
  // };
  const renderPageContent = (pageNumber: number) => {
    // return (
    //   <>
    //     {Array.from({ length: 25 }, (_, index) => index + 1).map((page) => (
    //       <>
    //         <div key={page} className="page-container" id={`page${page}`}>
    //           <div>{`page${page}`}</div>
    //         </div>
    //         {/* <div className="html2pdf__page-break"></div> */}
    //       </>
    //     ))}
    //   </>
    // );

    return (
      <>
        <div id="page1" className="page-container">
          <ContractPageContainer>
            <Page1 />
          </ContractPageContainer>
        </div>
        <div id="page2" className="page-container">
          <ContractPageContainer>
            <Page2 />
          </ContractPageContainer>
        </div>
        <div id="page3" className="page-container">
          <ContractPageContainer>
            <Page3 />
          </ContractPageContainer>
        </div>
        <div id="page4" className="page-container">
          <ContractPageContainer>
            <Page4 />
          </ContractPageContainer>
        </div>
        <div id="page5" className="page-container">
          <ContractPageContainer>
            <Page5 />
          </ContractPageContainer>
        </div>
        <div id="page6" className="page-container">
          <Page6 />
        </div>
        <div id="page7" className="page-container">
          <Page7 />
        </div>
        <div id="page8" className="page-container">
          <Page8 />
        </div>
        <div id="page9" className="page-container">
          <Page9 />
        </div>
        <div id="page10" className="page-container">
          <Page10 />
        </div>
        <div id="page11" className="page-container">
          <Page11 />
        </div>
        <div id="page12" className="page-container">
          <Page12 />
        </div>
        <div id="page13" className="page-container">
          <Page13 />
        </div>
        <div id="page14" className="page-container">
          <Page14 />
        </div>
        <div id="page15" className="page-container">
          <Page15 />
        </div>
        <div id="page16" className="page-container">
          <Page16 />
        </div>
        <div id="page17" className="page-container">
          <Page17 />
        </div>
        <div id="page18" className="page-container">
          <Page18 />
        </div>
        <div id="page19" className="page-container">
          <Page19 />
        </div>
        <div id="page20" className="page-container">
          <Page20 />
        </div>
        <div id="page21" className="page-container">
          <Page21 />
        </div>
        <div id="page22" className="page-container">
          <Page22 />
        </div>
        <div id="page23" className="page-container">
          <Page23 />
        </div>
        <div id="page24" className="page-container">
          <Page24 />
        </div>
        <div id="page25" className="page-container">
          <Page25 />
        </div>
      </>
    );
  };

  const handleDownload = async () => {
    // exportPDF("测试导出pdf", hiddenContainerRef?.current!);
    // await generatePDF();
    // handleDownloadHtmlPdf();
    // handleDownloadPdfDom();
    generatePDF();
  };

  const waitForImagesToLoad = (container: any) => {
    const images = container.getElementsByTagName("img");
    const promises = [];

    for (let img of images) {
      if (!img.complete) {
        promises.push(
          new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          })
        );
      }
    }
    return Promise.all(promises);
  };
  // 将每页的内容分开导出pdf
  const generatePDF = async () => {
    // 创建一个新的jsPDF实例
    const opt = {
      margin: [0, 0, 0, 0], // 控制PDF页面的margin
      filename: "multiple-pages.pdf", // PDF文件名
      image: { type: "jpeg", quality: 0.6 }, // 图片格式和质量
      html2canvas: { scale: 1, useCORS: true, logging: false },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: true,
      }, // PDF配置
      pagebreak: { mode: ["avoid-all", "css"] }, // 防止内容分页时分隔
    };
    const pages = document.getElementsByClassName("page-container");
    const pagesArray = Array.from(pages);
    let doc = html2pdf().from(pages[0]).set(opt).toPdf();
    // 删除 pagesArray 数组的第一个元素
    pagesArray.shift();
    while (pagesArray.length > 0) {
      doc = doc
        .get("pdf")
        .then((pdf: any) => {
          pdf.addPage();
        })
        .from(pagesArray[0])
        .toContainer()
        .toCanvas()
        .toPdf();

      // 删除已经渲染的页面
      pagesArray.shift();
    }
    // 最后一步，在所有页面上添加页码
    doc.get("pdf").then((pdf: any) => {
      const totalPages = pdf.internal.getNumberOfPages(); // 获取总页数
      // 循环所有页，添加页码
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i); // 设置当前页
        pdf.setFontSize(10); // 设置字体大小
        pdf.text(
          `Page ${i} of ${totalPages}`,
          pdf.internal.pageSize.getWidth() / 2,
          pdf.internal.pageSize.getHeight() - 4,
          {
            align: "center",
          }
        ); // 添加页码，水平居中
      }
    });
    doc.save();
  };
  // 将整个合同内容导出为PDF文件
  const handleDownloadPdfDom = () => {
    // html2pdf()
    //   .from(contractContentRef.current)
    //   .set({
    //     margin: [0, 0, 0, 0],
    //     filename: "multiple-pages.pdf",
    //     image: { type: "jpeg", quality: 0.98 },
    //     pagebreak: {
    //       mode: ["legacy", "avoid-all", "css"],
    //       // after: '.page-container',  // 在每个页面前创建断点
    //     },
    //     html2canvas: { scale: 1, useCORS: true },
    //     jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    //   })
    //   .save();
  };

  const handleDownloadHtmlPdf = () => {
    // 获取隐藏容器的内容
    // const element = hiddenContainerRef.current;
    // 创建临时容器
    const tempContainer = document.createElement("div");
    // tempContainer.style.visibility = "hidden"; // 隐藏容器
    // tempContainer.style.position = "absolute"; // 将容器移出页面布局
    // tempContainer.style.transform = "translateY(100vh)"; // 将容器移出视口范围
    // tempContainer.style.opacity = "0"; // 设置透明度为0，不可见但仍然渲染
    // tempContainer.style.position = "fixed";
    tempContainer.style.top = "0";
    tempContainer.style.left = "100vw"; // 将容器移到页面右侧
    tempContainer.style.width = "100%"; // 宽度设为100%确保内容正常渲染
    // tempContainer.style.overflow = "hidden"; // 避免影响布局
    tempContainer.style.zIndex = "-9999"; // 确保容器在最底层
    document.body.appendChild(tempContainer);
    // 使用 ReactDOM.createRoot 渲染内容到临时容器
    const root = ReactDOM.createRoot(tempContainer);
    root.render(
      <ImageProvider>
        <div
          style={{
            backgroundColor: "#fff",
            width: `${A4_WIDTH_MM}mm`,
            // height: `${A4_HEIGHT_MM}mm`,
            minHeight: "100vh",
            height: `auto`,
            boxSizing: "border-box",
            padding: "10mm",
            margin: "auto",
            position: "relative",
          }}
        >
          <Page1 />
          <div className="html2pdf__page-break"></div>
          <Page2 />
          <div className="html2pdf__page-break"></div>
          <Page3 />

          {/* 添加更多页面内容 */}
        </div>
      </ImageProvider>
    );
    // 使用 requestAnimationFrame 确保渲染完成
    requestAnimationFrame(() => {
      waitForImagesToLoad(tempContainer)
        .then(() => {
          return html2pdf()
            .from(tempContainer)
            .set({
              margin: [4, 0, 4, 0],
              filename: "multiple-pages.pdf",
              image: { type: "jpeg", quality: 0.98 },
              pagebreak: {
                mode: ["legacy", "avoid-all", "css"],
              },
              html2canvas: { scale: 1, useCORS: true },
              jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            })
            .save();
        })
        .catch((error) => {
          console.error("Error loading images:", error);
        })
        .finally(() => {
          document.body.removeChild(tempContainer);
        });
    });
  };
  const showSignModal = () => {
    NiceModal.show(SignatureModal);
  };
  return (
    <div className="preview-container">
      {/* Header */}
      <div className="preview-header">
        <Title level={4} style={{ color: "white", margin: 0 }}>
          LyloDrive e-Contract: LD_usertwo_test_LD-270824-43931_270824
        </Title>
      </div>

      {/* Main Content */}
      <div className="preview-main">
        <div className="preview-content" ref={contractContentRef}>
          {renderPageContent(currentPage)}
        </div>
      </div>

      {/* Footer */}
      <div className="preview-footer">
        <Space>Please sign on the page</Space>
        <Button type="primary" onClick={showSignModal}>
          Sign
        </Button>
      </div>

      <div className="floatBtn">
        <Button type="text" size="small" onClick={handleDownload}>
          Download
        </Button>
        <Pagination
          simple={{ readOnly: true }}
          defaultCurrent={1}
          total={25}
          onChange={(page) => scrollToPage(`page${page}`)}
          // onChange={handlePageChange}
          pageSize={1}
        />
      </div>
    </div>
  );
};
export default EContractPreview;
