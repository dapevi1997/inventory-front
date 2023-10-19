export const environment = {
    production: false,
    apiQueryService: window._env.apiQueryService,
    apiCommandService: window._env.apiCommandService,
    webSocketUrl : window._env.webSocketUrl ,
    authUrl: window._env.authUrl
  };


  interface IWindowEnvironment {
    apiQueryService: string;
    apiCommandService: string;
    webSocketUrl: string;
    authUrl: string;
  }
  
  declare global {
    interface Window {
      _env: IWindowEnvironment;
    }
  }
  
  // export const environment = {
  //   HOST_8080: window._env.HOST_8080,
  //   HOST_8081: window._env.HOST_8081,
  //   HOST_8082: window._env.HOST_8082,
  //   production: false,
  // };