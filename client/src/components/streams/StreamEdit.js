import _ from "lodash";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

const StreamEdit = (props) => {
    const stream = useSelector((state) => state.streams[props.match.params.id]);
    const dispatch = useDispatch();

    const fetchInitialStream = () => {
        dispatch(fetchStream(props.match.params.id));
    };
    useEffect(fetchInitialStream, []);

    const onSubmit = (formValues) => {
        dispatch(editStream(props.match.params.id, formValues));
    };

    const renderForm = () => {
        if (!stream) {
            return <div>Loading</div>;
        }

        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                    initialValues={_.pick(
                        stream,
                        "title",
                        "description"
                    )}
                    onSubmit={onSubmit}
                />
            </div>
        );
    };

    return renderForm();
};

export default StreamEdit;
