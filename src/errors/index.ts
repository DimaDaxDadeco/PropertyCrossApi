export class BadRequestError extends Error {

  message: string;

  constructor() {
    super();
    this.message = 'Bad Request. Check your request and try again, please';
    this.name = 'Bad Request Error';
  }
}

export class LocationsNotFoundError extends Error {

  message: string;

  constructor() {
    super();
    this.message = 'Locations not found';
    this.name = 'Not Found Error';
  }
}

export class PropertiesNotFoundError extends Error {

  message: string;

  constructor() {
    super();
    this.message = 'Properties not found';
    this.name = 'Not Found Error';
  }
}
