import { useEffect, useState } from "react";
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import "./index.css";

const getFullscreenElement = () => {
  if (typeof document === "undefined") {
    return null;
  }

  return document.fullscreenElement || document.webkitFullscreenElement;
};

const GlobalFullscreenToggle = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (typeof document === "undefined") {
        return;
      }

      setIsFullscreen(getFullscreenElement() === document.documentElement);
    };

    handleFullscreenChange();
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener(
      "webkitfullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const handleFullscreenToggle = async () => {
    if (typeof document === "undefined") {
      return;
    }

    try {
      const rootElement = document.documentElement;

      if (getFullscreenElement() === rootElement) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          return;
        }

        if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }

        return;
      }

      if (rootElement.requestFullscreen) {
        await rootElement.requestFullscreen();
        return;
      }

      if (rootElement.webkitRequestFullscreen) {
        rootElement.webkitRequestFullscreen();
      }
    } catch (error) {
      console.error("Failed to toggle fullscreen mode", error);
    }
  };

  const handleShare = async () => {
    if (typeof window === "undefined") {
      return;
    }

    const shareUrl = window.location.href;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      messageApi.success("Result page link copied");
    } catch (error) {
      console.error("Failed to copy result page link", error);
      messageApi.error("Failed to copy result page link");
    }
  };

  return (
    <>
      {contextHolder}
      <div className="result-page-actions">
        <button
          type="button"
          className="result-page-action-button"
          aria-label="Copy result page link"
          onClick={handleShare}
        >
          <ShareAltOutlined />
        </button>
        <button
          type="button"
          className="result-page-action-button"
          aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}
          aria-pressed={isFullscreen}
          onClick={handleFullscreenToggle}
        >
          {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </button>
      </div>
    </>
  );
};

export default GlobalFullscreenToggle;
