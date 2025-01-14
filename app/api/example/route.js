import { NextResponse } from 'next/server';


// get request - used for fetching data
export async function GET() {
    return NextResponse.json({ message: 'Hello from example GET API route' }, { status: 200 });
};

// post request - used for creating data
export async function POST() {
    return NextResponse.json({ message: 'Hello from example POST API route' }, { status: 200 });
};

// put request - used for updating data(whole)
export async function PUT() {  
    return NextResponse.json({ message: 'Hello from example PUT API route' }, { status: 200 });
}

// patch request - used for updating data(part)
export async function PATCH() {
    return NextResponse.json({ message: 'Hello from example PATCH API route' }, { status: 200 });
}

// delete request - used for deleting data
export async function DELETE() {
    return NextResponse.json({ message: 'Hello from example DELETE API route' }, { status: 200 });
}

