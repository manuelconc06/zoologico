import { useContext } from "react";
import { ZooContext } from "../../context/zoo-context";
import ZooMsg from "../muro";
import { Button } from "@material-ui/core";
import ModalZoo from "../../components/modal";
import useShow from "../../hooks/show";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ZooAcordeon({ idZone, zone }: { idZone: number; zone: string }) {
  const { handleClose, handleShow, show } = useShow();
  const type = { value: 2, text: "animal" };
  const { animales /* , getDataAnimalByZone  */} = useContext(ZooContext);
/*   const filterAnimals = (id)=>{
    getDataAnimalByZone(id)
  } */
  let animalesFiltrados = animales.filter((animal) => animal.idZone === idZone);

  return (
    <>
      <Accordion>
        <AccordionSummary
          id={idZone?.toString()}
          aria-controls="panel-content"
        /*   onClick={() => filterAnimals(idZone)} */
          expandIcon={<ExpandMoreIcon />}
        >
          {zone}
        </AccordionSummary>
        <AccordionDetails >
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <h2 className="tittle">Animales</h2>
            {/*   {animales.map((animal) => ( */}
              {animalesFiltrados.map((animal) => (
                <div key={animal.id}>
                  <ZooMsg
                    id={animal.id}
                    animal={animal.animal}
                    nombre={animal.nombre}
                  />
                </div>
              ))}
              <div style={{ textAlign: "center" }}>
                <Button className="btn-color" onClick={handleShow}>
                  Agregar nuevo animal
                </Button>
              </div>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <ModalZoo
        show={show}
        handleClose={handleClose}
        type={type}
        idZone={idZone}
      />
    </>
  );
}

export default ZooAcordeon;
