export const getRole = (role: string) => {
  return role === "org:member" ? "Member" : role === "org:admin" ? "Admin" : "Super Admin";
} 