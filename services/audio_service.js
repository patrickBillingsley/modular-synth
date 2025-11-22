export default class AudioService {
    constructor() {
        return DatabaseConnection.instance ??= this;
    }
}