import React, { Fragment, useState } from "react"
import { connect, ConnectedProps } from "react-redux";
import { addPost } from "../../actions/post";

const mapDispatch = {
    addPost
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

const PostForm = ({ addPost } : PropsFromRedux) : JSX.Element => {
    const [text, setText] = useState('');

    const onChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value);

    const onSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addPost({text});
        setText('');
    };

    return (
        <Fragment>
            <div className="bg-primary light p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={e => onSubmit(e)}>
                <textarea
                    cols={30}
                    rows={5}
                    placeholder="Create a post"
                    value={text}
                    onChange={e => onChange(e)}
                />
                <input type="submit" className="btn bg-dark my-1" value="Submit"/>
            </form>
        </Fragment>
    );
};

export default connector(PostForm);
