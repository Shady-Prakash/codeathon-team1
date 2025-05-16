'use client'

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState, useTransition } from 'react'
import { useRouter } from "next/navigation";

import { useAuth, useOrganization } from '@clerk/nextjs'
import { InviteMemberParams, OrganizationCustomRoleKey } from '@clerk/types'
import { isClerkAPIResponseError } from '@clerk/nextjs'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import SelectRole from '../_components/select-role'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from 'react-hot-toast'

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
  role: z.string().min(1, { message: "Select a role" }),
});

// Form to invite a new member to the organization.
export const InviteMember = ({ emailAddress, role }: InviteMemberParams) => {
  const { orgRole } = useAuth();
  const { isLoaded, organization, invitations } = useOrganization(OrgInvitationsParams);
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [fetchedRoles, setRoles] = useState<OrganizationCustomRoleKey[]>([]);
  const isPopulated = useRef(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: "",
    }
  });

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




  if (!isLoaded || !organization) {
    return <>Loading...</>
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const { isSubmitting, isValid } = form.formState;


  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        await organization.inviteMember({
          emailAddress: values.email,
          role: values.role
        })
        toast.success("Please check your email to accept invitation");
        router.push('/dashboard/admin/invitations');
      } catch (err: unknown) {
        if (isClerkAPIResponseError(err)) toast.error(err.errors[0].longMessage)
      }
    })

  }

  if (fetchedRoles.length === 0) return null

  return (
    <div className="max-w-lg mx-auto mt-6 border bg-slate-100 rounded-md p-6">
      <div>
        <h1 className="text-2xl mb-6">
          Invite new user
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe@gmail.com"
                      {...field}
                      onKeyDown={handleKeyDown}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fetchedRoles?.map((roleKey) => (
                        <SelectItem key={roleKey} value={roleKey} disabled={orgRole === 'org:admin' && roleKey.includes('org:super_admin')}>
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
              Invite New User
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default InviteMember;

<SelectRole />