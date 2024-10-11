import { useState } from "react";
import Form from "./components/Form";
import Response from "./components/Response";
import bgImage from '../src/assets/b1.jpeg'
const App = () => {
  const [responseMessage, setResponseMessage] = useState("Not sent");

  return (
    <div className="bg-gradient-to-r from-black via-sky-500 to-red-500 h-full flex flex-row items-center justify-center">
      <div className="w-full flex flex-col md:flex-row py-20 md:px-5 lg:px-20">
        <div className="bg-black rounded-md text-white font-semibold p-8 w-full md:w-1/2">
          <Form setResponseMessage={setResponseMessage} />
        </div>
        <div className="relative bg-black rounded-md text-white font-light p-8 w-full md:w-1/2">
        <div className="border-2 border-rose-500 p-3 my-2">
          <p className="my-2 py-2">Disclaimer: Tool is intended to make label submission process easy. It must be used with responsability. The developer team is not responsible for any missuse.</p>
          <p className="text-xs">Developed by: TakumoZero, Luvoos, Jafat</p>
        </div>

          <div className="h-1/3  md:h-screen overflow-y-hidden">
            <div className="flex flex-col items-center justify-center">
              <img
                src={bgImage} alt="My Asset" className="w-full h-auto blur-lg" />

                <div className="absolute bg-black w-3/5 border-2 border-rose-500 p-3">
                  <Response message={responseMessage} />
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
