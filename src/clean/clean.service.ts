import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { CategoryType } from '../common/mock/constant.mock';

@Injectable()
export class CleanService {
  private readonly logger = new Logger(CleanService.name);

  constructor(
    @InjectModel('SaloonProfile')
    private readonly sProfileModel,
    @InjectModel('Merchant')
    private readonly merchantModel,
    @InjectModel('UserProfile')
    private readonly uProfileModel,
    @InjectModel('User')
    private readonly userModel,
    @InjectModel('Category')
    private readonly categoryModel,
  ) {}

  async cleanUser() {
    const users = await this.userModel.find();
    return Promise.all(
      users.map(async (user) => {
        const password = bcrypt.hashSync('12345', 8);
        await user
          .set({
            password: password,
          })
          .save();
      }),
    );
  }

  async cleanSP() {
    const categories = await this.categoryModel
      .find({
        type: CategoryType.BUSINESS,
      })
      .select({ _id: 1 })
      .exec();
    const sCategories = categories.map((category) => category._id);
    const sps = await this.sProfileModel.find();
    return Promise.all(
      sps.map(async (sp) => {
        await sp
          .set({
            categories: sCategories,
          })
          .save();
      }),
    );
  }
}
