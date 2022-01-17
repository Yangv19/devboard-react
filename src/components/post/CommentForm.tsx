import React, { Fragment, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { addComment } from "../../actions/comment";

const mapDispatch = {
    addComment
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
    postId: string
};

const CommentForm = ({ addComment, postId } : Props) : JSX.Element => {
    const [text, setText] = useState("");

    const onChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value);

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        addComment(postId, {text});
        setText("");
    }

    return (
        <Fragment>
            <form className="form my-1" onSubmit={e => onSubmit(e)}>
                <textarea
                    name="text"
                    cols={30}
                    rows={5}
                    placeholder="Leave a comment"
                    value={text}
                    onChange={e => onChange(e)}
                />
            <input type="submit" className="btn bg-dark my-1" value="Submit" />
            </form>
        </Fragment>
    );
};

export default connector(CommentForm);
