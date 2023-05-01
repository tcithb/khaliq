import { NonIndexRouteObject } from "react-router-dom";
import { UserRoleCode } from "../utils/common/enums/roles";

export interface CustomRouteObject extends NonIndexRouteObject {
  showInMenu?: boolean;
  title?: string;
  iconClass?: string;
  icon?: string;
  isAdmin?: boolean;
  hideFor?: UserRoleCode[];
}
