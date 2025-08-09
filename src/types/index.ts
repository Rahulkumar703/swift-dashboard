export type ProfileType = {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    }
}

export type CommentType = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export type ThemeType = {
    mode?: 'light' | 'dark';
    theme?: 'legacy' | 'modern';
};
