import "./styles.css";

export default function App() {
  return (
    <div className="app">
      <div className="mobile">
        <div className="mobile-screen">
          <img alt="Mobile Screen" role="img"></img>
        </div>
        <div className="mobile-buttons-area">
          <div className="row1">
            <button>MENU</button>
          </div>
          <div className="row2">
            <button>PREVIOUS</button>
            <div className="center-btn">
              <button>CENTER</button>
            </div>
            <button>NEXT</button>
          </div>
          <div className="row3">
            <button>FORWARD</button>
          </div>
        </div>
      </div>
    </div>
  );
}
