export type Message = {
  id: string;
  itemId: string;
  fromEmail: string;
  fromName: string;
  content: string;
  createdAt: Date;
};

let messages: Message[] = [];
let nextMessageId = 1;

export async function sendMessage(message: Omit<Message, 'id' | 'createdAt'>) {
  const newMessage: Message = {
    ...message,
    id: nextMessageId.toString(),
    createdAt: new Date(),
  };
  messages.push(newMessage);
  nextMessageId++;
  return newMessage;
}

export async function getMessagesForItem(itemId: string): Promise<Message[]> {
  return messages
    .filter(message => message.itemId === itemId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
