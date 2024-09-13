import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request,
  { params }:{ params: { organizationId: string, invitationId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await clerkClient.organizations.revokeOrganizationInvitation({
      organizationId: params.organizationId,
      invitationId: params.invitationId,
      requestingUserId: userId,
    })
    
    return NextResponse.json({ message: 'Invitation revoked' })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error revoking invitation' })
  }
}