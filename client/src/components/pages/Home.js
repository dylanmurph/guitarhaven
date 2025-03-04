import React, {Component} from "react";
import "../../css/home.css"
import BannerImage from "../../images/banner.png"
import AcousticImage from "../../images/acoustic.png"
import ElectricImage from "../../images/electric.png"
import BassImage from "../../images/bass.png"
import OthersImage from "../../images/others.png"

export default class Home extends Component {
    render() {
        const categories = [
            {name: "Acoustic ", image: AcousticImage},
            {name: "Electric", image: ElectricImage},
            {name: "Bass", image: BassImage},
            {name: "Others", image: OthersImage},
        ]

        return (
            <div>
                <div className="home">
                    <div className="banner" style={{backgroundImage: `url(${BannerImage})`}}>
                    </div>
                </div>

                <div className="categories-container">
                    {categories.map((category, index) => (
                        <div key={index} className="category-tile">
                            <img src={category.image} alt={category.name}/>
                            <div className="category-names">
                                {category.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}