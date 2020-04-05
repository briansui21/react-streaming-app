import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStream } from "../../actions";

const StreamShow = (props) => {
    const dispatch = useDispatch();
    const { id } = props.match.params;
    const stream = useSelector((state) => state.streams[id]);

    const fetchInitialStream = () => {
        dispatch(fetchStream(id));
    };
    useEffect(fetchInitialStream, []);

    const renderStream = () => {
        if (!stream) {
            return <div>Loading...</div>;
        }

        const { title, description } = stream;
        return (
            <div>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    };

    return renderStream();
};

export default StreamShow;
