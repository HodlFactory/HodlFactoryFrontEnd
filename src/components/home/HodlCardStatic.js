import React, { useState } from "react";
import { useSelector } from "react-redux";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";

import { Card, Button, Modal, Form } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";

import { charities } from "../../data/charities";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractForm } = newContextComponents;

const HodlCardStatic = ({ hodlType, hodlContract }) => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState((state) => state);
  const drizzleInit = useSelector((state) => state.global.drizzleInit);
  const [showForm, setShowForm] = useState(false);
  const [indexCarousel, setIndexCarousel] = useState(0);
  const [validated, setValidated] = useState(false);

  const handleCarousel = (index) => {
    setIndexCarousel(index);
  };

  const handleCreateHodl = () => {
    setValidated(false);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleForm = (e, handleSubmit) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      handleSubmit(e);
      setShowForm(false);
    }

    setValidated(true);
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center zoom-effect">
        <p className="text-center">
          {hodlType === "regular" && <>You keep the interest</>}
          {hodlType === "charity" && <>Interest goes to charity</>}
          {hodlType === "ponzi" && <>Interest goes to earlier investors</>}
        </p>
        <div className={`card-wrapper card-${hodlType}`}>
          <Card className="d-block text-center">
            <p className="text-capitalize card-title">{hodlType} HODL</p>
            <p className="card-price">100 DAI</p>
            <p className="card-interest-label">Interest Accured:</p>
            <p className="card-interest-value">??? DAI</p>
            <p className="card-owner-label">Owner:</p>
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
        <p className="text-right mt-3 font-italic">
          {hodlType === "regular" && <>powered by Aave</>}
          {hodlType === "charity" && (
            <>
              <p className="mb-0 text-center">
                powered by rDai
                <br />
                <span className="small">
                  (No Dai required to use - test Dai is minted for you
                  automatically)
                </span>
              </p>
            </>
          )}
          {hodlType === "ponzi" && (
            <>
              powered by Proprietary Ponzi Technology TM
              <br />
              <span className="small">actually it's Aave again</span>
            </>
          )}
        </p>
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
            render={({ state, handleInputChange, handleSubmit }) => {
              state._addressOfCharity = charities[indexCarousel].address;
              return (
                <Form
                  noValidate
                  validated={validated}
                  onSubmit={(e) => handleForm(e, handleSubmit)}
                >
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      name="_name"
                      type="text"
                      placeholder="Your name"
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a name.
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      It doesn't have to be your real name.
                    </Form.Text>
                  </Form.Group>
                  {hodlType === "charity" && (
                    <Carousel
                      selectedItem={indexCarousel}
                      onChange={handleCarousel}
                      showArrows={true}
                      showIndicators={false}
                      showThumbs={false}
                    >
                      {charities.map((charity) => {
                        return (
                          <div className="slide-panel" key={charity.address}>
                            <img
                              src={`charities/${charity.logo}`}
                              alt={charity.name}
                            />
                            <p className="legend">
                              <a href={charity.website} target="_blank">
                                {charity.name}
                              </a>
                            </p>
                          </div>
                        );
                      })}
                    </Carousel>
                  )}
                  <Button variant="success" type="submit">
                    Create now
                  </Button>
                </Form>
              );
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HodlCardStatic;
