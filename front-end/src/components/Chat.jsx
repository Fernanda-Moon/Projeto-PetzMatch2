import MobileHeader from './layout/MobileHeader';
import BottomNav from './BottomNav';

export default function Chat() {
  const chats = [
    { id: 1, nome: 'Alice Armstrong (Tutora de Amora)', msg: 'Olá! Tenho interesse no cruzamento...', hora: '12:30', avatar: '/img/aliceAvatar.png.jpg' },
    { id: 2, nome: 'Lucas Kaliel (Tutor de Bluy)', msg: 'Claro, podemos marcar uma visita!', hora: 'Ontem', avatar: '/img/lucasAvatar.png.jpg' }
  ];

  return (
    <div className="app-container">
      <MobileHeader title="Conversas" showBack={false} />
      <main className="main-content chat-list">
        {chats.map(chat => (
          <div key={chat.id} className="chat-item">
            <img src={chat.avatar} alt="Avatar" />
            <div className="chat-info">
              <h4>{chat.nome}</h4>
              <p>{chat.msg}</p>
            </div>
            <span className="chat-time">{chat.hora}</span>
          </div>
        ))}
        {chats.length === 0 && <p>Nenhuma conversa ainda.</p>}
      </main>
      <BottomNav />
    </div>
  );
}