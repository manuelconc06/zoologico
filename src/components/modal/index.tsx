import { useContext, useState, useEffect, ChangeEvent, FormEvent } from "react";
import { ZooContext } from "../../context/zoo-context";
import {
  Box,
  Typography,
  Modal,
  Grid,
  Button,
  TextField,
  MenuItem
} from "@material-ui/core";

function ModalZoo({
  show,
  handleClose,
  type,
  idZone,
}: {
  show: boolean;
  handleClose: () => void;
  idZone: number;
  type: { value: number };
}) {
  const { createZone, createAnimal, /* species, getDataSpecies */ } = useContext(ZooContext);

  const [zone, setZone] = useState("");
  const [especie, setEspecie] = useState<number | string | null>(null);
  const [nombre, setNombre] = useState("");
  const [errorZone, setErrorZone] = useState({
    error: false,
    message: "",
  });
  const [errorNombre, setErrorNombre] = useState({
    error: false,
    message: "",
  });
  const [errorEspecie, setErrorEspecie] = useState({
    error: false,
    message: "",
  });

  const [options, setOptions] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
   /*  getDataSpecies()
    setOptions(species); */
    const data = [
      { id: 1, name: "Mono" },
      { id: 2, name: "Tigre" },
      { id: 3, name: "Panda" },
    ];
    setOptions(data);
  }, []);

  const agregarArea = (e: FormEvent) => {
    e.preventDefault();
    if (zone.trim() !== "") {
      setErrorZone({
        error: false,
        message: "",
      });
      createZone({ id: idZone, zone });
      setZone("");
      handleClose();
    } else {
      setErrorZone({
        error: true,
        message: "El campo no puede quedar vacío",
      });
    }
  };

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setEspecie(event.target.value as number);
  };

  const agregarAnimal = (e: FormEvent) => {
    e.preventDefault();
    if (nombre.trim() !== "") {
      setErrorNombre({
        error: false,
        message: "",
      });
      createAnimal({ animal: especie, nombre: nombre, idZone: idZone });
      setEspecie("");
      setNombre("");
      handleClose();
    } else {
      setErrorNombre({
        error: true,
        message: "El campo no puede quedar vacío",
      });
    }
  };

  return (
    <>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box">
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {type.value === 1 ? "Agregar Área" : "Agregar Animal"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography id="modal-modal-description">
                <div>
                  {type.value === 1 ? (
                    <TextField
                      label="Agregar Nueva Área"
                      id="outlined-required"
                      variant="filled"
                      type="text"
                      style={{ width: "100%", margin: "8px 2px" }}
                      required
                      autoFocus
                      error={errorZone.error}
                      helperText={errorZone.message}
                      onChange={(e) => setZone(e.target.value)}
                      value={zone}
                    />
                  ) : (
                    <>
                      <div>
                        <TextField
                          style={{ width: "100%", margin: "8px 2px" }}
                          id="demo-simple-select"
                          select
                          value={especie}
                          label="Agregar especie"
                          required
                          autoFocus
                          error={errorEspecie.error}
                          helperText={errorEspecie.message}
                          onChange={handleChange}
                        >
                          {options.map((op, index) => (
                            <MenuItem key={index} value={op.value}>
                              {op.label}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          label="Agregar nombre"
                          id="outlined-required"
                          variant="filled"
                          type="text"
                          style={{ width: "100%", margin: "8px 2px" }}
                          required
                          autoFocus
                          error={errorNombre.error}
                          helperText={errorNombre.message}
                          onChange={(e) => setNombre(e.target.value)}
                          value={nombre}
                        />
                      </div>
                    </>
                  )}
                </div>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <div style={{ textAlign: "center" }}>
                <Button
                  className="btn-color-close"
                  style={{ marginRight: "10px" }}
                  onClick={handleClose}
                >
                  Cerrar
                </Button>
                {type.value === 1 ? (
                  <Button
                    className="btn-color"
                    onClick={agregarArea}
                    disabled={!zone}
                  >
                    Agregar
                  </Button>
                ) : (
                  <Button
                    className="btn-color"
                    onClick={agregarAnimal}
                    disabled={!especie || !nombre}
                  >
                    Agregar
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default ModalZoo;
