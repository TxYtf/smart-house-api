'use strict';

// =========================================================================
// Основний код обробника Lambda API
// =========================================================================
export async function handler(event) {
  console.log('--> API request event:', {
    method: event.httpMethod,
    path: event.resource,
    pathParameters: event.pathParameters,
    body: event.body,
    headers: event.headers,
    stage: event.requestContext?.stage
  });

  let deviceItems = null;
  let smartHouseItems = null;
  let statusCode = null;
  let body = null;

  const method = event.httpMethod;        // GET, POST, PUT, DELETE
  const path = event.resource;            // наприклад "/devices" або "/devices/{id}"
  const pathParams = event.pathParameters; // { id: "2" } якщо URL /devices/2

  try {

    switch (method) {
      // ==========================================
      // CORS Preflight - про всяк випадок (насправді налаштування CORS вже є в API Gateway)
      // ==========================================    
      case 'OPTIONS':
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
          },
          body: ''
        };

      // ==========================================
      // 1) GET
      // ==========================================
      case 'GET':
        switch (path) {
          case '/':
            deviceItems = 'Welcome to Smart House API';
            statusCode = 200;
            body = JSON.stringify(deviceItems);
            break;

          default:
            statusCode = 404;
            body = JSON.stringify({ error: '>>>> Wrong endpoint for GET method' });
        }
        break;

      // ==========================================
      // 2) POST /devices, POST /smart-houses
      // ==========================================
      case 'POST':
        switch (path) {
          case '/devices':

            break;
          case '/smart-houses':

            break;
          default:
            statusCode = 404;
            body = JSON.stringify({ error: '>>>> Unknown resource for POST method' });
        }
        break;

      // ==========================================
      // 3) PUT /devices/{id}, PUT /smart-houses/{id}
      // ==========================================
      //      event.resource === "/devices/{id}" під час налаштування в API Gateway
      case 'PUT':
        if (path === '/devices/{id}') {

        }  else if (path === '/smart-houses/{id}') {

        }
        break;

      //  ==========================================
      // 4) DELETE /devices/{id}
      //  ==========================================
      case 'DELETE':
        if (path === '/devices/{id}') {

        } else if (path === '/smart-houses/{id}') {

        }
        break;

      // ==========================================
      // Якщо жоден із маршрутів не спрацював:
      // ==========================================
      default:
        if (!statusCode && !body) {
          statusCode = 405;
          body = JSON.stringify({ error: '>>>> Unknown method' });
        }
    }


  } catch (error) {
    console.error('>>>> Handler error:', error);
    statusCode = 500;
    body = JSON.stringify({ error: '>>>> Internal server error' });
  }

  return {
    statusCode,
    body,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT'
    }
  };
}