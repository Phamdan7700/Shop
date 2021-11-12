import React from "react";
import Countdown from "react-countdown";

interface Time {
    hours: number;
    minutes: number;
    seconds: number;
    completed: number;
}
const renderer = ({ hours, minutes, seconds, completed }: Time) => {
    if (completed) {
        // Render a completed state
        return "";
    } else {
        // Render a countdown
        return (
            <span>
                {hours}:{minutes}:{seconds}
            </span>
        );
    }
};
function Time({ time }: { time: number }) {}

export default Time;
