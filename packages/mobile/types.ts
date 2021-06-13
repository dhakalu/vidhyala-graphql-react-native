

export interface Subject {
    id: string,
    title: string,
    description: string,
    logo: string,
}

// todo move this to central place
export type User = {
  id?: string;
  email?: string;
  username?: string;
  name: string;
};

export type Comment = {
  content: string;
  creator: User | null;
};