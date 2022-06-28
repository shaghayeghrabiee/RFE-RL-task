import React, { useState, useEffect } from "react";
import List from "./list";

const MainPage = () => {
  const [tagArray, setTagArray] = useState([]);
  const [input, setInput] = useState("");
  const [onloadHash, setOnLoadHash] = useState("#tag=red,blue,purpple");

  const getData = () => {
    window.location.hash = onloadHash;
    const tagIndex = onloadHash.indexOf("=");
    setTagArray(
      onloadHash.substring(tagIndex + 1, onloadHash.length).split(",")
    );
  };

  const addToList = () => {
    setTagArray([...tagArray, input]);
    setInput("");
    window.location.hash =
      onloadHash.length === 0
        ? onloadHash.concat(`#tag=${input}`)
        : onloadHash.concat(`,${input}`);
    setOnLoadHash(window.location.hash);
  };

  const removeHashElement = (event) => {
    const hashEl = onloadHash;
    const tagIndexEl = hashEl.indexOf("=");
    const tagArrayEl = hashEl
      .substring(tagIndexEl + 1, hashEl.length)
      .split(",");
    const newHash = tagArrayEl.filter((el) => el !== event.target.innerHTML);
    window.location.hash = `#tag=${newHash}`;
  };

  const remove = (event) => {
    const filteredTag = tagArray.filter(
      (tag) => tag !== event.target.innerHTML
    );
    setTagArray(filteredTag);
    setOnLoadHash(filteredTag.toString());
    removeHashElement(event);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container m-5">
      <div className="input-group mb-3 col-md-6 input">
        <input
          type="text"
          className="form-control"
          placeholder="Insert your input..."
          id="textInput"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-success"
            type="button"
            id="addBtn"
            onClick={addToList}
          >
            Add
          </button>
        </div>
      </div>
      <div className="row">
        <ul className="enterdList">
          <div>
            {tagArray &&
              tagArray.map((tag, index) => (
                <List key={index} list={tag} onclick={remove} />
              ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default MainPage;
