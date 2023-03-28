import { Photo } from "../types/Photo";
import { storage } from "../libs/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export const getAll = async () => {
  let list: Photo[] = [];

  //create a path to firebase access the images file
  const imagesFolder = ref(storage, "images");
  //list everything inside the file and store in the photo list
  const photoList = await listAll(imagesFolder);

  for (let i in photoList.items) {
    //get the url
    let photoUrl = await getDownloadURL(photoList.items[i]);

    list.push({
      name: photoList.items[i].name,
      url: photoUrl,
    });
  }
  return list;
};
