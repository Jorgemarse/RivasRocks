

export class PostDTO {
  id!: string;
  title: string;
  small_description: string;
  description: string;
  // num_likes: number;
  // num_dislikes!: number;
  publication_date: Date;
  userId!: string;
  // userAlias!: string;

  constructor(
    title: string,
    small_description: string,
    description: string,
    // num_likes: number,
    // num_dislikes: number,
    publication_date: Date
  ) {
    this.title = title;
    this.small_description = small_description;
    this.description = description;
    // this.num_likes = num_likes;
    // this.num_dislikes = num_dislikes;
    this.publication_date = publication_date;
  }
}
