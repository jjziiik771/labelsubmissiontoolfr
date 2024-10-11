/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Labels from "./Labels";
import ArtistsInput from "./Artists";

const Form = ({ setResponseMessage }) => {
    const [labels, setLabels] = useState([]);
    const [songname, setSongname] = useState("");
    const [artists, setArtists] = useState([""]);
    const [email, setEmail] = useState("");
    const [authCode, setAuthCode] = useState("");
    const [message, setMessage] = useState("");
    const [selectedLabels, setSelectedLabels] = useState({})

    useEffect(() => {
        fetch("/labels")
            .then((response) => response.json())
            .then((data) => setLabels((data)))
            .catch((error) => {
                console.error("Error fetching labels:", error)
                setLabels([])
            });
    }, []);

    const handleArtistChange = (index, value) => {
        const newArtists = [...artists];
        newArtists[index] = value;
        setArtists(newArtists);
    };

    const handleArtistAdd = () => {
        setArtists([...artists, ""]);
    };


    const handleArtistSub = (index) => {
        const newArtists = artists.filter((_, i) => i !== index);
        setArtists(newArtists);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let submitObject = new FormData();  

        submitObject.append("email", email);
        submitObject.append("auth_code", authCode);
        submitObject.append("songname", songname);
        submitObject.append("artists", artists.join(", "));
        submitObject.append("message", message);
        submitObject.append("selected_emails", JSON.stringify(Object.keys(selectedLabels)));
        setResponseMessage("Loading...")
        fetch("/submit/", {
            method: 'POST',
            body: submitObject, 
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.errors.join(", "));
                });
            }
            return response.json();
        
        })
        .then((data) => {
            setResponseMessage("Succesfull request - Good Luck!" + data.message);  
            alert("Succesfull request - Good Luck!" + data.message)
        })
        .catch((error) => {
            setResponseMessage("Error: " + error.message);  
            alert(error.message)
        });
        
    };



    return (
        <form 
        className="text-cd md:text-base lg:text-lg h-full flex flex-col justify-around"
        onSubmit={handleSubmit}>
        <div>
        <h1 className="text-2xl lg:text-4xl text-white font-bold mb-4 text-center">LABEL SUBMISSION TOOL</h1>
            <h1 className="my-3 border-b-[1px] border-white text-center py-2 font-light">Complete these fields</h1>

        </div>

            <div className="mb-4 w-full items-start ">
                <label className="mb-2" htmlFor="labels">LABELS</label>
                <Labels labels={labels}
                    selectedLabels={selectedLabels}
                    setSelectedLabels={setSelectedLabels}
                />
            </div>

            <div className="flex flex-row items-start justify-start">
                <div className="w-1/2">
                    <label className="block mb-2" htmlFor="songname">SONG NAME</label>
                    <input
                        type="text"
                        name="songname"
                        id="songname"
                        value={songname}
                        onChange={(e) => setSongname(e.target.value)}
                        required
                        className="border border-white bg-black rounded w-full py-2 px-3 text-white leading-tight focus:outline-none"
                        placeholder="MONTAGEM"
                    />

                    <ArtistsInput
                        artists={artists}
                        handleArtistChange={handleArtistChange}
                        handleArtistAdd={handleArtistAdd}
                        handleArtistSub={handleArtistSub}
                    />

                </div>

                <div className="w-1/2">
                    <label className="block mb-2" htmlFor="email">EMAIL (only gmail):</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border border-white bg-black rounded w-full py-2 px-3 text-white leading-tight focus:outline-none"
                        placeholder="your@gmail.com"
                    />

                    <label className="block my-2" htmlFor="auth_code">GOOGLE APP CODE</label>
                    <input
                        type="text"
                        name="auth_code"
                        id="auth_code"
                        value={authCode}
                        onChange={(e) => setAuthCode(e.target.value)}
                        required
                        className="border border-white bg-black rounded w-full py-2 px-3 text-white leading-tight focus:outline-none"
                        placeholder="xxxx-xxxx-xxxx"
                    />

                    <div className="text-sm p-2 lg:text-base flex flex-col font-thin justify-start w-full p-2 border-2 border-white text-wrap break-words">
                        <div>
                            - go to -
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400"
                                href="https://myaccount.google.com/apppasswords">
                                https://myaccount.google.com/apppasswords
                            </a>
                        </div>
                        <div>
                            - give the Password a name and click (create)
                        </div>
                        <div>
                            - write down the key you see in a blue box since you are not able to see it ever again
                        </div>
                        <div>
                            - put this exact code into the Google App Code Box inside the tool
                        </div>

                    </div>
                </div>
            </div>

            <div>
            <label className="block my-2" htmlFor="message">MESSAGE (Include track link)</label>
            <textarea
                name="message"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Hi, i am ..... and i present you this stunning track"
                className="p-2 border bg-black w-full h-[175px] rounded py-2 text-white leading-tight focus:outline-none"
            />
             <button
                type="submit"
                className="w-full text-3xl bg-red-500 text-white rounded-md hover:scale-105 hover:bg-black hover:text-red-500 transition-all duration-500"
            >
                SUBMIT
            </button>
            </div>
   

           
        </form>
    );
};

export default Form;
