export const prueba = (datos) => {
  let peticion = datos.peticion;
  let socket = datos.socket;

  console.log(peticion);
  socket.emit("respuesta", {
    hola: 6,
  });
};
