import "../../styles/fancy-button.css";

const FancyButton = () => {
  return (
    <button disabled className="styled-button">
      Start now!
      <div className="inner-button">
        <svg
          id="Arrow"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          width="30px"
          className="icon"
        >
          <defs>
            <linearGradient
              y2="100%"
              x2="100%"
              y1="0%"
              x1="0%"
              id="iconGradient"
            >
              <stop
                style={{ stopColor: "#FFFFFF", stopOpacity: 1 }}
                offset="0%"
              />
              <stop
                style={{ stopColor: "#AAAAAA", stopOpacity: 1 }}
                offset="100%"
              />
            </linearGradient>
          </defs>
          <path
            fill="url(#iconGradient)"
            d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z"
          />
        </svg>
      </div>
    </button>
  );
};

export default FancyButton;
