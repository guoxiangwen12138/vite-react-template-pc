import { Modal } from "antd";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import SignatureCanvas from "react-signature-canvas";
import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
// import { useImage } from "../../context";
import "./index.less";
import logo from "@assets/lylo_logo_blue.jpg";
import { useImage } from "../../context";

const ContractPageContainer = (props: any) => {
  const { imageBase64, setImageBase64, text } = useImage();
  return (
    <div className="contract-page-container">
      <img src={logo} alt="" className="logo" />
      {props.children}
      <div>
        <img className="sign-pic" src={imageBase64 as any} />
      </div>
    </div>
  );
};

export default ContractPageContainer;
