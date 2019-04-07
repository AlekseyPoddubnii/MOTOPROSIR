export class Blog {
    id: number;
    title: string;
    description: string;
    created_at: string;

    constructor(
        title: string,
        description: string,
        created_at: string,
        ) {
            this.title = title;
            this.description = description;
            this.created_at = created_at;
        }
}
