import { useState, useEffect, ChangeEventHandler, useRef } from 'react'
import { useOrganization, useAuth } from "@clerk/nextjs"
import type { OrganizationCustomRoleKey } from '@clerk/types'

type SelectRoleProps = {
  fieldName?: string
  isDisabled?: boolean
  onChange?: ChangeEventHandler<HTMLSelectElement>
  defaultRole?: string
}

const SelectRole = (props: SelectRoleProps) => {
  const {orgRole} = useAuth();
  const { fieldName, isDisabled = false, onChange, defaultRole } = props
  const { organization } = useOrganization()

  const [fetchedRoles, setRoles] = useState<OrganizationCustomRoleKey[]>([])
  const isPopulated = useRef(false)

  useEffect(() => {
    if (isPopulated.current) return
    organization
      ?.getRoles({
        pageSize: 20,
        initialPage: 1,
      })
      .then((res) => {
        isPopulated.current = true
        setRoles(res.data.map((roles) => roles.key as OrganizationCustomRoleKey))
      })
  }, [organization?.id])

  if (fetchedRoles.length === 0) return null

  return (
      <select
        name={fieldName}
        disabled={orgRole === "org:member" || isDisabled}
        aria-disabled={isDisabled}
        onChange={onChange}
        defaultValue={defaultRole}
      >
        {fetchedRoles?.map((roleKey) => (
          <option key={roleKey} value={roleKey} disabled = {orgRole === 'org:admin' && roleKey.includes('org:super_admin')}>
            {roleKey === "org:admin" ? "Admin" : roleKey === "org:member" ? "Member" : "Super admin"}
          </option>
        ))}
      </select>
  )
}

export default SelectRole;