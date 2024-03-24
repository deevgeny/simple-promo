import { useContext } from "react";
import { BreadcrumbsContext } from "../context/BreadcrumbsContext";

/**
 * Custom hook to read and set breadcrumbs context.
 * 
 * returns { end, setEnd }
 */
function useBreadcrumbsContext() {
  return useContext(BreadcrumbsContext);
}

export default useBreadcrumbsContext;