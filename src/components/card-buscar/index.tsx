import { Card } from "@material-ui/core";

interface CardBuscarProps {
  resp: {
    zone: string;
    animal: string;
    name: string;
    comment: string;
    replyComment: string;
  };
}

function CardBuscar({ resp }: CardBuscarProps) {
  return (
    <Card className="card-pad-two style-card" style={{ marginTop: "20px" }}>
      {resp.zone !== "" && (
        <div>
          <strong>Zona: </strong>
          {resp.zone}
        </div>
      )}
      {resp.animal !== "" && (
        <div>
          <strong>Animal: </strong>
          {resp.animal}
        </div>
      )}
      {resp.name !== "" && (
        <div>
          <strong>Nombre: </strong>
          {resp.name}
        </div>
      )}
      {resp.comment !== "" && (
        <div>
          <strong>Comentario: </strong>
          {resp.comment}
        </div>
      )}
      {resp.replyComment !== "" && (
        <div>
          <strong>Respuesta: </strong>
          {resp.replyComment}
        </div>
      )}
    </Card>
  );
}

export default CardBuscar;
