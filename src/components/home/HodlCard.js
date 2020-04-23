import React, { useState } from "react";
import { useSelector } from "react-redux";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";
import moment from "moment";

import { Card } from "react-bootstrap";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractData } = newContextComponents;

const HodlCard = ({ hodlId, hodlType, hodlContract }) => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState((state) => state);

  const convertToEth = (value) => {
    return drizzle.web3.utils.fromWei(String(value), "ether");
  };

  const convertToActualDate = (value) => {
    return moment.unix(value).add(1, "y").format("MMM DD YYYY");
  };

  return (
    <>
      <Card className="d-block">
        <p className="text-uppercase">{hodlType} HODL</p>
        <p>100 DAI</p>
        <p>CURRENT APY:</p>
        <p>
          <ContractData
            contract={hodlContract}
            method="getInterestAvailableToWithdraw"
            methodArgs={[hodlId]}
            drizzle={drizzle}
            drizzleState={state}
          />
        </p>
        <p>TITLE</p>
        <p>
          <ContractData
            contract={hodlContract}
            method="getHodlName"
            methodArgs={[hodlId]}
            drizzle={drizzle}
            drizzleState={state}
          />
          's HODL
        </p>
        <p>
          <ContractData
            contract={hodlContract}
            method="getHodlPurchaseTime"
            methodArgs={[hodlId]}
            drizzle={drizzle}
            drizzleState={state}
            render={convertToActualDate}
          />
        </p>
      </Card>
    </>
  );
};

export default HodlCard;
