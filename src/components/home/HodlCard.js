import React, { useState } from "react";
import { useSelector } from "react-redux";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";
import moment from "moment";
import ReactMomentCountDown from "react-moment-countdown";

import { Card, Button } from "react-bootstrap";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractData, ContractForm } = newContextComponents;

Number.prototype.toFixedDown = function (digits) {
  var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
    m = this.toString().match(re);
  return m ? parseFloat(m[1]) : this.valueOf();
};

const HodlCard = ({ hodlId, hodlType, hodlContract }) => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState((state) => state);

  const weiToDai = (value) => {
    const converted = value * Math.pow(10, -18);
    return converted.toFixedDown(6);
  };

  const convertToActualDate = (value) => {
    const actualDate = moment.unix(value).add(1, "y");
    return (
      <>
        <ReactMomentCountDown toDate={actualDate} targetFormatMask="MM" />{" "}
        months |{" "}
        <ReactMomentCountDown toDate={actualDate} targetFormatMask="DD" /> days
        |{" "}
        <ReactMomentCountDown toDate={actualDate} targetFormatMask="HH:mm:ss" />
      </>
    );
  };

  return (
    <>
      <div className="card-wrapper">
        <Card className="d-block text-center">
          <p className="text-uppercase card-title">{hodlType} HODL</p>
          <p className="card-price">100 DAI</p>
          <p className="card-interest-label">Interest Accured:</p>
          <p className="card-interest-value">
            <ContractData
              contract={hodlContract}
              method="getInterestAvailableToWithdraw"
              methodArgs={[hodlId]}
              drizzle={drizzle}
              drizzleState={state}
              render={weiToDai}
            />
          </p>
          <p className="card-owner-label">TITLE</p>
          <p className="card-owner-value">
            <ContractData
              contract={hodlContract}
              method="getHodlName"
              methodArgs={[hodlId]}
              drizzle={drizzle}
              drizzleState={state}
            />
            's HODL
          </p>
          <p className="card-countdown">
            <ContractData
              contract={hodlContract}
              method="getHodlPurchaseTime"
              methodArgs={[hodlId]}
              drizzle={drizzle}
              drizzleState={state}
              render={convertToActualDate}
            />
          </p>
          <ContractForm
            contract={hodlContract}
            method="withdrawInterest"
            drizzle={drizzle}
            drizzleState={state}
            render={({ state, handleSubmit }) => {
              state._hodlId = hodlId;
              return (
                <form onSubmit={handleSubmit}>
                  <Button variant="primary" type="submit" className="mb-3">
                    WITHDRAW INTEREST
                  </Button>
                </form>
              );
            }}
          />
          <ContractForm
            contract={hodlContract}
            method="destroyHodl"
            drizzle={drizzle}
            drizzleState={state}
            render={({ state, handleSubmit }) => {
              state._hodlId = hodlId;
              return (
                <form onSubmit={handleSubmit}>
                  <Button variant="danger" type="submit">
                    DESTROY
                  </Button>
                </form>
              );
            }}
          />
        </Card>
      </div>
    </>
  );
};

export default HodlCard;
