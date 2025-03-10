import { useMediaQuery } from "react-responsive";

export function useMobile() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  return isTabletOrMobile;
}
