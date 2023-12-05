import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isCakeCurrency, setIsCakeCurrency] = useState(true);
  const [amountInvested, setAmountInvested] = useState(0);
  const [useBalance, setUseBalance] = useState(0);
  const [ROI, setROI] = useState(0)
  const [timeframe, setTimeframe] = useState('');
  const [isAccelerated, setIsAccelerated] = useState(false);
  const [selectedTier, setSelectedTier] = useState('');
  const [isCurrentRateEditable, setIsCurrentRateEditable] = useState(true)
  const [currentRate, setCurrentRate] = useState(0);


  const handleAccordionClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleCurrencySwitch = () => {
    setIsCakeCurrency((prevIsCakeCurrency) => !prevIsCakeCurrency);
  };

  const handleBalanceButtonClick = (amount) => {
    setIsCakeCurrency(false)
    setAmountInvested(amount);
  };

  const handleUseBalanceClick = (balance) => {
    setUseBalance(balance);
    setAmountInvested(balance);
  };

  const handleTimeframeSelect = (selectedTimeframe) => {
    debugger
    setTimeframe(selectedTimeframe);
  };

  const handleAcceleratedToggle = () => {
    setIsAccelerated((prevIsAccelerated) => !prevIsAccelerated);
  };

  const handleTierSelect = (selectedTier) => {
    setSelectedTier(selectedTier);
  };

  const handleApplyClick = () => {
    // Assuming you have all the necessary values for ROI calculation

    // Convert the currentRate and useBalance to USD
    const convertedInvestment = isCakeCurrency ? currentRate * amountInvested : amountInvested;

    // Apply accelerated APY if enabled
    const acceleratedMultiplier = isAccelerated ? 1.1 : 1;

    // Apply tier-based modifiers
    let tierMultiplier = 1;
    switch (selectedTier) {
      case 'Tier 1':
        tierMultiplier = 1.05;
        break;
      case 'Tier 2':
        tierMultiplier = 1.1;
        break;
      // Add cases for other tiers if needed

      default:
        break;
    }

    // Calculate ROI based on the time frame and multipliers
    const timeFrameMultiplier = calculateTimeFrameMultiplier(timeframe); // Implement this function
    const calculatedROI = convertedInvestment * acceleratedMultiplier * tierMultiplier * timeFrameMultiplier;

    // Update the APY value in the UI
    setROI(calculatedROI);
  };

  // Helper function to calculate the time frame multiplier
  const calculateTimeFrameMultiplier = (selectedTimeframe) => {
    switch (selectedTimeframe) {
      case '1 Day':
        return 1.01;
      case '7 Days':
        return 1.05;
      case '30 Days':
        return 1.1;
      case '1 Year':
        return 1.2;
      case '5 Years':
        return 1.5;
      default:
        return 1;
    }
  };

  const handleCancelClick = () => {
    // Reset all the state values to their initial state
    setIsCakeCurrency(true);
    setAmountInvested(0);
    setUseBalance(0);
    setTimeframe('');
    setIsAccelerated(false);
    setSelectedTier('');
    setCurrentRate(0);
    setActiveIndex(null);
  };


  return (
    <div className='App'>
      <div className="calculator-card">

        <h2 className='calculator-card__heading'>ROI Calculator</h2>

        <div className="currency-switch-wrapper">
          <span className='currency-switch-labels'>Cake</span>
          <label className="switch">
            <input type="checkbox" checked={!isCakeCurrency} onChange={handleCurrencySwitch} />
            <span className="slider round"></span>
          </label>
          <span className='currency-switch-labels'>USD</span>
        </div>

        <input className='amount-invested-input' type="number" value={amountInvested} onChange={(e) => setAmountInvested(e.target.value)} />

        <div className="conversion-equivalent-wrapper">
          <span className='conversion-equivalent'>
            {isCakeCurrency ? `~$${amountInvested * 2.57}` : `~${amountInvested * 0.39} CAKE`}
          </span>
        </div>

        <div className="balance-btn-gp">
          <span className='balance-btn-label'>USE BALANCE</span>
          <button onClick={() => handleBalanceButtonClick(1000)}>$1000</button>
          <button onClick={() => handleBalanceButtonClick(100)}>$100</button>
        </div>

        <span className='heading-timeframe'>Timeframe</span>
        <div className="timeframe-btn-gp">
          <button onClick={() => handleTimeframeSelect('1 Day')}>1 Day</button>
          <button onClick={() => handleTimeframeSelect('7 Days')}>7 Days</button>
          <button onClick={() => handleTimeframeSelect('30 Days')}>30 Days</button>
          <button onClick={() => handleTimeframeSelect('1 Year')}>1 Year</button>
          <button onClick={() => handleTimeframeSelect('5 Years')}>5 Years</button>
        </div>

        <div className="accelerated-wrapper">
          <span className='accelerated-label'>Enable Accelerated APY</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isAccelerated}
              onChange={handleAcceleratedToggle}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <span className='heading-timeframe heading-tier-modifier'>Select Tier</span>
        <div className="timeframe-btn-gp tier-btn-gp">
          <button onClick={() => handleTierSelect('Tier 1')}>Tier 1</button>
          <button onClick={() => handleTierSelect('Tier 2')}>Tier 2</button>
          <button onClick={() => handleTierSelect('Tier 3')}>Tier 3</button>
          <button onClick={() => handleTierSelect('Tier 4')}>Tier 4</button>
          <button onClick={() => handleTierSelect('Tier 5')}>Tier 5</button>
        </div>

        <div className='current-rate-label'>
          <span>ROI at Current Rates</span>
        </div>
        <div className="current-rate-wrapper">
          <button onClick={() => setIsCurrentRateEditable(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22.5801 5.54668L18.6667 1.61335C18.4081 1.35606 18.0582 1.21162 17.6934 1.21162C17.3286 1.21162 16.9787 1.35606 16.7201 1.61335L2.84674 15.4667L1.58007 20.9333C1.53637 21.1332 1.53787 21.3403 1.58445 21.5394C1.63103 21.7386 1.72152 21.9249 1.84931 22.0846C1.9771 22.2444 2.13895 22.3735 2.32305 22.4627C2.50715 22.5519 2.70885 22.5988 2.9134 22.6C3.00871 22.6096 3.10476 22.6096 3.20007 22.6L8.72674 21.3333L22.5801 7.49335C22.8374 7.23475 22.9818 6.8848 22.9818 6.52002C22.9818 6.15523 22.8374 5.80528 22.5801 5.54668ZM8.06007 20.1334L2.88007 21.22L4.06007 16.14L14.4401 5.80002L18.4401 9.80002L8.06007 20.1334ZM19.3334 8.83335L15.3334 4.83335L17.6534 2.52668L21.5867 6.52668L19.3334 8.83335Z" fill="#A8A8A8" />
            </svg>
          </button>
          <input className='current-rate-input' type="number" value={currentRate} onChange={(e) => setCurrentRate(e.target.value)} disabled={isCurrentRateEditable} />
        </div>
        <div className='current-rate-equivalent-label'>
          <span>{`~${currentRate * 0.39} CAKE`}</span>
        </div>

        <div className="handle-btn-wrapper">
          <button className='btn-apply' onClick={handleApplyClick}>Apply</button>
          <button className='btn-cancel' onClick={handleCancelClick}>Cancel</button>
        </div>

        <button
          className={`accordion ${activeIndex === 1 ? 'active' : ''}`}
          onClick={() => handleAccordionClick(1)}
        >
          {
            activeIndex === 1 ?
              <>
                Hide details{" "}
                <i style={{ fontSize: "15px" }} className="fa">&#xf077;</i>
              </> :
              <>
                Show details{" "}
                <i style={{ fontSize: "15px" }} className="fa">&#xf078;</i>
              </>
          }
        </button>
        <div
          className="panel"
          style={{
            maxHeight: activeIndex === 1 ? '900px' : '0',
            transition: 'max-height 0.3s ease-out',
          }}
        >
          <div className="apy-wrapper">
            <span className='apy-label'>APY</span>
            <span className="apy-value">{ROI}%</span>
          </div>

          <ul className='disclaimer-list'>
            <li>Calculated based on current rates</li>
            <li>All fugures are estimates provided for your convenience only,
              and by no means represent guaranted returns.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
