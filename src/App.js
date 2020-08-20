import React, { useEffect, useState } from "react";
import "./styles.css";
import Chip from "./assets/chip.webp";

import Flip from "react-reveal/Flip";

function App() {
  const [state, setState] = useState({
    months: [],
    years: [],
  });

  const [form, setForm] = useState({
    number: "",
    name: "",
    card: "visa",
    year: "",
    month: "",
    cvv: "",
  });

  const [focus, setFocus] = useState({
    name: false,
    number: false,
    expiry: false,
    cvv: false,
  });

  //on Component Loads---
  useEffect(() => {
    const months = [];

    const years = [];

    // getting months numbers---

    for (let i = 0; i <= 12; i++) {
      let result = ("0" + i).substr(-2);
      months.push(result);
    }

    let cyear = new Date().getFullYear();

    // getting next 10 years numbers---
    for (let j = 0; j <= 10; j++) {
      years.push(cyear + j);
    }

    setState({ months, years });
  }, []);

  //openSource function to identify card type--
  const detectCardType = (number) => {
    var re = {
      electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
      maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
      dankort: /^(5019)\d+$/,
      interpayment: /^(636)\d+$/,
      unionpay: /^(62|88)\d+$/,
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      amex: /^3[47][0-9]{13}$/,
      diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
    };

    for (var key in re) {
      if (re[key].test(number)) {
        setForm({ ...form, card: key });
        return key;
      }
    }
  };

  const addGaps = (str, gapNo) => {
    let newStr = " ";
    let len = str.length;
    for (let i = 0; i < len; i++) {
      newStr = newStr + str[i];
      while (newStr.length % (gapNo + 1) === 0) {
        newStr = newStr + " ";
      }
    }
    return newStr.trim("   ");
  };

  return (
    <div className="App">
      <div className="card">
        <form>
          <label>Card Number</label>
          <input
            type="text"
            maxlength="16"
            onChange={(e) => {
              setFocus({
                name: false,
                number: true,
                expiry: false,
                cvv: false,
              });
              if (e.target.value.length <= 16) {
                setForm({ ...form, number: e.target.value });
              }
              detectCardType(e.target.value);
            }}
            onMouseEnter={() =>
              setFocus({
                name: false,
                number: true,
                expiry: false,
                cvv: false,
              })
            }
          />
          <label>Card Name</label>
          <input
            type="text"
            className="cName"
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              setFocus({
                name: true,
                number: false,
                expiry: false,
                cvv: false,
              });
            }}
            onMouseEnter={() =>
              setFocus({
                name: true,
                number: false,
                expiry: false,
                cvv: false,
              })
            }
          />
          <div className="row">
            <div>
              <label>Expiration Date</label>
              <div className="month-selection">
                <select
                  className="month"
                  onChange={(e) => setForm({ ...form, month: e.target.value })}
                  onMouseEnter={() =>
                    setFocus({
                      name: false,
                      number: false,
                      expiry: true,
                      cvv: false,
                    })
                  }
                >
                  <option value="" disabled selected>
                    Month
                  </option>

                  {state.months.map((x, i) => (
                    <option key={i} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
                <select
                  className="month"
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  onMouseEnter={() =>
                    setFocus({
                      name: false,
                      number: false,
                      expiry: true,
                      cvv: false,
                    })
                  }
                >
                  <option value="" disabled selected>
                    Year
                  </option>
                  {state.years.map((x, i) => (
                    <option key={i} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label>CVV</label>
              <input
                className={`cvv ${focus.cvv ? "rotate" : ""}`}
                type="text"
                onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                onMouseEnter={() =>
                  setFocus({
                    name: false,
                    number: false,
                    expiry: false,
                    cvv: true,
                  })
                }
                onMouseLeave={() =>
                  setFocus({
                    name: false,
                    number: false,
                    expiry: false,
                    cvv: false,
                  })
                }
              />
            </div>
          </div>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>

        {!focus.cvv ? (
          <div className="credit-card">
            <div className="">
              <div className="one">
                <img src={Chip} alt="chip" />
                <div className="cType">
                  <img alt="card" src={require(`./assets/${form.card}.jpg`)} />
                  {/* <h3>{form.card ? form.card : "Visa"}</h3> */}
                </div>
              </div>
              <div className="two">
                <h2 className={`${focus.number ? "activeBorder" : null}`}>
                  {form.number
                    ? addGaps(form.number, 4)
                    : "4916  ****  ****  5709"}
                </h2>
              </div>
              <div className="three">
                <div className={`name ${focus.name ? "activeBorder" : null}`}>
                  <label>Card Holder</label>
                  <h4 className="cName">
                    {form.name ? form.name : "Noel Sasikanth"}
                  </h4>
                </div>
                <div
                  className={`expire ${focus.expiry ? "activeBorder" : null}`}
                >
                  <label>Expires</label>
                  <h4>
                    {form.month ? form.month : "MM"} /{" "}
                    {form.year ? form.year : "YYYY"}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Flip left>
            <div className="credit-card back">
              <div className="one"></div>
              <div className="two">
                <label>CVV</label>
                <input name="cvv" type="password" value={form.cvv} />
              </div>

              <div className="three">
                <img alt="card" src={require(`./assets/${form.card}.jpg`)} />
              </div>
            </div>
          </Flip>
        )}
      </div>
    </div>
  );
}

export default App;
