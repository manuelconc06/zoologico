/* import Card from "react-bootstrap/Card"; */
/* import ListGroup from "react-bootstrap/ListGroup"; */
import ZooForm from "../mensajes";
import useShow from "../../hooks/show";
import { Drawer, Container, Card } from "@material-ui/core";

/* function ZooMsg({ id, animal, nombre }) { */
function ZooMsg({ id, animal, nombre}: { id: number; animal: string; nombre: string }) {
  const { handleClose, handleShow, show } = useShow();
 /*  const [mensajesFiltrados, setMensajesFiltrados] = useState(
    []
  ); */
  /*   const filterAnimals = async ()=>{
   const response = await getCommentByAnimal()
   if(response){
    let Newmsg = response.filter((msg) => msg.idAnimal === id)
    mensajesFiltrados(Newmsg)
   }
  } */
  return (
    <>
      <Card
        id={id?.toString()}
        className="card-pad style-card"
        /*  style={{ textAlign: "center", width: "50%", border: '1px solid #0d6efd' }} */
        onClick={handleShow}
      >
        <strong>Especie: </strong>
        {animal}
        <strong> Nombre: </strong> {nombre}
      </Card>
      <Drawer anchor="right" open={show} onClose={handleClose}>
        <Container>
          <h5 className="add-coment-tittle">
            Muro de mensajes del animal {animal}
          </h5>
          <h6>Agrege un comentario</h6>
          <ZooForm idAnimal={id} /* mensajesFiltrados={mensajesFiltrados} *//>
        </Container>
      </Drawer>
    </>
  );
}

export default ZooMsg;
