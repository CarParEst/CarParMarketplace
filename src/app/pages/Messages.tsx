import { useState, useEffect } from 'react';
import { Send, Search, Image as ImageIcon, Archive, Trash2, ArchiveRestore } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Header } from '../components/Header';
import { ScrollArea } from '../components/ui/scroll-area';
import { useLocation } from 'react-router';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  productTitle: string;
  archived?: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    user: { name: 'Jüri Kask', avatar: 'J' },
    lastMessage: 'Kas mootor on veel saadaval?',
    lastMessageTime: '2 tundi tagasi',
    unread: true,
    productTitle: 'Komplektmootor LS3 V8 - 6.2L 430HP',
  },
  {
    id: '2',
    user: { name: 'Katrin Mägi', avatar: 'K' },
    lastMessage: 'Aitäh! Võtan homme järgi.',
    lastMessageTime: '1 päev tagasi',
    unread: false,
    productTitle: 'Recaro võidusõiduistmed - Paar, must nahk',
  },
  {
    id: '3',
    user: { name: 'Andrus Kalda', avatar: 'A' },
    lastMessage: 'Kas saab 1100€ eest?',
    lastMessageTime: '2 päeva tagasi',
    unread: false,
    productTitle: 'Reguleeritav vedrustuskomplekt - BC Racing BR',
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'other',
    text: 'Tere! Huvitun V8 mootorist.',
    timestamp: '10:30',
  },
  {
    id: '2',
    senderId: 'me',
    text: 'Tere! See on veel saadaval. Kas soovid sellest rohkem teada?',
    timestamp: '10:32',
  },
  {
    id: '3',
    senderId: 'other',
    text: 'Jah, kui kaua oled seda omanud?',
    timestamp: '10:35',
  },
  {
    id: '4',
    senderId: 'me',
    text: 'Umbes 6 kuud. See on suurepärases seisukorras ja läbisõit on vaid 15k km. Ideaalne vahetusprojektideks.',
    timestamp: '10:36',
  },
  {
    id: '5',
    senderId: 'other',
    text: 'Kas mootor on veel saadaval?',
    timestamp: '10:40',
  },
];

export function Messages() {
  const location = useLocation();
  const newConversationData = location.state?.newConversation;
  
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<string>(mockConversations[0].id);
  const [messageText, setMessageText] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    '1': mockMessages,
    '2': [],
    '3': [],
  });

  // Handle new conversation from product page
  useEffect(() => {
    if (newConversationData) {
      const { sellerId, sellerName, productId, productTitle } = newConversationData;
      
      const conversationId = `${sellerId}-${productId}`;
      
      // Check if conversation with this seller about this product already exists
      const existingConv = conversations.find(c => c.id === conversationId);
      
      if (existingConv) {
        // Select the existing conversation
        setSelectedConversation(existingConv.id);
      } else {
        // Create new conversation
        const newConv: Conversation = {
          id: conversationId,
          user: {
            name: sellerName,
            avatar: sellerName.charAt(0),
          },
          lastMessage: 'Alusta vestlust',
          lastMessageTime: 'Praegu',
          unread: false,
          productTitle: productTitle,
        };
        
        setConversations(prev => [newConv, ...prev]);
        setSelectedConversation(conversationId);
        setMessages(prev => ({ ...prev, [conversationId]: [] }));
      }
    }
  }, [newConversationData]);

  const currentConversation = conversations.find(c => c.id === selectedConversation);
  const currentMessages = messages[selectedConversation] || [];

  const handleArchiveConversation = (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, archived: !conv.archived }
          : conv
      )
    );
  };

  const handleDeleteConversation = (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    if (selectedConversation === conversationId) {
      const remaining = conversations.filter(c => c.id !== conversationId);
      setSelectedConversation(remaining[0]?.id || '');
    }
  };

  // Filter conversations based on archived state
  const filteredConversations = conversations.filter(conv => 
    showArchived ? conv.archived : !conv.archived
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, send message to backend
      const newMessage: Message = {
        id: `${currentMessages.length + 1}`,
        senderId: 'me',
        text: messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => ({
        ...prev,
        [selectedConversation]: [...prev[selectedConversation], newMessage],
      }));
      setMessageText('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6 h-[calc(100vh-5rem)]">
        <Card className="h-full overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            {/* Conversations List */}
            <div className="md:col-span-1 border-r">
              <div className="p-4 border-b">
                <h2 className="font-bold text-xl mb-3">Sõnumid</h2>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Otsi vestlusi..."
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={!showArchived ? 'default' : 'outline'}
                    size="sm"
                    className={!showArchived ? 'bg-[#0ABAB5] hover:bg-[#0ABAB5]/90' : ''}
                    onClick={() => setShowArchived(false)}
                  >
                    Aktiivsed
                  </Button>
                  <Button
                    variant={showArchived ? 'default' : 'outline'}
                    size="sm"
                    className={showArchived ? 'bg-[#0ABAB5] hover:bg-[#0ABAB5]/90' : ''}
                    onClick={() => setShowArchived(true)}
                  >
                    Arhiveeritud ({conversations.filter(c => c.archived).length})
                  </Button>
                </div>
              </div>

              <ScrollArea className="h-[calc(100%-120px)]">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 cursor-pointer transition-colors hover:bg-accent ${selectedConversation === conversation.id ? 'bg-accent' : ''}`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="size-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {conversation.user.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold truncate">{conversation.user.name}</p>
                          {conversation.unread && (
                            <div className="size-2 rounded-full bg-[#0ABAB5] flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate mb-1">
                          {conversation.productTitle}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {conversation.lastMessageTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {conversation.archived ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-3"
                          onClick={(e) => handleArchiveConversation(conversation.id, e)}
                        >
                          <ArchiveRestore className="size-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-3"
                          onClick={(e) => handleArchiveConversation(conversation.id, e)}
                        >
                          <Archive className="size-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-3"
                        onClick={(e) => handleDeleteConversation(conversation.id, e)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-2 flex flex-col">
              {currentConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {currentConversation.user.avatar}
                      </div>
                      <div>
                        <p className="font-semibold">{currentConversation.user.name}</p>
                        <p className="text-sm text-gray-500">{currentConversation.productTitle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {currentMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.senderId === 'me'
                                ? 'bg-[#0ABAB5] text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p>{message.text}</p>
                            <p
                              className={`text-xs mt-1 ${
                                message.senderId === 'me' ? 'text-white/80' : 'text-gray-500'
                              }`}
                            >
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="px-3">
                        <ImageIcon className="size-4" />
                      </Button>
                      <Input
                        type="text"
                        placeholder="Kirjuta sõnum..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSendMessage();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="size-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Vali vestlus sõnumite saatmiseks
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}