export class BlogComment {
    commentable_type: string;
    commentable_id: number;
    text: string;

    constructor(
      commentable_type: string,
      commentable_id: number,
      text: string,
        ) {
            this.commentable_type = commentable_type;
            this.commentable_id = commentable_id;
            this.text = text;
        }
}
