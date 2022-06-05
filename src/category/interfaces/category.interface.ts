export interface ICategory {
  readonly _id: string;
  readonly name: string;
  readonly slug: string;
  readonly type: string;
  readonly parentCategory: ICategory;
  readonly logo: string;
  readonly pictures: string[];
  readonly isActive: boolean;
  readonly isDeleted: boolean;
  readonly cTime: number;
  readonly cBy: string;
  readonly uTime: number;
  readonly uBy: string;
}
