import React, { useEffect } from "react";
import Icon from "@/components/Icon";
import QRCode from "qrcode.react";
import style from "./index.module.less";
export default props => {
  const { value, size = 180, show, onClose } = props;
    useEffect(()=>{
        let rollup = document.querySelector('.rollup');
        if(show){
            document.body.style.overflow = 'hidden'  //简单的防止滚动穿透
            //document.querySelector('.rollup').style.zIndex = -1;
            if(rollup){
                rollup.style.opacity= 0;
            }
        }
        else {
            document.body.style = null;
            if(rollup){
                rollup.style.opacity = 1;
            }
        }
    },[show]);
  return (
    show && (
      <div className={style["qrcode-modal-wrapper"]}>
        <div className={style.modal}>
          <div className={style.close}>
            <Icon type="close" onClick={onClose} />
          </div>
          <div className={style.qrcode}>
            <QRCode value={value} size={size} />
          </div>
        </div>
      </div>
    )
  );
};
