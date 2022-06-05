export interface ITestimonial {
  readonly _id: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly givenBy: string;
  readonly givenUserAvatar: string;
  readonly givenUserDesignation: string;
  readonly isDeleted: boolean;
}
