import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import FourAnimation from "../animations/four.json";
import SixAnimation from "../animations/six.json";
import OutAnimation from "../animations/out.json";
import { api } from "../util/axios";

export default function Scoreboard() {
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
    showLive: "",
    inning:"",
    bowler: { name: "-", wicket: 0, run: 0, over: 0, ball: 0 },
  };

  const [data, setData] = useState(initialData);
  const [show4, setShow4] = useState(false);
  const [show6, setShow6] = useState(false);
  const [showOut, setShowOut] = useState(false);
  const [showLive, setShowLive] = useState("");

  useEffect(() => {
    const getScore = async () => {
      try {
        const res = await api.get("/overlay/get-score");
        setData(res.data);
      } catch (err) {
        console.log("Error fetching score:", err);
      }
    };

    getScore();
    const interval = setInterval(getScore, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (data.isFour) {
      setShow4(true);
      const t = setTimeout(() => setShow4(false), 1800);
      return () => clearTimeout(t);
    }
  }, [data.isFour]);

  useEffect(() => {
    if (data.isSix) {
      setShow6(true);
      const t = setTimeout(() => setShow6(false), 1800);
      return () => clearTimeout(t);
    }
  }, [data.isSix]);

  useEffect(() => {
    if (data.isOut) {
      setShowOut(true);
      const t = setTimeout(() => setShowOut(false), 1800);
      return () => clearTimeout(t);
    }
  }, [data.isOut]);

  useEffect(() => {
    if (data.showLive !== "") {
      setShowLive(data.showLive);
      const t = setTimeout(() => setShowLive(""), 3000);
      return () => clearTimeout(t);
    }
  }, [data.showLive]);

  const batsmen = [data.batsman1, data.batsman2];

  return (
    <>
     
      <div className="fixed top-2 right-2 rounded-full z-20">
        <img
          src="/images/logo.png"
          alt="logo"
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
          }}
        />
      </div>

     
      <div
        className="fixed bottom-2 left-1/2 -translate-x-1/2 w-[96%] rounded-2xl overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.3)]"
        style={{
          background:
            "linear-gradient(90deg, #0b1c47 0%, #032869 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div className="flex items-center justify-between text-xs md:text-sm font-semibold ">
         
          <div className="flex items-center gap-3 px-4 py-3 bg-[#0a1a3f] md:w-[20%] lg:w-[16%]">
            <div>
              <h2 className="text-base md:text-lg font-bold tracking-wider">
                {data.inning === 2 ? data.team2 : data.team1}
              </h2>
              <p className="text-[10px] opacity-70">{data.over} overs</p>
            </div>
            <div className="text-3xl md:text-4xl font-extrabold text-[#ff8200]">
              {data.score}
            </div>
          </div>

         
          <div className="flex items-center justify-between px-3 md:px-4 py-2 bg-[#0f2459] flex-grow border-l border-blue-800 border-r">
            
            <div className="flex flex-col justify-center w-full">
              {batsmen.map((b, i) => (
                
                <div
                  key={i}
                  className="flex justify-between text-[11px] md:text-[13px] py-[2px]"
                >
                    <span style={!b.isStriker?{opacity:0}:{}} className="mr-2" >🏏</span>
                  <span className="tracking-wide truncate w-full">
                    {b.name}
                  </span>
                  <span className="font-bold">
                    {b.runs}
                    <span className="text-[10px] opacity-75">
                      ({b.balls})
                    </span>
                  </span>
                </div>
              ))}
            </div>
            {/* VS Team2 */}
            <div className="ml-3 flex-shrink-0 text-[11px] md:text-[13px] font-semibold text-gray-300 whitespace-nowrap w-[20%] text-center bg-[#0a1a3f] py-4">
              vs {data.inning === 2 ? data.team1: data.team2}
            </div>
          </div>

          {/* Right: Bowler info */}
          {data.bowler && (
            <div className="flex flex-col justify-center px-4 py-3 bg-[#0a1a3f] min-w-[120px] text-right md:w-[20%] ">
              <div className="flex justify-between md:justify-center gap-3 text-[11px] md:text-[13px] mb-1 ">
                <span>{data.bowler.name}</span>
                <span>
                  {data.bowler.wicket}-{data.bowler.run}
                  <span className="text-[10px] opacity-75 ml-1">
                    {data.bowler.over}.{data.bowler.ball}
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Accent bottom line */}
        <div className="h-[3px] bg-gradient-to-r from-[#ff8200] to-[#ffc400]" />
      </div>

      {/* Animations */}
      {show4 && (
        <Lottie
          animationData={FourAnimation}
          loop={false}
          autoplay
          className="fixed top-0 left-0 w-screen h-screen z-[999]"
        />
      )}
      {show6 && (
        <Lottie
          animationData={SixAnimation}
          loop={false}
          autoplay
          className="fixed top-0 left-0 w-screen h-screen z-[999]"
        />
      )}
      {showOut && (
        <Lottie
          animationData={OutAnimation}
          loop={false}
          autoplay
          className="fixed top-0 left-0 w-screen h-screen z-[999]"
        />
      )}

      {/* Live logos */}
      {showLive === "logo" && (
        <img
          src="/images/logo.png"
          alt="logo"
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[250px] rounded-full z-[999]"
        />
      )}
      {showLive === "jsMobile" && (
        <img
          src="/images/jsMobile.png"
          alt="jsMobile"
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[680px] z-[999]"
        />
      )}
    </>
  );
}