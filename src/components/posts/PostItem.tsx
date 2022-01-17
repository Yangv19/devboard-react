import React, { Fragment, useEffect, useState } from "react";
import { RootState } from "../../types/reducers";
import { connect, ConnectedProps } from "react-redux";
import { addLike, addDislike, deletePost, removeLike, removeDislike } from "../../actions/post";
import { Link } from "react-router-dom";

const mapStateToProps = (state : RootState) => ({
    auth: state.auth
});

const mapDispatch = {
    addLike, 
    addDislike, 
    deletePost, 
    removeLike, 
    removeDislike
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
    post: any,
    showActions: boolean
}

const PostItem = ( {addLike, addDislike, deletePost, removeLike, removeDislike, auth, post, showActions } : Props) : JSX.Element => {
    const [state, setState] = useState({
        liked: false, 
        disliked: false
    });

    useEffect(() => {
        if (auth.isAuthenticated) {
            if (post.likes.find((like : any) => like.user ===  auth.user._id) && 
                post.dislikes.find((dislike : any) => dislike.user ===  auth.user._id)) {
                setState({disliked: true, liked: true});
            } else if (post.likes.find((like : any) => like.user ===  auth.user._id)) {
                setState({disliked: false, liked: true});
            } else if (post.dislikes.find((dislike : any) => dislike.user ===  auth.user._id)) {
                setState({disliked: true, liked: false});
            };
        };
    }, [post, auth]);

    const like = (e: React.SyntheticEvent) => {
        if (auth.isAuthenticated) {
            if (!state.liked) {
                addLike(post.postId);
            } else {
                removeLike(post.postId);
            };
            setState({...state, liked: !state.liked});
        };
    };

    const dislike = (e: React.SyntheticEvent) => {
        if (auth.isAuthenticated) {
            if (!state.disliked) {
                addDislike(post.postId);
            } else {
                removeDislike(post.postId);
            };
            setState({...state, disliked: !state.disliked});
        };
    };

    return (
        <div className="post p-1">
            <div className="post-first">
                <img
                    className="round-img hide-mobile"
                    src={`data:image/png;base64, ${post.user.avatar}`}
                    alt=""
                />
                <h4>{post.user.username}</h4>
            </div>
            <div>
                <p className="my-1">
                    {post.text}
                </p>
                <p className="post-date">
                    Posted on {post.date.slice(0, 10)}
                </p>
                {showActions && 
                    <Fragment>
                        <button onClick={e => like(e)} className="btn bg-light primary">
                            <i className="fas fa-thumbs-up"/>
                            {post.likes.length > 0 && 
                            <span className="comment-count"> {post.likes.length}</span>}
                        </button>
                        <button onClick={e => dislike(e)} className="btn bg-light primary">
                            <i className="fas fa-thumbs-down"/>
                            {post.dislikes.length > 0 && 
                            <span className="comment-count"> {post.dislikes.length}</span>}
                        </button>
                        <Link to={`/posts/${post.postId}`} className="btn bg-primary light">  
                            <i className="fas fa-comment"></i>
                            <span className="hide-mobile"> Discussion</span>
                    
                        </Link>
                        {auth.isAuthenticated && post.user._id === auth.user._id && 
                            <button onClick={e => deletePost(post.postId)} className="btn bg-danger">
                                <i className="fas fa-times"/>
                            </button>
                        }                
                    </Fragment>
                }
            </div>
        </div>
    );
};

PostItem.defaultProps = {
    showActions: true
};

export default connector(PostItem);
