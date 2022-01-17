import { useEffect, Fragment } from "react";
import { RootState } from "../../types/reducers";
import { connect, ConnectedProps } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostForm from "./PostForm";
import PostItem from "./PostItem";

const mapStateToProps = (state : RootState) => ({
    post: state.post,
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatch = {
    getPosts
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

const Posts = ({ getPosts, post, isAuthenticated } : PropsFromRedux) : JSX.Element => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (!post.loadedPosts ? <Spinner/> : 
        <Fragment>
            <section className="container">
                <h1 className="large primary">Posts</h1>
                <p className="lead">
                    <i className="fas fa-user hide-mobile">Welcome to the Community</i>
                </p>
                {isAuthenticated &&
                    <PostForm/>
                }
                <div>
                    {post.posts.map(post => (
                        <PostItem key={post.postId} post={post}/>
                    ))}
                </div>
            </section>
        </Fragment>
    );
};

export default connector(Posts);
