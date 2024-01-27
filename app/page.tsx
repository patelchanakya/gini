'use client'
import { useState } from 'react';
import MainView from '@/components/main-view';
import NavBar from '@/components/nav-bar';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <main className="flex flex-col items-center justify-center bg-gray-100 w-full min-h-screen">
      <NavBar />
      <MainView />
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center lg:hidden">
          <div className="bg-white px-4 py-3 rounded-lg space-y-2">
            <h2 className="text-lg">Please use on Desktop</h2>
            <p>Mobile app coming soon...</p>
            <Button className="close-popup" onClick={closePopup}>Close</Button>
          </div>
        </div>
      )}
    </main>
  )
}
