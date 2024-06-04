'use client'
import React, { useEffect, useState } from 'react';
import './Chat.css'; 
import { PageProps } from '../props';
import { useRouter } from 'next/navigation';

const Chat: React.FC<PageProps> = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]); // State to hold messages
  const [message, setMessage] = useState(''); 
  const [reload, setReload] = useState(false);
  const [user, setUser] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [receiverUsername, setReceiverUsername] = useState<string | null>(null); // State to hold selected receiver

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        if (response.ok) {
          setUsers(result.users);
        } else {
          console.error('Error fetching users:', result.error);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleMessage = async () => {
    if (message.length > 0 && user.length > 0 && receiverUsername) {
      try {
        const response = await fetch('/api/sendMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ senderUsername: user, receiverUsername, message }),
        });
        const result = await response.json();
        if (response.ok) {
          setMessage('');
          setReload(!reload);
        } else {
          console.error('Error sending message:', result.error);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('user'))
      router.push('/');
    else
      setUser(localStorage.getItem('user') ?? '');

    async function getMessages() {
      if (!user || !receiverUsername) return;
      const url = `/api/sendMessage?senderUsername=${user}&receiverUsername=${receiverUsername}`;
      const data = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (data.ok) {
        const result = await data.json();
        setMessages(result.messages);
      } else {
        const result = await data.json();
        console.error('Error fetching messages:', result.error);
      }
    }
    getMessages();
  }, [reload, user, receiverUsername]);

  return (
    <>
      <div className="user-menu">
        {users.filter(u=>u!= user).map((username, index) => (
          <div
            key={index}
            className="user"
            style={{backgroundColor:receiverUsername==username?"#99BCFF":""}}
            onClick={() => setReceiverUsername(username)}
          >
            {username}
          </div>
        ))}
      </div>

      <div className="chat">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.senderUsername === user ? 'user' : ''}`}>
              <p><strong>{msg.senderUsername}:</strong> {msg.message}</p>
              <p className="timestamp">{new Date(parseInt(msg.timestamp) * 1000).toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type='submit' onClick={handleMessage}>
            <svg id="button" xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 36 28" fill="none">
              <path d="M0.0171428 28L36 14L0.0171428 0L0 10.8889L25.7143 14L0 17.1111L0.0171428 28Z" fill="#93A9C3"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
