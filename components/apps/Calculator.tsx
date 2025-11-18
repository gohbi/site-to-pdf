'use client';

import React, { useState } from 'react';
import { AppProps } from '@/types';

export default function Calculator({ windowId: _windowId }: AppProps) {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (equation === '') {
      setEquation(`${inputValue} ${nextOperator}`);
    } else {
      const parts = equation.split(' ');
      const prevValue = parseFloat(parts[0]);
      const operator = parts[1];

      let newValue = prevValue;
      switch (operator) {
        case '+':
          newValue = prevValue + inputValue;
          break;
        case '-':
          newValue = prevValue - inputValue;
          break;
        case '×':
          newValue = prevValue * inputValue;
          break;
        case '÷':
          newValue = prevValue / inputValue;
          break;
      }

      setDisplay(String(newValue));
      setEquation(nextOperator ? `${newValue} ${nextOperator}` : '');
    }

    setWaitingForOperand(true);
  };

  const buttons = [
    { label: 'C', className: 'bg-red-500 hover:bg-red-600', onClick: clear, span: 2 },
    { label: '⌫', className: 'bg-gray-400 hover:bg-gray-500', onClick: () => setDisplay(display.slice(0, -1) || '0') },
    { label: '÷', className: 'bg-orange-500 hover:bg-orange-600', onClick: () => performOperation('÷') },
    { label: '7', className: 'bg-gray-700 hover:bg-gray-600', onClick: () => inputDigit('7') },
    { label: '8', className: 'bg-gray-700 hover:bg-gray-600', onClick: () => inputDigit('8') },
    { label: '9', className: 'bg-gray-700 hover:bg-gray-600', onClick: () => inputDigit('9') },
    { label: '×', className: 'bg-orange-500 hover:bg-orange-600', onClick: () => performOperation('×') },
    { label: '4', className: 'bg-gray-700 hover:bg-gray-600', onClick: () => inputDigit('4') },
    { label: '5', className: 'bg-gray-700 hover:bg-gray-600', onClick: () => inputDigit('5') },
    { label: '6', className: 'bg-gray-700 hover:bg-gray-600', onClick: () => inputDigit('6') },
    { label: '-', className: 'bg-orange-500 hover:bg-orange-600', onClick: () => performOperation('-') },
    { label: '1', className: 'bg-gray-700 hover:bg-gray-600', onClick: () => inputDigit('1') },
    { label: '2', className: 'bg-gray-700 hover:bg-gray-600', onClick: () => inputDigit('2') },
    { label: '3', className: 'bg-gray-700 hover:bg-gray-600', onClick: () => inputDigit('3') },
    { label: '+', className: 'bg-orange-500 hover:bg-orange-600', onClick: () => performOperation('+') },
    { label: '0', className: 'bg-gray-700 hover:bg-gray-600', onClick: () => inputDigit('0'), span: 2 },
    { label: '.', className: 'bg-gray-700 hover:bg-gray-600', onClick: inputDecimal },
    { label: '=', className: 'bg-green-500 hover:bg-green-600', onClick: () => performOperation('') },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-800 p-4">
      <div className="bg-gray-900 p-4 rounded-lg mb-4">
        <div className="text-gray-400 text-sm h-6 text-right">{equation}</div>
        <div className="text-white text-3xl font-bold text-right">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-2 flex-1">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.onClick}
            className={`${btn.className} ${
              btn.span === 2 ? 'col-span-2' : ''
            } text-white font-semibold rounded-lg transition-colors text-xl`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
