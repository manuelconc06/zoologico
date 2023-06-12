import { url } from "../utils/apiUrl";

export const search = async (value: string) => {

  try {
    const response = await fetch(`${url}search?keyword=${encodeURIComponent(value.trim())}`);
    if (!response.ok) throw await response.json();
    return response.json();
  } catch (e) {
    console.log(e);
  }
};


export const getZones = async () => {
  try {
    const response = await fetch(`${url}zone`);
    if (!response.ok) throw await response.json();
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getSpecies = async () => {
  try {
    const response = await fetch(`${url}specie`);
    if (!response.ok) throw await response.json();
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getAnimalsByZone = async (id: number) => {
  try {
    const response = await fetch(`${url}animals/${id}`);
    if (!response.ok) throw await response.json();
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getCommentByAnimal = async () => {
  try {
    const response = await fetch(`${url}comment/`);
    if (!response.ok) throw await response.json();
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getReplyByComment = async (id: number) => {
  try {
    const response = await fetch(`${url}comment/${id}/replies`);
    if (!response.ok) throw await response.json();
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const putDataAnimals = async (data: any, token: string) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(
      `${url}animals`,
      options
    );

    if (!response.ok) throw await response.json();

    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const putComment = async (data: any, token: string) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(
      `${url}comment`,
      options
    );

    if (!response.ok) throw await response.json();

    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const putCommentReply = async (data: any, token: string) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(
      `${url}comment/reply`,
      options
    );

    if (!response.ok) throw await response.json();

    return response.json();
  } catch (e) {
    console.log(e);
  }
};
