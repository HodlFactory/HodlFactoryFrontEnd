import React, { useState } from "react";
import { useSelector } from "react-redux";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";

import { Card, Button, Modal, Form, Carousel } from "react-bootstrap";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractForm } = newContextComponents;

const HodlCardStatic = ({ hodlType, hodlContract }) => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState((state) => state);
  const drizzleInit = useSelector((state) => state.global.drizzleInit);
  const [showForm, setShowForm] = useState(false);
  const [indexCarousel, setIndexCarousel] = useState(0);

  const handleCarousel = (selectedIndex, e) => {
    setIndexCarousel(selectedIndex);
  };

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
                <Carousel activeIndex={indexCarousel} onSelect={handleCarousel}>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="holder.js/800x400?text=First slide&bg=373940"
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>
                        Nulla vitae elit libero, a pharetra augue mollis
                        interdum.
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="holder.js/800x400?text=Second slide&bg=282c34"
                      alt="Second slide"
                    />

                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="holder.js/800x400?text=Third slide&bg=20232a"
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur.
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
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
