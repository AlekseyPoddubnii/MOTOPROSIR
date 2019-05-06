export class Blog {
    id: number;
    title: string;
    description: string;
    picture: string;
    // created_at: string;

    constructor(
        title: string,
        description: string,
        picture: string,
        // created_at: string,
        ) {
            this.title = title;
            this.description = description;
            this.picture = picture;
            // this.created_at = created_at;
        }
}
