/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  function fetchData() {
    if (name.trim() === "") {
      setUser(null);
      setErrorMessage("Type something to search");
      return;
    }

    axios
      .get(`https://api.github.com/users/${name}`)
      .then((res) => {
        setUser(res.data);
        setErrorMessage("");
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
        setErrorMessage("User not found");
      });
  }

  return (
    <div className="App">

      <h1 className="heading">Find Github User</h1>
      <input
        type="text"
        placeholder="Enter Github Username"
        className="input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={fetchData} className="button">Search</button>

      {user && (
        <div className="userData">
          <img
            src={user.avatar_url}
            alt="profile image"
            className="image"
            style={{ width: "200px" }}
          />
          <h1 className="username">{user.name}</h1>
          <div className="followers-div">
            <span className="followers">Followers: {user.followers}</span>
            <span className="following">Following: {user.following}</span>
          </div>
          <p className="repositories-heading">Public Repositories: {user.public_repos}</p>
          <a href={user.html_url} className="link" target="_blank" rel="noopener noreferrer">
            Link to Github Profile
          </a>

          
        
        </div>
      )}

      {errorMessage && <div className="errorMsg">{errorMessage}</div>}
    </div>
  );
}

export default App;


