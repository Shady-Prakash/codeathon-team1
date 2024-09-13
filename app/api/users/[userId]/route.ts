import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  { params }:{ params: { userId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await clerkClient.users.deleteUser(params.userId);
    
    return NextResponse.json({ message: 'User deleted' })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error deleting user' })
  }
}