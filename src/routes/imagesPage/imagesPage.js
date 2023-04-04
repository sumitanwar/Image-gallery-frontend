import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/header";
import { ToastContainer, toast } from "react-toastify";
import { getToken, removeToken } from "../../authentication/isAuth";

import "./imagesPage.css";
function AllImages() {
  const URL = process.env.REACT_APP_Url;
  const Navigate = useNavigate();
  //   console.log(URL);
  const [search, setSearch] = useState("");
  const [addFormFlag, setAddFormFlag] = useState(true);
  const [imagesData, setimagesData] = useState([]);
  const [formDataValues, setFormData] = useState({
    label: "",
    imageUrl: "",
  });
  const [visibility, setVisibility] = useState("hidden");
  const [refreshFlag, setRefreshFlag] = useState("");
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setLoader(true);
    fetch(`${URL}/images?label=${search}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data.images);
        if (data) {
          setLoader(false);
          return setimagesData(data.images.reverse());
        }
      });
  }, [URL, search, refreshFlag]);
  function deleteImgs(id) {
    const token = getToken("token");
    // console.log(token);
    const reqOption = { method: "delete", headers: { Authorization: token } };
    fetch(`${URL}/images/${id}`, reqOption)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        refreshFlag ? setRefreshFlag(false) : setRefreshFlag(true);
      });
  }
  function AddForm() {
    if (addFormFlag) {
      setAddFormFlag(false);
    } else {
      setAddFormFlag(true);
    }
  }
  function Logout() {
    removeToken("token");
    Navigate("/");
  }
  function AddImages(e) {
    setLoader(true);
    // console.log(formDataValues);
    if (!formDataValues.label || !formDataValues.imageUrl) {
      setLoader(false);
      return alert("All Fields Are Mandetory");
    }
    const token = getToken("token");
    // console.log(token);
    fetch(`${URL}/images`, {
      method: "post",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(formDataValues),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success === true) {
          setLoader(false);
          toast.success("Image Added Successfully");
          setAddFormFlag(true);
        } else if (data.success === false) {
          setLoader(false);
          toast.error(data.message);
          setAddFormFlag(true);
        }
        refreshFlag ? setRefreshFlag(false) : setRefreshFlag(true);
      })
      .catch((e) => {
        toast.error("Data Can't Be Added");
        setLoader(false);
      });
    e.preventDefault();
  }
  return (
    <>
      <ToastContainer
        autoClose={2000}
        position="top-center"
        className="toast-container"
        toastClassName="dark-toast"
      />
      <Header />
      <div
        className={`allimages_main_container ${
          !addFormFlag ? "blur_background" : ""
        }`}
      >
        <div className="logout_search_addImage_container">
          <div className="search_bar_addImage">
            <div className="search_bar_container">
              <input
                className="search_bar"
                type={"text"}
                placeholder={"Search By Name..."}
                value={search}
                onChange={(e) => {
                  setLoader(true);
                  setSearch(e.target.value);
                }}
              />
            </div>
            <div className="Add_images_container">
              <button className="add_images_btn" onClick={AddForm}>
                Add image
              </button>
            </div>
          </div>
          <div className="logout_btn_container">
            <button className="logout_btn" onClick={Logout}>
              Logout &nbsp;
              <i className="fa fa-sign-out"></i>
            </button>
          </div>
        </div>
        <div className={`All_images_container`}>
          {imagesData.map((elm, indx) => {
            return (
              <div
                className="images_container"
                key={indx + Date.now()}
                onMouseEnter={(e) => {
                  setVisibility("");
                }}
                onMouseLeave={() => {
                  setVisibility("hidden");
                }}
              >
                <button
                  className="Delete"
                  style={{ visibility: `${visibility}` }}
                  onClick={() => {
                    deleteImgs(elm._id);
                  }}
                >
                  Delete
                </button>
                <img
                  className="images"
                  src={elm.imageUrl}
                  onClick={(e) => {}}
                  alt="img"
                />

                <p className="label" style={{ visibility: `${visibility}` }}>
                  {elm.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {/* Add Image Form  */}

      <div
        className={`Add_form_container ${addFormFlag ? "display_none" : ""}`}
      >
        <h1 className="Add_a_photo_tag">Add a photo</h1>
        <form className="add_images_form">
          <div className="label_container">
            <label htmlFor="label">Label</label>
            <input
              id="label"
              type={"text"}
              placeholder="Enter Image label"
              name={"label"}
              value={formDataValues.label}
              onChange={(e) => {
                setFormData({ ...formDataValues, label: e.target.value });
              }}
            />
          </div>

          <div className="imageUrl_container">
            <label htmlFor="Photo_Url">Photo URL</label>
            <input
              id="Photo_Url"
              type={"text"}
              placeholder="Image URL"
              name={"imageUrl"}
              value={formDataValues.imageUrl}
              onChange={(e) => {
                setFormData({
                  ...formDataValues,
                  imageUrl: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_btn_container">
            <p className="Submit_images_btn" onClick={AddImages}>
              Submit
            </p>
            <p
              className="cancel_Btn"
              title={"Close"}
              onClick={() => {
                setAddFormFlag(true);
              }}
            >
              Cancel
            </p>
          </div>
        </form>
        {loader ? (
          <img className="loader" src={"./imgs/loaderImg.gif"} alt="loader" />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
export default AllImages;
