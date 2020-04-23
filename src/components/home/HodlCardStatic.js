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
      <Card className="d-block">
        <p className="text-uppercase">{hodlType} HODL</p>
        <p>100 DAI</p>
        <p>CURRENT APY:</p>
        <p> %</p>
        <p>TITLE</p>
        <p>'s HODL</p>
        <p></p>
        <Button
          variant="primary"
          disabled={!drizzleInit}
          onClick={handleCreateHodl}
        >
          CREATE
        </Button>
      </Card>

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
                <Button variant="success" type="submit">
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
