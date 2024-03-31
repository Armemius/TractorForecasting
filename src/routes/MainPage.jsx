import TractorPromotingBackground from './../assets/Tractor.mp4';

const MainPage = () => {
    return (
        <>
            <video className={"static-fullscreen"} autoPlay muted loop id="myVideo">
                <source src={TractorPromotingBackground} type="video/mp4"/>
            </video>
            <div className="filter static-fullscreen"/>
            <div className="decor-line left vertical"></div>
            <div className="decor-line right vertical"></div>
            <div className="decor-line horizontal horizontal-1"></div>
            <div className="decor-line horizontal horizontal-2"></div>
            <div className="decor-line horizontal horizontal-3"></div>
            <div className="about-section">
                <div>Z</div>
                <div>O</div>
                <div>V</div>
            </div>
            <main className={"main-page"}>
                <div className={"quote"}>
                    <span>Земля — единственный источник богатства,</span>
                    <span>и лишь сельское хозяйство его приумножает</span>
                    <br/>
                    <span className={"author"}>Франсуа Кенэ (1694-1774 гг)</span>
                </div>
            </main>
        </>
    );
};

export default MainPage;