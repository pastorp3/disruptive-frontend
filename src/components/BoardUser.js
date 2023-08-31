import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import UserService from "../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const BoardUser = () => {
  const form = useRef();
  const checkBtn = useRef();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [btc, setBtc] = useState(0);
  const [eth, setEth] = useState(0);
  const [ada, setAda] = useState(0);
  const [coin, setCoin] = useState("BTC");
  const [invest, setinvest] = useState(0);
  const [result, setResult] = useState(0);

  const onChangeCoin = (e) => {
    const coin = e.target.value;
    setCoin(coin);
  };

  const onChangeInvest = (e) => {
    const invest = e.target.value;
    setinvest(invest);
  };

  useEffect(() => {
    UserService.getUserBoard(currentUser.id).then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  useEffect(() => {
    UserService.getCoinData('BTC').then(
      (response) => {
        setBtc(response.data);
      }
    );

    UserService.getCoinData('ETH').then(
      (response) => {
        setEth(response.data);
      }
    );

    UserService.getCoinData('ADA').then(
      (response) => {
        setAda(response.data);
      }
    );
  }, []);

  const handleCalculate = (e) => {
    
    UserService.getCalculation(coin, getCoinRate(), invest).then(
      (response) => {
        setResult(response.data);
      }
    );
    
      e.preventDefault();
  };

  const getCoinRate = () => {
    switch (coin) {
      case "BTC":
          return btc.rate;
      case "ETH":
          return eth.rate;
      default:
          return ada.rate;
    }
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h5>BTC: {btc.rate}</h5>
        <h5>ETH: {eth.rate}</h5>
        <h5>ADA: {ada.rate}</h5>
      </header>

      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Calculadora de Inversion
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <Form onSubmit={handleCalculate} ref={form}>
              
                <div>
                  <div className="form-group">
                    <label htmlFor="coin">Coin</label>
                    <select value={coin} onChange={onChangeCoin}>
                      <option value="">Select</option>
                      <option value="BTC">BTC</option>
                      <option value="ETH">ETH</option>
                      <option value="ADA">ADA</option>
                    </select>
                  </div>

                  <h3>Value in USD:  {getCoinRate()}</h3>

                  <div className="form-group">
                    <label htmlFor="invest">Quantity</label>
                    <Input
                      type="number"
                      className="form-control"
                      name="invest"
                      value={invest}
                      onChange={onChangeInvest}
                    />
                  </div>
                

                  <div className="form-group">
                    <button className="btn btn-primary btn-block">Calculate</button>
                  </div>
                </div>
            

                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
            </div>
          </div>
        </div>
        {
          result !== 0 ? (
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  {result}
                </button>
              </h2>
            </div>
          ) : null
        }
      </div>
    </div>
  );
};

export default BoardUser;