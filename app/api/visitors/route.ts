import { NextResponse } from 'next/server';

// Simple in-memory storage (resets on server restart)
// For production, use a database like Vercel KV or PostgreSQL
let totalVisitors = 1023;
let todayVisitors = 45;
let lastDate = new Date().toDateString();

export async function GET() {
  // Reset today's count if it's a new day
  const currentDate = new Date().toDateString();
  if (currentDate !== lastDate) {
    todayVisitors = 0;
    lastDate = currentDate;
  }

  return NextResponse.json({
    active: Math.floor(Math.random() * 5) + 1,
    today: todayVisitors,
    total: totalVisitors,
  });
}

export async function POST() {
  const currentDate = new Date().toDateString();
  
  // Reset today's count if it's a new day
  if (currentDate !== lastDate) {
    todayVisitors = 0;
    lastDate = currentDate;
  }
  
  todayVisitors++;
  totalVisitors++;
  
  return NextResponse.json({ 
    success: true,
    today: todayVisitors,
    total: totalVisitors
  });
}