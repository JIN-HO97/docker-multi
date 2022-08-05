import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  useEffect(() => {
    axios.get("/api/values").then((res) => {
      console.log(res);
      setList(res.data);
    });
  }, []);

  const changeHandler = (e) => {
    setValue(e.currentTarget.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/value", {
        value,
      })
      .then((res) => {
        if (res.data.success) {
          console.log("SUCESS", res.data);
          setList([...list, res.data.value]);
          setValue("");
        } else {
          console.log("FAIL", res.data);
        }
      });
  };

  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {list && list.map((li, ind) => <li key={ind}>{li.value}</li>)}
          <form className="example" onSubmit>
            <input
              type="text"
              placeholder="입력ㄲㄱ"
              onChange={changeHandler}
              value={value}
            />
            <button type="submit">화긴</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
