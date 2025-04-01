import { useEffect, useState } from "preact/hooks";

interface PlatformInfo {
  isMacLike: boolean;
  isTouchMobile: boolean;
}

export function usePlatformInfo(): PlatformInfo {
  const [platformInfo, setPlatformInfo] = useState<PlatformInfo>({
    isMacLike: false,
    isTouchMobile: false,
  });

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const platform = navigator.platform ?? "";
      const userAgent = navigator.userAgent ?? "";

      const detectedIsMacLike = /Mac|iPod|iPhone|iPad/.test(platform);
      const detectedIsTouchMobile = /iPhone|iPad|iPod|Android/i.test(
        userAgent,
      );

      setPlatformInfo({
        isMacLike: detectedIsMacLike,
        isTouchMobile: detectedIsTouchMobile,
      });
    }
  }, []);

  return platformInfo;
}
