// 1.  crear el manejador de paquetes ---- npm init -y
// 2.  instalar express ---- npm i express / npm uninstall express
// 3.  intalar env - manejador de variables de entorno npm i dotenv ---- npm i dotenv
// 4. crear el servidor server.js
// 5. middlewares para hacer visible la carpeta public 
// 6. middlewares para parcear los datos json
// 7. Rutas user.route.js


  const Server = require('./models/server.js')

  require('dotenv').config();

  const server = new Server();
  
  server.listen();





