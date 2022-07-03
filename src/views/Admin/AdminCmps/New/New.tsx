import "./New.scss";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useContext, useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import CloseMenuByPageClick from "../../../../hooks/CloseMenuByPageClick";
import { ErrorContext } from "../../../../Context/Error/ErrorContext";
import Select from "react-select";

const New: React.FC<{ inputs: []; cmpName: string; action: string }> = ({
  inputs,
  cmpName,
  action,
}) => {
  const [file, setFile] = useState<any>("");
  const [data, setData] = useState<any>({});
  const [per, setPerc] = useState(null);
  const [item, setItem] = useState<any>({});
  const navigate = useNavigate();
  const { id } = useParams();
  const pageRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState([]);
  const [koshers, setKoshers] = useState([]);
  const { dispatch } = useContext(ErrorContext);
  const [selectedOption, setSelectedOption] = useState<any[]>([]);

  CloseMenuByPageClick(pageRef);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress: any = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
          dispatch({ type: "SET", payload: error });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev: any) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  useEffect(() => {
    const getDocByID = async () => {
      const docRef = doc(db, cmpName, `${id}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setItem(docSnap.data());
      }
      //  else {
      //   console.log("No such document!");
      // }
    };
    getDocByID();
  }, [id]);

  useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "categories"),
      (snapShot) => {
        let list: any = [];
        snapShot.docs.forEach(async (doc) => {
          list.push({ ...doc.data() });
        });
        list = organizeData(list, "category");
        setCategories(list);
      },
      (error) => {
        console.log(error);
        dispatch({ type: "SET", payload: error });
      }
    );

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "koshers"),
      (snapShot) => {
        let list: any = [];
        snapShot.docs.forEach(async (doc) => {
          list.push({ ...doc.data() });
        });
        list = organizeData(list, "kosher");
        setKoshers(list);
      },
      (error) => {
        console.log(error);
        dispatch({ type: "SET", payload: error });
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const organizeData = (list: [], ref: string) => {
    return list.map((item: any) => item[ref]);
  };

  const addEditData = async () => {
    if (action === "add") {
      const dataobj = getDocKeysAndData();
      dataobj.timeStamp = serverTimestamp();
      await addDoc(collection(db, cmpName), dataobj);
      navigate(-1);
      return;
    } else updateDocItem();
  };

  const updateDocItem = async () => {
    const updatedRef = doc(db, cmpName, `${id}`);
    await updateDoc(updatedRef, data);
    navigate(-1);
    return;
  };

  const getDocKeysAndData = () => {
    let dataObj: any = {};
    for (const key in data) {
      dataObj[key] = data[key];
    }
    return { ...dataObj };
  };

  const handleAdd = async (e: any) => {
    e.preventDefault();
    try {
      let res;
      switch (cmpName) {
        case "categories":
          addEditData();
          return;
        case "products":
          addEditData();
          return;
        case "koshers":
          addEditData();
          return;
        case "tnc":
          addEditData();
          return;
        case "users":
          try {
            if (action === "add") {
              const userData = data;
              res = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
              delete userData.passowrd;
              await setDoc(doc(db, "users", res.user.uid), {
                ...userData,
                timeStamp: serverTimestamp(),
              });
              navigate(-1);
              return;
            } else {
              updateDocItem();
              return;
            }
          } catch (error) {
            dispatch({ type: "SET", payload: error });
            return;
          }
        default:
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSetFile = (e: any) => {
    setFile(e?.target?.files[0]);
  };

  const isToDisplay = () => {
    switch (cmpName) {
      case "products":
        return true;
      case "tnc":
        return true;
      default:
        return false;
    }
  };

  const handleInput = (e: any) => {
    const id = e.target.id;
    const value = e.target.value;

    switch (e.target.name) {
      case "koshers":
        console.log(data);
        setData({ ...data, [id]: [value] });
        return;
      case "isActive":
        if (value === "true") setData({ ...data, [id]: true });
        else setData({ ...data, [id]: false });
        return;

      default:
        setData({ ...data, [id]: value });
        return;
    }
  };

  const setKoshersOptions = () => {
    const options = koshers.reduce((options: Array<object>, kosher: any) => {
      options.push({ value: kosher, label: kosher });
      return options;
    }, []);
    return options;
  };

  const onSelectedOption = (selectedKosherArray: any) => {
    setSelectedOption(selectedKosherArray);
    let koshers = [];
    for (let i = 0; i < selectedKosherArray.length; i++) {
      koshers.push(selectedKosherArray[i].value);
    }
    setData({ ...data, koshers: [...koshers] });
  };

  const getSpecialInput = (label: string) => {
    switch (label) {
      case "category":
        return (
          <select name={label} id={label} onChange={handleInput}>
            <option value="הכל">Choose category</option>;
            {categories.map((category, idx) => {
              return (
                <option value={category} key={idx}>
                  {category}
                </option>
              );
            })}
          </select>
        );
      case "koshers":
        return (
          <Select
            name={label}
            id={label}
            defaultValue={selectedOption}
            onChange={onSelectedOption}
            options={setKoshersOptions()}
            isMulti={true}
            placeholder="בחר כשרויות"
          />

          // <select name={label} id={label} onChange={handleInput} multiple>
          //   <option value="true">Choose kosher level</option>
          //   {koshers.map((kosher, idx) => {
          //     return (
          //       <option value={kosher} key={idx}>
          //         {kosher}
          //       </option>
          //     );
          //   })}
          // </select>
        );

      case "isActive":
        return (
          <select name={label} id={label} onChange={handleInput}>
            <option value="true">Choose is active</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        );

      default:
        break;
    }
  };

  const isSpecialInput = (label: string) => {
    switch (label) {
      case "category":
        return false;
      case "koshers":
        return false;
      case "isActive":
        return false;

      default:
        return true;
    }
  };

  return (
    <div ref={pageRef} className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>{`${action === "add" ? "Add new " : "Edit " + cmpName}`}</h1>
        </div>
        <div className="bottom">
          {isToDisplay() && (
            <div className="left">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : item.img
                    ? item.img
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>
          )}
          <div className="right">
            <form onSubmit={handleAdd}>
              {isToDisplay() &&
                (cmpName === "tnc" ? (
                  <div className="formInput">
                    <label htmlFor="file">
                      File: <UploadFileIcon className="icon" />
                    </label>
                    <input type="file" id="file" onChange={onSetFile} style={{ display: "none" }} />
                  </div>
                ) : (
                  <div className="formInput">
                    <label htmlFor="file">
                      Image: <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input type="file" id="file" onChange={onSetFile} style={{ display: "none" }} />
                  </div>
                ))}
              {inputs.map((input: any) => (
                <div className="formInput" key={input.id}>
                  <label htmlFor={input.label} className="capitalize">
                    {input.label}
                  </label>
                  {isSpecialInput(input.label) ? (
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={action === "edit" ? `${item[input.label]}` : input.placeholder}
                      onChange={handleInput}
                    />
                  ) : (
                    getSpecialInput(input.label)
                  )}
                </div>
              ))}
              <button disabled={per !== null && per < 100} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
