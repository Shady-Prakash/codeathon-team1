'use client'

import * as z from "zod";
import { useAuth, useOrganization } from '@clerk/nextjs'
import { OrganizationCustomRoleKey } from '@clerk/types'
import { useEffect, useRef, useState } from 'react'
import SelectRole from '../_components/select-role'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { isClerkAPIResponseError } from '@clerk/nextjs'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface InviteMemberProps {
  email: string | undefined; 
  role: OrganizationCustomRoleKey | undefined[];
}

export const OrgInvitationsParams = {
  invitations: {
    pageSize: 5,
    keepPreviousData: true,
  },
}

const formSchema = z.object({
  email: z.
    string().
    min(1, {
      message: "Email is required",
    }).
    email("This is not a valid email.").
    trim(),
  role: z.string({
    required_error: "Please select a role to display.",
  })
});

// Form to invite a new member to the organization.
export const InviteMember = ({ email, role } :InviteMemberProps) => {
  const {orgRole} = useAuth();
  const { isLoaded, organization, invitations } = useOrganization(OrgInvitationsParams)
  const router = useRouter();
  const [disabled, setDisabled] = useState(false)
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: " ",
      role: " ",
    }
  })
  const {isSubmitting, isValid} = form.formState;

  if (!isLoaded || !organization) {
    return <>Loading</>
  }

  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    try {
      await organization.inviteMember({
        emailAddress: values.email,
        role: values.role
      })
      toast.success("Please check your email to accept invitation");
      router.push('/dashboard/admin/invitations');
    } catch(err: any) {
        if (isClerkAPIResponseError(err)) toast.error(err.errors[0].message)
  }
}


  if (fetchedRoles.length === 0) return null

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-left h-full p-6">
      <div>
        <h1 className="text-2xl">
          Invite member
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-8">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      placeholder="johndoe@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({field}) => (
                <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  {fetchedRoles?.map((roleKey) => (
                    <SelectItem key={roleKey}value={roleKey} disabled = {orgRole === 'org:admin' && roleKey.includes('org:super_admin')}>
                      {roleKey === "org:admin" ? "Admin" : roleKey === "org:member" ? "Member" : "Super admin"}
                    </SelectItem>
                  ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
              )}
            />
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Invite
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default InviteMember;

<SelectRole/>