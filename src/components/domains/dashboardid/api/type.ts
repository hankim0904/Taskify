export interface ChangedName {
  title: string;
}

export interface NewColumn {
  title: string;
  dashboardId: number;
}

export interface Column {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ColumnListData {
  result: string;
  data: Column[];
}

export interface Card {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    id: number;
    nickname: string;
    profileImageUrl: string | null;
  };
  imageUrl: string;
  teamId: string;
  dashboardId: number;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export interface NewComments {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

export interface EditedComments {
  content: string;
  commentId: number;
}

export interface FormValuesDrag {
  cardId?: number;
  assignee?: string;
  assigneeUserId?: number;
  dashboardId?: number;
  columnId?: number;
  title?: string;
  description?: string;
  dueDate?: string | Date;
  tags?: string | string[];
  imageUrl?: string;
}
