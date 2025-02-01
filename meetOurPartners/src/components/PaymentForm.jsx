import { useState } from 'react';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    memberId: '',
    memberName: '',
    paymentType: '',
    totalAmount: 0,
    receiptNo: '',
    collectedBy: '',
    paymentDate: new Date().toISOString().split('T')[0],
    
    // Payment modes
    paymentMode: '', // 'cash', 'cheque', 'card', 'others'
    
    // Cash payment
    cashAmount: '',
    
    // Cheque payment
    chequeAmount: '',
    chequeNo: '',
    bankName: '',
    branchName: '',
    ifsc: '',
    accountNo: '',
    chequeDate: new Date().toISOString().split('T')[0],
    
    // Card payment
    cardCharge: '',
    cardAmount: '',
    amountToBeCollected: '',
    cardNo: '',
    cardExpiryDate: new Date().toISOString().split('T')[0],
    cardBankName: '',
    cardType: '',
    
    // Other payment
    otherMop: '',
    otherAmount: '',
    transactionNumber: '',
    otherComment: '',
    
    // Royalty points
    useRoyaltyPoints: false,
    royaltyPoints: 0,
    amountCanBeRedeemed: 0,
    redeemedAmount: '',
    royaltyPointsUsed: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleReset = () => {
    setFormData({
      ...formData,
      memberId: '',
      memberName: '',
      paymentType: '',
      totalAmount: 0,
      receiptNo: '',
      cashAmount: '',
      chequeAmount: '',
      cardAmount: '',
      otherAmount: '',
      redeemedAmount: '',
      royaltyPointsUsed: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-green-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2">
            Make Payment
          </h1>
          <p className="text-gray-600">Secure and convenient payment processing</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Payment Details Section */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow-inner border border-white">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                <span className="bg-purple-600 text-white p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </span>
                Payment Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="relative group">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      name="memberId"
                      placeholder="Select a member"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm group-hover:shadow-md"
                      value={formData.memberId}
                      onChange={handleChange}
                    />
                    <button type="button" className="p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  name="memberName"
                  placeholder="Name"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm hover:shadow-md"
                  value={formData.memberName}
                  onChange={handleChange}
                />

                <select
                  name="paymentType"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm hover:shadow-md"
                  value={formData.paymentType}
                  onChange={handleChange}
                >
                  <option value="">Select Payment Type</option>
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="cheque">Cheque</option>
                  <option value="others">Others</option>
                </select>

                <input
                  type="text"
                  name="receiptNo"
                  placeholder="Receipt No"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm hover:shadow-md"
                  value={formData.receiptNo}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="collectedBy"
                  placeholder="Collected By"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm hover:shadow-md"
                  value={formData.collectedBy}
                  onChange={handleChange}
                  readOnly
                />

                <input
                  type="date"
                  name="paymentDate"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm hover:shadow-md"
                  value={formData.paymentDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Mode of Payment Section */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl shadow-inner border border-white">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                <span className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </span>
                Mode of Payment
              </h2>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex space-x-6">
                  {['cash', 'cheque', 'card', 'others'].map((mode) => (
                    <label key={mode} className="relative">
                      <input
                        type="radio"
                        name="paymentMode"
                        value={mode}
                        checked={formData.paymentMode === mode}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="flex items-center justify-center w-32 p-4 bg-white border-2 rounded-xl cursor-pointer transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:shadow-md">
                        <span className="capitalize font-medium text-gray-700 peer-checked:text-blue-600">
                          {mode}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Payment mode specific fields */}
                <div className="bg-white/50 p-6 rounded-xl shadow-sm">
                  {formData.paymentMode === 'cash' && (
                    <div className="space-y-4">
                      <label className="block">
                        <span className="text-gray-700 font-medium mb-1 block">Cash Amount</span>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                          <input
                            type="number"
                            name="cashAmount"
                            className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            value={formData.cashAmount}
                            onChange={handleChange}
                          />
                        </div>
                      </label>
                    </div>
                  )}

                  {formData.paymentMode === 'cheque' && (
                    <div className="grid grid-cols-2 gap-4">
                      <label className="block">
                        <span className="text-gray-700 font-medium mb-1 block">Cheque Amount</span>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                          <input
                            type="number"
                            name="chequeAmount"
                            className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            value={formData.chequeAmount}
                            onChange={handleChange}
                          />
                        </div>
                      </label>
                      <input
                        type="text"
                        name="chequeNo"
                        placeholder="Cheque No"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={formData.chequeNo}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="bankName"
                        placeholder="Bank Name"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={formData.bankName}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="branchName"
                        placeholder="Branch Name"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={formData.branchName}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="ifsc"
                        placeholder="IFSC"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={formData.ifsc}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="accountNo"
                        placeholder="Account No"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={formData.accountNo}
                        onChange={handleChange}
                      />
                      <input
                        type="date"
                        name="chequeDate"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={formData.chequeDate}
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  {formData.paymentMode === 'card' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          name="cardCharge"
                          placeholder="Card Charge"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          value={formData.cardCharge}
                          onChange={handleChange}
                        />
                        <span>%</span>
                      </div>
                      <input
                        type="number"
                        name="cardAmount"
                        placeholder="Card Amount"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={formData.cardAmount}
                        onChange={handleChange}
                      />
                      <input
                        type="number"
                        name="amountToBeCollected"
                        placeholder="Amount to be collected"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={formData.amountToBeCollected}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="cardNo"
                        placeholder="Card No"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={formData.cardNo}
                        onChange={handleChange}
                      />
                      <input
                        type="date"
                        name="cardExpiryDate"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={formData.cardExpiryDate}
                        onChange={handleChange}
                      />
                      <select
                        name="cardBankName"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={formData.cardBankName}
                        onChange={handleChange}
                      >
                        <option value="">Select Bank</option>
                        <option value="sbi">SBI</option>
                        <option value="hdfc">HDFC</option>
                        <option value="icici">ICICI</option>
                      </select>
                      <select
                        name="cardType"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={formData.cardType}
                        onChange={handleChange}
                      >
                        <option value="">Select card type</option>
                        <option value="credit">Credit Card</option>
                        <option value="debit">Debit Card</option>
                      </select>
                    </div>
                  )}

                  {formData.paymentMode === 'others' && (
                    <div className="grid grid-cols-2 gap-4">
                      <select
                        name="otherMop"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={formData.otherMop}
                        onChange={handleChange}
                      >
                        <option value="">Select a option</option>
                        <option value="upi">UPI</option>
                        <option value="netbanking">Net Banking</option>
                        <option value="wallet">Wallet</option>
                      </select>
                      <input
                        type="number"
                        name="otherAmount"
                        placeholder="Amount"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={formData.otherAmount}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="transactionNumber"
                        placeholder="Transaction Number"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={formData.transactionNumber}
                        onChange={handleChange}
                      />
                      <textarea
                        name="otherComment"
                        placeholder="Comment"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        value={formData.otherComment}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Royalty Points Section */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl shadow-inner border border-white">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                <span className="bg-green-600 text-white p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </span>
                Royalty Points
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="useRoyaltyPoints"
                    checked={formData.useRoyaltyPoints}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Royalty Point
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Royalty points</label>
                    <input
                      type="number"
                      name="royaltyPoints"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={formData.royaltyPoints}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amt can be redeem</label>
                    <input
                      type="number"
                      name="amountCanBeRedeemed"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={formData.amountCanBeRedeemed}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Redeemed Amount</label>
                    <input
                      type="number"
                      name="redeemedAmount"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={formData.redeemedAmount}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Royalty Point used</label>
                    <input
                      type="number"
                      name="royaltyPointsUsed"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={formData.royaltyPointsUsed}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Total Amount Section */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl shadow-inner border border-white">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-semibold text-gray-800">Total Paid Amount:</span>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                  ₹{formData.totalAmount || '0.00'}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-6 pt-6">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Make Payment
              </button>
              <button
                type="button"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Print Receipt
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Reset
              </button>
              <button
                type="button"
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
