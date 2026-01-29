import { PermissionKey } from "./permission.model";

export interface MenuItem{
  label: string;
  route: string;
  icon?: string;
  requiredPermission?: PermissionKey[];
}

export type ButtonStyle = 'text'| 'elevated'| 'outlined'| 'filled'| 'tonal';