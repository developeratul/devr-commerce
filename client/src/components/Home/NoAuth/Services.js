import TrustedIcon from "../../../assets/svg/trusted.svg";
import ProfitIcon from "../../../assets/svg/profit.svg";

const Services = () => {
  return (
    <div className="services_section">
      <div className="container">
        <div className="services_box_wrapper">
          <div className="single_service">
            <div className="icon_container">
              <img src={TrustedIcon} alt="Service image" />
            </div>

            <div className="desc">
              <h2>Trusted Sellers</h2>
              <p>Verified sellers who will never corrupt you</p>
            </div>
          </div>

          <div className="single_service">
            <div className="icon_container">
              <img src={ProfitIcon} alt="Service image" />
            </div>

            <div className="desc">
              <h2>Grow yourself</h2>
              <p>You can also be a verified seller and make profit</p>
            </div>
          </div>

          <div className="single_service">
            <div className="icon_container">
              <img src={TrustedIcon} alt="Service image" />
            </div>

            <div className="desc">
              <h2>World-wide </h2>
              <p>You can also be a verified seller and make profit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
