import React from "react";
import Navbar from "../components/header";
import Footer from "../components/footer";

import "../styles/results.css";

let pageTitle = "Adversarial Robustness Toolbox";

function Results(props) {
  const [latestResult, setLatestResult] = useState(null);
  const [latestTest, setLatestTest] = useState('');

  useEffect(() => {
    const result = localStorage.getItem('latestResult');
    const test = localStorage.getItem('latestTest');
    if (result) { setLatestResult(JSON.parse(result)); }
    if (test) { setLatestTest(test); }
  }, []);

  return (
    <div id="root">
      <Navbar pageTitle={latestTest} />
      <div className="page-content">
        <h1 className="title">Results</h1>
        <p className="description">
        Here your test results about: {props.previousTest}
        </p>
        <hr />
      </div>
      <Footer />
    </div>
  );
}

export default Results;
