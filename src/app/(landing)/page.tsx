import React from 'react';
import { Header } from './components/Header';
import { SecondaryNav } from './components/SecondaryNav';
import { LoginForm } from './components/LoginForm';
import { Promotion } from './components/Promotion';
import { ChatBubble } from './components/ChatBubble';
import { SocialIcons } from './components/SocialIcons';

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100">
      <Header />
      <SecondaryNav />
      <Promotion />
      {/* LoginForm - Oculto en mobile pequeño para evitar superposición */}
      <div className="absolute top-32 left-4 z-30 w-full max-w-sm hidden sm:block">
        <LoginForm />
      </div>
      <ChatBubble />
      <SocialIcons />
    </div>
  );
}
