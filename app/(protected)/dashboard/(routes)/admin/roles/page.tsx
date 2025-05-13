'use client'

import { useOrganization } from '@clerk/nextjs'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import SelectRole from './_components/select-role'

export const OrgMembersParams = {
  memberships: {
    pageSize: 5,
    keepPreviousData: true,
  },
}

// List of organization memberships. Administrators can
// change member roles or remove members from the organization.
export const ManageRoles = () => {
  const { isLoaded, memberships } = useOrganization(OrgMembersParams)

  const organizationUsers = memberships?.data?.map((mem) => {
    return mem
  })

  if (!isLoaded) {
    return <>Loading</>
  }

  return (
    <div className="p-6">
      <DataTable columns={columns} data={organizationUsers!}/>
    </div>
  )
}

export default ManageRoles;

<SelectRole/>