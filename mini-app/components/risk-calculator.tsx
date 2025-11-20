"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function RiskCalculator() {
  const [balance, setBalance] = useState<string>("");
  const [riskPercent, setRiskPercent] = useState<string>("");
  const [entryPrice, setEntryPrice] = useState<string>("");
  const [stopLoss, setStopLoss] = useState<string>("");
  const [positionSize, setPositionSize] = useState<number | null>(null);
  const [potentialLoss, setPotentialLoss] = useState<number | null>(null);
  const [leverage, setLeverage] = useState<number | null>(null);

  const calculate = () => {
    const b = parseFloat(balance);
    const r = parseFloat(riskPercent);
    const e = parseFloat(entryPrice);
    const s = parseFloat(stopLoss);
    if (isNaN(b) || isNaN(r) || isNaN(e) || isNaN(s) || e === s) return;

    const riskAmount = (b * r) / 100;
    const diff = Math.abs(e - s);
    const posSize = riskAmount / diff;
    const lev = posSize / riskAmount;

    setPotentialLoss(riskAmount);
    setPositionSize(posSize);
    setLeverage(lev);
  };

  useEffect(() => {
    calculate();
  }, [balance, riskPercent, entryPrice, stopLoss]);

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="balance">Balance</Label>
        <Input
          id="balance"
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          placeholder="e.g. 1000"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="risk">Risk % per trade</Label>
        <Input
          id="risk"
          type="number"
          value={riskPercent}
          onChange={(e) => setRiskPercent(e.target.value)}
          placeholder="e.g. 2"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="entry">Entry price</Label>
        <Input
          id="entry"
          type="number"
          value={entryPrice}
          onChange={(e) => setEntryPrice(e.target.value)}
          placeholder="e.g. 50000"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="stop">Stop‑loss price</Label>
        <Input
          id="stop"
          type="number"
          value={stopLoss}
          onChange={(e) => setStopLoss(e.target.value)}
          placeholder="e.g. 48000"
        />
      </div>
      <Button onClick={calculate} className="w-full">
        Calculate
      </Button>
      {positionSize !== null && (
        <div className="mt-4 space-y-1">
          <p>Position size: <strong>{positionSize.toFixed(4)}</strong></p>
          <p>Potential loss: <strong>{potentialLoss?.toFixed(2)}</strong></p>
          <p>Leverage: <strong>{leverage?.toFixed(2)}x</strong></p>
        </div>
      )}
    </div>
  );
}
