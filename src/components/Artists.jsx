/* eslint-disable react/prop-types */

const ArtistsInput = ({ onChange, value, onRemove, isRemovable }) => (
    <div className="
    flex flex-row items-center justify-between
    border border-white bg-black rounded w-full py-2 px-3 ">
        <input
            className="bg-inherit border-none flex-1 text-white leading-tight focus:outline-none" 
            type="text"
            value={value}
            onChange={onChange}
            required
            placeholder="ARTIST NAME"
        />
        {isRemovable && (
            <button
            className="text-rose-500" 
            type="button" onClick={onRemove}>
                X
            </button>
        )}
    </div>
);

const ArtistForm = ({artists,handleArtistChange,handleArtistAdd, handleArtistSub}) => {


    return (
        <>
            <div className="my-2">ARTIST/S</div>
            {artists.map((artist, index) => (
                <ArtistsInput
                    key={index}
                    value={artist}
                    onChange={(e) => handleArtistChange(index, e.target.value)}
                    onRemove={() => handleArtistSub(index)}
                    isRemovable={index !== 0} 
                />
            ))}

            <button 
            className="w-full p-2 border-2 border-white hover:bg-rose-500 transition-all duration-300"
            
            type="button" onClick={handleArtistAdd}>
                + Add Artist
            </button>

        </>
    );
};

export default ArtistForm;
