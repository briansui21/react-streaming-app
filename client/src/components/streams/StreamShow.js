import React, { useEffect, useRef } from "react";
import flv from "flv.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchStream } from "../../actions";

const StreamShow = (props) => {
    const dispatch = useDispatch();
    const { id } = props.match.params;
    const stream = useSelector((state) => state.streams[id]);

    const videoRef = useRef(null);
    const player = useRef(null);

    const fetchInitialStream = () => {
        dispatch(fetchStream(id));

        return () => {
            player.current.destroy();
        };
    };
    useEffect(fetchInitialStream, []);

    const initialPlayer = () => {
        buildPlayer();
    };
    useEffect(() => {
        initialPlayer();
    });

    const buildPlayer = () => {
        if (!stream) {
            return;
        }
        player.current = flv.createPlayer({
            type: "flv",
            url: `http://localhost:8000/live/${id}.flv`,
        });
        player.current.attachMediaElement(videoRef.current);
        player.current.load();
    };

    const renderStream = () => {
        if (!stream) {
            return <div>Loading...</div>;
        }

        const { title, description } = stream;
        return (
            <div>
                <video
                    ref={videoRef}
                    style={{ width: "100%" }}
                    controls={true}
                />
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    };

    return renderStream();
};

export default StreamShow;
