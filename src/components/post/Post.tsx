import { Fragment, useEffect } from "react";
import { RootState } from "../../types/reducers";
import { connect, ConnectedProps } from "react-redux";
import { getPost, resetPost } from "../../actions/post";
import { getComments } from "../../actions/comment"
import { History, LocationState } from "history";
import { match } from "react-router-dom";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentItem from "../post/CommentItem";
import CommentForm from "../post/CommentForm";

const mapStateToProps = (state : RootState) => ({
    post: state.post,
    isAuthenticated: state.auth.isAuthenticated,
    comment: state.comment
});

const mapDispatch = {
    getPost, 
    resetPost,
    getComments
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Identifiable {
    id: string
}

interface Props extends PropsFromRedux {
    history: History<LocationState>,
    match: match<Identifiable>
}

const Post = ({ getPost, resetPost, getComments, post, comment, match, isAuthenticated, history } : Props) : JSX.Element => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match]);

    useEffect(() => {
        if (post.loadedPost && post.post === null) {
            resetPost();
            history.push("/NotFound");
        }
    }, [post, history, resetPost]);

    useEffect(() => {
        getComments(match.params.id);
    }, [getComments, match]);

    return (post.post === null ? <Spinner/> :
        <Fragment>
            <section className="container">
                <PostItem post={post.post} showActions={false}/>
                {isAuthenticated &&
                    <CommentForm postId={post.post.postId}/>
                }
                <div className="bg-primary p light my-1">
                    <h3>Comments</h3>
                </div>
                {comment.loadedComments ? comment.comments.map((comment : any) => (
                    <CommentItem key={comment.commentId} comment={comment} postId={post.post.postId}/>
                )) : null}
            </section>
        </Fragment>
    );
};


export default connector(Post);
