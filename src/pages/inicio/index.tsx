import React, { useContext, useState } from "react";
import { ZooContext } from "../../context/zoo-context";
import ZooAccordion from "../lista";
import { Button } from "@material-ui/core";
import ModalZoo from "../../components/modal";
import Buscar from "../buscar";
import useShow from '../../hooks/show';
import { Container } from "@material-ui/core";

function ZoneList() {
  const { zone } = useContext(ZooContext);
  const { handleClose, handleShow, show } = useShow();
  const [showBuscar, setShowBuscar] = useState(false);
  const type = { value: 1, text: "zoo" };
  const handleBuscarClose = () => setShowBuscar(false);
  const handleBuscarShow = () => setShowBuscar(true);

  if (zone.length === 0) {
    return <h1>No hay especies por ahora</h1>;
  }

  return (
    <>
      <Container>
        <h1 className="tittle">Areas del Zoologico</h1>
        <div>
          <div>
            <Button style={{ width: "100%" }} className="btn-buscar" onClick={handleBuscarShow}>
              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "96%" }}>
                  Buscar
                </div>
                <div style={{ width: "4%" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </div>
              </div>
            </Button>
          </div>
          {zone.map((x) => (
            <ZooAccordion
              key={x.id}
              idZone={x.id}
              zone={x.name}
            />
          ))}
        </div>
        <div className="btnAdd">
          <Button className="btn-color" onClick={handleShow}>
            Agregar nueva area
          </Button>
        </div>
      </Container>
      <ModalZoo show={show} handleClose={handleClose} type={type} />
      <Buscar show={showBuscar} handleClose={handleBuscarClose} />
    </>
  );
}

export default ZoneList;
