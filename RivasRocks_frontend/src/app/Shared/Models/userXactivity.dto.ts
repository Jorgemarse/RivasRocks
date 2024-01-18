export class UserXActivityDTO {
    user_id: string;
    activity_id: string;
  
    constructor(
        user_id: string,
        activity_id: string,
    ) {
        this.user_id = user_id;
        this.activity_id = activity_id;
    }
  }