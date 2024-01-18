export class ActivityDTO {
    id!: string;
    title: string;
    location: string;
    small_description: string;
    description: string;
    publication_date: Date;
    activity_date: Date;
    userId!: string;
  
    constructor(
      title: string,
      location: string,
      small_description: string,
      description: string,
      activity_date: Date,
      publication_date: Date
    ) {
      this.title = title;
      this.location = location;
      this.small_description = small_description;
      this.description = description;
      this.publication_date = publication_date;
      this.activity_date = activity_date;
    }
  }
  