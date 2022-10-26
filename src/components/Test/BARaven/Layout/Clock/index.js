import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddResult, handleNextGame } from "../../../Redux/Slice";
import { countQuestion } from "../../data/data";
// import { limitedTime } from "../../Data/data";
import "./Clock.css";
export const Clock = ({ count, countTrue }) => {
   const [second, setSecond] = useState(0);
   const [minutes, setMinutes] = useState(0);
   const secondTimer = () => setSecond(second + 1);
   const minutesTimer = () => setMinutes(minutes + 1);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   useEffect(() => {
      if (count >= countQuestion) {
         const tempObj = {
            timeFinish: { minutes, second },
            countCorrect: countTrue,
            countQuestion: countQuestion,
         };
         dispatch(handleAddResult(tempObj));
         dispatch(handleNextGame());
         // navigate("/");

         // setRanking(countTrue, second, minutes);
         // navigate("/baraven/result");
      }
   }, [count]);

   useEffect(() => {
      if (second === 59) {
         minutesTimer();
         setSecond(0);
      } else {
         const id = setInterval(secondTimer, 1000);
         return () => clearInterval(id);
      }
   }, [second, minutes]);
   return (
      <div className="ba-reven-clock__container">
         <div className="ba-reven-clock__ring"></div>
         <div className="ba-reven-clock__bg">
            {("0" + minutes).slice(-2)}:{("0" + second).slice(-2)}{" "}
         </div>
      </div>
   );
};
