import { useState, useEffect } from "react";
import * as C from "./App.styles";
import * as Photos from "./services/photo";
import { Photo } from "./types/Photo";
import { PhotoItem } from "./components/PhotoItem";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  //it will be happing while loading
  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      setPhotos(await Photos.getAll());
      setLoading(false);
    };
    getPhotos();
  }, []);
  return (
    <C.Container>
      <C.Area>
        <C.Header>Gallery</C.Header>
      </C.Area>

      {/* upload area */}

      {/* photo list */}

      {loading && (
        <C.ScreenWarning>
          {/* while is loading */}
          <div className="emoji">🖐</div>
          <div>Loading...</div>
        </C.ScreenWarning>
      )}

      {/* when already exists photos, so show the photos */}
      {!loading && photos.length > 0 && (
        <C.PhotoList>
          {photos.map((item, index) => (
            <PhotoItem key={index} name={item.name} url={item.url} />
          ))}
        </C.PhotoList>
      )}

      {/* when no exists photos and is not loading*/}
      {!loading && photos.length === 0 && (
        <C.ScreenWarning>
          <div className="emoji">😔</div>
          <div>There are not photos </div>
        </C.ScreenWarning>
      )}
    </C.Container>
  );
};

export default App;
