import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("https://v6.exchangerate-api.com/v6/ab75c815242410ec31ffa63f/latest/USD")
      .then(response => {
        setCurrencies(Object.keys(response.data.conversion_rates));
      })
      .catch(error => console.error("Error fetching currency data:", error));
  }, []);

  const convertCurrency = () => {
    setLoading(true);
    axios.get(`https://v6.exchangerate-api.com/v6/ab75c815242410ec31ffa63f/pair/${fromCurrency}/${toCurrency}/${amount}`)
      .then(response => {
        setConvertedAmount(response.data.conversion_result);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error converting currency:", error);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Currency Converter</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block mb-2 text-gray-400">Amount</label>
          <input
            type="number"
            className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block mb-2 text-gray-400">From</label>
            <select
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <label className="block mb-2 text-gray-400">To</label>
            <select
              className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          onClick={convertCurrency}
          disabled={loading}
        >
          {loading ? "Converting..." : "Convert"}
        </button>
        {convertedAmount !== null && (
          <div className="mt-4 text-center text-lg font-semibold text-green-400">
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
