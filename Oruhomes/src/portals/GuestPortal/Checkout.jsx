import React, { useState } from 'react';
import { CreditCard, Calendar, QrCode, ShieldCheck, ArrowLeft, ArrowRight, HelpCircle, Loader2 } from 'lucide-react';

export default function Checkout({ pg, sharingOption, onBack, onBookingSuccess }) {
  const [moveInDate, setMoveInDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi"); // upi, card
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Billing breakdown calculations
  const rent = pg.sharingPrices[sharingOption];
  const deposit = pg.securityDeposit;
  const maintenance = pg.maintenance;
  const platformFee = 299;
  const total = rent + deposit + maintenance + platformFee;

  // Credit Card Form states
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();
    if (!moveInDate) {
      alert("Please select a move-in date first.");
      return;
    }
    setIsProcessing(true);

    // Simulate Payment Gateway call (2.5 seconds)
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
      
      // Complete booking after another 1.5 seconds
      setTimeout(() => {
        const newBooking = {
          bookingId: `b-${Date.now()}`,
          pgId: pg.id,
          pgName: pg.name,
          sharingType: sharingOption,
          rentAmount: rent,
          securityDeposit: deposit,
          maintenance: maintenance,
          moveInDate: moveInDate,
          status: "Confirmed"
        };
        onBookingSuccess(newBooking, total);
      }, 1500);
    }, 2500);
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 py-8 space-y-6">
      {/* Back to Details */}
      <button 
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft size={14} /> Back to Details
      </button>

      {/* Main Checkout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        {/* Booking Details Form */}
        <div className="md:col-span-3 card space-y-6">
          <h2 className="text-base font-bold text-white border-b border-white/5 pb-3">Booking Reservation</h2>

          <div className="space-y-4">
            <div className="form-group">
              <label className="form-label flex items-center gap-1.5"><Calendar size={14} className="text-rose-500" /> Select Move-in Date</label>
              <input 
                type="date" 
                value={moveInDate}
                onChange={(e) => setMoveInDate(e.target.value)}
                required
                className="form-input" 
              />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-400 block">Payment Mode</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-rose-500/10 border-rose-500 text-rose-400'
                      : 'bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10'
                  }`}
                >
                  <QrCode size={16} /> UPI / QR Code
                </button>
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-rose-500/10 border-rose-500 text-rose-400'
                      : 'bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10'
                  }`}
                >
                  <CreditCard size={16} /> Debit/Credit Card
                </button>
              </div>
            </div>

            {/* Payment Fields */}
            {paymentMethod === 'upi' ? (
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col items-center text-center space-y-3">
                <div className="w-24 h-24 bg-white p-2 rounded-xl flex-center">
                  {/* Real-time-like UPI Mock QR */}
                  <div className="w-full h-full border-2 border-dashed border-zinc-700 bg-zinc-100 flex-center text-zinc-800 text-[10px] font-black">
                    QR CODE
                  </div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white block">Scan to Pay via UPI</span>
                  <span className="text-[10px] text-zinc-500 font-semibold">Supports GPay, PhonePe, Paytm, BHIM</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input 
                    type="text" 
                    placeholder="xxxx xxxx xxxx xxxx" 
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="form-input font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Expiry Date</label>
                    <input 
                      type="text" 
                      placeholder="MM / YY" 
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="form-input font-mono"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVV</label>
                    <input 
                      type="password" 
                      placeholder="***" 
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="form-input font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pricing Breakdown Summary */}
        <div className="md:col-span-2 card space-y-6">
          <h2 className="text-base font-bold text-white border-b border-white/5 pb-3 font-mono">Invoice Summary</h2>
          
          <div className="space-y-3 text-xs font-semibold">
            <div className="flex justify-between items-start text-zinc-400">
              <span className="max-w-[70%]">{pg.name} ({sharingOption} Share)</span>
              <span className="text-white font-mono">₹{rent.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Security Deposit</span>
              <span className="text-white font-mono">₹{deposit.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Maintenance Charges</span>
              <span className="text-white font-mono">₹{maintenance.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>One-Time Platform Fee</span>
              <span className="text-white font-mono">₹{platformFee}</span>
            </div>
            <div className="h-px bg-white/10 my-2"></div>
            <div className="flex justify-between items-center text-sm font-black text-rose-400">
              <span>Total Payable Now</span>
              <span className="font-mono">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing || isDone}
            className="btn btn-primary w-full flex items-center justify-center gap-1.5"
          >
            {isProcessing ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Processing Payment...
              </>
            ) : isDone ? (
              <>
                <ShieldCheck size={16} className="text-white animate-bounce" /> Booking Success!
              </>
            ) : (
              <>
                Pay ₹{total.toLocaleString('en-IN')} <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Full-screen Loading Overlay for completed bookings */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex-center flex-col space-y-4">
          <div className="w-14 h-14 rounded-full border-4 border-rose-500 border-t-transparent animate-spin"></div>
          <span className="text-sm font-bold text-white tracking-widest font-mono">SECURELY ROUTING TRANSACTION...</span>
        </div>
      )}

      {isDone && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur z-50 flex-center flex-col space-y-4 text-center p-4">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex-center text-emerald-500 animate-bounce">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Payment Confirmed!</h2>
          <p className="text-xs text-zinc-400 max-w-sm font-light">
            Your booking at <span className="font-bold text-white">{pg.name}</span> is confirmed. Generating your digital contract and updating the tenant dashboard...
          </p>
        </div>
      )}
    </div>
  );
}
