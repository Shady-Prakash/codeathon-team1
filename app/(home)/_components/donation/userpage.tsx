"use-client";

const UserPage = () => {


    // const [isOpen, setIsOpen] = useState(false);

    // const toggleDropdown = () => {
    //     setIsOpen(!isOpen);
    // };

    // const closeDropdown = () => {
    //     setIsOpen(false);
    // };
    

    return (
        <form action="">
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" placeholder="Name" required />
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
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="Email" required />
            </div>
            <button type="submit">Payment</button>
        </form>
    );
};


export default UserPage;