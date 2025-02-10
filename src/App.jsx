import React, { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";
import lovesvg from "./assets/All You Need Is Love SVG Cut File.svg";
import lovesvg2 from "./assets/Love In The Air SVG Cut File.svg";
import backgroundMusic from "./assets/Blue.mp3";

// Centralized array of photos with an optional text property for each.
const photos = [
  { src: "/vertical.jpg", text: "Placeholder text" },
  { src: "/vertical.jpg", text: "Placeholder text" },
  { src: "/vertical.jpg", text: "Placeholder text"},
  { src: "/vertical.jpg", text: "Placeholder text" },
  { src: "/vertical.jpg", text: "Placeholder text" },
  { src: "/vertical.jpg", text: "Placeholder text" },
];

const App = () => {
  return (
    <Router>
      <AudioPlayer />
      <Routes>
        <Route path="/photos" element={<CouplePhotos />} />
        {/* New dynamic route for individual photo pages */}
        <Route path="/photos/:id" element={<PhotoPage />} />
        <Route path="/" element={<ValentinePage />} />
      </Routes>
    </Router>
  );
};

const AudioPlayer = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      const playAudio = () => {
        audio.play().catch((error) => {
          console.error("Autoplay failed. Waiting for user interaction:", error);
        });
      };

      // Attempt to autoplay
      playAudio();

      // Add event listener for user interaction
      window.addEventListener("click", playAudio);

      // Cleanup
      return () => {
        window.removeEventListener("click", playAudio);
      };
    }
  }, []);

  return (
    <audio ref={audioRef} loop volume="0.3">
      <source src={backgroundMusic} type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  );
};

const ValentinePage = () => {
  const [noCount, setNoCount] = React.useState(0);
  const [yesPressed, setYesPressed] = React.useState(false);
  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="overflow-hidden flex flex-col items-center justify-center pt-4 h-screen -mt-16 selection:bg-rose-600 selection:text-white text-zinc-900">
      {yesPressed ? (
        <>
          <img
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
            alt="Bear Kiss"
          />
          <div className="text-4xl md:text-6xl font-bold my-4 text-purple-600">
            Ok Yayyyyy!!!
          </div>
        </>
      ) : (
        <>
          <img
            src={lovesvg}
            className="fixed animate-pulse top-10 md:left-24 left-6 md:w-40 w-28"
            alt="All you need is love"
          />
          <img
            src={lovesvg2}
            className="fixed bottom-16 -z-10 animate-pulse md:right-24 right-10 md:w-40 w-32"
            alt="Love in the air"
          />
          <img
            className="h-[230px] rounded-lg shadow-lg"
            src="https://gifdb.com/images/high/cute-Love-bear-roses-ou7zho5oosxnpo6k.gif"
            alt="Bear with Roses"
          />
          <h1 className="text-4xl md:text-6xl my-4 text-center text-pink-600">
            Will you be my Valentine?
          </h1>
          <div className="flex flex-wrap justify-center gap-2 items-center">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mr-4"
              style={{ fontSize: yesButtonSize }}
              onClick={() => setYesPressed(true)}
            >
              Yes
            </button>
            <button
              onClick={handleNoClick}
              className="bg-rose-500 hover:bg-rose-600 rounded-lg text-white font-bold py-2 px-4"
            >
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

// Displays the grid of 9 photos
const CouplePhotos = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-200 flex flex-col items-center py-8">
      <h1 className="text-5xl font-bold text-center text-pink-600 mb-10">
        Memories
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-11/12 max-w-5xl">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative group transform hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            {/* Link to the dynamic route /photos/:id */}
            <Link to={`/photos/${index}`}>
              <div className="relative bg-white rounded-xl shadow-lg rotate-[-6deg] group-hover:rotate-0 transition-transform duration-300 p-2">
                <img
                  src={photo.src}
                  alt={`Memory ${index + 1}`}
                  className="rounded-xl shadow-md w-full object-cover h-[500px]"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Back to Main Page
      </Link>

      <footer className="mt-12 text-sm text-gray-600">Made with ❤️</footer>
    </div>
  );
};

// New component to display a single photo and some text
const PhotoPage = () => {
  // useParams grabs the :id from the route
  const { id } = useParams();
  // Convert id to a number and get the photo
  const photoIndex = parseInt(id, 10);
  const photo = photos[photoIndex];

  // If the user manually enters a path out of range, handle it:
  if (!photo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50">
        <h2 className="text-2xl text-red-500">Photo not found!</h2>
        <Link
          to="/photos"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Back to Photos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-pink-100 to-purple-200 p-8">
      {/* Photo at top center */}
      <img
        src={photo.src}
        alt={`Memory ${photoIndex + 1}`}
        className="w-full max-w-md rounded-lg shadow-md mb-6"
      />
      {/* Some text in the middle */}
      <div className="text-center text-3xl md:text-4xl font-bold text-pink-600 mb-6">
        {photo.text}
      </div>
      {/* Back button */}
      <Link
        to="/photos"
        className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Back to Photos
      </Link>
    </div>
  );
};

const Footer = () => {
  return (
    <Link
      className="fixed bottom-2 right-2 backdrop-blur-md opacity-80 hover:opacity-95 border p-1 rounded border-rose-300"
      to="/photos"
    >
      Made with{" "}
      <span role="img" aria-label="heart">
        ❤️
      </span>
    </Link>
  );
};

export default App;