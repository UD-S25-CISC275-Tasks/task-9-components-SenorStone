import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): React.JSX.Element {
    const [attempts, setAttempts] = useState<number>(4);
    const [begun, setBegun] = useState<boolean>(false);

    function start(): void {
        setBegun(true);
        setAttempts(attempts - 1);
    }

    return (
        <div>
            <div>
                <Button onClick={start} disabled={begun || attempts === 0}>
                    Start Quiz
                </Button>
                <Button
                    onClick={() => {
                        setBegun(false);
                    }}
                    disabled={!begun}
                >
                    Stop Quiz
                </Button>
                <Button
                    onClick={() => {
                        setAttempts(attempts + 1);
                    }}
                    disabled={begun}
                >
                    Mulligan
                </Button>
            </div>
            <div>{"Attempts: " + attempts}</div>
        </div>
    );
}
