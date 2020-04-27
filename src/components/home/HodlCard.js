import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";
import moment from "moment";
import ReactMomentCountDown from "react-moment-countdown";

import { Card, Button, Modal, Form } from "react-bootstrap";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractData, ContractForm } = newContextComponents;

Number.prototype.toFixedDown = function (digits) {
  var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
    m = this.toString().match(re);
  return m ? parseFloat(m[1]) : this.valueOf();
};

const HodlCard = ({ hodlId, hodlType, hodlContract, addDateToHodl }) => {
  const { drizzle, useCacheCall } = useDrizzle();
  const drizzleState = useDrizzleState((drizzleState) => drizzleState);
  const [showForm, setShowForm] = useState(false);

  const purchaseTime = useCacheCall(hodlContract, "getHodlPurchaseTime", [
    hodlId,
  ]);

  useEffect(() => {
    if (purchaseTime) {
      const convertedDate = moment.unix(purchaseTime);
      addDateToHodl(convertedDate, { id: hodlId, type: hodlType });
    }
  }, [purchaseTime]);

  const handleTransferHodl = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

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
      <div className={`card-wrapper mb-3 card-${hodlType}`}>
        <Card className="d-block text-center h-100 d-flex flex-column align-items-center">
          <p className="text-uppercase card-title">{hodlType} HODL</p>
          <p className="card-id">ID: {hodlId}</p>
          <p className="card-price">100 DAI</p>
          <p className="card-interest-label">Interest Accured:</p>
          <p className="card-interest-value">
            <ContractData
              contract={hodlContract}
              method={
                hodlType === "regular"
                  ? "getInterestAvailableToWithdraw"
                  : "getInterestAvailableToWithdrawView"
              }
              methodArgs={[hodlId]}
              drizzle={drizzle}
              drizzleState={drizzleState}
              render={weiToDai}
            />{" "}
            DAI
          </p>
          <p className="card-owner-label">OWNER</p>
          <p className="card-owner-value">
            <ContractData
              contract={hodlContract}
              method="getHodlName"
              methodArgs={[hodlId]}
              drizzle={drizzle}
              drizzleState={drizzleState}
            />
            's HODL
          </p>
          {hodlType === "ponzi" ? null : (
            <p className="card-countdown">
              <ContractData
                contract={hodlContract}
                method="getHodlPurchaseTime"
                methodArgs={[hodlId]}
                drizzle={drizzle}
                drizzleState={drizzleState}
                render={convertToActualDate}
              />
            </p>
          )}
          {hodlType === "regular" ? (
            <ContractForm
              contract={hodlContract}
              method="withdrawInterest"
              drizzle={drizzle}
              drizzleState={drizzleState}
              render={({ state, handleSubmit }) => {
                state._hodlId = hodlId;
                return (
                  <form onSubmit={handleSubmit} className="mt-auto mb-3">
                    <Button variant="primary" type="submit">
                      WITHDRAW INTEREST
                    </Button>
                  </form>
                );
              }}
            />
          ) : null}
          <Button
            variant="success"
            className="mt-auto mb-3"
            onClick={handleTransferHodl}
          >
            TRANSFER
          </Button>
          <ContractForm
            contract={hodlContract}
            method="destroyHodl"
            drizzle={drizzle}
            drizzleState={drizzleState}
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

      <Modal show={showForm} onHide={handleCloseForm} centered>
        <Modal.Header closeButton>
          <Modal.Title>Transfer your {hodlType} hodl</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ContractForm
            contract={hodlContract}
            method="transferFrom"
            drizzle={drizzle}
            drizzleState={drizzleState}
            render={({ state, handleInputChange, handleSubmit }) => {
              state.tokenId = hodlId;
              state.from = drizzleState.accounts[0];
              console.log(state);
              return (
                <form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      name="to"
                      type="text"
                      placeholder="The address you want to transfer to"
                      onChange={handleInputChange}
                    />
                    <Form.Text className="text-muted">
                      Make sure the address is correct before hitting send!
                    </Form.Text>
                  </Form.Group>
                  <Button
                    variant="success"
                    type="submit"
                    onClick={handleCloseForm}
                  >
                    Send now
                  </Button>
                </form>
              );
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HodlCard;
