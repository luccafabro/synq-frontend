export type UserStatus = "ACTIVE" | "BANNED" | "DISABLED";

export type RoleName = "ADMIN" | "MANAGER" | "USER";

export type MessageType = "TEXT" | "IMAGE" | "AUDIO" | "VIDEO" | "SYSTEM";

export type MembershipRole = "OWNER" | "MODERATOR" | "MEMBER" | "GUEST";

export interface PaginationDTO {
  currentPage?: number;
  pageSize?: number;
  totalPages?: number;
  lastPage?: boolean;
}

export interface RoleDto {
  id?: number;
  externalId?: string;
  name?: RoleName;
  description?: string;
}

export interface UserDto {
  id: number;
  externalId?: string;
  username: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  emailVerified?: boolean;
  status?: UserStatus;
  keycloakExternalId?: string;
  metadata?: Record<string, unknown>;
  lastLoginAt?: string; // date-time
  roles?: RoleDto[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  email?: string;
  emailVerified?: boolean;
  status?: UserStatus;
  metadata?: Record<string, unknown>;
  roles?: RoleName[];
}

export interface CreateUserDto extends UpdateUserDto {
  username: string;
}

export interface FrequencyDto {
  id: number;
  externalId?: string;
  name: string;
  slug: string;
  description?: string;
  isPrivate?: boolean;
  ownerId?: number;
  settings?: Record<string, unknown>;
  coverImageUrl?: string;
  maxParticipants?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateFrequencyDto {
  name?: string;
  description?: string;
  isPrivate?: boolean;
  settings?: Record<string, unknown>;
  coverImageUrl?: string;
  maxParticipants?: number;
}

export interface CreateFrequencyDto extends UpdateFrequencyDto {
  name: string;
  slug: string;
}

export interface MessageDto {
  id: number;
  externalId?: string;
  frequencyId: number;
  authorId: number;
  authorUsername?: string;
  content: string;
  type?: MessageType;
  replyToId?: number;
  createdAt?: string;
  editedAt?: string;
  deletedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface CreateMessageDto {
  frequencyId: number;
  content: string;
  type?: MessageType;
  replyToId?: number;
  metadata?: Record<string, unknown>;
}

export interface MembershipDto {
  id: number;
  userId: number;
  username?: string;
  frequencyId: number;
  frequencyName?: string;
  role?: MembershipRole;
  joinedAt?: string;
  mutedUntil?: string;
  isBanned?: boolean;
  nickname?: string;
}

export interface CreateMembershipDto {
  userId: number;
  frequencyId: number;
  role?: MembershipRole;
  nickname?: string;
}

export interface ResponseDTO<T> {
  data: T;
  message?: string;
  status?: string;
  error?: boolean;
  pagination?: PaginationDTO;
}
