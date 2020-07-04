import React from 'react'

export default function CurrencyRow(props) {
    const {
        currencyOptions,
        selectedCurrency,
        onchangeCurrency,
        onchangeAmount,
        amount
    }=props;
    return (
        <div>
            <input type="number" className="input" value={amount} onChange={onchangeAmount}/>
            <select value={selectedCurrency} onChange={onchangeCurrency}>
                {currencyOptions.map(option=>(
                    <option key={option} value={option}>{option}</option>
                ))}
                
            </select>
        </div>
    )
}
