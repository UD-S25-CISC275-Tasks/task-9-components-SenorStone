import React, { useState } from "react";
import { Button } from "react-bootstrap";

export type Holiday =
    | "World Parrot Day"
    | "Cheese Day"
    | "Best Friend Day"
    | "Go Fishing Day"
    | "Dog Day";

export function CycleHoliday(): React.JSX.Element {
    return <div>Cycle Holiday</div>;
}
