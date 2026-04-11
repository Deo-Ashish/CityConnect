import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';
import axios from 'axios';
import { API_BASE } from '../services/api';

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm your CityConnect Assistant. How can I help you find local services today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // For now, we utilize the same 'enhance search' or a dedicated chat endpoint if we had one.
      // Since we are building this incrementally, I'll redirect this to a new backend endpoint
      // We'll implement GET /api/ai/chat shortly.
      const res = await axios.post(`${API_BASE}/ai/chat`, { message: input });
      setMessages(prev => [...prev, { role: 'assistant', text: res.data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "I'm having a bit of trouble connecting right now. Please try again later!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="ai-chat-toggle"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          color: 'white',
          border: 'none',
          boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.5)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          transition: 'transform 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="modern-card animate-fade-in"
          style={{
            position: 'fixed',
            bottom: '6rem',
            right: '2rem',
            width: '380px',
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
            zIndex: 1000,
            overflow: 'hidden',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.7)'
          }}
        >
          {/* Header */}
          <div style={{ padding: '1.25rem', background: 'linear-gradient(to right, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '0.75rem', color: '#818cf8' }}>
              <Bot size={20} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>CityConnect AI</h4>
              <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></div> Online
              </span>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ 
                  maxWidth: '85%',
                  padding: '0.75rem 1rem',
                  borderRadius: '1rem',
                  fontSize: '0.9rem',
                  background: msg.role === 'user' ? 'var(--primary-color)' : 'rgba(255,255,255,0.05)',
                  color: 'white',
                  border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)',
                  borderBottomRightRadius: msg.role === 'user' ? '0.25rem' : '1rem',
                  borderBottomLeftRadius: msg.role === 'assistant' ? '0.25rem' : '1rem'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '0.75rem 1rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', display: 'flex', gap: '4px' }}>
                  <div className="dot-pulse"></div>
                  <div className="dot-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="dot-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              className="auth-input" 
              placeholder="Ask anything..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ padding: '0.65rem 1rem', fontSize: '0.9rem' }}
            />
            <button type="submit" className="auth-button" style={{ width: '45px', minWidth: '45px', height: '45px', padding: 0 }}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        .dot-pulse {
          width: 6px;
          height: 6px;
          background: #818cf8;
          borderRadius: 50%;
          animation: dotPulse 1s infinite ease-in-out;
        }
      `}} />
    </>
  );
}
