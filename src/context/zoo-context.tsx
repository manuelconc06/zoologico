import { createContext, useState, useEffect } from "react";
import { zone as data } from "../data/zone";
import { animales as dataAnimal } from "../data/amimales";
import { mensajes as dataMensajes } from "../data/mensajes";
import { respMensajes as dataRespMensajes } from "../data/respuesta-mensaje";
import { compareAsc, format } from "date-fns";
import {
  getZones,
  getSpecies,
  getAnimalsByZone,
  getCommentByAnimal,
  getReplyByComment,
  putDataAnimals,
  putComment,
  putCommentReply,
  search,
} from "../data/api";

interface Zone {
  id: number;
  name: string;
}

/* interface Species {
  id: number;
  name: string;
}
 */

interface Animal {
  id: number;
  idZone: number;
  animal: string;
  nombre: string;
}

interface Mensaje {
  id: number;
  idAnimal: number;
  comentario: string;
  autor: string;
  fecha: string;
  count: number;
  show: boolean;
}

interface RespuestaMensaje {
  id: number;
  idMensaje: number;
  comentario: string;
  autor: string;
  fecha: string;
}

interface ZooContext {
  createZone: (zone: Zone) => void;
  createAnimal: (animal: Animal) => void;
  createMensajes: (mensaje: Mensaje) => void;
  createRespMensajes: (mensaje: RespuestaMensaje) => void;
  handleUpdateMsg: (id: number, value: boolean) => void;
  handleCountMsg: (id: number) => void;
  zone: Zone[];
  animales: Animal[];
  mensajes: Mensaje[];
  respMensajes: RespuestaMensaje[];
}

export const ZooContext = createContext<ZooContext>({} as ZooContext);

export function ZooContextProvider(props: any) {
  const [zone, setZone] = useState<Zone[]>([]);
  const [animales, setAnimales] = useState<Animal[]>([]);
  const [result, setResult] = useState<any[]>([]);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [respMensajes, setRespMensajes] = useState<RespuestaMensaje[]>([]);

  
  /*   const getDataZone = async() =>{
    const data = await getZones();
    setZone(data)
  } */

  /*   const getDataSpecie = async() =>{
    const data = await getSpecies();
    setSpecies(data)
  }
 */

  /*   const getDataAnimalByZone = async(id) =>{
    const data = await getAnimalsByZone(id);
    setAnimales(data)
  }
 */
  useEffect(() => {
    setZone(data);
    setAnimales(dataAnimal);
    setMensajes(dataMensajes);
    setRespMensajes(dataRespMensajes);
  }, []);

  function createZone(newZone: Zone) {
    setZone((prevZone) => [...prevZone, newZone]);
  }

  function createAnimal(newAnimal: Animal) {
      /* const data = {
      name: newAnimal.nombre,
      species: newAnimal.animal,
      zone: newAnimal.idZone
    }; */
    /* putDataAnimals(data) */
    const resultado = animales.find((a) => a.animal === newAnimal.animal);
    if (resultado) {
      if (resultado.idZone !== newAnimal.idZone) {
        alert("El animal ya se encuentra asignado a otra área");
      } else {
        alert("El animal ya se encuentra asignado a esta área");
      }
    } else {
      setAnimales((prevAnimales) => [...prevAnimales, newAnimal]);
    }
  }

  function createMensajes(newMensaje: Mensaje) {
    /* const data = {
      body: newMensaje.comentario,
      author: newMensaje.autor,
      animalId: newMensaje.idAnimal,
    };
    putComment(data); */
    setMensajes((prevMensajes) => [
      ...prevMensajes,
      {
        ...newMensaje,
        id: Date.now(),
        fecha: format(new Date(), "dd-MM-yyyy"),
      },
    ]);
  }

  function createRespMensajes(newRespMensaje: RespuestaMensaje) {
      /* const data = {
     body: newRespMensaje.comentario,
     author: newRespMensaje.autor,
   };
   putCommentReply(data); */
    setRespMensajes((prevRespMensajes) => [
      ...prevRespMensajes,
      {
        ...newRespMensaje,
        id: Date.now(),
        fecha: format(new Date(), "dd-MM-yyyy"),
      },
    ]);
  }

  const searchZoo = async (value: string) => {
    const data = await search(value);
    let aux: any[] = [];

    if (data?.category === "Zone") {
      data?.results.forEach((data: any) =>
        aux.push({
          zone: data.zone,
          animal: "",
          name: "",
          comment: "",
          replyComment: "",
        })
      );
    } else if (data?.category === "Animals") {
      data?.results.forEach((data: any) =>
        aux.push({
          zone: data.zone,
          animal: data.species,
          name: data.name,
          comment: "",
          replyComment: "",
        })
      );
    } else if (data?.category === "Comment") {
      data?.results.forEach((data: any) =>
        aux.push({
          zone: data.zone,
          animal: data.species,
          name: data.name,
          comment: data.comment,
          replyComment: "",
        })
      );
    } else {
      data?.results.forEach((data: any) =>
        aux.push({
          zone: data.zone,
          animal: data.species,
          name: data.name,
          comment: data.comment,
          replyComment: data.replyComment,
        })
      );
    }

    setResult(aux);
  };

  const handleUpdateMsg = (id: number, value: boolean) => {
    const newMsg = mensajes.map((msg) => {
      if (msg.id === id) {
        return {
          ...msg,
          show: value,
        };
      }
      return msg;
    });

    setMensajes(newMsg);
  };

  const handleCountMsg = (id: number) => {
    const newMsg = mensajes.map((msg) => {
      if (msg.id === id) {
        return {
          ...msg,
          show: false,
          count: msg.count + 1,
        };
      }
      return msg;
    });

    setMensajes(newMsg);
  };

  return (
    <ZooContext.Provider
      value={{
        zone,
        animales,
        mensajes,
        respMensajes,
         /* 
        species, 
        getDataSpecies,
        getDataAnimalByZone,
        getCommentByAnimal,
        getReplyByComment,
        result
        searchZoo
        */
        createZone,
        createAnimal,
        createMensajes,
        createRespMensajes,
        handleUpdateMsg,
        handleCountMsg,
      }}
    >
      {props.children}
    </ZooContext.Provider>
  );
}
