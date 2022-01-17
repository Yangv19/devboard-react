export interface Alerts {
    msg: string,
    alertType: string,
    id: string
}

export interface Auth {
    isAuthenticated: boolean,
    user: any
}

export interface Post {
    posts: any[],
    post: any,
    loadedPosts: boolean,
    loadedPost: boolean
}

export interface Comment {
    comments: any[],
    loadedComments: boolean
}

export interface RootState {
    alert : Alerts[],
    auth: Auth,
    post: Post,
    comment: Comment
}
