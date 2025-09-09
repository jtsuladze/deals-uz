import { t } from '../../i18n';
import type { Locale } from '../../i18n';
import { getItems } from '../../itemsStore';
import { useSession } from 'next-auth/react';
import { sendMessage, getMessagesForItem } from '../../messagesStore';
import React, { useState, useEffect } from 'react';

export default function Browse({ locale }: { locale: Locale }) {
  const { data: session } = useSession();
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [messages, setMessages] = useState<Record<string, any[]>>({});

  useEffect(() => {
    const loadItems = async () => {
      try {
        const itemsList = await getItems();
        setItems(itemsList);
      } catch (error) {
        console.error('Error loading items:', error);
      }
    };
    loadItems();
  }, []);

  const handleMessage = async (itemId: string, sellerEmail: string) => {
    if (!session?.user?.email) return;
    try {
      await sendMessage({
        itemId,
        from: session.user.email,
        to: sellerEmail,
        text: messageText,
      });
      setMessageText('');
      alert('Message sent!');
      // Refresh messages
      const updatedMessages = await getMessagesForItem(itemId);
      setMessages((prev: Record<string, any[]>) => ({ ...prev, [itemId]: updatedMessages }));
    } catch (error) {
      alert('Error sending message. Please try again.');
    }
  };

  const loadMessages = async (itemId: string) => {
    try {
      const itemMessages = await getMessagesForItem(itemId);
      setMessages((prev: Record<string, any[]>) => ({ ...prev, [itemId]: itemMessages }));
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  return (
    <main>
      <h2>{t(locale, 'browse')}</h2>
      <ul>
        {items.length === 0 ? (
          <li>No items posted yet.</li>
        ) : (
          items.map((item: any) => (
            <li key={item.id} style={{ marginBottom: 24 }}>
              {item.image && <img src={item.image} alt={item.title[locale]} width={80} />}
              <h3>{item.title[locale]}</h3>
              <p>{item.description[locale]}</p>
              <strong>{t(locale, 'price')}: ${item.price}</strong>
              {session ? (
                <>
                  <button onClick={() => {
                    setActiveItemId(item.id);
                    loadMessages(item.id);
                  }}>{t(locale, 'message')}</button>
                  {activeItemId === item.id && (
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        handleMessage(item.id, item.sellerId);
                        setActiveItemId(null);
                      }}
                    >
                      <input
                        value={messageText}
                        onChange={e => setMessageText(e.target.value)}
                        placeholder="Type your message"
                        required
                      />
                      <button type="submit">Send</button>
                    </form>
                  )}
                  <ul>
                    {(messages[item.id] || []).map((msg: any, idx: number) => (
                      <li key={idx}>
                        <strong>{msg.from}:</strong> {msg.text}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>Sign in to message seller.</p>
              )}
            </li>
          ))
        )}
      </ul>
    </main>
  );
}
