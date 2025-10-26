import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import FourAnimation from "../animations/four.json";
import SixAnimation from "../animations/six.json";
import OutAnimation from "../animations/out.json";
import { api } from "../util/axios";

function Scoreboard() {
  const initialData = {
    batsman1: { name: "-", runs: 0, balls: 0 },
    batsman2: { name: "-", runs: 0, balls: 0 },
    team1: "Team 1",
    team2: "Team 2",
    score: "0-0",
    over: "0.0",
    runRate: 0,
    isFour: false,
    isSix: false,
    isOut: false,
    // isOverCompleted: false,
    showLive:"",
    bowler: { name: "-", wickets: 0, runs: 0, overs: 0 },
  };
  const [data, setData] = useState(initialData);
  const [show4, setShow4] = useState(false);
  const [show6, setShow6] = useState(false);
  const [showOut, setShowOut] = useState(false);
  const [showLive, setShowLive] = useState("");


  // Fetch data initially
  useEffect(() => {
    const getScore = async () => {
      try {
        const res = await api.get("/overlay/get-score");
        setData(res.data);
      } catch (error) {
        console.log("Error fetching score: ", error);
      }
    };

    getScore(); // run once immediately

    // fetch every 2 seconds
    const interval = setInterval(getScore, 2000);

    return () => clearInterval(interval); // cleanup
  }, []);

  // Watch for triggers
  useEffect(() => {
    if (data.isFour) {
      setShow4(true);
      const t = setTimeout(() => setShow4(false), 2000);
      return () => clearTimeout(t);
    }
  }, [data.isFour]);

  useEffect(() => {
    if (data.isSix) {
      setShow6(true);
      const t = setTimeout(() => setShow6(false), 2000);
      return () => clearTimeout(t);
    }
  }, [data.isSix]);

  useEffect(() => {
    if (data.isOut) {
      setShowOut(true);
      const t = setTimeout(() => setShowOut(false), 2000);
      return () => clearTimeout(t);
    }
  }, [data.isOut]);



  useEffect(() => {
    if (data.showLive !=="") {
      setShowLive(data.showLive );
      const t = setTimeout(() => setShowLive(""), 3000);
      return () => clearTimeout(t);
    }
  }, [data.showLive]);

  const batsmen = [data.batsman1, data.batsman2];

  return (
    <>
      <div className="fixed top-5 right-5 rounded-full">
        <img
          src="/images/logo.png"
          alt="logo"
          style={{ width: 75, aspectRatio: 1, borderRadius: "50%" }}
        />
      </div>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 md:w-3/4 bg-white rounded-lg shadow-lg flex justify-between items-center px-4 py-1 text-black font-sans ">
        {/* Batsmen */}
        <div className="flex flex-col">
          {batsmen.map(
            (b, idx) =>
              b && (
                <div key={idx} className="flex justify-between w-40">
                  <span className="font-bold">{b.name}</span>
                  <span>
                    {b.runs} ({b.balls})
                  </span>
                </div>
              )
          )}
        </div>

        {/* Team & Score */}
        <div className="flex flex-col items-center bg-blue-600 text-white rounded-lg px-4 py-1">
          <div className="text-sm">
            {data.team1} v {data.team2}
          </div>
          <div className="text-xl font-bold">{data.score}</div>
          <div className="text-xs">
            Overs: {data.over} | Run Rate: {data.runRate}
          </div>
        </div>

        {/* Bowler */}
        {data.bowler && (
          <div className="flex flex-col items-end w-32">
            <span className="font-bold">{data.bowler.name}</span>
            <span>
              {data.bowler.wicket}-{data.bowler.run}
            </span>
            <span>
              {data.bowler.over}.{data.bowler.ball} overs
            </span>
          </div>
        )}
      </div>

      {/* Lottie animations */}
      {show4 && (
        <Lottie
          animationData={FourAnimation}
          loop={false}
          autoplay
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 999,
          }}
        />
      )}
      {show6 && (
        <Lottie
          animationData={SixAnimation}
          loop={false}
          autoplay
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 999,
          }}
        />
      )}
      {showOut && (
        <Lottie
          animationData={OutAnimation}
          loop={false}
          autoplay
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 999,
          }}
        />
      )}

      {showLive === "logo"  && (
        <div>
          <img
            src="/images/logo.png"
            alt="logo"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              width: "400px",
              transform: "translate(-50%, -50%)",
              aspectRatio:1,
              zIndex: 999,
              borderRadius:"50%"
            }}
          />
        </div>
      )}

      {showLive === "jsMobile" && (
        <div>
          <img
            src="/images/jsMobile.png"
            alt="logo"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              width: "40%",
              transform: "translate(-50%, -50%)",
              zIndex: 999,
            }}
          />
        </div>
      )}
    </>
  );
}

export default Scoreboard;
