//export const USER_IP = "192.168.1.66";
export const USER_IP = process.env.NODE_ENV === 'PRODUCTION' ? "franz-fotoarchiv.herokuapp.com" : "localhost";
