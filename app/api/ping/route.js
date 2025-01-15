import  connectDB  from '../../../server/connectDB.mjs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const connection = await connectDB();
    
    const db = connection.db;

    const collections = await db.listCollections().toArray();

    return NextResponse.json({collections},{status:200});
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ message: 'Error fetching collections' }, { status: 500 });
  }
}
