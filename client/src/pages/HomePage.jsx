import LeftNavBar from "../components/Left Nav Bar/LeftNavBar"
import Main from "../components/Main/Main"
import RightNavBar from "../components/Right Nav Bar/RightNavBar"


let HomePage = (props) => {
    return (
        <>
            <div className="homeContainer">

                <LeftNavBar />
                <Main />
                <RightNavBar />
            </div>
        </>
    )
}

export default HomePage