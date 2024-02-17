export function processDropData(e: React.DragEvent<HTMLElement>) {
  e.preventDefault();
  const cardDetail = JSON.parse(e.dataTransfer.getData("text/plain"));
  const putData = {
    cardId: cardDetail.id,
    columnId: Number(e.currentTarget.id),
    assigneeUserId: cardDetail.assignee.id,
    title: cardDetail.title,
    description: cardDetail.description,
    dueDate: cardDetail.dueDate,
    tags: cardDetail.tags,
    imageUrl: cardDetail.imageUrl,
  };
  return { putData, columnId: cardDetail.columnId };
}
