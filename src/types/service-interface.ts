
export interface DecodedToken {
  userId: number;
  userNickName: string;
  exp: number;
  iat: number;
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

export interface Moment{
  id: number;
  userId: number;
  nickName: string;
  momentId: number;
  content: string;
  images: string[];
  createTime: Array<string>; // 使用字符串数组来存储时间戳
  updateTime: Array<string>; // 使用字符串数组来存储时间戳
  likes: MomentLike[];
  comments: MomentComment[];
}

export interface MomentLike{
  id: number;
  userId: number;
  nickName: string;  
  momentId: number;
  createTime: Array<string>; // 使用字符串数组来存储时间戳
}
export interface MomentComment{
  id: number;
  userId: number;
  nickName: string;  
  momentId: number;
  content: string;
  createTime: Array<string>; // 使用字符串数组来存储时间戳
  updateTime: Array<string>;
}
