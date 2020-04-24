import React, { useState } from "react";
import { useSelector } from "react-redux";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";

import { Card, Button, Modal, Form } from "react-bootstrap";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractForm } = newContextComponents;

const HodlCardStatic = ({ hodlType, hodlContract }) => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState((state) => state);
  const drizzleInit = useSelector((state) => state.global.drizzleInit);
  const [showForm, setShowForm] = useState(false);

  const handleCreateHodl = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <div className="card-wrapper">
        <Card className="d-block text-center">
          <p className="text-uppercase card-title">{hodlType} HODL</p>
          <p className="card-price">100 DAI</p>
          <p className="text-uppercase card-interest-label">
            Interest Accured:
          </p>
          <p className="card-interest-value">Up to 1,000,000 DAI!</p>
          <p className="card-owner-label">OWNER</p>
          <p className="card-owner-value">Your name right here!</p>
          <Button
            className="card-button-create"
            variant="primary"
            disabled={!drizzleInit}
            onClick={handleCreateHodl}
          >
            CREATE
          </Button>
        </Card>
      </div>

      <Modal show={showForm} onHide={handleCloseForm} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create {hodlType} hodl</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ContractForm
            contract={hodlContract}
            method="createHodl"
            drizzle={drizzle}
            drizzleState={state}
            render={({ handleInputChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="_name"
                    type="text"
                    placeholder="Your name"
                    onChange={handleInputChange}
                  />
                  <Form.Text className="text-muted">
                    It doesn't have to be your real name.
                  </Form.Text>
                </Form.Group>
                <Button
                  variant="success"
                  type="submit"
                  onClick={handleCloseForm}
                >
                  Create now
                </Button>
              </form>
            )}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HodlCardStatic;
