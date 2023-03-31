import axios from "axios";
import React, { useEffect, useState } from "react";
import { userUrl } from "../../../apiLinks/apiLinks";

const Wallet = () => {
  const [ setBalance] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const headers = { authorization: token };
    axios.get(`${userUrl}getWallet`, { headers }).then((response) => {
      setBalance(response.data.balance);
      setTransactionHistory(response.data.transactions);
    });
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10 lg:p-12">
      <h2 className="text-2xl font-bold mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        My Wallet
      </h2>
      <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        <div className="mb-2 sm:mb-0">
          <p className="text-gray-600 font-semibold">Balance:</p>
          <p className="text-2xl font-bold">₹700</p>
        </div>
        {/* <button
          onClick={() => handleAddMoney(50)}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-sm transition-colors duration-300"
        >
          Add ₹50
        </button> */}
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="px-4 py-2 font-semibold text-gray-600">Date</th>
              <th className="px-4 py-2 font-semibold text-gray-600">Type</th>
              <th className="px-4 py-2 font-semibold text-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactionHistory.map((transaction, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="px-4 py-2">{transaction.date}</td>
                <td className="px-4 py-2">
                  <span
                    className={`font-semibold text-sm ${
                      transaction.transactionType === "credit"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.transactionType === "credit"
                      ? "Credit"
                      : "Debit"}
                  </span>
                </td>
                <td className="px-4 py-2">₹{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wallet;
