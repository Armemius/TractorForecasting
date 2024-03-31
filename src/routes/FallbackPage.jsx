import TractorPromotingBackground from './../assets/Tractor.mp4';
import ErrorSound from './../assets/404.mp3';
import {createRef, useEffect} from "react";

const FallbackPage = () => {
    const audioRef = createRef();

    useEffect(() => {
        setInterval(() => {
            audioRef.current.play();
        }, 100)
    }, [audioRef]);

    return (
        <>
            <audio ref={audioRef}>
                <source src={ErrorSound} type="audio/mpeg"></source>
            </audio>
            <video className={"static-fullscreen"} autoPlay muted loop id="myVideo">
                <source src={TractorPromotingBackground} type="video/mp4"/>
            </video>
            <div className="filter static-fullscreen "/>
            <div className="filter static-fullscreen bg-error-404"/>
            <div className={"static-fullscreen error-404"}>Er404</div>
        </>
    );
};

export default FallbackPage;