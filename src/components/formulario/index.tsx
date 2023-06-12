import { useState } from "react";
import { Button, Box, Grid, TextField } from "@material-ui/core";

function Formulario({ value, text, id}: { id: number; text: { value: number, text: string }; value: any }) {
  const handleSubmit = value;
  const [comentario, setComentario] = useState("");
  const [autor, setAutor] = useState("");
  const [errorComentario, setErrorComentario] = useState({
    error: false,
    message: "",
  });
  const [errorAutor, setErrorAutor] = useState({
    error: false,
    message: "",
  });

  const agregar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (autor.trim() !== "" && comentario.trim() !== "") {
      handleSubmit({
        comentario: comentario,
        autor: autor,
        id: id,
        text: text,
      });
      setErrorAutor({
        error: false,
        message: "",
      });
      setErrorComentario({
        error: false,
        message: "",
      });
      setComentario("");
      setAutor("");
    } else {
      if (autor.trim() === "") {
        setErrorAutor({
          error: true,
          message: "El campo no puede quedar vacio",
        });
      } else {
        setErrorAutor({
          error: false,
          message: "",
        });
      }
      if (comentario.trim() === "") {
        setErrorComentario({
          error: true,
          message: "El campo no puede quedar vacio",
        });
      } else {
        setErrorComentario({
          error: false,
          message: "",
        });
      }
    }
  };

  return (
    <>
      <Box component="form" onSubmit={agregar}>
        <Grid container>
          <Grid  item xs={12} sm={12} md={12} lg={12}>
            <TextField
              className="form-input"
              minRows={3}
              onChange={(e) => setComentario(e.target.value)}
              value={comentario}
              /*  className="margin-text-area" */
              variant="filled"
              id="outlined-multiline-static"
              /* placeholder="Ingrese su comentario" */
              label="  Ingrese su comentario"
              multiline
              required
              error={errorComentario.error}
              helperText={errorComentario.message}
            />
            <TextField
              className="form-input"
             /*  placeholder="Ingrese el autor" */
              label="  Ingrese el autor"
              id="outlined-required"
              variant="filled"
              /* className="margin-input" */
              type="text"
              required
              error={errorAutor.error}
              helperText={errorAutor.message}
              onChange={(e) => setAutor(e.target.value)}
              value={autor}
            />
          </Grid>
        </Grid>
        <Grid style={{textAlign:"center", marginTop: "10px"}} item xs={12} sm={12} md={12} lg={12}>
        <Button
          type="submit"
          className="btn-color"
          disabled={!comentario || !autor}
        >
          {text.text}
        </Button>
        </Grid>
      </Box>

     
    </>
  );
}

export default Formulario;
