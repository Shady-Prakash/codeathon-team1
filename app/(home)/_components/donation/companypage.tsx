"use-client";

import { useState } from 'react';

const CompanyPage = () => {
    // const [isOpen, setIsOpen] = useState(false);

    // const toggleDropdown = () => {
    //     setIsOpen(!isOpen);
    // };

    // const closeDropdown = () => {
    //     setIsOpen(false);
    // };
    const [isDisclaimerAccepted,setIsDisclamierAccepted]= useState(false);
    const handleDisclaimerChange=()=>{
        setIsDisclamierAccepted(!isDisclaimerAccepted);
    }

  return (
    <div>
        <div>
                <label htmlFor="name">Campaign Name</label>
                <input id="name" name="name" placeholder="Name"  />
            </div>
            <div>
                <label htmlFor="companyName">Company Name:</label>
                <input list="companyName" name="myCompany">
                <select id="companyName" name="companyName">
                    <option value="">Select Company</option>
                    <option value="Prefer not To Say">Prefer not To Say</option>
                    {/* Add more options here */}
                </select>
                </input>

            </div>

            <div>
                <label  id="required" htmlFor="email">Email (should be same as PayPal)</label>
                <input id="email" name="email" type="email" placeholder="Email" required />
            </div>
            <div>
                <label htmlFor="email">Name </label>
                <input id="name" name="name" type="name" placeholder="Name" required />
            </div>
            <div>
                <input type="checkbox" id="disclaimer" checked={isDisclaimerAccepted} onChange={handleDisclaimerChange}/>
                <label htmlFor="disclaimer">I agree to the terms and conditions</label>
            </div>

            <button type="submit" disabled={!isDisclaimerAccepted}>Payment</button>
     
    </div>
  )
}

export default CompanyPage;