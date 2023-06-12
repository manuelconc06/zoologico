/* import Button from "react-bootstrap/Button"; */
import { useContext, useState } from "react";
import { ZooContext } from "../../context/zoo-context";
import Formulario from "../../components/formulario";
import CardZoo from "../../components/card";
import { Button } from "@material-ui/core";

/* interface ZooFormProps {
  resp: {
    id: number;
    autor: string;
    comentario: string;
  };
}
 */
function ZooForm({
  idAnimal /* mensajesFiltrados */,
}: {
  idAnimal: number;
}) /*{mensajesFiltrados}: ZooFormProps */ {
  const {
    mensajes,
    respMensajes,
    /*    getCommentByAnimal,
    getReplyByComment, */
    createMensajes,
    createRespMensajes,
    handleUpdateMsg,
    handleCountMsg,
  } = useContext(ZooContext);

  const [mensajesRespuestaFiltrados, setMensajesRespuestaFiltrados] = useState(
    []
  );

  let mensajesFiltrados = mensajes.filter((msg) => msg.idAnimal === idAnimal);

  function handleSubmit(props) {
    if (props.text.value === 2) {
      createRespMensajes({
        comentario: props.comentario,
        autor: props.autor,
        idMensaje: props.id,
      });
      handleCountMsg(props.id);
    } else {
      createMensajes({
        comentario: props.comentario,
        autor: props.autor,
        idAnimal: props.id,
      });
    }
  }

  const showForm = (id, value) => {
    handleUpdateMsg(id, value);
  };

  const respuestasMsgFilter = (id) => {
    debugger
    /* getReplyByComment(id) */
    setMensajesRespuestaFiltrados(
      respMensajes.filter((msg) => msg.idMensaje === id)
    );
  };

  console.log(mensajesRespuestaFiltrados)

  return (
    <>
      <Formulario
        value={handleSubmit}
        id={idAnimal}
        text={{ value: 1, text: "Agregar comentario" }}
      />
      <div className="mrg-comentarios">
        <h6>Comentarios</h6>
        {mensajesFiltrados.map((msg, index) => (
          <div key={index}>
            <CardZoo msg={msg} />
            <div className="btn-resp">
              {!msg.show && (
                <Button
                  className="btn-color"
                  style={{ fontSize: "12px" }}
                  onClick={() => showForm(msg.id, true)}
                >
                  Responder
                </Button>
              )}
            </div>
            <div className="coment-style">
              {msg.show && (
                <Formulario
                  value={handleSubmit}
                  text={{ value: 2, text: "Responder" }}
                  id={msg.id}
                />
              )}
            </div>
            <p>
              <Button
                className="btn btn-respuesta btn-color"
                type="button"
                id={msg.id.toString()} 
                data-bs-toggle="collapse"
                data-bs-target={"#collapseExample" + msg.id.toString()}
                aria-expanded="false"
                aria-controls={"collapseExample" + msg.id.toString()}
                onClick={() => {
                  respuestasMsgFilter(msg.id);
                }}
              >
                Ver {msg.count} respuestas
              </Button>
            </p>
            <div className="collapse" id={"collapseExample" + msg.id.toString()}>
              <div className="card card-body">
                {msg.count > 0 ? (
                  <span>
                    {mensajesRespuestaFiltrados?.map((msgResp, index) => (
                      <div key={index}>
                        <CardZoo msg={msgResp} />
                      </div>
                    ))}
                  </span>
                ) : (
                  <span>No hay respuestas</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ZooForm;
