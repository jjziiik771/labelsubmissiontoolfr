/* eslint-disable react/prop-types */

const Labels = ({ labels = [],selectedLabels, setSelectedLabels}) => {


    return (
        <div id="labels" className="flex flex-wrap overflow-auto max-h-56 text-sm">
            {labels.map((label) => (
                <div key={label} className={`w-1/2 p-1 flex flex-col items-center cursor-pointer
                border-2 border-white hover:bg-rose-500 transition-all duration-300
            ${selectedLabels[label] ? "bg-rose-600" : ""}
        `}
                    onClick={() => {
                        let newStateSelectedLabels = { ...selectedLabels }
                        newStateSelectedLabels[label] = !selectedLabels[label]
                        setSelectedLabels({
                            ...newStateSelectedLabels
                        })
                    }}
                >
                    <label htmlFor={label} className="text-center my-1">{label}</label>
                </div>
            ))}
        </div>
    );
};

export default Labels;
