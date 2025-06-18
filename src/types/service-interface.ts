
export interface DecodedToken {
  userId?: number;
  userNickName?: string;
  isAdmin?: boolean;
  exp?: number;
  iat?: number;
}

export interface GuestbookEntry {
  id: number;
  userId: number;
  nickName: string;
  message: string;
  createTime: Array<string>; // 使用字符串数组来存储时间戳
  updateTime: Array<string>; // 使用字符串数组来存储时间戳
  guestComments: GuestComment[];
}

export interface GuestComment {
  id: number;
  guestBookId: number;
  userId: number;
  nickName: string;
  content: string;
  createTime: Array<string>; // 使用字符串数组来存储时间戳
  updateTime: Array<string>; // 使用字符串数组来存储时间戳
}
