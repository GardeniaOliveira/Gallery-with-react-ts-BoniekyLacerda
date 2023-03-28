import { useState, useEffect } from "react";
import * as C from "./App.styles";
import * as Photos from "./services/photo";

const App = () => {
  const [loading, setLoading] = useState(false);

  //it will be happing while loading
  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      let photos = await getPhotos();
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
    </C.Container>
  );
};

export default App;
