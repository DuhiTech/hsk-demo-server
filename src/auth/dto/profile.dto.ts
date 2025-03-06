export class ProfileDto {
  id: string;
  role: ERole;
  email: string;
  created_at: Date;
  raw_user: RawUserDto;
}

export class RawUserDto {
  iss: string;
  sub: string;
  name: string;
  email: string;
  picture: string;
}

export enum ERole {
  admin = 'admin',
  lecturer = 'lecturer',
  student = 'student',
}
