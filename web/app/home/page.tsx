'use client';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div>
      <h1>HOME</h1>
      <ul>
        <Link href={`/home/1`}>
          <li>GROUP 1</li>
        </Link>
        <Link href={`/home/2`}>
          <li>GROUP 2</li>
        </Link>
        <Link href={`/home/3`}>
          <li>GROUP 3</li>
        </Link>
      </ul>
    </div>
  );
}
