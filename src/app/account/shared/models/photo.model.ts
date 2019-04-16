export class Photo {
    id: number;
    file: File;
    constructor(
        file: File,
        ) {
            this.file = file;
        }
}
