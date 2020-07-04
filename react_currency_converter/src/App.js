import React,{useEffect,useState} from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const BASE_URL="https://api.exchangeratesapi.io/latest"
function App() {
  const [currencyOptions,setcurrencyOptions]=useState([]);
  const [fromCurrency,setfromCurrency]=useState();
  const [toCurrency,settoCurrency]=useState();
  const [exchangeRate,setexchangeRate]=useState();
  const [amount,setamount]=useState(1);
  const [amountInfromCurrency,setamountInfromCurrency]=useState(true);
  let toAmount,fromAmount;
  if(amountInfromCurrency){
    fromAmount=amount;
    toAmount=amount*exchangeRate;
  }
  else{
    toAmount=amount;
    fromAmount=amount/exchangeRate;
  }
  useEffect(()=>{
    fetch(BASE_URL)
    .then(res=>res.json())
    .then(data=>{
      const Firstcurrency=Object.keys(data.rates)[0]
      setcurrencyOptions([data.base,...Object.keys(data.rates)])
      setfromCurrency(data.base)
      settoCurrency(Firstcurrency)
      setexchangeRate(data.rates[Firstcurrency])
    })
  },[])

  useEffect(()=>{
    if(fromCurrency!=null && toCurrency!=null){
    fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
    .then(res=>res.json())
    .then(data=>setexchangeRate(data.rates[toCurrency]))
    }
  },[fromCurrency,toCurrency])


  function handleFromAmountChange(e){
    setamount(e.target.value);
    setamountInfromCurrency(true);

  }
  function handletoAmountChange(e){
    setamount(e.target.value);
    setamountInfromCurrency(false);

  }
  return (
    <>
    <h1>CONVERT</h1>
    <CurrencyRow 
    currencyOptions={currencyOptions}
    selectedCurrency={fromCurrency}
    onchangeCurrency={e=>setfromCurrency(e.target.value)}
    onchangeAmount={handleFromAmountChange}
    amount={fromAmount}
    />
    <div className="equals">=</div>
    <CurrencyRow 
    currencyOptions={currencyOptions}
    selectedCurrency={toCurrency}
    onchangeCurrency={e=>settoCurrency(e.target.value)}
    onchangeAmount={handletoAmountChange}
    amount={toAmount}
    />
    </>
  );
}

export default App;
