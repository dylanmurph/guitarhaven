import React, {Component} from "react";
import '../../css/footer.css';
import Facebook from "../../images/social-fb.png"
import X from "../../images/social-x.png"
import Instagram from "../../images/social-insta.png"


export default class footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="socials-container">
                    <div className="socials">
                        <a href="https://www.facebook.com"><img src={Facebook} alt="Facebook"/></a>
                        <a href="https://www.x.com"><img src={X} alt="X"/></a>
                        <a href="https://www.instagram.com"><img src={Instagram} alt="Instagram"/></a>
                    </div>
                </div>
                <p> &copy; Guitar Haven 2025</p>
            </div>
        )
    }
}
