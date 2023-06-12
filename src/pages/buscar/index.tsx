import { useContext, useState } from "react";
import { ZooContext } from "../../context/zoo-context";
import CardBuscar from "../../components/card-buscar";
import {
  Modal,
  Box,
  Typography,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";

function Buscar({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) {
  const { zone, animales, mensajes, respMensajes /*searchZoo,  result */ } =
    useContext(ZooContext);
  const [busqueda, setBuscar] = useState("");
  const [result, setResult] = useState([]);
  const [errorBuscar, setErrorBuscar] = useState({
    error: false,
    message: "",
  });

  const cerrar = () => {
    setResult([]);
    setBuscar("");
  };

  const buscar = (e) => {
    e.preventDefault();
    if (busqueda.trim() !== "") {
      setErrorBuscar({
        error: false,
        message: "",
      });
    } 
   /*  else{
      searchZoo(busqueda)
    } */
  };
  /*    let respuesta = respMensajes.filter((respMensj) =>
      respMensj.comentario.toUpperCase().includes(busqueda.toUpperCase())
    );
    let aux = [];
    if (respuesta.length > 0) {
      respuesta.forEach((resp) => {
        let objComentario = mensajes.find(
          (mensj) => mensj.id === resp.idMensaje
        );
        let objAnimal = animales.find(
          (animal) => animal.id === objComentario?.idAnimal
        );

        let objZona = zone.find((zon) => zon.id === objAnimal?.idZone);
        if (objComentario && objAnimal && objZona) {
          aux.push({
            zona: objZona.zone,
            animal: objAnimal.animal,
            comentario: objComentario.comentario,
            respuesta: resp.comentario,
          });
        }
      });
    } else {
      let comentarios = mensajes.filter((mensj) =>
        mensj.comentario.toUpperCase().includes(busqueda.toUpperCase())
      );

      if (comentarios.length > 0) {
        comentarios.forEach((mensj) => {
          let objAnimal = animales.find(
            (animal) => animal.id === mensj.idAnimal
          );

          let objZona = zone.find((zon) => zon.id === objAnimal?.idZone);
          if (objAnimal && objZona) {
            aux.push({
              zona: objZona.zone,
              animal: objAnimal.animal,
              comentario: mensj.comentario,
              respuesta: "",
            });
          }
        });
      } else {
        let animalesFilter = animales.filter((animal) =>
          animal.animal.toUpperCase().includes(busqueda.toUpperCase())
        );

        if (animalesFilter.length > 0) {
          animalesFilter.forEach((animal) => {
            let objZona = zone.find((zon) => zon.id === animal.idZone);
            if (objZona) {
              aux.push({
                zona: objZona.zone,
                animal: animal.animal,
                comentario: "",
                respuesta: "",
              });
            }
          });
        } else {
          let zona = zone.filter((zone) =>
            zone.zone.toUpperCase().includes(busqueda.toUpperCase())
          );

          if (zona.length > 0) {
            zona.forEach((zone) => {
              aux.push({
                zona: zone.zone,
                animal: "",
                comentario: "",
                respuesta: "",
              });
            });
          }
        }
      }
    }
    setResultado(aux);
  } else {
    setErrorBuscar({
      error: true,
      message: "El campo no puede quedar vacío",
    });
  }
}; */

  return (
    <>
      <Modal
        open={show}
        onClose={() => {
          const handleC = handleClose;
          handleC();
          cerrar();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box">
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Buscar
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography id="modal-modal-description">
                <div className="buscar">
                  <TextField
                    className="form-input"
                    onChange={(e) => setBuscar(e.target.value)}
                    value={busqueda}
                    autoFocus
                    variant="filled"
                    id="outlined-multiline-static"
                    label="Buscar"
                    required
                    error={errorBuscar.error}
                    helperText={errorBuscar.message}
                  />
                </div>
                <div>
                  {result.length <= 0 ? (
                    <span>No se encontraron resultados</span>
                  ) : (
                    <>
                      <h6>resultados:</h6>
                      {result.map((resp, index) => (
                        <div key={index}>
                          <CardBuscar resp={resp} />
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Button
                  style={{ marginRight: "12px" }}
                  className="btn-color-close"
                  onClick={() => {
                    const handleC = handleClose;
                    handleC();
                    cerrar();
                  }}
                >
                  Cerrar
                </Button>
                <Button
                  className="btn-color"
                  disabled={!busqueda}
                  onClick={buscar}
                >
                  Buscar
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default Buscar;
