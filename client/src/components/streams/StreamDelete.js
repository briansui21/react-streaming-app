import React, { useEffect } from "react";
import Modal from "../Modal";
import history from "../../history";
import { useSelector, useDispatch } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";
import { Link } from "react-router-dom";

const StreamDelete = (props) => {
    const { id } = props.match.params;
    const stream = useSelector((state) => state.streams[id]);
    const dispatch = useDispatch();

    const fetchInitialStream = () => {
        dispatch(fetchStream(id));
    };
    useEffect(fetchInitialStream, []);

    const onDeleteClick = () => {
        dispatch(deleteStream(id));
    };

    const actions = (
        // This is shorthand for a React.Fragment
        <>
            <button onClick={onDeleteClick} className="ui button negative">
                Delete
            </button>
            <Link to="/" className="ui button">
                Cancel
            </Link>
        </>
    );

    const renderContent = () => {
        if (!stream) {
            return "Are you sure you want to delete this stream?";
        } else {
            return `Are you sure you want to delete the stream "${stream.title}"?`;
        }
    };

    return (
        <Modal
            title="Delete Stream"
            content={renderContent()}
            actions={actions}
            onDismiss={() => history.push("/")}
        />
    );
};

export default StreamDelete;
