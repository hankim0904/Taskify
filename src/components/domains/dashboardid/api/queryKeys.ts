export const getColumnListQueryKey = (dashboardId: string | string[] | undefined) => ["columnList", dashboardId];

export const getCardListQueryKey = (columnId: number) => ["cardList", columnId];

export const getCardDetailQueryKey = (cardId: number) => ["card", cardId];
