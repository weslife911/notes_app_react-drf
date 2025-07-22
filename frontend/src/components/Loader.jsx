import "./loader.css";

function Loader() {

  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="loader-circle-11">
          <div className="arc"></div>
          <div className="arc"></div>
          <div className="arc"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader
