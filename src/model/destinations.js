export default class DestinationsModel {
  constructor() {
    this._descriptions = null;

    this.getDescription = this.getDescription.bind(this);
  }

  set descriptions(descriptions) {
    this._descriptions = descriptions;
  }

  get destinations() {
    return Array.from(this._descriptions.keys());
  }

  getDescription(destinationName) {
    return this._descriptions.get(destinationName);
  }

  static adaptToClient(descriptions) {
    console.log(`descriptions to adapt`, descriptions);
    const adaptedDescriptions = new Map();
    descriptions.forEach((description) => {
      adaptedDescriptions.set(
          description.name,
          {
            text: description.description,
            photos: description.pictures.map((picture) => picture.src)
          }
      );
    });
    console.log(`adaptedDescriptions`, adaptedDescriptions);
    return adaptedDescriptions;
  }
}
