/* Styles */
import "../../styles/index.css";

const Loader = ({ size }) => {
  return (
    <div className="default-loader">
      <div className={`loader-dot ${size}`}></div>
      <div className={`loader-dot ${size}`}></div>
      <div className={`loader-dot ${size}`}></div>
    </div>
  );
};

export default Loader;
