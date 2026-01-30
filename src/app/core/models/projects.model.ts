import { PermissionKey } from "./permission.model";

export interface Project {
   id: string;
   title: string;
   slug?: string;
   requiredPermission?: PermissionKey[]
}

export interface Comment {
   id: string;
   idTask: string;
   author: string;
   message: string;
   createdAt: string;
}

export interface Task {
   id: string;
   idProjects: string[],
   title: string;
   description: string;
   done: boolean;
   comments: Comment[];
}

export interface KanbanColumn {
   id: string; 
   idProject: string;
   title: string;
   tasks: Task[];
}

