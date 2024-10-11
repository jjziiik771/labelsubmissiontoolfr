/* eslint-disable react/prop-types */
const Response = ({ message }) => {
  return (
    <div id="response-message" className="flex-1 bg-blur font-light bg-black rounded-md p-4 h-full">
      <h2 className="text-xl mb-2">Submission Status: </h2>
      <p id="server-response" className="text-sm">{message}</p>
    </div>
  );
};

export default Response;
