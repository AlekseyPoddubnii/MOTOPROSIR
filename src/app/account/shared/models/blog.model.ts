export class Blog {
    id: number;
    title: string;
    description: string;
    category_id: string;
    date: string;

    constructor(
        title: string,
        description: string,
        category_id: string,
        date: string,
        ) {
            this.title = title;
            this.description = description;
            this.category_id = category_id;
            this.date = date;
        }
}
