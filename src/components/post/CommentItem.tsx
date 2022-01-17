import React from "react";
import { RootState } from "../../types/reducers";
import { connect, ConnectedProps } from "react-redux";
import { deleteComment } from "../../actions/comment";

const mapStateToProps = (state : RootState) => ({
    auth: state.auth
});

const mapDispatch = {
    deleteComment
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
    comment: any,
    postId: string
};

const CommentItem = ({ deleteComment, postId, comment, auth } : Props) : JSX.Element => {
    return (
        <div className="post p-1">
        	<div className="post-first">
				<img
					className="round-img hide-mobile"
					src={`data:image/png;base64, ${comment.user.avatar}`}
					alt=""
				/>
        		<h4>{comment.user.username}</h4>
        	</div>
        	<div>
    			<p className="my-1">
            		{comment.text}
            	</p>
            	<p className="post-date">
            		{comment.date.slice(0, 10)}
        		</p>
				{auth.isAuthenticated && comment.user.userId === auth.user.userId && (
					<button onClick={e => deleteComment(postId, comment.commentId)} className="btn bg-danger">
						<i className="fas fa-times"/>
					</button>
				)}
        	</div>
    	</div>
    );
};

export default connector(CommentItem);
