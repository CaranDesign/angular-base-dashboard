import { Comment, KanbanColumn, Project, Task } from "../core/models/projects.model";


export const mockProjList: Project[] = [
  {
    id: 'p1',
    title: 'Dashboard Analytics',
    slug: 'dashboard-analytics',
  },
  {
    id: 'p2',
    title: 'E-commerce Platform',
    slug: 'e-commerce-platform',
  },
  {
    id: 'p3',
    title: 'Dashboard Analytics',
    slug: 'dashboard-analytics',
  },
  {
    id: 'p4',
    title: 'E-commerce Platform',
    slug: 'e-commerce-platform',
  },
  {
    id: 'p5',
    title: 'Dashboard Analytics',
    slug: 'dashboard-analytics',
  },
  {
    id: 'p6',
    title: 'E-commerce Platform',
    slug: 'e-commerce-platform',
  },
  {
    id: 'p7',
    title: 'E-commerce Platform',
    slug: 'e-commerce-platform',
  },
  {
    id: 'p8',
    title: 'E-commerce Platform',
    slug: 'e-commerce-platform',
  }
];
  

export const mockComments: Comment[] = [
  {
    id: 'c1',
    idTask: 't1',
    author: 'Marco',
    message: 'Remember to use lazy loading',
    createdAt: '2024-01-10'
  },
  {
    id: 'c2',
    idTask: 't3',
    author: 'Anna',
    message: 'UI looks clean 👍',
    createdAt: '2024-01-11'
  },
  {
    id: 'c3',
    idTask: 't4',
    author: 'Admin',
    message: 'Routing approved',
    createdAt: '2024-01-09'
  }
];



export const mockTasks: Task[] = [
  {
    id: 't1',
    idProjects: ['p1'],
    title: 'Setup project structure',
    description: 'Create modules, routing and base layout',
    done: false,
    comments: mockComments
  },
  {
    id: 't2',
    idProjects: ['p1'],
    title: 'Define mock data',
    description: 'Prepare demo data for kanban board',
    done: false,
    comments: []
  },
  {
    id: 't3',
    idProjects: ['p1'],
    title: 'Implement board UI',
    description: 'Create Kanban columns and task cards',
    done: false,
    comments: mockComments
  },
  {
    id: 't4',
    idProjects: ['p2'],
    title: 'Configure routing',
    description: 'Setup nested routes for project',
    done: true,
    comments: mockComments
  }
];



export const mockColumns: KanbanColumn[] = [
  {
    id: 'col-p1-todo',
    idProject: 'p1',
    title: 'To Do',
    tasks: mockTasks
  },
  {
    id: 'col-p1-inprogress',
    idProject: 'p1',
    title: 'In Progress',
    tasks: mockTasks
  },
  {
    id: 'col-p1-done',
    idProject: 'p1',
    title: 'Done',
    tasks: mockTasks
  },

  {
    id: 'col-p2-done',
    idProject: 'p2',
    title: 'Done',
    tasks: mockTasks
  }
];