export const environment = {
    production: false,
    apiQueryService: "http://localhost:8081/",
    apiCommandService: "http://localhost:8080/",
    webSocketUrl : 'localhost:8082/',
    authUrl: "http://localhost:8083/"

  };


  interface IWindowEnvironment {
    HOST_8080: string;
    HOST_8081: string;
    HOST_8082: string;
  }
  
  // declare global {
  //   interface Window {
  //     _env: IWindowEnvironment;
  //   }
  // }
  
  // export const environment = {
  //   HOST_8080: window._env.HOST_8080,
  //   HOST_8081: window._env.HOST_8081,
  //   HOST_8082: window._env.HOST_8082,
  //   production: false,
  // };