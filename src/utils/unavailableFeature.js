import { notification } from "antd";
import { useCallback } from "react";

export const UNAVAILABLE_FEATURE_MESSAGE = "This feature is currently unavailable.";

export const useUnavailableFeatureNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const showUnavailableFeatureMessage = useCallback(() => {
    api.warning({
      message: "Response Message",
      description: UNAVAILABLE_FEATURE_MESSAGE,
    });
  }, [api]);

  return {
    contextHolder,
    showUnavailableFeatureMessage,
  };
};
