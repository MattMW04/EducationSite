import { NextResponse } from 'next/server';

// example of using parameters in API route - using Next.js dynamic route
export async function GET(req, { params }) {
    //example of breaking down to get parameter
    const { exampleParam } = await params;
    return NextResponse.json({ message: `Hello from example GET API route with param: ${exampleParam}` }, { status: 200 });
}

export async function POST(req, { params }) {
    const { exampleParam } = await params;
    return NextResponse.json({ message: `Hello from example POST API route with param: ${exampleParam}` }, { status: 200 });
}

export async function PUT(req, { params }) {
    const { exampleParam } = await params;
    return NextResponse.json({ message: `Hello from example PUT API route with param: ${exampleParam}` }, { status: 200 });
}

export async function PATCH(req, { params }) {
    const { exampleParam } = await params;
    return NextResponse.json({ message: `Hello from example PATCH API route with param: ${exampleParam}` }, { status: 200 });
}

export async function DELETE(req, { params }) {
    const { exampleParam } = await params;
    return NextResponse.json({ message: `Hello from example DELETE API route with param: ${exampleParam}` }, { status: 200 });
}