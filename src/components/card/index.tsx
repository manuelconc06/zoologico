import { Card } from "@material-ui/core";
interface CardZooProps {
  msg: {
    id: number
    idAnimal: number;
    comentario: string;
    autor: string;
    fecha: string;
    count: number;
    show: boolean;
  };
}
function CardZoo({ msg }: CardZooProps) {
  console.log(msg)
  return (
    <Card
      id={msg.id.toString()}
      className="card-pad-msj style-card"
      style={{ marginTop: "20px" }}
    >
      <div className="font-size-msg">
        <span className="font-msg">Autor: </span>{" "}
        <span className="font-mrg">{msg.autor}</span>
        <span className="font-msg"> Fecha: </span>
        {msg.fecha}
      </div>
      <div>{msg.comentario}</div>
    </Card>
  );
}

export default CardZoo;
