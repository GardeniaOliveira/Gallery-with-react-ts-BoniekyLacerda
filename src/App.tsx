import { useState, useEffect, FormEvent } from "react";
import * as C from "./App.styles";
import * as Photos from "./services/photo";
import { Photo } from "./types/Photo";
import { PhotoItem } from "./components/PhotoItem";

const App = () => {
  const [uploading, setUploading] = useState(false);
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

  //this FormEvent<HTMLFormElement> is only because typScript needs it to do the prevent default
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //get dates in the form
    const formData = new FormData(e.currentTarget);
    const file = formData.get("image") as File;

    //if exists some upload
    if (file && file.size > 0) {
      //send the upload
      setUploading(true);

      let result = await Photos.insert(file);

      //after the upload sent
      setUploading(false);

      if (result instanceof Error) {
        alert(`${result.name} - Error: ${result.message}`);
      } else {
        //if upload a correct file, so put into array and show on the screen
        let newPhotoList = [...photos];
        newPhotoList.push(result);
        setPhotos(newPhotoList);
      }
    }
  };
  return (
    <C.Container>
      <C.Area>
        <C.Header>Gallery</C.Header>

        {/* ------upload area------- */}
        <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          <input type="submit" value="SEND" />
          {uploading && "Sending..."}
        </C.UploadForm>
        {/* ------photo list ------*/}
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
      </C.Area>
    </C.Container>
  );
};

export default App;
