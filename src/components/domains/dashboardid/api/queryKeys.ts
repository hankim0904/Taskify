export const getColumnListQueryKey = (dashboardId: string | string[] | undefined) => ["columnList", dashboardId];

export const getCardListQueryKey = (columnId: number) => ["cardList", columnId];

export const getCardDetailQueryKey = (cardId: number) => ["card", cardId];

// 추가한 부분
export const getCommentsQueryKey = (cardId: number) => ["comments", cardId];
