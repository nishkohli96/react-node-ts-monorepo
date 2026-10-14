import { UserRole } from '@/user/role';

export { UserRole };

export type UserDetails = {
  name: string;
  email: string;
};

export function isAdmin(role: UserRole): boolean {
  return role === UserRole.Admin;
}
