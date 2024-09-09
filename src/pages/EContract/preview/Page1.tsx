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

const items: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "UserName",
    children: "Zhou Maomao",
  },
  {
    key: "2",
    label: "Telephone",
    children: "1810000000",
  },
  {
    key: "3",
    label: "Live",
    children: "Hangzhou, Zhejiang",
  },
  {
    key: "4",
    label: "Remark",
    children: "empty",
  },
  {
    key: "5",
    label: "Address",
    children: "No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China",
  },
];
// const styles = StyleSheet.create({
//   page: {
//     padding: 30,
//     fontFamily: 'Monocraft',
//   },
//   text: {
//     marginBottom: 12,
//     fontSize: 12,
//   },
// });
const base64Data =
  "data:image/png;base64,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";
const Page1: React.FC = () => {
  return (
    <div>
      page1page1page1page1page1 page1page1page1page1page1
      page1page1page1page1page1 page1page1page1page1page1
      page1page1page1page1page1 page1page1page1page1page1
      <img src={base64Data} />
    </div>
  );
  // return (
  //   <div className="page">
  //     <div>
  //       <div style={{ textAlign: "center" }}>
  //         <img
  //           src={logo}
  //           alt="logo"
  //           // style={{ height: "50px", objectFit: "contain" }}
  //         />
  //       </div>

  //       <Title level={4} style={{ textAlign: "center", fontWeight: "bold" }}>
  //         SHORT TERM VEHICLE RENTAL AGREEMENT (LD-270824-43931)
  //       </Title>

  //       <Text>
  //         This Short-Term Vehicle Rental Agreement is entered into between
  //         <b> SPARK DIGITAL PTE LTD </b> ("Company") and <b>usertwo test</b>
  //         QW784 (“Hirer”) on <b>09 Sep 2024 10:00 - 11:00</b> (“Start Date”) to{" "}
  //         <b>12 Sep 2024 10:00 - 11:00</b> (“End Date”) and outlines the
  //         respective rights and obligations of the Parties relating to the usage
  //         of the Authorised Vehicle.
  //       </Text>
  //       <Text>Parties hereby agree as follows:</Text>

  //       <Title level={5}>1. HIRER INFORMATION</Title>
  //       <div>
  //         <Text>
  //           Hirer Full Name: <b>usertwo test</b>
  //         </Text>
  //         <br />
  //         <Text>
  //           Hirer NRIC/FIN/Passport: <b>QW784</b>
  //         </Text>
  //         <br />
  //         <Text>
  //           Hirer Residential Address: <b>bxnfjf, 546782</b>
  //         </Text>
  //         <br />
  //         <Text>
  //           Hirer Contact No.: <b>+6588093286</b>
  //         </Text>
  //       </div>

  //       <Title level={5}>2. COMPANY INFORMATION</Title>
  //       <div>
  //         <Text>
  //           Company Name: <b>Spark Digital Pte Ltd</b>
  //         </Text>
  //         <br />
  //         <Text>
  //           Company UEN: <b>202139478H</b>
  //         </Text>
  //         <br />
  //         <Text>
  //           Company Address: <b>300 Sin Ming Road, Singapore 575626</b>
  //         </Text>
  //       </div>

  //       <Title level={5}>3. VEHICLE INFORMATION</Title>
  //       <div>
  //         <Text>
  //           Vehicle Number: <b>SNP9063J</b> (hereinafter referred to as
  //           “Authorised Vehicle”).
  //         </Text>
  //         <br />
  //         <Text>
  //           Vehicle Make & Model: <b>Toyota Corolla Altis</b>
  //         </Text>
  //       </div>
  //       <div>
  //         <Text>
  //           Vehicle Number: <b>SNP9063J</b> (hereinafter referred to as
  //           “Authorised Vehicle”).
  //         </Text>
  //         <br />
  //         <Text>
  //           Vehicle Make & Model: <b>Toyota Corolla Altis</b>
  //         </Text>
  //       </div>
  //       <div>
  //         <Text>
  //           Vehicle Number: <b>SNP9063J</b> (hereinafter referred to as
  //           “Authorised Vehicle”).
  //         </Text>
  //         <br />
  //         <Text>
  //           Vehicle Make & Model: <b>Toyota Corolla Altis</b>
  //         </Text>
  //         <Text>
  //           Vehicle Make & Model: <b>Toyota Corolla Altis</b>
  //         </Text>
  //         <Text>
  //           Vehicle Make & Model: <b>Toyota Corolla Altis</b>
  //         </Text>
  //         <Text>
  //           Vehicle Make & Model: <b>Toyota Corolla Altis</b>
  //         </Text>
  //         <Text>
  //           Vehicle Make & Model: <b>Toyota Corolla Altis</b>
  //         </Text>
  //         <Text>
  //           Vehicle Make & Model: <b>Toyota Corolla Altis111</b>
  //         </Text>
  //         <div>
  //           <Text>
  //             Company Name: <b>Spark Digital Pte Ltd</b>
  //           </Text>
  //           <br />
  //           <Text>
  //             Company UEN: <b>202139478H</b>
  //           </Text>
  //           <br />
  //           <Text>
  //             Company Address: <b>300 Sin Ming Road, Singapore 575626</b>
  //           </Text>
  //         </div>
  //         <div>
  //           <Text>
  //             Company Name: <b>Spark Digital Pte Ltd</b>
  //           </Text>
  //           <br />
  //           <Text>
  //             Company UEN: <b>202139478H</b>
  //           </Text>
  //           <br />
  //           <Text>
  //             Company Address: <b>300 Sin Ming Road, Singapore 575626</b>
  //           </Text>
  //         </div>
  //         <div>
  //           <Text>
  //             Company Name: <b>Spark Digital Pte Ltd</b>
  //           </Text>
  //           <br />
  //           <Text>
  //             Company UEN: <b>202139478H</b>
  //           </Text>
  //           <br />
  //           <Text>
  //             Company Address: <b>300 Sin Ming Road, Singapore 575626</b>
  //           </Text>
  //         </div>
  //         <div>
  //           <Text>
  //             Company Name: <b>Spark Digital Pte Ltd</b>
  //           </Text>
  //           <br />
  //           <Text>
  //             Company UEN: <b>202139478H</b>
  //           </Text>
  //           <br />
  //           <Text>
  //             Company Address: <b>300 Sin Ming Road, Singapore 999999</b>
  //           </Text>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};
export default Page1;
