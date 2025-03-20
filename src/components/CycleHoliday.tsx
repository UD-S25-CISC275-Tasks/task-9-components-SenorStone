import React, { useState } from "react";
import { Button } from "react-bootstrap";

export type Holiday =
    | "World Parrot Day"
    | "Cheese Day"
    | "Best Friend Day"
    | "Go Fishing Day"
    | "Dog Day";

export function CycleHoliday(): React.JSX.Element {
    const [holiday, setHoliday] = useState<Holiday>("Best Friend Day");

    function alphaSwap(): void {
        holiday === "Best Friend Day"
            ? setHoliday("Cheese Day")
            : holiday === "Cheese Day"
              ? setHoliday("Dog Day")
              : holiday === "Dog Day"
                ? setHoliday("Go Fishing Day")
                : holiday === "Go Fishing Day"
                  ? setHoliday("World Parrot Day")
                  : setHoliday("Best Friend Day");
    }

    function dateSwap(): void {
        holiday === "World Parrot Day"
            ? setHoliday("Cheese Day")
            : holiday === "Cheese Day"
              ? setHoliday("Best Friend Day")
              : holiday === "Best Friend Day"
                ? setHoliday("Go Fishing Day")
                : holiday === "Go Fishing Day"
                  ? setHoliday("Dog Day")
                  : setHoliday("World Parrot Day");
    }

    function getEmoji(name: string): string {
        if (name === "World Parrot Day") {
            return "🦜";
        } else if (name === "Cheese Day") {
            return "🧀";
        } else if (name === "Best Friend Day") {
            return "🧑";
        } else if (name === "Go Fishing Day") {
            return "🐟";
        } else if (name === "Dog Day") {
            return "🐶";
        } else {
            return "";
        }
    }

    return (
        <div>
            <div>
                <Button onClick={alphaSwap}>Advance by Alphabet</Button>
                <Button onClick={dateSwap}>Advance by Year</Button>
            </div>
            <div>Holiday: {getEmoji(holiday)}</div>
        </div>
    );
}
