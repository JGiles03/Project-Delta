import React, {useState} from 'react'

export default function SearchBar() {

    const [searchString, setSearchString] = useState("Restaurant");
    const [inputValue, setInputValue] = useState("");

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        setSearchString(inputValue);
        setInputValue("");
    }

    return (
        <div className="searchbar">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={searchString}
                    value={inputValue}
                    required
                />
                <input type="submit" value="Search" />
            </form>
        </div>
    )
}
