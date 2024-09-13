interface getUserInitialsProps {
  firstName: string;
  lastName: string;
}

export const getUserInitials = ({firstName = '', lastName = ''}: getUserInitialsProps) => {
  const firstNameInitial = firstName?.at(0)?.toUpperCase() || ''
  const lastNameInitial = lastName?.at(0)?.toUpperCase() || ''

  return firstNameInitial + lastNameInitial
}
