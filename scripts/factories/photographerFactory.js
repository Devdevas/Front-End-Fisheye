
class PhotographerFactory {
  constructor(data, type) {
    if (type === "photographerData") {
      return new PhotographerProfil(data);
    } else if (type === "mediaData") {
      return new PhotographerMedia(data);
    } else {
      throw "Unknown type format";
    }
  }
}
