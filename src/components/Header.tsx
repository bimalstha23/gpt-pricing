'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Badge } from './ui/badge';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="w-full  backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/MusicGPT.png"
                alt="MusicGPT Logo"
                width={32}
                height={32}
              />
              <span className="text-white font-semibold text-lg">MusicGPT</span>
            </Link>
            <Badge variant="outline">Beta</Badge>
          </div>

          <div className="flex items-center md:gap-4">
            <div className="flex items-center md:shadow-md md:border text-gray-300 text-sm px-4 py-2 gap-4 rounded-md">
              <div className="text-gray-400 text-sm md:block hidden">
                <span className="text-gray-500">Get unlimited AI Music</span>
                <br />
                <span className="text-gray-400">00 free credits left</span>
              </div>
              <Link href="/pricing">
                <Button
                  variant="default"
                  className="bg-white text-black hover:bg-gray-100 font-medium px-6 py-2 rounded-md"
                >
                  Upgrade
                </Button>
              </Link>
            </div>

            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white font-medium text-sm">B</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
